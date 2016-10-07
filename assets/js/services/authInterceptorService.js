/*app.factory('authInterceptorService', ['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
 
    var authInterceptorServiceFactory = {};
 
    var _request = function (config) {
        
        config.headers = config.headers || {};
 
        var token = $localStorage.token;
        if (authData) {
            config.headers.Authorization = 'Bearer ' + token;
        }
 
        return config;
    }
 
    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }
 
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
 
    return authInterceptorServiceFactory;
}]);*/