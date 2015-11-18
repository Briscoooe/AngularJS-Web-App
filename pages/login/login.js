angular.module('rtfmApp')
.controller('loginPageController', function($scope, $location, fb, $firebaseAuth){
    var ref = new Firebase(fb.url);
    $scope.authObj = $firebaseAuth(ref);
    $scope.loginWithGoogle = function(){
        $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
            console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
            console.error("Authentication failed:", error);
        }); 
        $location.path('main')
    }

});