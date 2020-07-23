import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let flag = false;
if (environment.production) {
  enableProdMode();
}

const onDeviceReady = () => {
  if (!flag) {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
    flag = true;
  }
};
setTimeout(() => {
  ready()
}, 50);
function ready() {
  if (typeof window['cordova'] !== 'undefined') {
    console.log("cordova")
    document.addEventListener('deviceready', () => {


      if (window['cordova'].platformId == "ios") {
        console.log('Initializing iosrtc');
        window['cordova'].plugins.iosrtc.registerGlobals();
      }
      var permissions = window['cordova'].plugins.permissions;
      var list = [
        permissions.CAMERA,
        permissions.RECORD_AUDIO,
        permissions.MODIFY_AUDIO_SETTINGS,
        permissions.BLUETOOTH,
        permissions.BLUETOOTH_ADMIN
      ];
      permissions.checkPermission(list, checkPermissionCallback, errorCallback);
      var errorCallback = function () {
        alert('Permissions not set');
      }
      function checkPermissionCallback(status) {
        if (!status.hasPermission) {
          var errorCallback = function () {
            alert('Permissions not set');
          }

          permissions.requestPermissions(
            list,
            function (status) {
              if (!status.hasPermission) errorCallback();
              else
                onDeviceReady();
            },
            errorCallback);
        }
        else {
          onDeviceReady();
        }
      }

    }, false);
  } else {
    console.log("no cordova")
    onDeviceReady();
  }
}

