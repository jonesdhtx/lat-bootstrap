define([
  'jquery',
  'lodash',
  'nav',
  'footer',
  'tpl!templates/main.tpl'
], function($, _, nav, footer, mainTemplate) {
  var app;
  var config;

  return {
    init: function(target) {
      //Render main template
      $(target || 'body').html(_.template(mainTemplate));

      //Grab config
      config = window.latitudeConfig || {};
      if(window.latitudeConfig) {
        console.log('Applying latitudeConfig...', window.latitudeConfig);
      }

      if(!config.hideNav && !config.hideChrome) {
        nav.render();
      }

      if(!config.hideFooter && !config.hideChrome) {
        footer.render();
      }

      //Wait for app to become available, then start
      var waitForAppFunc = function() {
        if(window.latitudeApp) {
          app = window.latitudeApp;
          app.start('.lat-app', window.latitudeAppData);
          app.subscribe('hey-dj', function() {
            console.log('GOT hey-dj !!!');
          });
        }
        else {
          setTimeout(waitForAppFunc, 50);
        }
      };
      waitForAppFunc();
    }
  };
});
