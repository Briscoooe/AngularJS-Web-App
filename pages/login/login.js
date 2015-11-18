angular.module('rtfmApp')
.controller('loginPageController', function($scope, $location, fb, $firebaseAuth){
    var ref = new Firebase(fb.url);
    $scope.authObj = $firebaseAuth(ref);

    $scope.loginWithGoogle = function(){
        ref.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
        $location.path('main')
    }

});