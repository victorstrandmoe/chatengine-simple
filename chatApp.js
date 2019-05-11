
angular.module('chatApp', ['open-chat-framework'])
  .run(['$rootScope', 'ngChatEngine', function($rootScope, ngChatEngine) {
    $rootScope.ChatEngine = ChatEngineCore.create({
      publishKey: 'pub-c-fb436d85-f479-435a-b35f-51b376621285',
      subscribeKey: 'sub-c-4a573aba-7333-11e9-bedf-bef46dd4efdc'
    }, {
      debug: true,
      globalChannel: 'chat-engine-angular-simple'
    });
    // bind open chat framework angular plugin
    ngChatEngine.bind($rootScope.ChatEngine);
  }])
   .controller('chatAppController', function($scope) {
    $scope.ChatEngine.connect(new Date().getTime(), {}, 'auth-key');
    $scope.ChatEngine.on('$.ready', (data) => {
      $scope.me = data.me;
      // bind chat to updates
      $scope.chat = $scope.ChatEngine.global;
    });
  });