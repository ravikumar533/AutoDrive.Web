app.service('authService',['$localStorage' , function($localStorage){

  /*var user = {};
  user.role = 'user';*/
  return{
    getUser: function(){        
		debugger;
      return $localStorage.user;
    },
    generateRoleData: function(){
      /*this is resolved before the router loads the view and model*/
      /*...*/
    }
  }
}]);