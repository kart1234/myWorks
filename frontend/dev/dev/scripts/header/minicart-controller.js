(function() {
    'use strict';

    angular
        .module('samsApp')
        .controller('MinicartController', Controller);

    Controller.$inject = ['MinicartFactory'];

    /* @ngInject */
    function Controller(MinicartFactory) {
        var vm = this;
        vm.title = 'Controller';
        vm.cartFactory = MinicartFactory;
        vm.toggleCart = toggleCart;
        activate();

        ////////////////

        function activate() {
        	console.log('calling.. mini car controller activate method');
        	MinicartFactory.getCartDetails();
        	console.log('after getting data: '+MinicartFactory.items);
        }

        function toggleCart(){
        	console.log('in togglecart function');
        	MinicartFactory.items.displayCart = !MinicartFactory.items.displayCart;
        }
    }
})();