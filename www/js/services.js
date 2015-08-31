angular.module('starter.services', []
)
  .factory('Auth', function($firebaseAuth) {
    var usersRef = new Firebase('https://scorching-fire-3087.firebaseio.com');
    return $firebaseAuth(usersRef);
});
