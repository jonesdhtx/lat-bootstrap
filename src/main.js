define([
  'tpl!templates/main.tpl',
  'nav',
  'footer'
], function(mainTemplate, nav, footer) {
  return {
    init: function(target) {
      $(target || 'body').html(_.template(mainTemplate));
      nav.render('.nav');
      footer.render('.footer');
    }
  };
});
