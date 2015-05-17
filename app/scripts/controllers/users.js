'use strict';

/**
 * @ngdoc function
 * @name pooIhmExemplesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pooIhmExemplesApp
 */
angular.module('pooIhmExemplesApp')
  .controller('UsersCtrl', ['$scope', '$http', '$routeParams','$location', function ($scope, $http, $routeParams, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;
      });

    if($routeParams.userId) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
      .success(function(data) {
        if (data.status == "success") {
          $scope.currentUser = data.data;
        }
      });
    }

    $scope.editUser = function(index){
      var user={};
      user.name = document.getElementById("name "+index).value;
      user.surname = document.getElementById("surname "+index).value;
      $http.put("http://poo-ihm-2015-rest.herokuapp.com/api/Users/"+index, user)
        .success(function(response) {
        });
    }

    $scope.deleteUser = function(index){
      $http.delete(" http://poo-ihm-2015-rest.herokuapp.com/api/Users/"+index).success(function(response) {
        var row = document.getElementById("row "+index);
        row.parentNode.removeChild(row);
      });
    }

    $scope.changeView = function(view){
      console.log($routeParams);
      $location.path(view); // path not hash
    }

  }]);
