angular.module('venture')
.controller('navbar', ["$scope", "$cookies", function($scope, $cookies){
  if($cookies.get('venture')){
    $scope.userInfo = JSON.parse(window.atob($cookies.get('venture')))
    // console.log($scope.userInfo);
  } else {
    $scope.userInfo = null
  }
}])
