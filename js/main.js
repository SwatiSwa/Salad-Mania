var app=angular.module("app",['ngRoute','ui.router']);

app.controller('appCtrlr',function($scope){
    $scope.user = "User";
    $scope.userProfilePic = 'resources/user.png';

    var user = firebase.auth().currentUser;
    
    if (user) {
      // User is signed in.
      $scope.user = user.displayName;
      $scope.userProfilePic=user.photoURL;
    } else {
      // No user is signed in.
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          $scope.user = user.displayName;
          $scope.userProfilePic=user.photoURL;
        } else {
          // No user is signed in.
        }
      });

    $scope.onClickGoogle = function(){
        var provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            debugger;
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    };

    $scope.onClickFb = function(){
        var provider = new firebase.auth.FacebookAuthProvider();

        provider.addScope('user_birthday');
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    };
});