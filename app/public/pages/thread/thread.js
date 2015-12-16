angular.module('richWebApp')
.controller('threadPageController', function($scope, $location, $routeParams, $filter, threadService, fb, userService){

    // Obtain the ID from the URL 
    var threadId = $routeParams.threadId;

    // Make the comment box empty
    $scope.newComment = '';
    var thread = threadService.getThread(threadId);

    thread.$bindTo($scope, 'thread') //creates $scope.thread with 3 way binding

    $scope.addComment= function(){ 
        if(!$scope.newComment){
            return false; //Don't do anything if the text box is empty
        }       

        var currentUser = userService.getLoggedInUser();

        var date = new Date();
        var newComment = {
            text: $scope.newComment,
            username: currentUser.name,
            dateAdded: date.getTime(),
            userPic: currentUser.profilePic        
        };

        $scope.thread.comments = $scope.thread.comments || [];
        $scope.thread.comments.push(newComment);
        $scope.thread.numComments += 1;
    
        $scope.newComment = ''; //Clear the input box
    }
});