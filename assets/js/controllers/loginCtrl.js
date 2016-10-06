app.controller('loginCtrl', ["$scope","$state","loginService",function ($scope,$state, loginService) {


$scope.master = $scope.loginModel;    
    $scope.form = {
        submit: function (form) {    // Form Submit 
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
             
            }

        },
        reset: function (form) {           
            $scope.loginModel = null;
            $scope.loginModel = angular.copy($scope.master); // Reset Form           
            form.$setPristine(true);
        }
    };
}]);