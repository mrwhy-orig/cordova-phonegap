//-------------------------------------------------------
// Cordova App Object Literal

if(Meteor.isClient){
    app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);

            // This is an event that fires when a Cordova application is retrieved from the background.
            document.addEventListener("resume", function() {
                // http://docs.meteor.com/#meteor_reconnect
                // Force an immediate reconnection attempt if the client is not connected to the server.
                // This method does nothing if the client is already connected.
                Meteor.reconnect();
                //Meteor.resume();
            });
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicity call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    };

    // this line must occur after the class literal object (above)
    app.initialize(window);
}


