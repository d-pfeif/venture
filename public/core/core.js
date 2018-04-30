(function(){
  angular.module('venture', ['ngRoute'])

  .controller('mainController', function($scope, $http) {
    $scope.activityData = {};

    $http.get('/api/activities')
    .then(function successCallback(data){
      $scope.activities = data.data
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
      controller: "mainController"
    })
  })
})()
