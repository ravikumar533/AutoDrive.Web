app.factory("suburbService",[
    "$http","APPLICATIONURLS",
    function ($http,appurls) {
        var uri = appurls.Api;
        function get(suburbContains){
            return $http({
                method: "GET",
                url: uri + "suburb/" + suburbContains,
                headers: { "Content-Type": "application/json" }
            });
        }
        
        var suburbFactory = {
            get: get
        };

        return suburbFactory;
    }
    
]);