'use strict';

(function (angular) {
  angular.module('myApp').factory('homeService', ['$http', '$q', 'CONSTANTS', function ($http, $q, CONSTANTS) {
      return {
      getCurrency: function (userToken) {
          var deferred = $q.defer();
          var xurl = `${CONSTANTS.API_URL}api/v0/currency/get`
          var configObj = {
            method: 'GET',
            url: xurl
          };
          $http(configObj)
            .then(function onFulfilled(response) {
              console.log(response);
              return deferred.resolve(response)
            }).catch(function onRejection(errorResponse) {
              console.log("Error: ", errorResponse.status);
              console.log(errorResponse);
              return deferred.reject(errorResponse);
            })
          return deferred.promise;
        },
        updateSettings: function (setting) {
          var deferred = $q.defer();
          var configObj = {
            method: 'POST',
            url: url +"auth/user/settings",
            data:setting
          };
          $http(configObj).then(function fullfilled(response){
            return deferred.resolve(response);
          }).catch(function rejection(error){
            return deferred.reject(error);
          });
          return deferred.promise;
        },
      }
  }])
})(window.angular)
