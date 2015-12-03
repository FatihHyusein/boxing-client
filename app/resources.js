BoxingApp.factory("Login", function ($resource) {
        return $resource("/api/contacts/:id", {id: "@_id"},
            {
                'create': {
                    method: 'POST',
                    responseType: 'json'
                },
                'delete': {method: 'DELETE'}
            }
        );
    })


    .factory("User", function ($resource) {
        return $resource("/api/users/:id", {id: "@_id"},
            {
                'create': {method: 'POST'},
                'getMany': {method: 'GET', isArray: true},
                'getOne': {method: 'GET', isArray: false},
                'update': {method: 'PUT'},
                'delete': {method: 'DELETE'}
            }
        );
    })


    .factory("Match", function ($resource) {
        return $resource("/api/matches/:id", {id: "@_id"},
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
        return $resource("/api/matches/:matchId/predictions/:predictionId", {
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