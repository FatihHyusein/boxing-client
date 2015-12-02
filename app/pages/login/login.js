'use strict';

angular.module('boxing.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logins', {
    templateUrl: 'pages/login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', [function() {
}]);