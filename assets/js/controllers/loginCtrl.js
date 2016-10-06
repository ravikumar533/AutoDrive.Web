'use strict';
 
/* Controllers */
 
app.controller('loginCtrl', ['$scope', '$location', '$localStorage', 'areaService', function($scope, $location, $localStorage, areaService) {
    $scope.form = {
        submit : function(form)
        {
            debugger;
        }
    }
        $scope.signin = function() {
            debugger;
            alert("asdasdsa");
            var formData = {
                username: $scope.email,
                password: $scope.password,
                grant_type:'password'
            }
            $scope.test = "testing";
            areaService.signin(formData, function(res) {
               alert("test");
                if (res.type == false) {
                    alert(res.data)    
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/";    
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };
 
        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }
 
            areaService.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/"   
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };
 
        $scope.me = function() {
            areaService.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };
 
        $scope.logout = function() {
            areaService.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])