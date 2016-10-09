'use strict';
/**
 * Controller of the angularBootstrapCalendarApp
*/
app.controller('CalendarCtrl', 
["$scope", "$aside", "moment", "SweetAlert","calendarService","instructorService","studentService", "DropDownSettings",
function ($scope, $aside, moment, SweetAlert,calendarService,instructorService,studentService,DropDownSettings) {


    

    $scope.events = [];

    var vm = this;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
   
    GetEvents();
  

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
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.deleteEvent = function () {
                    $uibModalInstance.close($scope.event, $scope.event);
                };
                $scope.Students = [];
                $scope.SelectedStudent =[];
                $scope.studentDropListsettings= DropDownSettings.Student;
                $scope.studentTranslationTexts= DropDownSettings.Student_Translation_text;
                if(event.student.id){
                    $scope.SelectedStudent = {
                        id : event.student.id,
                        firstName : event.student.studentName
                    }
                }
               
                $scope.Instructors = [];
                $scope.SelectedInstructor =[];
                $scope.instructorDropListsettings= DropDownSettings.Instructor;
                $scope.instructorTranslationTexts= DropDownSettings.Instructor_Translation_text;
                 if(event.instructor.id){
                    $scope.SelectedInstructor = {
                        id : event.instructor.id,
                        firstName: event.instructor.instructorName
                    }
                }

                $scope.maxDate = new Date(2020, 5, 22);
				$scope.minDate = new Date(1970, 12, 31);
                $scope.eventModel = event; 
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
                            var selectedDate = moment($scope.eventModel.selectedDate);
                            var startDate = moment($scope.eventModel.startDateTime);
                            var endDate = moment($scope.eventModel.endDateTime);
                            $scope.eventModel.instructor = {
                                instructorName : $scope.SelectedInstructor.firstName,
                                id : $scope.SelectedInstructor.id
                            };
                            $scope.eventModel.student = {
                                StudentName : $scope.SelectedStudent.firstName,
                                id : $scope.SelectedStudent.id
                            };
                            $scope.eventModel.startDateTime = new Date(selectedDate.year(),selectedDate.month(),selectedDate.date(),startDate.hours(),startDate.minutes(),startDate.seconds());
                            $scope.eventModel.endDateTime = new Date(selectedDate.year(),selectedDate.month(),selectedDate.date(),endDate.hours(),endDate.minutes(),endDate.seconds());
                            if(!$scope.eventModel.id) { // Create 
                                calendarService.post($scope.eventModel).success(function (e) {
                                    form.$setPristine(true);
                                GetEvents();
                                });
                            }
                            else { // Update
                                calendarService.put($scope.eventModel).success(function (e) {
                                    //noinspection JSUnresolvedFunction
                                    form.$setPristine(true);
                                GetEvents();
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
                GetStudents();
                GetInstructors();
                function GetInstructors()
                {
                    instructorService.get().success(function(res){
                        $scope.Instructors = res;
                    });
                };
                function GetStudents()
                {
                    studentService.get().success(function(res){
                        $scope.Students = res;
                    });
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
            type: 'job',
            student:{},
            instructor:{}
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
            firmButtonColor: "#DD6B55",
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
    function GetEvents(){
        calendarService.get().success(function(res){
            var events = [];
            for(var i=0;i<res.length;i++){
                var event = res[i];
                event.startsAt = res[i].startDateTime;
                event.endsAt = res[i].endDateTime;
                var selectedDate = moment(res[i].startDateTime);
            
                event.selectedDate= new Date(selectedDate.year(),selectedDate.month(),selectedDate.date(),selectedDate.hours(),selectedDate.minutes(),selectedDate.seconds());
                events.push(event);
            }
            $scope.events = events;
        });
    }

  
}]);
