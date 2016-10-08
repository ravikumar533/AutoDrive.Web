/**
 * Created by ravik_000 on 03-09-2016.
 */

app.factory("studentService",[
    "$http",
    function ($http) {
        var uri = "http://AutoDrive/api/";

        function get() {

            return $http({
                method: "GET",
                url: uri + "student",
                headers: { "Content-Type": "application/json" }
            });
        }        
        function put(student) {
            return $http({
                method: "PUT",
                url: uri + "student/",
                headers: { "Content-Type": "application/json" },
                data:student
            });
        }
        function post(student) {
            return $http({
                method: "POST",
                url: uri + "student/",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(student)
            });
        }
        function deletestudent(studentId) {
            return $http({
                method: "DELETE",
                url: uri + "student/"+studentId,
                headers: { "Content-Type": "application/json" }
            });            
        }       
        
        var studentFactory = {
            get: get,
            put:put,
            deletestudent:deletestudent,
            post:post
        };

        return studentFactory;
    }
    
]);