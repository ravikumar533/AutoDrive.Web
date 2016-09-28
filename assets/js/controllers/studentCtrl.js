/**
 * Created by ravik_000 on 03-09-2016.
 */
app.controller('StudentCtrl', ["$scope","$state", "studentService", function ($scope,$state, studentService) {
    var student = 
    $scope.Students = [];
   
    studentService.get().success(function (res) {
        $scope.Students = res;
    });
    $scope.Suburbs=[
        {
            suburbName:'suburbName 1',
            postalCode:'1000'
        },
        {
            suburbName:'suburbName 2',
            postalCode:'1001'
        }
    ];
    $scope.Instructors=[
        {
            InstructorCode:'IN101',
            InstructorName:'Instructor1'
        },
        {
            InstructorCode:'IN102',
            InstructorName:'Instructor2'
        }
    ];
     $scope.SelectedSuburb = {
        suburbName:'',
        postalCode:''
    }
     $scope.SelectedInstructor = {
        InstructorCode:'',
        InstructorName:''
    }
    // Show Form
    $scope.master = $scope.studentModel;
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
                $scope.studentModel.instructor = $scope.SelectedInstructor;
                $scope.studentModel.suburb = $scope.SelectedSuburb;
                if(!$scope.studentModel.id) {
                    studentService.post($scope.studentModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                     
                        $scope.studentModel = angular.copy($scope.master);
                        form.$setPristine(true);
                        areas = [];
                    });
                }
                else {
                    studentService.put($scope.studentModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                        $scope.studentModel = angular.copy($scope.master);
                        form.$setPristine(true);
                    });
                }
            }

        },
        reset: function (form) {

            $scope.studentModel = angular.copy($scope.master);
            $scope.SelectedInstructor = {
                InstructorCode:'',
                InstructorName:''
            };
            $scope.SelectedSuburb = {
                    suburbName:'',
                    postalCode:''
            };
            form.$setPristine(true);
        }
    };
     $scope.ChangeSuburb = function () {
        $scope.SelectedSuburb.postalCode = $scope.SuburbOptions;
        var _selectedSuburb = $.grep($scope.Suburbs, function (suburb) {
            return suburb.postalCode == $scope.SelectedSuburb.postalCode;
        });
        $scope.SelectedSuburb.suburbName = _selectedSuburb[0].suburbName;       
     }
      $scope.ChangeInstructor = function () {
        $scope.SelectedInstructor.InstructorCode = $scope.InstructorOption;
        /*var _selectedSuburb = $.grep($scope.Suburbs, function (suburb) {
            return suburb.postalCode == $scope.SelectedSuburb.postalCode;
        });*/
        //$scope.SelectedInstructor.InstructorName = _selectedSuburb[0].suburbName;       
     }
    // Edit Student

    // Delete Student

}]);

