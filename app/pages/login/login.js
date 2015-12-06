'use strict';

angular.module('boxing.login', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .when('/login/:id', '/logins/:id')
                .when('/logins/:id', '/logins/:id');

            $stateProvider
                .state('logins', {
                    url: 'logins',
                    templateUrl: 'pages/login/login.html',
                    controller: 'LoginCtrl'
                });
        }])

    .controller('LoginCtrl', ['$rootScope', '$scope', 'Login', '$state',
        function ($rootScope, $scope, Login, $state) {
            $scope.login = function () {
                Login.create({},
                    $.param({
                        username: $scope.username,
                        password: $scope.password
                    }), successLogin, failLogin
                );

                function successLogin(response) {
                    localStorage.setItem("authToken", response.authToken);
                    localStorage.setItem("userId", response.id);
                    $rootScope.loggedInUser = true;
                    $state.go('home');
                }

                function failLogin(response) {
                }
            };
        }]);