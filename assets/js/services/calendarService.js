/**
 * Created by ravik_000 on 03-09-2016.
 */

app.factory("calendarService",[
      "$http","APPLICATIONURLS",
    function ($http,appurls) {
        var uri = appurls.Api;
       
        function get() {

            return $http({
                method: "GET",
                url: uri + "booking",
                headers: { "Content-Type": "application/json" }
            });
        }
        
        function put(calendar) {
            return $http({
                method: "PUT",
                url: uri + "booking/",
                headers: { "Content-Type": "application/json" },
                data:calendar
            });
        }

        function post(calendar) {
            return $http({
                method: "POST",
                url: uri + "booking/",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(calendar)
            });
        }

        function deleteEvent(eventId) {
            return $http({
                method: "DELETE",
                url: uri + "booking/"+eventId,
                headers: { "Content-Type": "application/json" },

            });
        }
        var calendarFactory = {
            get: get,
            put:put,
            deleteEvent:deleteEvent,
            post:post
        };

        return calendarFactory;
    }
    
]);