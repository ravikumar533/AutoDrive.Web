/**
 * Created by ravik_000 on 23-07-2016.
 */
app.factory("areaService",[
    "$http","APPLICATIONURLS",
    function ($http,appurls) {
        console.log(appurls);
        var uri = appurls.Api;

        function get(areaId) {

            return $http({
                method: "GET",
                url: uri + "area",
                headers: { "Content-Type": "application/json" }
            });
        }
        
        function put(area) {
            return $http({
                method: "PUT",
                url: uri + "area/",
                headers: { "Content-Type": "application/json" },
                data:area
            });
        }

        function post(area) {
            return $http({
                method: "POST",
                url: uri + "area/",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(area)
            });
        }

        function deleteArea(areaId) {
            return $http({
                method: "DELETE",
                url: uri + "area/"+areaId,
                headers: { "Content-Type": "application/json" },

            });
        }
        var areasFactory = {
            get: get,
            put:put,
            deleteArea:deleteArea,
            post:post
        };

        return areasFactory;
    }
    
]);