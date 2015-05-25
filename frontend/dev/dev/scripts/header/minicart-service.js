(function() {
    'use strict';

    angular
        .module('samsApp')
        .service('MinicartService', Service);

    Service.$inject = ['$http', '$q'];

    /* @ngInject */
    function Service($http, $q) {
        this.getCartDetails = getCartDetails;

        ////////////////
        

        function getCartDetails() {
        	// debugger;
        	console.log('in get cart details - SERVICE');
        	 var deferred = $q.defer(),
                // change the callback function and watch what happens
                url = '/static/dummyCartJson.json';

            $http.get(url)
                .success(function (results) {
                    var data = results || [];
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
})();