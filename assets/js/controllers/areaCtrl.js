/**
 * Created by ravik_000 on 24-07-2016.
 */
app.controller('AreaCtrl', ["$scope", "areaService","$state", "SweetAlert", function ($scope, areaService, $state, SweetAlert) {
    $scope.Areas = [];
    //noinspection JSUnresolvedFunction
    $scope.master= $scope.areaModel;
    GetAreas();
    $scope.form = {

        submit: function (form) {

            var firstError = null;
            if (form.$invalid) {

                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }
                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                return;

            } else {
                if(!$scope.areaModel.id) {
                    areaService.post($scope.areaModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                        GetAreas();
                        $scope.areaModel = angular.copy($scope.master);
                        form.$setPristine(true);
                    });
                }
                else {
                    areaService.put($scope.areaModel).success(function (e) {
                        //noinspection JSUnresolvedFunction
                        $scope.areaModel = angular.copy($scope.master);
                        form.$setPristine(true);
                    });
                }
            }

        },
        reset: function (form) {

            $scope.areaModel = angular.copy($scope.master);
            form.$setPristine(true);

        }
    };

    $scope.editRow = function ($event,areaId) {
        
        var data = $scope.Areas;
        angular.forEach(data,function(value,index){
            if(value.id == areaId) {
                //var editRecord = value;
                $scope.areaModel = value;
            }
        });
    }
    
    $scope.createArea = function(){
        $scope.areaModel = angular.copy($scope.master);
        form.$setPristine(true);
    }

    $scope.cancel = function () {
      $scope.areaModel = angular.copy($scope.master);
            form.$setPristine(true);
    };
    $scope.removeRow = function ($event,areaId) {
       if(confirm("Are you sure, you want delete?")){
           areaService.deleteArea(areaId).success(function (e) {
               angular.element($event.currentTarget).parents("tr:first").remove();
           });
       }
    };
    function GetAreas(){
    areaService.get("").success(function (res) {
        $scope.Areas = res;
    });
    }
}]);