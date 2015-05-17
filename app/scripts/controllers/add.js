angular.module('pooIhmExemplesApp')
  .controller('AddCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users')
      .success(function(data) {
        $scope.users = data.data;
      });

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        $scope.projects = data.data;
      });

    $scope.createUser = function(){
      var user = {};
      user.name = document.getElementById("name").value;
      user.surname = document.getElementById("surname").value;
      $http.post(" http://poo-ihm-2015-rest.herokuapp.com/api/Users/", user).success(function(response) {
        window.location.reload();
      });
    }

    $scope.createProject = function(){
      var project = {};
      project.title = document.getElementById("title").value;
      project.description = document.getElementById("description").value;
      project.year = document.getElementById("year").value;
      $http.post(" http://poo-ihm-2015-rest.herokuapp.com/api/Projects/", project).success(function(response) {
        window.location.reload();
      });
    }

    $scope.addUserToProject = function(){
      var role = {};
      role.UserId = document.getElementById("userTo").value;
      role.ProjectId = document.getElementById("projectTo").value;
      role.name = document.getElementById("roleTo").value;
      console.log(role.name)
      $http.post(" http://poo-ihm-2015-rest.herokuapp.com/api/Roles", role).success(function(response) {
        window.location.reload();
      });
    }

  }]);
