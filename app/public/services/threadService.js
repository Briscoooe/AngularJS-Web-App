angular.module("richWebApp")
.service("threadService", function($firebaseArray, $firebaseObject, fb){

	// Function to get all threads from the database
    this.getAllThreads = function(){
        var ref = new Firebase(fb.url + '/threads');
        return $firebaseArray(ref);
    };

    // Function to get a specific thread from the database
    this.getThread = function(threadId){
        var ref = new Firebase(fb.url + '/threads/' + threadId);
        return $firebaseObject(ref);
    };
});