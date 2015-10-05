---
layout: post
date: 2015-09-27 00:00
title: don't forget $digest in angular directive unit test
tags: [javascript, angularjs]
slug: donot-forget-digest-in-angular-directive-unit-test
---

## Outline

for data binding, `scope.$digest()` is needed in angular directive unit test

## code

### directive

{% highlight js %}
(function() {
  'use strict';

  angular
    .module('Testapp', [])
    .directive('supert-button', superButton);

  function supertButton() {
    var directive = {
      link: link,
      restrict: 'E',
      replace: true,
      scope: {
        text: '='
      },
      template: [
        '<div class="alert-button">', 
          '<button ng-bind="text"></button>', 
        '</div>'
      ].join('')
    };
    function link(scope, element) {}
    return directive;
  }
})();
{% endhighlight %}

### unit test

{% highlight js %}
(function() {

  'use strict';

  describe('superButton', function(){

    var element, scope;
    beforeEach(module('Testapp'));
    beforeEach(inject(function ($rootScope) {
      scope = $rootScope.$new();
    }));

    describe('check text', function(){
      beforeEach(inject(function($compile){
        element = angular.element('<super-button text="I\'m super man"></super-button>');
        element = $compile(element)(scope);
        scope.$digest(); // you must need to call $digest() to bind text attribute into directive.
      }));
      afterEach(function() {
        element.remove();
        element = null;
      });
      it('test data binding', function(){
        expect(element.innerText).to.eql('I\'m super man')
      });
    });

  });

})();
{% endhighlight %}

