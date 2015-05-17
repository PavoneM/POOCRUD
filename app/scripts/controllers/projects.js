angular.module('pooIhmExemplesApp')
  .controller('ProjectCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {

    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/')
      .success(function(data) {
        if (data.status == "success") {
          $scope.users = data.data;

          if($routeParams.userId) {
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+$routeParams.userId+'/Roles/')
              .success(function(data) {
                $scope.projectForUser = [];
                if (data.status == "success") {
                  $scope.rolesForUser = data.data;
                  angular.forEach($scope.rolesForUser, function(theRole){
                    angular.forEach($scope.projects, function(theProject){
                      if(theRole.ProjectId == theProject.id){
                        var entry={};
                        entry.id=theProject.id;
                        entry.title = theProject.title;
                        entry.role = theRole.name;
                        entry.description = theProject.description;
                        $scope.projectForUser.push(entry);
                      }
                    });
                  });
                }

                $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + $routeParams.userId)
                  .success(function(data) {
                    if (data.status == "success") {
                      $scope.currentUser = data.data;
                    }
                  });
              });
          }
        }
      });


    $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects')
      .success(function(data) {
        if (data.status == "success") {
          $scope.projects = data.data;

          if($routeParams.projectId) {
            $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+$routeParams.projectId+'/Roles/')
              .success(function(data) {
                $scope.usersForProject = [];
                if (data.status == "success") {
                  $scope.rolesForProject = data.data;
                  angular.forEach($scope.rolesForProject, function(theRole){
                    angular.forEach($scope.users, function(theUser){
                      if(theRole.UserId == theUser.id){
                        var entry={};
                        entry.id = theUser.id;
                        entry.name = theUser.name;
                        entry.surname = theUser.surname;
                        entry.role = theRole.name;
                        $scope.usersForProject.push(entry);

                      }
                    });
                  });
                }
                $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + $routeParams.projectId)
                  .success(function(data) {
                    if (data.status == "success") {
                      $scope.currentProject = data.data;
                    }
                  });
              });
          }
        }
      });

    $scope.editProject = function(index){
      var project={};
      project.title = document.getElementById("title "+index).value;
      project.year = document.getElementById("year "+index).value;
      project.description = document.getElementById("description "+index).value;
      $http.put("http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+index, project)
        .success(function(response) {
        });
    }

    $scope.deleteProject = function(index){
      $http.delete(" http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+index).success(function(response) {
        var row = document.getElementById("row "+index);
        row.parentNode.removeChild(row);
      });
    }

    $scope.deleteUserFromProject = function(projId, userId){
      $http.delete(" http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+projId+"/Users/"+userId).success(function(response) {
        console.log(userId)
        var row = document.getElementById("row "+projId);
        row.parentNode.removeChild(row);
      });
    }

    $scope.deleteProjectFromUser = function(projId, userId){
      $http.delete(" http://poo-ihm-2015-rest.herokuapp.com/api/Projects/"+projId+"/Users/"+userId).success(function(response) {
        console.log(userId)
        var row = document.getElementById("row "+userId);
        row.parentNode.removeChild(row);
      });
    }

    $scope.changeView = function(view){
      console.log($routeParams);
      $location.path(view); // path not hash
    }
  }])
