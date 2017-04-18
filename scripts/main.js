(function(){
  'use strict';
  angular
    .module('app', ['ngDialog', 'ngclipboard'])
    .directive('webShare', ['$location', function($location) {
      return {
        restrict: 'A',
        scope: true,
        controllerAs: '$webShareCtrl',
        controller: ['$element', function($element) {
          var self = this;
          self.isSupported = $location.protocol() === 'https' && navigator.share;
          self.share = function() {
            navigator.share({
              text: $element.attr('data-text'),
              url: $element.attr('data-url')
            });
          };
        }]
      };
    }]);
}());
