(function(){
  angular.module('venture', ['ngRoute', 'ngCookies'])

  .controller('activityController', function($scope, $http) {
    $scope.activityData = {};

    $http.get('/api/activities')
    .then(function successCallback(data){
      $scope.activities = data.data
      // console.log(data);
    }, function errorCallback(error){
      console.log(error);
    })
  })

  .controller('profileController', function($scope){

  })


  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: "/views/home.html",
      controller: "navbar"
    })

    .when('/activities', {
      templateUrl: "/views/activities.html",
      controller: "activityController"
    })

    .when('/login', {
      templateUrl: "/views/login.html"
    })

    .when('/signup', {
      templateUrl: "/views/signup.html"
    })

    .when('/user/:id', {
      templateUrl: "/views/profile.html",
      controller: "navbar"
    })
  })
})()
