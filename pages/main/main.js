angular.module('rtfmApp')
.controller('mainPageController', function($scope, $location, userService, threadService, fb, $firebaseAuth){

    $scope.user = userService.getLoggedInUser();

    $scope.newThreadTitle = '';

    $scope.threads = threadService.getAllThreads();

    $scope.threads.$loaded().then(function(){
        console.log($scope.threads)
    });

    $scope.users = userService.getLoggedInUsers();

    $scope.addThread = function(){  
        if(!$scope.newThreadTitle){
            return false; //Don't do anything if the text box is empty
        }
        var newThread = {       
            title: $scope.newThreadTitle,
            username: $scope.user.name,            
            comments: [],
            votes: 0
        };

        $scope.threads.$add(newThread);

        $scope.newThreadTitle = ''; //Clear the text in the input box
    }

    $scope.upvote = function(threadId, threadVotes) {
        //var currentUser = userService.getLoggedInUser();
        var newVotes = threadVotes + 1;
        var ref = new Firebase(fb.url);
        var threadRef = ref.child("threads");
        threadRef.child(threadId).update({
            votes: newVotes
        });

    }

    $scope.downvote = function(threadId, threadVotes) {
        //var currentUser = userService.getLoggedInUser();
        var newVotes = threadVotes - 1;
        var ref = new Firebase(fb.url);
        var threadRef = ref.child("threads");
        threadRef.child(threadId).update({
            votes: newVotes
        });

    }

    $scope.logout = function(){
        userService.logout();
    }

});