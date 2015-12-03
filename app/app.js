'use strict';

var BoxingApp = angular.module('boxing', [
    'ngRoute',
    'ngResource',
    'boxing.home',
    'boxing.login'
]).
config(['$routeProvider', '$resourceProvider', function ($routeProvider, $resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $routeProvider.otherwise({redirectTo: '/login'});
}]);


BoxingApp.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if ($rootScope.loggedInUser == null) {
            if (next.templateUrl != "pages/login/login.html") {
                $location.path("/login");
            }
        }
    });
});
