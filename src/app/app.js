  angular.module('myApp', ['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controllerAs: 'HomeCtrl',
          controller: 'HomeController'
        })
        .when('/404', {
          templateUrl: 'views/404.html',
          controllerAs: 'FourO4Ctrl',
          controller: '404Controller'
        })
        .otherwise('/404');
        if(window.history && window.history.pushState){
          $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
          });
        }
    }])
