/**
 * Created by ravik_000 on 03-09-2016.
 */
app.controller('StudentCtrl', ["$scope","$state", "studentService", function ($scope,$state, studentService) {
    var student = 
    $scope.Students = [];
   
    studentService.get().success(function (res) {
        $scope.Students = res;
    });

    // Show Form
    
    // Create Student

    // Edit Student

    // Delete Student

}]);