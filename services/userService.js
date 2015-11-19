angular.module('rtfmApp').service('userService', function($firebaseAuth, fb, $location){

    //Todo: don't hardcode this
    var user = {
        name: ''
    };

    var ref = new Firebase(fb.url);
    var authObj = $firebaseAuth(ref);

    // Set the user object if already logged in on page refresh
    //var info = authObj.$getAuth();
    //user.name = info.google.displayName;


    this.getLoggedInUser = function(){
        return user;
    }

    this.loginWithGoogle = function(){
    	authObj.$authWithOAuthPopup("google").then(function(authData) {
    		$location.path('main')
            var username = authData.google.displayName;
            var userid = authData.google.id;
            user.name = name;
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
        authObj.$unauth()
        $location.path('login');
    }
});