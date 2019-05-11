
angular.module('chatApp', ['open-chat-framework'])
  .run(['$rootScope', 'ngChatEngine', function($rootScope, ngChatEngine) {
    $rootScope.ChatEngine = ChatEngineCore.create({
      //created an account to get these keys at PubNub.com
      publishKey: 'pub-c-fb436d85-f479-435a-b35f-51b376621285',
      subscribeKey: 'sub-c-4a573aba-7333-11e9-bedf-bef46dd4efdc'
    }, {
      debug: true,
      globalChannel: 'chat-engine-angular-simple'
    });
    // bind open chat framework angular plugin
    ngChatEngine.bind($rootScope.ChatEngine);

    // create and initiate chats array
    $rootScope.chats = [];
  }])
  .controller('chatAppController', function($scope) {
    //connect to Chat Engine
    $scope.ChatEngine.connect(new Date().getTime(), {}, 'auth-key');
    $scope.ChatEngine.on('$.ready', (data) => {
      $scope.me = data.me;
      //replace uid with random username generator
      $scope.me.plugin(ChatEngineCore.plugin['chat-engine-random-username']($scope.ChatEngine.global));
      //define the chat sope  bind chat to updates
      $scope.chat = $scope.ChatEngine.global;
      // listener for when an invite is being sent out
      $scope.me.direct.on('$.invite', (payload) => {
        let chat = new $scope.ChatEngine.Chat(payload.data.channel);
        chat.onAny((a,b) => {
          console.log(a);
        });
        // create a new chat 
        $scope.chats.push(chat);
      });
      //enable username search
      $scope.chat.plugin(ChatEngineCore.plugin['chat-engine-online-user-search']({ prop: 'state.username' }))
      $scope.search = function () {
        let found = $scope.chat.onlineUserSearch.search($scope.mySearch);
        // hide every user
        for(let uuid in $scope.chat.users) {
          $scope.chat.users[uuid].hideWhileSearch = true;
        }
        // show all found users
        for(let i in found) {
          $scope.chat.users[found[i].uuid].hideWhileSearch = false;
        }
    }
      // create a new chat taking another user as parameter
    $scope.newChat = function(user) {
      // define a channel
      let chat = new Date().getTime();
      // create a new chat with that channel
      let newChat = new $scope.ChatEngine.Chat(chat);
      // we need to auth ourselves before we can invite others
      newChat.on('$.connected', () => {
        // this fires a private invite to the user
        newChat.invite(user);
        // add the chat to the list
        $scope.chats.push(newChat);
      });
    };
    });
  })
  .controller('chat', function($scope) {
    // every chat has a list of messages
    $scope.messages = [];
    // send a message using the messageDraft input
    $scope.sendMessage = function () {
      $scope.chat.emit('message', { text: $scope.newMessage });
      $scope.newMessage = '';
    };
    // when this chat gets a message
    $scope.chat.on('message', function(payload) {
      // if the last message was sent from the same user
      payload.sameUser = $scope.messages.length > 0 && payload.sender.uuid == $scope.messages[$scope.messages.length - 1].sender.uuid;
      // if this message was sent by this client
      payload.isSelf = payload.sender.uuid == $scope.me.uuid;
      // add the message to the array
      $scope.messages.push(payload);
    });
      // leave a chatroom and remove from global chat list
    $scope.leave = function (index) {
      $scope.chat.leave();
      $scope.chats.splice(index, 1);
    };
     // find an user name from global list
    $scope.searchFromGlobal = function () {
      if($scope.mySearchFromGlobal) {
        $scope.users = $scope.ChatEngine.global.onlineUserSearch.search($scope.mySearchFromGlobal);
      } else {
        $scope.users = [];
      }
    };
    // invite to user to join
    $scope.invite = function (user) {
      $scope.chat.invite(user);
    };
  });
  ;