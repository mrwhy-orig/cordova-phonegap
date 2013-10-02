cordova-phonegap
================

Meteorite package that provides support for mobile hardware support via Cordova Phonegap.  Note:  this package currently only supports iOS devices (iPhone and iPad).  I've uploaded the libraries necessary for Windows, WebOS, and Android support.  However, as I don't have any of that hardware, I'm currently unable to do debugging and testing for those devices.  So, feel free to fork the project and send pull requests!
http://phonegap.com/


**CSS MINIFICATION BUG IN PRODUCTION**  
Please let me know if you run into any problems with CSS when moving apps from develop to production.  There seems to be a bug with uglify.js that causes CSS files to break apps in a Safari UIWebView in production.  If you think you've run into this problem, try using the ``--debug`` flag when deploying to ``*.meteor.com``.  

------------------------
### Contributors

Thanks to @zeroasterisk and @raix!


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

This will add the cordova libraries and some initialization code.  

------------------------
### Initialize Phonegap Functionality
You'll need to put the following in your main Meteor index.js file (or equivalent).
````
app.initialize(window);
````

------------------------
### Document Object Model

To confirm that Cordova Phonegap connects to the device hardware, add this template to your app HTML somewhere:
````html
{{> mobileDeviceStatus}}
````

If the colors aren't to your liking, simply override the .listening and .received classes, respectively.

------------------------
### Controllers & Event Binding


Currently, only one reactive Session variable is wired up to PhoneGap hardware events.  You can access it with the following syntax.  As other events are wired up, we'll update with a list of the other Session variables you can listen to.

````js
  Session.get('deviceready', false);
  
  //Session.get('pause');
  //Session.get('resume');
  //Session.get('online');
  //Session.get('offline');
  //Session.get('backbutton');
  //Session.get('batterycritical');
  //Session.get('batterylow');
  //Session.get('batterystatus');
  //Session.get('menubutton');
  //Session.get('searchbutton');
  //Session.get('startcallbutton');
  //Session.get('endcallbutton');
  //Session.get('volumedownbutton');
  //Session.get('volueupbutton');
````

For more information, take a look at this gist from zeroasterisk for a good example of how to perhaps include routing functionality on pause/reconnection:
https://gist.github.com/zeroasterisk/5405344





------------------------
### iOS App Build Using PhoneGap 2.4.0

First, download yourself a copy of PhoneGap 2.4.0.  This Meteorite package requires a specific version of PhoneGap to work, and if you mix/match versions, you're likely to just waste a lot of time.
http://phonegap.com/download/#


Second, create a meteor project using the command line utilities found in /phonegap-master/lib/ios/bin:

````sh
./create ~/Documents/Cordova/MeteorPhonegapApp org.pentasyllabic.MeteorPhonegapApp MeteorPhonegapApp
./update_cordova_subproject ~/Documents/Cordova/MeteorPhonegapApp/MeteorPhonegapApp.xcodeproj
````

Then, you're going to need to edit the CDVViewController.m file, and point the MeteorIntegration App towards your Meteor installation.  If you have a development and production environment, you may need to compile two separate apps, one for each environment.  (Best practice is to add different icons to each app, so you can tell them apart.)

MeteorPhonegapApp > CordovaLib.xcodeproj > Classes > Cleaver > CDVViewController.m (line: 171 or so)

````js
self.wwwFolderName = @"http://192.168.0.123:3000";
````

Also, in past versions, there have been issues around whitelisting the application.  Setting the wwwFolderName above shoudl take care of things, but if you have any additional problems, you may want to try changing the MeteorPhonegapApp > config.xml and see if this helps:

````xml
<access origin="http://192.168.0.130:3000" />
````


------------------------
### License

MIT License. Use as you wish, including for commercial purposes.  
See license.mit.txt for full details.  

------------------------
### Support
Found this package to be useful?  Consider tipping the package maintainer for their time!  

[![Support via Gittip](https://raw.github.com/gittip/www.gittip.com/master/www/assets/gittip.png)](https://www.gittip.com/awatson1978/)  

