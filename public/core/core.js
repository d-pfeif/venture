(function(){
  angular.module('venture', ['ngRoute', 'ngCookies'])

  .controller('activityController', function($scope, $http, $cookies) {
    $scope.activityData = {};

    $http.get('/api/activities')
    .then(function successCallback(data){
      $scope.activities = data.data
      // console.log(data);
    }, function errorCallback(error){
      console.log(error);
    })

    if($cookies.get('venture')){
      $scope.userInfo = JSON.parse(window.atob($cookies.get('venture')))
      // console.log($scope.userInfo);
    } else {
      $scope.userInfo = null
    }
  })

  .controller('oneActivity', function($scope, $http, $cookies, $routeParams) {
    $scope.activityData = {};

    $http.get('/api/activities/'+$routeParams.id)
    .then(function successCallback(data){
      $scope.activity = data.data
      // console.log(data);
    }, function errorCallback(error){
      console.log(error);
    })

    if($cookies.get('venture')){
      $scope.userInfo = JSON.parse(window.atob($cookies.get('venture')))
      // console.log($scope.userInfo);
    } else {
      $scope.userInfo = null
    }
  })

  .controller('profile', function($scope, $http, $cookies, $routeParams) {

    $http.get('/api/userActs/'+$routeParams.id)
    .then(function successCallback(data){
      $scope.activities = data.data
      // console.log(data);
    }, function errorCallback(error){
      console.log(error);
    })

    if($cookies.get('venture')){
      $scope.userInfo = JSON.parse(window.atob($cookies.get('venture')))
      // console.log($scope.userInfo);
    } else {
      $scope.userInfo = null
    }
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
      controller: "profile"
    })

    .when('/activities/:id', {
      templateUrl: "/views/oneActivity.html",
      controller: "oneActivity"
    })

    .when('/new/activity', {
      templateUrl: "/views/addActivity.html"
    })

    .when('/validate', {
      templateUrl: "/views/validAct.html",
      controller: "activityController"
    })
  })
})()
