define([
  'jquery',
  'lodash',
  'main'
],function($, _, main) {

  module('feedback');

  test('Rendering', 1, function() {
    main.init('#qunit-fixture');
    equal($('.lat-nav').length, 1, 'Should render nav');
  });

});
