'use strict';

angular.module('boxing.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'Login', function ($rootScope, $scope, $location, Login) {
        $scope.login = function () {
            Login.create({},
                {
                    username: $scope.username,
                    password: $scope.password
                }, successLogin, failLogin
            );

            function successLogin(response) {
                $rootScope.loggedInUser = $scope.username;
                $location.path("/");
            }

            function failLogin(response) {
            }
        };
    }]);