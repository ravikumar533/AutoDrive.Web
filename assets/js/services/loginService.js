
app.factory("loginService",[
    "$http",'$localStorage',"APPLICATIONURLS",
    function ($http,$localStorage,appurls) {
     var baseUrl = "http://AutoDrive/";
        function get(){
            return $http.get('/assets/files/Suburbs.json/');
        }
        
        var loginFactory = {
            get: get
        };

        return { signin: function(data, success, error) {                
                $http({
                    method: 'POST',
                    url: baseUrl + 'token',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },                    
                    data: {username: data.username, password: data.password,grant_type:'password'}
                }).success(success).error(error);
                //$http.post(baseUrl + 'token', data).success(success).error(error)
                }
            };
    }    
]);