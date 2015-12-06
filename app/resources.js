var url = "http://localhost:49365/api/";

BoxingApp.factory("Login", function ($resource) {


        return $resource(url + "logins/:id", {id: "@_id"},
            {
                'create': {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                'delete': {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    }
                }
            }
        );
    })


    .factory("User", function ($resource) {
        return $resource(url + "users/:id", {id: "@_id"},
            {
                'create': {method: 'POST'},
                'getMany': {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Auth-Token': localStorage.getItem("authToken")
                    },
                    isArray: true
                },
                'getOne': {method: 'GET', isArray: false},
                'update': {method: 'PUT'},
                'delete': {method: 'DELETE'}
            }
        );
    })


    .factory("Match", function ($resource) {
        return $resource(url + "matches/:id", {id: "@_id"},
            {
                'create': {method: 'POST'},
                'getMany': {method: 'GET', isArray: true},
                'getOne': {method: 'GET', isArray: false},
                'update': {method: 'PUT'},
                'delete': {method: 'DELETE'}
            }
        );
    })


    .factory("Prediction", function ($resource) {
        return $resource(url + "matches/:matchId/predictions/:predictionId", {
                matchId: "@matchId",
                predictionId: "@predictionId"
            },
            {
                'create': {method: 'POST'},
                'getMany': {method: 'GET', isArray: true},
                'getOne': {method: 'GET', isArray: false},
                'update': {method: 'PUT'},
                'delete': {method: 'DELETE'}
            }
        );
    });