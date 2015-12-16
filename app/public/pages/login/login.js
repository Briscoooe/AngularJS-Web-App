angular.module('richWebApp')
.controller('loginPageController', function($scope, $location, userService){

	// Function to log in with Google
    $scope.loginWithGoogle = function(){
        userService.loginWithGoogle();
    }
});