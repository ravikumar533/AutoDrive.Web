/**
 * Created by ravik_000 on 03-09-2016.
 */
app.controller('StudentCtrl', ["$scope", "studentService", function ($scope, studentService) {
    var student = 
    $scope.Students = [];

    //noinspection JSUnresolvedFunction
    $scope.student = {
        id:'',
        fullName:'',
        studentCode:'',
        email: '',
        gender:'',
        dob:'',
        mobile:'',
        pickupLocation:'',
        licenseNumber:'',
        licenseState:'',
        licenseCountry:'',
        licenseExpiryon:'',
        status:''
    };

    studentService.get().success(function (res) {
        $scope.Students = res;
    });

    // Edit Row

    // Add New Row
    $scope.addRow = function(student){

        studentService.post($scope.student).success(function(e){

        });
        studentService.put($scope.student).success(function(e){

        });
    };
    // Delete Row
    $scope.removeRow = function ($event,studentId) {
       if(confirm("Are you sure, you want delete?")){
           studentService.deleteStudent(studentId).success(function (e) {
               angular.element($event.currentTarget).parents("tr:first").remove();
           });
       }
    };
}]);