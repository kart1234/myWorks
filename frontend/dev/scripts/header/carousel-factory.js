(function() {
    'use strict';

    angular
        .module('samsApp')
        .factory('carouselFactory', factory);

    factory.$inject = ['CarouselService'];

    /* @ngInject */
    function factory(CarouselService) {
        var _busy = false, items = {products:[],displayCart:false};
        var service = {
            getProductCards: getProductCards,
            items: items
        };
        return service;

        ////////////////

        function getProductCards() {


        // only one call at a time
        if (_busy) {
            return;
        }

        _busy = true;

        CarouselService.getProductCards()
            .then(function (data) {
                // match the response json structure
                var results = data.data;
                console.log(results);

                // items.cartlength = results.length-1;
                // items.savingsTotal = results[0].payload.orderDetails.savingsTotalAmount;
                // items.orderTotal = results[0].payload.orderDetails.orderTotal;
                // items.easyOrderAvailable = results[0].payload.easyOrderAvailable;

                angular.forEach(results, function(item) {
                    // add on to existing items, rather than replace them
                    //debugger;
                    items.products.push(item.payload.orderItems[0]);
                    // if(item.payload.orderItems){
                    //     if (item.payload.orderItems[0].deliveryMethod == "SHIP") {
                    //         items.shipProducts.push(item.payload.orderItems[0]);
                    //      }
                    //     if (item.payload.orderItems[0].deliveryMethod == "PICKUP") {
                    //         items.pickProducts.push(item.payload.orderItems[0]);
                    //     }
                    // }

                });
               // items.shipProductsCount = items.shipProducts.length;
                //items.pickProductsCount = items.pickProducts.length;
                // set after param to equal id of last item returned
                //after = 't3_' + items[items.length - 1].id;
                _busy = false;
              //  return items;
               // _isCompleted = true;
            }, function (error) {
               // _hasError = true;
            });









        }
    }
})();