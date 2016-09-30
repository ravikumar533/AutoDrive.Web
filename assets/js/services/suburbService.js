app.factory("suburbService",[
    "$http",
    function ($http) {
     
        function get(){
            return $http.get('/assets/files/Suburbs.json/');
        }
        
        var suburbFactory = {
            get: get
        };

        return suburbFactory;
    }
    
]);