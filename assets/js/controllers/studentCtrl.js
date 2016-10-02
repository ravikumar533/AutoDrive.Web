/**
 * Created by ravik_000 on 03-09-2016.
 */
app.controller('StudentCtrl', ["$scope","$state", "studentService","instructorService","suburbService" ,"DropDownSettings", function ($scope,$state, studentService,instructorService,suburbService,DropDownSettings) {
    
    //Definition
    $scope.Students = [];

    $scope.Instructors = [];
    $scope.SelectedInstructor =[];
    $scope.instructorDropListsettings= DropDownSettings.Instructor;
    $scope.instructorTranslationTexts= DropDownSettings.Instructor_Translation_text;
    
    $scope.Suburbs = [];
    $scope.SelectedSuburb =[];
    $scope.suburbDropListsettings = DropDownSettings.Suburb;
    $scope.suburbTranslationTexts = DropDownSettings.Suburb_Translation_text;

// Call Route Functions
    GetInstructors();
    GetSuburbs();
    GetStudents();
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
                $scope.studentModel.suburbs = $scope.SelectedSuburb;
                if(!$scope.studentModel.id) {
                    studentService.post($scope.studentModel).success(function (e) {
                        //noinspection JSUnresolvedFunction                     
                        $scope.studentModel = angular.copy($scope.master);
                        form.$setPristine(true);                        
                    });
                }
                else {
                    studentService.put($scope.studentModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                        $scope.studentModel = angular.copy($scope.master);
                        $scope.SelectedInstructor = {};
                        $scope.SelectedSuburb ={};
                        form.$setPristine(true);
                    });
                }
            }

        },
        reset: function (form) {
            $scope.studentModel = angular.copy($scope.master);
            form.$setPristine(true);
        }
    };
    
    // Delete Student
    $scope.removeRow = function ($event,studentId) {
       if(confirm("Are you sure, you want delete?")){
           studentService.deleteStudent(studentId).success(function (e) {
               angular.element($event.currentTarget).parents("tr:first").remove();
           });
       }
    };
    // Edit Student
    $scope.editRow = function($event,studentId){
        var data = $scope.Students;
        angular.forEach(data,function(value,index){            
            if(value.id == studentId) {
                //var editRecord = value;
                $scope.instructorModel = value;
                $scope.SelectedInstructor = value.instructor;
                $scope.SelectedSuburb = {
                    PostalCode : value.suburb.postalCode,
                    SuburbName : value.suburb.suburbName
                }
            }
        });
    };
    // Service Calls
    function GetStudents(){
        studentService.get().success(function(res){
            $scope.Students = res;
        });
    }
    function GetInstructors(){// Get Instructors
        instructorService.get().success(function (res) {
            $scope.Instructors = res;
        });
    }
    
    function GetSuburbs(){ // Get Suburbs
        suburbService.get().then(function(res){
            $scope.Suburbs = res.data.slice(0,100);
        });
    }
}]);

