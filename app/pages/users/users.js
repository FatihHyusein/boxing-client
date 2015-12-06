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

                        //resolve: {
                        //    users: ['User',
                        //        function (User) {
                        //            debugger;
                        //            return User.getMany();
                        //        }]
                        //},

                        controller: ['$scope', '$state', 'User',
                            function ($scope, $state, User) {
                                $scope.users = User.getMany();
                            }]
                    })

                    .state('users.list', {
                        url: '',
                        templateUrl: 'pages/users/users.list.html'
                    })

                    .state('users.detail', {
                        url: '/{userId:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'app/contacts/contacts.detail.html',
                                controller: ['$scope', '$stateParams', 'utils',
                                    function ($scope, $stateParams, utils) {
                                        $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                                    }]
                            },

                            'hint@': {
                                template: 'This is contacts.detail populating the "hint" ui-view'
                            }
                        }
                    })

                    .state('users.detail.edit', {
                        views: {
                            '@contacts.detail': {
                                templateUrl: 'app/contacts/contacts.detail.item.edit.html',
                                controller: ['$scope', '$stateParams', '$state', 'utils',
                                    function ($scope, $stateParams, $state, utils) {
                                        $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                                        $scope.done = function () {
                                            // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                                            $state.go('^', $stateParams);
                                        };
                                    }]
                            }
                        }
                    });
            }
        ]
    );