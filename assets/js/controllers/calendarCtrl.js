'use strict';
/**
 * Controller of the angularBootstrapCalendarApp
*/
app.controller('CalendarCtrl', ["$scope", "$aside", "moment", "SweetAlert","calendarService", function ($scope, $aside, moment, SweetAlert,calendarService) {


    var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
   // $scope.students = [];
    //$scope.instructors = [];
    GetStudents();
    GetInstructors();
    $scope.events = [
	  {
          _id: '123456789',
          title: 'Student_Name',
          lessonDate:new Date(y, m, 8, 10, 30),
	      startsAt: new Date(y, m, 8, 10, 30),
	      endsAt: new Date(y, m, 8, 10, 30),
	      type: 'lesson',
	      student:{
              _id:'12312312312',
              studentName:"StudentName2",
              studentCode:'SN-102'
          },
          instructor:{
              _id:'2342342342342',
              instructorName:'Instructor_name2'
          },
          pickupLocation:'pickup location test',
          studentMobile:'041204765',
          testStatus:'Passed'
	  },
	  
    ];

    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();
    
    function showModal(action, event) {
        var modalInstance = $aside.open({
            templateUrl: 'calendarEvent.html',
            placement: 'right',
            size: 'sm',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                $scope.$modalInstance = $uibModalInstance;
                $scope.action = action;
                $scope.event = event;
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.deleteEvent = function () {
                    $uibModalInstance.close($scope.event, $scope.event);
                };
                $scope.maxDate = new Date(2020, 5, 22);
				$scope.minDate = new Date(1970, 12, 31);
                $scope.students = [{
                                    _id:'123123123123',
                                    studentName:'StudentName1',
                                    studentCode:'SN-101'
                                },
                                {
                                    _id:'12312312312',
                                    studentName:"StudentName2",
                                    studentCode:'SN-102'
                                },
                                {
                                    _id:'12312312282',
                                    studentName:"StudentName3",
                                    studentCode:'SN-103'
                                }];
                $scope.instructors = [
                                    {
                                        _id:'2342342342343',
                                        instructorName:'Instructor_name1'
                                    },
                                    {
                                        _id:'2342342342342',
                                        instructorName:'Instructor_name2'
                                    },
                                    {
                                        _id:'2342342342as2',
                                        instructorName:'Instructor_nam3'
                                    }
                                ];
                //$scope.event.student = $scope.students[2];
                 $scope.startOptions = {
					showWeeks : false,
					startingDay : 1,
					minDate: $scope.minDate,
					maxDate: $scope.maxDate
				};
				
				$scope.endOptions = {
					showWeeks : false,
					startingDay : 1,
					minDate: $scope.minDate,
					maxDate: $scope.maxDate
				};
			
				$scope.endOpen = function() {
					$scope.endOptions.minDate = $scope.event.startsAt;
					$scope.startOpened = false;
					$scope.endOpened = !$scope.endOpened;
				};
				
				$scope.startOpen = function() {
					$scope.startOptions.maxDate = $scope.event.endsAt;
					$scope.endOpened = false;
					$scope.startOpened = !$scope.startOpened;
				};

            }
        });
        modalInstance.result.then(function (selectedEvent, action) {

            $scope.eventDeleted(selectedEvent);

        });
    }


    $scope.eventClicked = function (event) {
        showModal('Clicked', event);
    };
    $scope.addEvent = function () {
        $scope.events.push({
            title: 'New Event',
            startsAt: new Date(y, m, d, 10, 0),
            type: 'job'
        });
        $scope.eventEdited($scope.events[$scope.events.length - 1]);
    };

    $scope.eventEdited = function (event) {
        showModal('Edited', event);
    };

    $scope.eventDeleted = function (event) {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this event!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                $scope.events.splice(event.$id, 1);
                SweetAlert.swal("Deleted!", "Event has been deleted.", "success");
            } else {
                SweetAlert.swal("Cancelled", "Event is safe :)", "error");
            }
        });
    };


    $scope.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();

        event[field] = !event[field];
    };
    
    $scope.startOptions = {
		showWeeks : false,
		startingDay : 1,
		minDate: $scope.minDate,
		maxDate: $scope.maxDate
	};
	
	$scope.endOptions = {
		showWeeks : false,
		startingDay : 1,
		minDate: $scope.minDate,
		maxDate: $scope.maxDate
	};

	$scope.endOpen = function() {
		$scope.endOptions.minDate = $scope.event.startsAt;
		$scope.startOpened = false;
		$scope.endOpened = !$scope.endOpened;
	};
	
	$scope.startOpen = function() {
		$scope.startOptions.maxDate = $scope.event.endsAt;
		$scope.endOpened = false;
		$scope.startOpened = !$scope.startOpened;
	};

    function GetInstructors()
    {
        $scope.instructors = [
                                    {
                                        _id:'2342342342343',
                                        instructorName:'Instructor_name1'
                                    },
                                    {
                                        _id:'2342342342342',
                                        instructorName:'Instructor_name2'
                                    },
                                    {
                                        _id:'2342342342as2',
                                        instructorName:'Instructor_nam3'
                                    }
                                ];
    };
    function GetStudents()
    {
      return  [{
                                    _id:'123123123123',
                                    studentName:'StudentName1',
                                    studentCode:'SN-101'
                                },
                                {
                                    _id:'12312312312',
                                    studentName:"StudentName2",
                                    studentCode:'SN-102'
                                },
                                {
                                    _id:'12312312282',
                                    studentName:"StudentName3",
                                    studentCode:'SN-103'
                                }];
    };

    $scope.form = {
        submit: function (form) {    // Form Submit 
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
                // Form Submition
               if(!$scope.event.id) { // Create 
                    calendarService.post($scope.event).success(function (e) {
                        form.$setPristine(true);
                       //ResetForm(true);
                    });
                }
                else { // Update
                    calendarService.put($scope.event).success(function (e) {
                        //noinspection JSUnresolvedFunction
                        form.$setPristine(true);
                       //ResetForm(true);
                    });
                }
            }

        },
        reset: function (form) {
            // Reset model
            form.$setPristine(true);
         // ResetForm(false);
        }
    };

}]);
