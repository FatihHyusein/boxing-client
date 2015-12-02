'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'boxing.home',
  'boxing.login'
]).
config(['$routeProvider', function($routeProvider) {
  //$routeProvider.otherwise({redirectTo: '/home'});
}]);
