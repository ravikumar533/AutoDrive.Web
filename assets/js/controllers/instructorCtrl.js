app.controller('InstructorCtrl', ["$scope","$state","ngTableParams", "instructorService","areaService","suburbService" ,"DropDownSettings" ,function ($scope,$state,ngTableParams, instructorService,areaService,suburbService,DropDownSettings) {
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

    // Date Options
    $scope.datepickerOptions = {
    
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
    };

    
    // Loadin Instructors , Areas and Suburbs; calling Functions
    GetInstructors();
    GetAreas();
    GetSuburbs();    
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
               $scope.instructorModel.suburb = 
               {
                   postalCode :$scope.SelectedSuburbs.PostCode,
                   suburbName : $scope.SelectedSuburbs.Display
               };
               $scope.instructorModel.areas = $scope.SelectedAreas;
               if(!$scope.instructorModel.id) { // Create 
                    instructorService.post($scope.instructorModel).success(function (e) {
                       $scope.form.reset(form);
                       ResetForm();
                       
                    });
                }
                else { // Update
                    instructorService.put($scope.instructorModel).success(function (e) {
                        //noinspection JSUnresolvedFunction                      
                       $scope.form.reset(form);
                        ResetForm();
                      
                    });
                }
            }

        },
        reset: function (form) {
            // Reset model
            angular.element("#InstructorsList").find("tr.success").removeClass("success");
            $scope.instructorModel ={};
            $scope.instructorModel = angular.copy($scope.master); // Reset Form                       
            $scope.SelectedSuburbs = [];
            $scope.SelectedAreas=[];
            //form.$setValidity();
            form.$setPristine(true);
            
            
      
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
        angular.element("#InstructorsList").find("tr.success").removeClass("success");
        angular.element($event.currentTarget).parents("tr:first").addClass('success'); // Add Color to select element
        angular.forEach(data,function(value,index){            
            if(value.id == instructorId) {
                //var editRecord = value;
                $scope.instructorModel = value;
                $scope.SelectedAreas = value.areas;
                $scope.SelectedSuburbs = {
                    PostCode : value.suburb.postalCode,
                    Display : value.suburb.suburbName
                }
            }
        });
    };
    // Service Calls
    function GetInstructors(){// Get Instructors
        instructorService.get().success(function (res) {
            $scope.Instructors = res;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 5 // count per page
            }, {
                total: $scope.Instructors.length, // length of data
                getData: function ($defer, params) {
                    $defer.resolve($scope.Instructors.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
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
    // Reset Form
    function ResetForm(){
     //   $scope.instructorModel.dOB = '';
            GetInstructors();
        
    }
}]);