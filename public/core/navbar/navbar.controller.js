angular.module('venture')
.controller('navbar', ["$scope", "$cookies", function($scope, $cookies){
  if($cookies.get('venture')){
    $scope.userInfo = JSON.parse(window.atob($cookies.get('venture')))
  } else {
    $scope.userInfo = null
  }
}])
