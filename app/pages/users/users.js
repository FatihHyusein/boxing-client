'use strict';

angular.module('boxing.users', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .when('/user/:id', '/users/:id')
                    .when('/users/:id', '/users/:id');


                $stateProvider
                    .state('users', {
                        abstract: true,
                        url: '/users',

                        templateUrl: 'pages/users/users.html',

                        resolve: {
                            users: ['User',
                                function (User) {
                                    return User.getMany();
                                }]
                        },

                        controller: ['$scope',
                            function ($scope) {
                                $scope.users = [];
                            }]
                    })

                    .state('users.list', {
                        url: '',
                        templateUrl: 'pages/users/users.list.html',
                        controller: ['$scope', '$state', 'User',
                            function ($scope, $state, User) {
                                var currentPage = 0;
                                $scope.filters = {
                                    skip: 0,
                                    take: 5,
                                    sort: 'rating'
                                };
                                $scope.getUsers = function (filter) {
                                    if (filter && filter.sort) {
                                        if ($scope.filters.sort == filter.sort) {
                                            if ($scope.filters.sort.indexOf('-') == 0) {
                                                $scope.filters.sort = filter.sort;
                                            }
                                            else {
                                                $scope.filters.sort = '-' + filter.sort;
                                            }
                                        }
                                        else {
                                            $scope.filters.sort = filter.sort;
                                        }
                                    }

                                    else if (filter && filter.page) {
                                        currentPage = (filter.page == 'next') ? ++currentPage : --currentPage;
                                    }

                                    $scope.filters.skip = $scope.filters.take * currentPage;
                                    $scope.users = User.getMany($scope.filters);
                                };

                                $scope.getUsers();
                            }]
                    })

                    .state('users.detail', {
                        url: '/{id:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'pages/users/details/users.detail.html',
                                controller: ['$scope', '$stateParams', 'User', '$state',
                                    function ($scope, $stateParams, User, $state) {
                                        $scope.user = User.getOne({
                                            id: $stateParams.id
                                        });

                                        $scope.removeUser = function (userId) {
                                            User.delete({id: userId}, successDelete);

                                            function successDelete(response) {
                                                $state.go('users.list');
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    })

                    .state('users.edit', {
                        url: '/{id:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'pages/users/details/users.edit.html',
                                controller: ['$scope', '$stateParams', '$state', 'User',
                                    function ($scope, $stateParams, $state, User) {
                                        $scope.user = User.getOne({
                                            id: $stateParams.id
                                        });

                                        $scope.save = function () {
                                            // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                                            $state.go("users.detail", {id: $stateParams.id});
                                        };
                                    }
                                ]
                            }
                        }
                    });
            }
        ]
    );