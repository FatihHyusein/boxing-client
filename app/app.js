'use strict';

var BoxingApp = angular.module('boxing', [
  'ngRoute',
  'boxing.home',
  'boxing.login'
]).
config(['$routeProvider', function($routeProvider) {
  //$routeProvider.otherwise({redirectTo: '/home'});
}]);
