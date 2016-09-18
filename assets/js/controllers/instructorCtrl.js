app.controller('InstructorCtrl', ["$scope","$state", "instructorService","SweetAlert",  function ($scope,$state, instructorService,SweetAlert) {
    var student = 
    $scope.Instructors = [];
   
    instructorService.get().success(function (res) {
        $scope.Instructors = res;
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
                SweetAlert.swal("The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!", "error");
                return;

            } else {
                SweetAlert.swal("Good job!", "Your form is ready to be submitted!", "success");
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