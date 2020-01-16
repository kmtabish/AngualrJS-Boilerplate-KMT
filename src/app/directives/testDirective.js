'use strict';
(function (angular) {
  angular
    .module('myApp')
    .directive('testDir',['$rootScope', function ($q, $parse, $rootScope) {
      return {
        restrict: 'E',
        scope: {
          title: '=',
          showsearch : '=',
          showloader : '='
        },/* ng-class="(getMobileOs() == \'iOS\')?\'back-header-iphone\':\'\' "*/
        template: '<div><span>{{title}}<span> -- <span>{{test}}</span></div>',
        link: function postLink(scope, element,attrs) {
          console.log(scope, attrs)
          //scope.$watch(attrs.goBackDir, function(value) {
          //  console.log(value);
          //});
            scope.test = "This is test Directive inner scope"
        }

      };
    }]);
})(window.angular)