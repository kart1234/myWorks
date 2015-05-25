(function() {
    'use strict';

    angular
        .module('samsApp')
        .factory('MinicartFactory', factory);

  	factory.$inject = ['MinicartService'];

    /* @ngInject */
    function factory(MinicartService) {
       var _busy = false, items = {shipProducts:[], pickProducts:[],displayCart:false};
        var service = {
            getCartDetails: getCartDetails,
            items: items
           
        };
        
        return service;

        ////////////////

        function getCartDetails() {
        // only one call at a time
        if (_busy) {
            return;
        }

        _busy = true;

        MinicartService.getCartDetails()
            .then(function (data) {
                // match the response json structure
                var results = data.data;
                console.log(results);

                items.cartlength = results.length-1;
                items.savingsTotal = results[0].payload.orderDetails.savingsTotalAmount;
                items.orderTotal = results[0].payload.orderDetails.orderTotal;
                items.easyOrderAvailable = results[0].payload.easyOrderAvailable;

                angular.forEach(results, function(item) {
                    // add on to existing items, rather than replace them
                    if(item.payload.orderItems){
                    	if (item.payload.orderItems[0].deliveryMethod == "SHIP") {
          					items.shipProducts.push(item.payload.orderItems[0]);
       					 }
				        if (item.payload.orderItems[0].deliveryMethod == "PICKUP") {
				            items.pickProducts.push(item.payload.orderItems[0]);
				        }
				    }

                });
                items.shipProductsCount = items.shipProducts.length;
                items.pickProductsCount = items.pickProducts.length;
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