(function() {
    'use strict';

    angular
        .module('samsApp')
        .directive('carouselComponent', directive);

  //  directive.$inject = ['dependencies'];

    /* @ngInject */
    function directive () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
        //   template: templateLoader,//'static/common_components/minicart/minicart-template.html',
    //        compile: function compile(tElement, tAttrs, transclude) {
    //   return {
    //     pre: function preLink(scope, iElement, iAttrs, controller) { debugger;},
    //     post: function postLink(scope, iElement, iAttrs, controller) { debugger; }
    //   }
    //   // or
    //   // return function postLink( ... ) { ... }
    // },
  //  replace: false,
            scope: {
            }
        };
        return directive;

        // function templateLoader(a,b){
        //     debugger;
        //     console.log('in template loader');
        // }



        function link(scope, element, attrs) {
            console.log('in carouselComponent directive link function');
            console.log('attaching dom click events for carousel');

            debugger;

          //  element.on('click', '.scroll-Left', movePrev);
            //element.on('click', '.scroll-Right', moveRight);
            element.find('.pcarousel-wrapper').pcarousel({});
             // $('.scroll-Left').on('click.pcarousel', movePrev);
             //    $('.scroll-Right').on('click.pCarousel', moveRight);
             //    $(document).on('swipeleft', moveRight);
             //    $(document).on("swiperight", movePrev);
        }

        function movePrev(){
            console.log('move prev' );
        }


    }

    /* @ngInject */
    function Controller () {
        console.log('in carouselComponent directive controller function');
    }


})();