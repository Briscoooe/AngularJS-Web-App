angular.module('richWebApp')
.controller('mainPageController', function($scope, $location, userService, Auth, threadService, fb, $firebaseAuth, $filter){

    // Get the info of the logged in user
    $scope.user = userService.getLoggedInUser();

    // Clear the input fields for thread entry
    $scope.newThreadTitle = '';
    $scope.threadSubject = ''

    // The variable used to determine whether or not to show the
    // thread entry form
    $scope.createNewThread = false;

    // Variable used to sort the thread list
    $scope.sortBy = 'dateAdded'

    // Retrieve the list of threads from the database
    $scope.threads = threadService.getAllThreads();

    // Get the list of subjects from the database
    $scope.getSubjects = function(subject) {
        return $scope.threads.subject;
    }

    // Function used to display the thread input form
    $scope.beginAddThread = function() {
        $scope.createNewThread = true;
    }

    // Function to add a thread to the database
    $scope.addThread = function(){  
        // If either of the input fields are empty, don't do anything
        if(!$scope.newThreadTitle || !$scope.newThreadSubject){
            return false;
        }

        // A new date variable to be used in the database entry
        var date = new Date();

        // The newThread object to be added to the database using
        // the values of the input fields, the users name, the date and other
        // relevant information
        var newThread = {       
            title: $scope.newThreadTitle,
            subject: $scope.newThreadSubject,
            username: $scope.user.name,
            numComments: 0,
            comments: [],
            dateAdded: date.getTime()
        };

        // Add the newThread object to the database
        $scope.threads.$add(newThread);

        // Clear the object variable and input fields
        $scope.newThread = '';
        $scope.newThreadTitle = '';
        $scope.newThreadSubject =  '';

        // Hide the thread input form
        $scope.createNewThread = false; 
    }

    // Function used to sort the thread list by date
    $scope.sortByDate = function() {
        $scope.sortBy = 'dateAdded';
    }

    // Fuction used to sort the thread list by popularity
    $scope.sortByPopularity = function() {
        $scope.sortBy = 'numComments';
    }

    // Function used for searching threads
    $scope.searchSubject = function(subject) {
        $scope.searchThread = subject;
    }

    // Function for the user out
    $scope.logout = function(){
        userService.logout();
    }

});