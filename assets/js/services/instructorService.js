/**
 * Created by ravik_000 on 03-09-2016.
 */

app.factory("instructorService",[
    "$http","APPLICATIONURLS",
    function ($http,appurls) {
        var uri = appurls.Api;

        function get(instructorId) {

            return $http({
                method: "GET",
                url: uri + "instructor",
                headers: { "Content-Type": "application/json" }
            });
        }
        
        function put(instructor) {
            return $http({
                method: "PUT",
                url: uri + "instructor/",
                headers: { "Content-Type": "application/json" },
                data:instructor
            });
        }

        function post(instructor) {
            return $http({
                method: "POST",
                url: uri + "instructor/",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(instructor)
            });
        }

        function deleteInstructor(instructorId) {
            return $http({
                method: "DELETE",
                url: uri + "instructor/"+instructorId,
                headers: { "Content-Type": "application/json" },

            });
            
        }
        var instructorFactory = {
            get: get,
            put:put,
            deleteInstructor:deleteInstructor,
            post:post
        };

        return instructorFactory;
    }
    
]);