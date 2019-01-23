# cordova-nativestorage-android
Create simple list using phones native storage (similar to LocalStorage in HTML5). Tested on android platform using emulator in android studio

[source to plugin used - cordova plugin nativestorage](https://www.npmjs.com/package/cordova-plugin-nativestorage)

## Instructions
- Install the cordova cli: npm install -g cordova
- Install all dependencies: npm install
- Add your desired (android) platform: cordova platform add android
- Follow test-steps found [here](https://cordova.apache.org/docs/en/latest/guide/cli/#test-the-app): 

### Development process 
Most files created as a boilerplate but navigate to /www/js/index.js to find the source where my code was implemented. My first program (ever) was created using localStorage in html5 and this project was mostly about integrating that old project with the cordova tech and NativeStorage plugin. 

I ran into a major problems: 
- getItem success-callback only returned console.log (see example from plugin-source) so i created my own success- and error callback. 
    - When success (when there is an item to get) = JSON.parse and run updateUI() 
    - When error (empty storage from start) = create empty array to populate with addobject()



