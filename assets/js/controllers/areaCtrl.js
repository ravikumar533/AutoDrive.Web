/**
 * Created by ravik_000 on 24-07-2016.
 */
app.controller('AreaCtrl', ["$scope", "areaService", function ($scope, areaService) {
    $scope.Areas = [];

    //noinspection JSUnresolvedFunction
    $scope.area = {
        id:'',
        name:'',
        areaCode:''
    };;

    $scope.editRow = function ($event,areaId) {
        var data = $scope.Areas;
        angular.forEach(data,function(value,index){
            if(value.id == areaId) {
                var editRecord = value;
                $scope.area = {
                    id:areaId,
                    name:editRecord.name,
                    areaCode: editRecord.areaCode
                };
            }
        });
    }
    $scope.addRow = function () {
        if($scope.area.id=='') {
            areaService.post($scope.area).success(function (e) {
                //noinspection JSUnresolvedFunction
                $scope.area = {
                    id:'',
                    name:'',
                    areaCode:''
                };
            });
        }
        else {
            areaService.put($scope.area).success(function (e) {
                //noinspection JSUnresolvedFunction
                $scope.area = {
                    id:'',
                    name:'',
                    areaCode:''
                };
            });
        }
    };
    $scope.cancel = function () {
      $scope.area = {id:'',areaCode:'',name:''};
    };
    $scope.removeRow = function ($event,areaId) {
       if(confirm("Are you sure, you want delete?")){
           areaService.deleteArea(areaId).success(function (e) {
               angular.element($event.currentTarget).parents("tr:first").remove();
           });
       }
    };
    areaService.get("").success(function (res) {
        $scope.Areas = res;
    });

}]);