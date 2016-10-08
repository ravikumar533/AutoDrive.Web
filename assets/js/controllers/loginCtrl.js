
app.controller('loginCtrl', ["$scope","$state",'$localStorage','$location',"loginService",function ($scope,$state,$localStorage,$location, loginService) {


$scope.master = $scope.loginModel;    
    $scope.form = {
        submit: function (form) {    
            // Form Submit            
            var firstError = null;
            if (form.$invalid) {

                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }
                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                return;

            } else {
                // Form Submition             
             var formData = {
                username: $scope.loginModel.email,
                password: $scope.loginModel.password                
            }
           /* $location.path('/app/dashboard'); 
            $localStorage.user = {
                username : 'LoggedInUser',
                instructorId:'INS1001',
                role:'admin'
            };*/
            loginService.signin(formData, function(res) {                
                if (res.type == false) {                    
                    alert(res.data)    
                } else {                    
                    $localStorage.token = res.access_token;
                      
                    loginService.userDetails(formData,function(result){
                        
                        $localStorage.user = result; 
                        
                    },function(error){

                    });
                    
                    $location.path('/app/dashboard');                   
                }
            }, function(error) {                
                $scope.error = error;
            })
            }

        },
        reset: function (form) {           
            $scope.loginModel = null;
            $scope.loginModel = angular.copy($scope.master); // Reset Form           
            form.$setPristine(true);
        }
    };
}]);

