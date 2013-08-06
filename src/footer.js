define([
  'jquery',
  'lodash',
  'tpl!templates/footer.tpl'
], function($, _, footerTemplate) {
  return {
    render: function() {
      $('.lat-app').after(_.template(footerTemplate, { msg: 'yea'}));
    }
  };
});