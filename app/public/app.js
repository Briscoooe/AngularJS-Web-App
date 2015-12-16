angular.module('richWebApp', ['ngRoute', 'firebase', 'objectFilter'])
.constant('fb', {
  url: 'https://luminous-torch-7000.firebaseio.com/'
})
.run(function ($rootScope) {
    $rootScope.$on('handleEmit', function (event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
})
.config(function($routeProvider){
        $routeProvider.
            when('/login', {
                templateUrl: 'pages/login/login.html'
            }).
            when('/main', {
                templateUrl: 'pages/main/main.html'
            }).
            when('/thread/:threadId', {
                templateUrl: 'pages/thread/thread.html'
            }).
            otherwise({
                redirectTo: '/login'
            });
});

