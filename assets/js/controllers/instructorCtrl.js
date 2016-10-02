app.controller('InstructorCtrl', ["$scope","$state", "instructorService","areaService","suburbService" ,"DropDownSettings" ,function ($scope,$state, instructorService,areaService,suburbService,DropDownSettings) {
    //Definitions 
    $scope.Instructors = [];
    $scope.Areas = [];
    $scope.SelectedAreas = []; // Selected Area Model
    $scope.Suburbs = [];
    $scope.SelectedSuburbs = [];
    //$scope.Areas = [];
    //TODO:: Remove this code after service included

    // Area Drop Down    
    $scope.areaDropListsettings = DropDownSettings.Area;
    $scope.areaTranslationTexts = DropDownSettings.Area_Translation_text;

    // Suburbs DropDown
    $scope.suburbDropListsettings = DropDownSettings.Suburb;    
    $scope.suburbTranslationTexts = DropDownSettings.Suburb_Translation_text;
    
    // Loadin Instructors , Areas and Suburbs; calling Functions
    GetInstructors();
    GetAreas();
    GetSuburbs();
    GetInstructorCode();
    // Create  / Edit Instructor
    $scope.master = $scope.instructorModel;    
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
               $scope.instructorModel.suburb = $scope.SelectedSuburbs;
               $scope.instructorModel.areas = $scope.SelectedAreas;
               if(!$scope.instructorModel.id) { // Create 
                    instructorService.post($scope.instructorModel).success(function (e) {
                        $scope.instructorModel = angular.copy($scope.master); // Reset Form
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
            // Reset model
            $scope.instructorModel ={};
            $scope.instructorModel= angular.copy($scope.master);  
            $scope.SelectedAreas = [];
            $scope.SelectedSuburbs = [];         
            form.$setPristine(true);
            $scope.form.$setValidity();
        }
    };
    // Delete Instructor
    $scope.removeRow = function ($event,instructorId) {
       if(confirm("Are you sure, you want delete?")){
           instructorService.deleteInstructor(instructorId).success(function (e) {
               angular.element($event.currentTarget).parents("tr:first").remove();
           });
       }
    };
    //Edit Instructor
    $scope.editRow = function($event,instructorId){
        var data = $scope.Instructors;
        angular.forEach(data,function(value,index){            
            if(value.id == instructorId) {
                //var editRecord = value;
                $scope.instructorModel = value;
                $scope.SelectedAreas = value.areas;
                $scope.SelectedSuburbs = {
                    PostalCode : value.suburb.postalCode,
                    SuburbName : value.suburb.suburbName
                }
            }
        });
    };
    // Service Calls
    function GetInstructors(){// Get Instructors
        instructorService.get().success(function (res) {
            $scope.Instructors = res;
        });
    }
    function GetAreas(){ // Get Areas
        areaService.get().success(function(res){
            $scope.Areas = res;
        });
    }
    function GetSuburbs(){ // Get Suburbs
        suburbService.get().then(function(res){
            $scope.Suburbs = res.data.slice(0,100);
        });
    }
    function GetInstructorCode(){ // Get Suburbs
        instructorService.getInstructorCode().then(function(res){
           console.log(res);
        });
    }
}]);