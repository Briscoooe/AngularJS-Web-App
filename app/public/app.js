angular.module('richWebApp', ['ngRoute', 'firebase', 'objectFilter'])
// Delcaring a constant that stores the Firebase string
.constant('fb', {
  url: 'https://luminous-torch-7000.firebaseio.com/'
})
// Declaring the routes 
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

