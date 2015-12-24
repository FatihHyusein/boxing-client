'use strict';

var BoxingApp = angular.module('boxing', [
        'ui.router',
        'ngAnimate',
        'ngResource',
        'ui.bootstrap',
        'boxing.login',
        'boxing.users',
        'boxing.matches'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider',
        function ($stateProvider, $urlRouterProvider, $resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
            //$urlRouterProvider.otherwise('/');

            $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: 'pages/home/home.html',
                    controller: 'HomeCtrl'
                })
        }])


    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            var authToken = localStorage.getItem('authToken');
            if (authToken && authToken != '') {
                $rootScope.authToken = authToken;
                $rootScope.loggedInUser = true;
            }
            else {
                $rootScope.loggedInUser = false;
            }

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }])

    //todo rename to nav ctrl
    .controller('MainCtrl', ['$rootScope', '$scope', 'Login', '$state',
        function ($rootScope, $scope, Login, $state) {
            $scope.logout = function () {
                Login.delete(
                    {id: localStorage.getItem("userId")},
                    {}, successLogout, failLogout
                );

                function successLogout(response) {
                    localStorage.removeItem("authToken");
                    $rootScope.loggedInUser = false;
                    $state.go('home');
                }

                function failLogout(response) {
                }
            };
        }]);