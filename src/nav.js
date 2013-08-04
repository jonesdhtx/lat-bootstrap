define([
  'jquery',
  'lodash',
  'tpl!templates/nav.tpl'
], function($, _, navTemplate) {
  return {
    render: function(target) {
      $(target).html(_.template(navTemplate, { msg: 'yea'}));
    }
  };
});