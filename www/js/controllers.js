angular.module('starter.controllers', [])

.controller('AppCtrl',  function($scope, $ionicModal, $timeout) {
})
.controller('DashCtrl', function($scope, Auth, $state,$rootScope, $timeout) {
    $scope.user={};
    $scope.options1 = [{ name: "CSEOGI"}, { name: "GIE"}];
    $scope.user.branch = $scope.options1[1];
    $scope.options2 = [{ name: "2015-2019"}, { name: "2014-2018"}];
    $scope.user.year = $scope.options2[1];
    // $scope.fullname=null;
    // $scope.sap=null;
    // $scope.phone=null;
    // $scope.branch=null;
    // $scope.year=null;
    $scope.login = function(authMethod) {
    Auth.$authWithOAuthPopup(authMethod, {scope: "email"}).then(function(authData) {
      if($scope.user.fullname){
       var newUser = {
          userId:authData.uid,
          name: $scope.user.fullname,
          sap: $scope.user.sap,
          phone: $scope.user.phone,
          branch: $scope.user.branch.name,
          Year: $scope.user.year.name,
          email:authData.google.email,
          paid:false
        };
      }else(console.log("fuck"));
        console.log(newUser);
      var userRef = new Firebase('https://scorching-fire-3087.firebaseio.com/user');
      userRef.push(newUser);
      console.log(authData);
      $state.go('app.details');
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
          console.dir(authData);
        });
      } else {
        console.log(error);
      }
    });
  };
  // Auth.$onAuth(function(authData) {
  //   if (authData === null) {
  //     console.log('Not logged in yet');
  //   } else {
  //     console.log('Logged in as', authData.uid);
  //     $state.go('app.details');
  //     var detRef = new Firebase('https://scorching-fire-3087.firebaseio.com/user');
  //     detRef.orderByChild("userId").equalTo(authData.uid).on('child_added', function(snapshot) {
  //       $timeout(function(){
  //         $scope.usergot=snapshot.val();
  //         console.log(snapshot.val().name);
  //       });
  //     });
  //   }
  //   $scope.authData = authData;
  // });
})
.controller('EventCtrl',  function($scope, $ionicModal, $timeout) {
  var eventRef = new Firebase('https://scorching-fire-3087.firebaseio.com/events');
  eventRef.on('value',function(snapshot){
    $timeout(function(){
      $scope.events = snapshot.val();
    });
  });
})
.controller('NewsCtrl',  function($scope, $ionicModal, $timeout) {
  var eventRef = new Firebase('https://scorching-fire-3087.firebaseio.com/news');
  eventRef.on('value',function(snapshot){
    $timeout(function(){
      $scope.news = snapshot.val();
    });
  });
})
.controller('FeedCtrl',  function($scope, $http, $ionicModal, $timeout) {
  $scope.init = function() {
    $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://rigzone.com/news/rss/rigzone_latest.aspx?callback=JSON_CALLBACK" } }).success(function (data) {
      $scope.entries = data;
        });
      }
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
