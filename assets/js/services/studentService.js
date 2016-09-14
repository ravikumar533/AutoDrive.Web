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
        
        
        var studentFactory = {
            get: get
        };

        return studentFactory;
    }
    
]);