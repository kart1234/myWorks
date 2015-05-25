(function() {
    'use strict';

    angular
        .module('samsApp')
        .directive('carouselWithComponent', directive);

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
            templateUrl: 'static/common_components/carousel/carousel-template.html',    
            scope: {
                dataprd: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            console.log('in carouselComponent directive link function');
            console.log('attaching dom click events for carousel');
            element.find('.kcarousel-wrapper').pcarousel({});

        }

    }

    /* @ngInject */
    function Controller () {
        console.log('in carouselComponent directive controller function');
    }


})();