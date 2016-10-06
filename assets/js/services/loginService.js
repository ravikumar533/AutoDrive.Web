app.factory("loginService",[
    "$http","APPLICATIONURLS",
    function ($http,appurls) {
     
        function get(){
            return $http.get('/assets/files/Suburbs.json/');
        }
        
        var loginFactory = {
            get: get
        };

        return loginFactory;
    }
    
]);