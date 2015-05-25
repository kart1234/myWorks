(function() {
    'use strict';

    angular
        .module('samsApp')
        .directive('miniCartHeader', directive);

   // directive.$inject = ['dependencies'];

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
            templateUrl: 'static/common_components/minicart/minicart-template.html',
            restrict: 'E',
            scope: {
            	kart: '=',
            	togFun: '&'
            }
        };
        return directive;

        function link(scope, element, attrs) {
        	console.log('in minicart directive link');
        }
    }

    /* @ngInject */
    function Controller () {
    	console.log('in minicart directive controller');
    }
})();