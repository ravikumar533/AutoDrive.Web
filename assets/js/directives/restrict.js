
(function () {
    'use strict';

  app.directive('restrict', function(authService){
	return{
		restrict: 'A',
		prioriry: 100000,
		scope: false,
		link: function(){
			// alert('ergo sum!');
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
	}
});
});