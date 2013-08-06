define([
  'jquery',
  'lodash',
  'tpl!templates/nav.tpl'
], function($, _, navTemplate) {
  return {
    render: function() {
      $('.lat-app').before(_.template(navTemplate, { msg: 'yea'}));
    }
  };
});