'use strict';

angular.module('boxing.matches', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .when('/match/:id', '/matches/:id')
                    .when('/matches/:id', '/matches/:id');


                $stateProvider
                    .state('matches', {
                        abstract: true,
                        url: '/matches',

                        templateUrl: 'pages/matches/matches.html',

                        resolve: {
                            matches: ['Match',
                                function (Match) {
                                    return Match.getMany();
                                }]
                        },

                        controller: ['$scope',
                            function ($scope) {
                                $scope.matches = [];
                            }]
                    })

                    .state('matches.list', {
                        url: '',
                        templateUrl: 'pages/matches/matches.list.html',
                        controller: ['$scope', '$state', 'Match',
                            function ($scope, $state, Match) {
                                var currentPage = 0;
                                $scope.filters = {
                                    skip: 0,
                                    take: 5,
                                    sort: 'date'
                                };
                                $scope.getMatches = function (filter) {
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
                                    $scope.matches = Match.getMany($scope.filters);
                                };

                                $scope.getMatches();
                            }]
                    })

                    .state('matches.detail', {
                        url: '/{id:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'pages/matches/details/matches.detail.html',
                                controller: ['$scope', '$stateParams', 'Match', '$state', 'Prediction',
                                    function ($scope, $stateParams, Match, $state, Prediction) {
                                        $scope.match = Match.getOne({
                                            id: $stateParams.id
                                        });

                                        $scope.removeMatch = function () {
                                            Match.delete({id: $stateParams.id}, successDelete);

                                            function successDelete(response) {
                                                $state.go('matches.list');
                                            }
                                        };

                                        $scope.addPrediction = function () {
                                            Prediction.create({
                                                    matchId: $stateParams.id
                                                },
                                                $.param({winner: $scope.match.CurrentPrediction.Winner}),
                                                successPredictionUpdate
                                            )
                                            ;

                                            function successPredictionUpdate() {

                                            }
                                        };

                                        $scope.editPrediction = function () {
                                            Prediction.update({
                                                    matchId: $stateParams.id,
                                                    predictionId: $scope.match.CurrentPrediction.Id
                                                },
                                                $.param({winner: $scope.match.CurrentPrediction.Winner}),
                                                successPredictionUpdate
                                            );

                                            function successPredictionUpdate() {

                                            }
                                        };

                                        $scope.deletePrediction = function () {
                                            Prediction.delete({
                                                matchId: $stateParams.id,
                                                predictionId: $scope.match.CurrentPrediction.Id
                                            }, successPredictionDelete);

                                            function successPredictionDelete(response) {

                                            }
                                        };
                                    }
                                ]
                            }
                        }
                    })

                    .state('matches.edit', {
                        url: '/{id:[0-9]{1,4}}',

                        views: {
                            '': {
                                templateUrl: 'pages/matches/details/matches.edit.html',
                                controller: ['$scope', '$stateParams', '$state', 'Match',
                                    function ($scope, $stateParams, $state, Match) {
                                        $scope.match = Match.getOne({
                                            id: $stateParams.id
                                        });

                                        $scope.save = function () {
                                            Match.update({
                                                    id: $stateParams.id
                                                },
                                                successUpdate
                                            );

                                            function successUpdate() {
                                                $state.go("matches.detail", {id: $stateParams.id});
                                            }
                                        };
                                    }
                                ]
                            }
                        }
                    })

                    .state('matches.add', {
                        url: '',

                        views: {
                            '': {
                                templateUrl: 'pages/matches/details/matches.add.html',
                                controller: ['$scope', '$stateParams', '$state', 'Match',
                                    function ($scope, $stateParams, $state, Match) {
                                        $scope.match = {};

                                        $scope.add = function () {
                                            Match.create({},
                                                $.param($scope.match),
                                                successCreate
                                            );

                                            function successCreate(res) {
                                                $state.go("matches.detail", {id: res.Id});
                                            }
                                        };
                                    }
                                ]
                            }
                        }
                    });
            }
        ]
    );