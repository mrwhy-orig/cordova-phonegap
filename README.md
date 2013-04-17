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

For more information, take a look at this gist from zeroasterisk for a good example of how to perhaps include routing functionality on pause/reconnection:
https://gist.github.com/zeroasterisk/5405344





------------------------
### iOS App Build Using PhoneGap 2.6.0

First, download yourself a copy of PhoneGap 2.6.0.  This Meteorite package requires a specific version of PhoneGap to work, and if you mix/match versions, you're likely to just waste a lot of time.
http://phonegap.com/download/#


Second, create a meteor project using the command line utilities found in /phonegap-master/lib/ios/bin:
````
./create ~/Documents/Cordova/MyApp org.pentasyllabic.MyApp MyApp
./update_cordova_subproject ~/Documents/Cordova/MyApp/MyApp.xcodeproj
````

Then, you're going to need to edit the CDVViewController.m file, and point the MeteorIntegration App towards your Meteor installation.  If you have a development and production environment, you may need to compile two separate apps, one for each environment.  (Best practice is to add different icons to each app, so you can tell them apart.)

MyApp > CordovaLib.xcodeproj > Classes > Cleaver > CDVViewController.m (line: 171 or so)
````
self.wwwFolderName = @"http://192.168.0.123:3000";
````

Also, you may want to change the MyApp > config.xml and whitelist your application, as follows:
````
<access origin="http://192.168.0.130:3000" />
````
