define([
  'jquery',
  'lodash',
  'tpl!templates/footer.tpl'
], function($, _, footerTemplate) {
  return {
    render: function(target) {
      $(target).html(_.template(footerTemplate, { msg: 'yea'}));
    }
  };
});