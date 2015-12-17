angular.module('richWebApp')
.controller('loginPageController', function($scope, $location, threadService, userService){

    // Retrieve the list of threads from the database
    $scope.threads = threadService.getAllThreads();

    $scope.activeUsers = userService.getActiveUsers();

	// Function to log in with Google
    $scope.loginWithGoogle = function(){
        userService.loginWithGoogle();
    }

    // Get the list of subjects from the database
    $scope.getSubjects = function(subject) {
        return $scope.threads.subject;
    }
});