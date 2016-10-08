app.service('authService',['$localStorage' , function($localStorage){

  /*var user = {};
  user.role = 'user';*/
  return{
    getUser: function(){        
		
      return $localStorage.user;
    },
    generateRoleData: function(){
      /*this is resolved before the router loads the view and model*/
      /*...*/
    }
  }
}]);