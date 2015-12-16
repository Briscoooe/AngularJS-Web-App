angular.module('richWebApp')
.service('userService', function($firebaseArray, $firebaseAuth, fb, $location){

    // Initialising the username
    var user = {
        name: ''
    };

    // The Firebase object to be used for authorizing the user 
    var ref = new Firebase(fb.url);
    var authObj = $firebaseAuth(ref);

    // Set the user object if already logged in on page refresh
    if(authObj.$getAuth()) {
        var info = authObj.$getAuth();
        user.name = info.google.displayName;
        user.profilePic = info.google.profileImageURL;
    }

    // Function to return the user object
    this.getLoggedInUser = function(){
        return user;
    }

    // Function to log into using a Google account
    this.loginWithGoogle = function(){
        authObj.$authWithOAuthPopup("google").then(function(authData) {
            $location.path('main')
            var username = authData.google.displayName;
            var userid = authData.google.id;
            user.name = username
            var usersRef = ref.child("users");
            usersRef.child(userid).set({
                name: username,
                id: userid
            });
        }).catch(function(error) {
            console.error("Authentication failed: ", error);
        });
    }

    // Function to log out the user
    this.logout = function() {
        authObj.$unauth()
        $location.path('login');
    }
});