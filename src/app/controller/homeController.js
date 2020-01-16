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
    .controller('HomeController', ['$scope', 'homeService', function($scope, homeService){
      var HomeCtrl = this;
      HomeCtrl.isLoading = true;
      homeService.getCurrency('test').then(function(data){
        console.log("Home Controller", HomeCtrl, data);
        HomeCtrl.data = data.data.data;
        HomeCtrl.isLoading = false;
      })
      HomeCtrl.testMsg = "This is Home Controller";
      $scope.isCollapsed = false;
    }]);
})();
