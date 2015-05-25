(function() {
    'use strict';

    angular
        .module('samsApp')
        .controller('CarouselController', Controller);

    Controller.$inject = ['carouselFactory'];

    /* @ngInject */
    function Controller(carouselFactory) {
        var vm = this;
        vm.title = 'Controller';
        vm.caroFactory = carouselFactory;
        vm.toggleCarouselModule = toggleCarouselModule;
        activate();

        ////////////////

        function activate() {
            console.log('calling.. carousel controller activate method');
            carouselFactory.getProductCards();
            console.log('after getting data: '+ carouselFactory.items);
        }

        function toggleCarouselModule(){
            console.log('in toggleCarouselModule function');
            carouselFactory.items.displayCart = !carouselFactory.items.displayCart;
        }
    }
})();