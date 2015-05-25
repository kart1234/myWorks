(function() {
    'use strict';

    angular
        .module('samsApp')
        .service('CarouselService', Service);

    Service.$inject = ['$http', '$q'];

    /* @ngInject */
    function Service($http, $q) {
        this.getProductCards = getProductCards;

        ////////////////
        

        function getProductCards() {
            // debugger;
            console.log('in get carouselData details - SERVICE');
             var deferred = $q.defer(),
                // change the callback function and watch what happens
                url = '/static/carouselData.json';

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