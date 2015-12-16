angular.module('rtfmApp')
.controller('threadPageController', function($scope, $location, $routeParams, threadService, fb, commentId, userService){
    var threadId = $routeParams.threadId;

    $scope.newComment = '';
    var thread = threadService.getThread(threadId);

    thread.$bindTo($scope, 'thread') //creates $scope.thread with 3 way binding

    $scope.addComment= function(){ 
        if(!$scope.newComment){
            return false; //Don't do anything if the text box is empty
        }       

        var currentUser = userService.getLoggedInUser();
        commentId.id += 1;

        var newComment = {
            text: $scope.newComment,
            username: currentUser.name,
            votes: 0,
            id: commentId.id
        };

        console.log("CommendId: ", commentId.id);

        $scope.thread.comments = $scope.thread.comments || [];
        $scope.thread.comments.push(newComment);
    
        $scope.newComment = ''; //Clear the input box
    }

     $scope.upvote = function(threadId, comment, commentVotes) {
        var newVotes = commentVotes + 1;
        var ref = new Firebase(fb.url + "/threads/" + threadId);
        var commentRef = ref.child("comments");
        var key = "";

        commentRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log("Comment Id: ", comment.Id);
                if(childData.id == comment.id)
                {  
                    key = childSnapshot.key();
                }
            });
        });

        commentRef.child(key).update({
            votes: newVotes
        });
    }

    $scope.downvote = function(threadId, comment, commentVotes) {
        var newVotes = commentVotes - 1;
        var ref = new Firebase(fb.url + "/threads/" + threadId);
        var commentRef = ref.child("comments");
        var key = "";

        commentRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                if(childData.id == comment.id)
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