angular.module('richWebApp')
.controller('loginPageController', function($scope, $location, userService){
    $scope.loginWithGoogle = function(){
        userService.loginWithGoogle();
    }
});