angular.module('richWebApp')
.controller('threadPageController', function($scope, $location, $routeParams, $filter, threadService, fb, userService){

    // Obtain the ID from the URL 
    var threadId = $routeParams.threadId;

    // Clear the comment input box
    $scope.newComment = '';

    // Get the thread information using its ID
    // and store it in the thread variable
    var thread = threadService.getThread(threadId);

    // Bind the thread variable to the scope
    thread.$bindTo($scope, 'thread') 

    // Function to add a comment to the current thread
    $scope.addComment= function(){ 
        // If the input field is empty, do nothing
        if(!$scope.newComment){
            return false; 
        }       

        // Get the information of the current user
        var currentUser = userService.getLoggedInUser();

        // A date variable to be used in the database entry
        var date = new Date();

        // The newComment object that will be added to the database
        // containing the value of the comment input field, the name of the
        // current user and a link to the users profile picture
        var newComment = {
            text: $scope.newComment,
            username: currentUser.name,
            dateAdded: date.getTime(),
            userPic: currentUser.profilePic        
        };

        // Add the comment to the database and increment the 
        // number of comments in the thread by 1
        $scope.thread.comments = $scope.thread.comments || [];
        $scope.thread.comments.push(newComment);
        $scope.thread.numComments += 1;
        
        // Clear the comment input field
        $scope.newComment = '';
    }
});