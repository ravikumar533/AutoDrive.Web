'use strict';
/**
 * Controller of the angularBootstrapCalendarApp
*/
app.controller('CalendarCtrl', ["$scope", "$aside", "moment", "SweetAlert", function ($scope, $aside, moment, SweetAlert) {


    var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

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
	  {
	      title: 'AngularJS Seminar',
	      type: 'off-site-work',
	      startsAt: new Date(y, m, 8, 10, 30),
	      endsAt: new Date(y, m, 9, 18, 30)
	  },
      {
          title: 'Event 1',
          type: 'job',
          startsAt: new Date(y, m, d - 5),
          endsAt: new Date(y, m, d - 2)
      },
      {
          title: 'Event 2',
          type: 'cancelled',
          startsAt: new Date(y, m, d - 3, 16, 0),
          endsAt: new Date(y, m, d - 3, 18, 0)
      },
      {
          title: 'This is a really long event title',
          type: 'to-do',
          startsAt: new Date(y, m, d + 1, 19, 0),
          endsAt: new Date(y, m, d + 1, 22, 30)
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
             //   $scope.event = event;
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
                                $scope.event.student = $scope.students[2];
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

}]);
