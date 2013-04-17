cordova-phonegap
================

Meteorite package that provides support for mobile hardware support via Cordova Phonegap.  
http://phonegap.com/


------------------------
### Meteorite Package Installation

First, install the cordova-phonegap package from the command line, like so:

````
mrt add cordova-phonegap
````

Alternatively, if you'd like to bypass Atmosphere, and install directly from GitHub, you could update your application's smart.json file, like so:

````
{
  "meteor": {
    "branch": "master"
  },
  "packages": {
    "cordova-phonegap": {
      "git": "https://github.com/awatson1978/cordova-phonegap.git"
    }
  }
}

````

This will add the cordova libraries and some initialization code.  You'll need to put the following in your main Meteor index.js file (or equivalent).

````
app.initialize(window);
````

------------------------
### Document Object Model

To confirm that Cordova Phonegap connects to the device hardware, add this HTML snippet to your app somewhere:
````html
<div id="deviceready" class="blink">
  <p class="event listening">Connecting to Device</p>
  <p class="event received">Device is Ready</p>
</div>
````

------------------------
### Controllers & Event Binding


````
    // when an app goes into the background
    document.addEventListener("Pause", function() {
        Cookie.set('LastPage', Meteor.Router.page());
    });
    // when an app drops 'offline'
    document.addEventListener("offline", function() {
        if (Meteor.Router.page() != 'offline' && Meteor.Router.page() != 'loading') {
            Cookie.set('LastPage', Meteor.Router.page());
            Meteor.Router.to('/offline');
        }
    });
    // when an app comes 'online'
    document.addEventListener("online", function() {
        Meteor.resume();
    });
    // This is an event that fires when a Cordova application is retrieved from the background.
    document.addEventListener("resume", function() {
        // http://docs.meteor.com/#meteor_reconnect
        // Force an immediate reconnection attempt if the client is not connected to the server.
        // This method does nothing if the client is already connected.
        Meteor.reconnect();
        Meteor.resume();
    });

    // resume functionality, common (used in offline.js as well)
    
    Meteor.resume = function() {
        if (Meteor.status().status != 'connected') {
            return false;
        }
        if (Meteor.Router.page() != 'offline' && Meteor.Router.page() != 'loading') {
            return true;
        }
        var LastPage = Cookie.get('LastPage');
        if (_.isString(LastPage) && LastPage.length && LastPage != 'loading') {
            console.log('resumed to: (LastPage)', '/' + LastPage);
            Meteor.Router.to('/' + LastPage);
            return true;
        }
        Meteor.Router.to('/');
        return true;
    };

````

For more information, take a look at this gist from zeroasterisk for a good example of how to perhaps include routing functionality on pause/reconnection:
https://gist.github.com/zeroasterisk/5405344





------------------------
### iOS App Build

First, create a meteor project using the command line utilities found in /phonegap-master/lib/ios/bin:
````
./create ~/Documents/Cordova/MyApp org.pentasyllabic.MyApp MyApp
./update_cordova_subproject ~/Documents/Cordova/MyApp/MyApp.xcodeproj
````

Then, you're going to need to edit the CDVViewController.m file, and point the MeteorIntegration App towards your Meteor installation.  If you have a development and production environment, you may need to compile two separate apps, one for each environment.  (Best practice is to add different icons to each app, so you can tell them apart.)

MeteorIntegration > CordovaLib.xcodeproj > Classes > Cleaver > CDVViewController.m (line: 171 or so)
````
self.wwwFolderName = @"http://192.168.0.123:3000";
````

