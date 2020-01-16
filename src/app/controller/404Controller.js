/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
(function() {
  angular
    .module('myApp')
    .controller('404Controller', ['$scope', function($scope){
      var FourO4Ctrl = this;
      FourO4Ctrl.testMsg = "This is 404 Controller";
      console.log("404 Controller", FourO4Ctrl)
    }]);
})();
