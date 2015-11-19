angular.module('rtfmApp')
.controller('threadPageController', function($scope, $location, $routeParams, threadService, fb, userService){
    var threadId = $routeParams.threadId;

    $scope.newComment = '';
    var thread = threadService.getThread(threadId);

    thread.$bindTo($scope, 'thread') //creates $scope.thread with 3 way binding

    $scope.addComment= function(){ 
        if(!$scope.newComment){
            return false; //Don't do anything if the text box is empty
        }       

        var currentUser = userService.getLoggedInUser();

        var newComment = {
            text: $scope.newComment,
            username: currentUser.name,
            votes: 0,
            id: Firebase.ServerValue.TIMESTAMP
        };

        $scope.thread.comments = $scope.thread.comments || [];
        $scope.thread.comments.push(newComment);
    
        $scope.newComment = ''; //Clear the input box
    }

     $scope.upvote = function(threadId, commentId, commentVotes) {
        //var currentUser = userService.getLoggedInUser();
        var newVotes = commentVotes + 1;
        var ref = new Firebase(fb.url + "/threads/" + threadId);
        var commentRef = ref.child("comments");
        var key;

        commentRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if(childData.id === commentId)
                {  
                    console.log("Child Data id: ", childData.id);
                    key = childSnapshot.key();
                    console.log("Key = ", key);
                }
            });
        });

        commentRef.child(key).update({
            votes: newVotes
        });
    }

    $scope.downvote = function(threadId, commentId, commentVotes) {
        //var currentUser = userService.getLoggedInUser();
        var newVotes = commentVotes - 1;
        var ref = new Firebase(fb.url + "/threads/" + threadId);
        var commentRef = ref.child("comments");
        var key;
        
        commentRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if(childData.id === commentId)
                {
                    key = childSnapshot.key();
                }
            });
        });

        commentRef.child(key).update({
            votes: newVotes
        });
    }
});