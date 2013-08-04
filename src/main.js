define([
  'jquery',
  'lodash',
  'nav',
  'footer',
  'tpl!templates/main.tpl'
], function($, _, nav, footer, mainTemplate) {
  return {
    init: function(target) {
      $(target || 'body').html(_.template(mainTemplate));
      nav.render('.nav');
      footer.render('.footer');

      //TODO: show loading or something
      var waitForAppFunc = function() {
        if(window.latitudeApp) {
          window.latitudeApp.init('.app');
          //TODO: subsribe to events and what-not
        }
        else {
          setTimeout(waitForAppFunc, 50);
        }
      };
      waitForAppFunc();
    }
  };
});
