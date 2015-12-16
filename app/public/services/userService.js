angular.module('richWebApp')
.service('userService', function($firebaseArray, $firebaseAuth, fb, $location){

    var user = {
        name: ''
    };

    var ref = new Firebase(fb.url);
    var authObj = $firebaseAuth(ref);

    // Set the user object if already logged in on page refresh
    if(authObj.$getAuth()) {
        var info = authObj.$getAuth();
        user.name = info.google.displayName;
        user.profilePic = info.google.profileImageURL;
    }

    this.getLoggedInUser = function(){
        return user;
    }

    this.getLoggedInUsers = function(){
        var info = authObj.$getAuth();
        var userid = info.google.id;
        var ref = new Firebase(fb.url + '/users');
        var array = $firebaseArray(ref);
        return array;
    };

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

    this.logout = function() {
        var info = authObj.$getAuth();
        var userid = info.google.id;
        var userRef = new Firebase(fb.url + "/users/" + userid);
        authObj.$unauth()
        $location.path('login');
    }
});