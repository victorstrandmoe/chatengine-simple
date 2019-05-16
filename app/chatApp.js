
angular.module('chatApp', ['open-chat-framework', 'firebase'])
  .run(['$rootScope', 'ngChatEngine', function($rootScope, ngChatEngine) {
    $rootScope.ChatEngine = ChatEngineCore.create({
      //created an account to get these keys at PubNub.com
      publishKey: 'pub-c-fb436d85-f479-435a-b35f-51b376621285',
      subscribeKey: 'sub-c-4a573aba-7333-11e9-bedf-bef46dd4efdc'
    }, {
      debug: true,
      globalChannel: 'chat-engine-angular-simple'
    });
    ngChatEngine.bind($rootScope.ChatEngine);

    // create and initiate chats array
    $rootScope.chats = [];
    $rootScope.firebaseData = [];
  }])
  //contoller handling the main app view
  .controller('chatAppController', function($scope, $rootScope, $firebaseObject) {
    //connect the model to PubNub servers
    $scope.ChatEngine.connect(new Date().getTime(), {}, 'auth-key');
    //lisener for when gets a callback
    $scope.ChatEngine.on('$.ready', (data) => {
      $scope.me = data.me;
      //display user with random usernamegenerator 
      $scope.me.plugin(ChatEngineCore.plugin['chat-engine-random-username']($scope.ChatEngine.global));       
      //TODO: Will allow own username creation

      //initiate the chat scope with data from ChatEngine
      $scope.chat = $scope.ChatEngine.global;
      // listener for when an invite is being sent out
      $scope.me.direct.on('$.invite', (payload) => {
        let chat = new $scope.ChatEngine.Chat(payload.data.channel);
        console.log('INVITE');
        console.log(chat);
        chat.onAny((a,b) => {
          console.log(a);
        });

        //add chat to chats scope for DOM updates
        $scope.chats.push(chat);
      });
      //enable username search
      $scope.chat.plugin(ChatEngineCore.plugin['chat-engine-online-user-search']({ prop: 'state.username' }));
      //the search function
      $scope.search = function () {
        //search input data from user into useable var
        let found = $scope.chat.onlineUserSearch.search($scope.mySearch);
        //hide all users
        for(let uuid in $scope.chat.users) {
          $scope.chat.users[uuid].hideWhileSearch = true;
        }
        //show results
        for(let i in found) {
          $scope.chat.users[found[i].uuid].hideWhileSearch = false;
        }
      }
      //invites user to new chat and opens new view
    $scope.newChat = function(user) {
      //set a channel id
      let chat = new Date().getTime();
      // //create new chat
      // let newChat = new $scope.ChatEngine.Chat(chat);
      //create firebase key to be used as name
      var firebaseKey = firebase.database().ref('/chats/').push().key;
      
        //create new chat. add firebase chat key inside the invitation
      let newChat = new $scope.ChatEngine.Chat('public-chat', false, true,{
            name: firebaseKey
        });
      console.log(newChat);

      //authenticate and handle callback
      newChat.on('$.connected', () => {
        //send invite to 'user' 
        newChat.invite(user);
        //add chat to chats scope
        $scope.chats.push(newChat);
      });

      //send first to Firebase to add key to the invitation
      addChatToFirebase(newChat,firebaseKey);

    };
    function addChatToFirebase(newChat, key) {
        //create object
        var newChatObj = {
          uid: key,
          name: newChat.name,
          channel: newChat.channel,
          creator: $scope.me.uuid,
          users:[$scope.me.uuid],
          messages:[]
        };
        //send
        firebase.database().ref('/chats/' + key).update(newChatObj);

        //keep track of firebase chat ID's
        $rootScope.firebaseData.chats=[];
        $rootScope.firebaseData.chats.push(newChatObj);
      }
  });

  })
  //chat controllr
  .controller('chat', function($scope) {
    //initiate messages scope
    $scope.messages = [];
    //default value of minimize
    $scope.chat.minimize = false;
    //send message from user input
    $scope.sendMessage = function (index) {
      $scope.chat.emit('message', { text: $scope.newMessage });
      // Get a reference to tfirebase database
      writeMessageToFirebase($scope.newMessage, $rootScope.firebaseData.chats[$index]);
      $scope.newMessage = '';
    };
    //listener for when message is received
    $scope.chat.on('message', function(payload) {
      //check if message was from the same user 
      payload.sameUser = $scope.messages.length > 0 && payload.sender.uuid == $scope.messages[$scope.messages.length - 1].sender.uuid;
      //check is message is sent by himself
      payload.isSelf = payload.sender.uuid == $scope.me.uuid;
      //append to messagesscope
      $scope.messages.push(payload);
    });
      function writeMessageToFirebase(message, chatId) {
        console.log('WRITE MESSAGE');
        console.log('MESSAGE');
        console.log(message);
        console.log('CHAT ID');
        console.log(chatId);
         //get key
        var newChatKey = firebase.database().ref('/chats/').push().key;
        //create object
        var newChatObj = {
          uid: newChatKey,
          name: newChat.name,
          channel: newChat.channel,
          creator: $scope.me.uuid,
          messages:[]
        };
        //send
        firebase.database().ref('/chats/' + newChatKey).update(newChatObj);
        $rootScope.firebaseData.chats=[];
        $rootScope.firebaseData.chats.push(newChatObj);
}
    //leave the chatroom and remove from chats scope
    $scope.leave = function (index) {
      $scope.chat.leave();
      $scope.chats.splice(index, 1);
    };
    //minimize the chatroom 
    $scope.minimizeChat = function () {
      $scope.chat.minimize = true;
    };
     //maximize the chatroom 
    $scope.maximizeChat = function () {
      $scope.chat.minimize = false;
    };
    //leave the chatroom and remove from chats scope
    $scope.deleteChatContent = function (index) {
      $scope.messages=[];
    };
     //search for user  from global list
    $scope.searchFromGlobal = function () {
      if($scope.mySearchFromGlobal) {
        //use chatengine search function to search for all online users in this instance
        $scope.users = $scope.ChatEngine.global.onlineUserSearch.search($scope.mySearchFromGlobal);
      } else {
        $scope.users = [];
      }
    };
    //invite a user to creatre a chatroom. Is automatically accepted on client
    $scope.invite = function (user) {
      //reset users to 0 to hide search results and clear searchbar
      $scope.users = [];
      $scope.mySearchFromGlobal = '';
      $scope.chat.invite(user);
    };
  });
  ;