app.controller('InstructorCtrl', ["$scope","$state", "instructorService","areaService","suburbService" ,"DropDownSettings" ,function ($scope,$state, instructorService,areaService,suburbService,DropDownSettings) {
    var student = 
    $scope.Instructors = [];
    //$scope.Areas = [];
    //TODO:: Remove this code after service included
    $scope.Areas = [{
        areaCode:'E101',
        areaName:'Epping'
    },
    {
        areaCode:'E102',
        areaName:'Chatswood'
    }
    ];
    $scope.Suburbs=[ ];
    $scope.areaDropListsettings = DropDownSettings.Area;
    $scope.suburbDropListsettings = DropDownSettings.Suburb;
    $scope.areaTranslationTexts = {
        buttonDefaultText:'Select Area'
    }
    $scope.suburbTranslationTexts = {
        buttonDefaultText:'Select Suburbs'
    }
    $scope.SelectedAreas = [];
    $scope.SelectedSuburb = {
        suburbName:'',
        postalCode:''
    }
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
    suburbService.get().then(function(res){
        $scope.Suburbs = res.data;
    });
    
    // Show Form
    $scope.master = $scope.instructorModel;
    // Create  / Edit Instructor
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
                $scope.instructorModel.suburb = $scope.SelectedSuburb;
                if(!$scope.instructorModel.id) { // Create 
                    instructorService.post($scope.instructorModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                     
                        $scope.instructorModel = angular.copy($scope.master);
                        form.$setPristine(true);
                        areas = [];
                    });
                }
                else { // Update
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
            $scope.SelectedAreas = [];
            $scope.SelectedSuburb = {
                suburbName:'',
                postalCode:''
            };
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
     $scope.ChangeSuburb = function () {
        $scope.SelectedSuburb.postalCode = $scope.SuburbOptions;
        var _selectedSuburb = $.grep($scope.Suburbs, function (suburb) {
            return suburb.postalCode == $scope.SelectedSuburb.postalCode;
        });
        $scope.SelectedSuburb.suburbName = _selectedSuburb[0].suburbName;       
     }
    // Fill the Form on Edit Student Click

    // Delete Student
    $scope.removeRow = function ($event,instructorCode) {
       if(confirm("Are you sure, you want delete?")){
           instructorService.deleteInstructor(instructorCode).success(function (e) {
               angular.element($event.currentTarget).parents("tr:first").remove();
           });
       }
    };
    // Get Instructors
}]);