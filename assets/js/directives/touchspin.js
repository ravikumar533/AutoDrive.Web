'use strict';
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

app.directive('touchspin', function (authService) {
    return {
        restrict: 'EA',
        link: function () {
           /* var tsOptions = [
				'initval',
				'min',
				'max',
				'step',
				'forcestepdivisibility',
				'decimals',
				'stepinterval',
				'stepintervaldelay',
				'verticalbuttons',
				'verticalupclass',
				'verticaldownclass',
				'prefix',
				'postfix',
				'prefix_extraclass',
				'postfix_extraclass',
				'booster',
				'boostat',
				'maxboostedstep',
				'mousewheel',
				'buttondown_class',
				'buttonup_class'
            ];
            var options = {};
            for (var i = 0, l = tsOptions.length; i < l; i++) {
                var opt = tsOptions[i];
                if (attr[opt] !== undefined) {
                    options[opt] = attr[opt];
                }
            }
            elem.TouchSpin(options);*/
        },
		compile:  function(element, attr, linker){			
			var accessDenied = true;
			var user = authService.getUser();
			
			var attributes = attr.access.split(" ");
			for(var i in attributes){
				if(user.role == attributes[i]){
					accessDenied = false;
				}
			}
			if(accessDenied){
				element.children().remove();
				element.remove();			
			}
		}
    };
});