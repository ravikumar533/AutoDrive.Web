app.controller('InstructorCtrl', ["$scope","$state", "instructorService","areaService",  function ($scope,$state, instructorService,areaService) {
    var student = 
    $scope.Instructors = [];
    $scope.Areas = [];
    $scope.SelectedArea = {
        areaCode: '',
        name:''
    };

    GetInstructors();
    GetAreas();
    function GetInstructors(){
        instructorService.get().success(function (res) {
            $scope.Instructors = res;
        });
    }
    function GetAreas(){
        areaService.get().success(function(res){
            $scope.Areas = res;
        });
    }
    instructorService.getSuburbs();
    instructorService.getInstructorCode().success(function(res){
        $scope.instructorModel.instructorCode = res;
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
                var areas = [];
                areas.push($scope.SelectedArea);
                $scope.instructorModel.areas = areas;
                if(!$scope.instructorModel.id) {
                    instructorService.post($scope.instructorModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                     
                        $scope.instructorModel = angular.copy($scope.master);
                        form.$setPristine(true);
                        areas = [];
                    });
                }
                else {
                    instructorService.put($scope.instructorModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                        $scope.instructorModel = angular.copy($scope.master);
                        form.$setPristine(true);
                    });
                }
            }

        },
        reset: function (form) {

            $scope.instructorModel = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };
     $scope.GetValue = function () {
        $scope.SelectedArea.areaCode = $scope.AreaOptions;
        var _selectedArea = $.grep($scope.Areas, function (area) {
            return area.areaCode == $scope.SelectedArea.areaCode;
        });
        $scope.SelectedArea.name = _selectedArea[0].name;       
     }
    // Edit Student

    // Delete Student
    // Get Instructors
}]);