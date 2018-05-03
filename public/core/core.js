(function(){
  angular.module('venture', ['ngRoute', 'ngCookies'])

  .controller('activityController', function($scope, $http) {
    $scope.activityData = {};

    $http.get('/api/activities')
    .then(function successCallback(data){
      $scope.activities = data.data
      console.log(data);
    }, function errorCallback(error){
      console.log(error);
    })
  })

  .controller('userController', function($scope, $http) {
    $scope.userData = {};

    $http.get('/users')
    .then(function successCallback(data){
      $scope.users = data.data
      console.log(data);
    }, function errorCallback(error){
      console.log(error);
    })
  })

  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      template: "<p>welcome to venture</p>"
    })

    .when('/activities', {
      templateUrl: "/views/activities.html",
      controller: "activityController"
    })

    .when('/login', {
      templateUrl: "/views/login.html"
      // controller: "userController"
    })
  })
})()
