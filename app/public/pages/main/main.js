angular.module('richWebApp')
.controller('mainPageController', function($scope, $location, userService, threadService, fb, $firebaseAuth, $filter){

    $scope.user = userService.getLoggedInUser();

    $scope.newThreadTitle = '';

    $scope.createNewThread = false;

    $scope.currentThreadId = '';

    $scope.threadSubject = ''

    $scope.threads = threadService.getAllThreads();

    $scope.threads.$loaded().then(function(){
        console.log($scope.threads)
    });

    $scope.getSubjects = function(subject) {
        return $scope.threads.subject;
    }

    /*$scope.isLoggedIn = function() {
        if($firebaseAuth){
            return true;
        }

        else {
            return false;
        }
    }*/

    $scope.addThread = function(){  
        if(!$scope.newThreadTitle || !$scope.newThreadSubject){
            return false; //Don't do anything if the text box is empty
        }

        var date = new Date();

        var newThread = {       
            title: $scope.newThreadTitle,
            subject: $scope.newThreadSubject,
            username: $scope.user.name,
            numComments: 0,
            comments: [],
            dateAdded: date.getTime()
        };

        $scope.threads.$add(newThread);

        $scope.newThread = '';

        $scope.newThreadTitle = ''; //Clear the text in the input box

        $scope.newThreadSubject = '';

        $scope.threadSubject = '';

        $scope.createNewThread = false; 
    }

    $scope.beginAddThread = function() {
        $scope.createNewThread = true;
    }

    $scope.searchSubject = function(subject) {
        $scope.searchThread = subject;
    }

    $scope.logout = function(){
        userService.logout();
    }

});