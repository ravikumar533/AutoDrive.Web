/**
 * Created by ravik_000 on 03-09-2016.
 */

app.factory("instructorService",[
    "$http",
    function ($http) {
        var uri = "http://AutoDrive/api/";

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
        function getSuburbs(){
            return $http.get('/assets/files/Postcodes.csv/').then(function(response){
                var result = csvToJSON(response.data);
                console.log(result);
            });
        }
        function getInstructorCode(){
            return $http({
                method: "GET",
                url: uri + "instructor/GetInstructorCode",
                headers: { "Content-Type": "application/json" }
            });
        }
        function csvToJSON(csv){
            console.log(csv);
            var lines=csv.split("\n");
            var result = [];
            var headers=lines[0].split(",");
            for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i].split(",");
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
            }
            return JSON.stringify(result); //JSON
        }
        var instructorFactory = {
            get: get,
            put:put,
            deleteInstructor:deleteInstructor,
            post:post,
            getSuburbs:getSuburbs,
            getInstructorCode:getInstructorCode
        };

        return instructorFactory;
    }
    
]);