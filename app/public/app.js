// File structure skeleton taken from https://github.com/deltaepsilon/RTFM
angular.module('richWebApp', ['ngRoute', 'firebase', 'objectFilter'])
// Delcaring a constant that stores the Firebase string
.constant('fb', {
  url: 'https://luminous-torch-7000.firebaseio.com/'
})
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://luminous-torch-7000.firebaseio.com/");
    return $firebaseAuth(ref);
  }
])
.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        if(error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });
})
// Declaring the routes 
.config(function($routeProvider){
    $routeProvider.
        when('/login', {
            templateUrl: 'pages/login/login.html'
        }).
        when('/main', {
            controller: 'mainPageController',
            templateUrl: 'pages/main/main.html',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        }).
        when('/thread/:threadId', {
            controller: 'threadPageController',
            templateUrl: 'pages/thread/thread.html',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        }).
        otherwise({
            redirectTo: '/login'
    });
});