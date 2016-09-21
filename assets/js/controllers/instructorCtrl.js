app.controller('InstructorCtrl', ["$scope","$state", "instructorService","areaService",  function ($scope,$state, instructorService,areaService) {
    var student = 
    $scope.Instructors = [];
    $scope.Areas = [];
   
    instructorService.get().success(function (res) {
        $scope.Instructors = res;
    });
    areaService.get().success(function(res){
        $scope.Areas = res;
    });

    // Show Form
    $scope.master = $scope.instructorModel;
    // Create Student
    $scope.form = {

        submit: function (form) {
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
                //your code for submit
            }

        },
        reset: function (form) {

            $scope.instructorModel = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };
    // Edit Student

    // Delete Student

}]);