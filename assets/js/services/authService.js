app.service('authService', function(){

  var user = {};
  user.role = 'admin';
  return{
    getUser: function(){
        debugger;
      return user;
    },
    generateRoleData: function(){
      /*this is resolved before the router loads the view and model*/
      /*...*/
    }
  }
});