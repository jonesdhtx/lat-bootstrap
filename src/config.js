require.config({
  paths: {
    "jquery": "../components/jquery/jquery",
    "lodash": "../components/lodash/lodash",
    "tpl": "../components/requirejs-text/index",
    "unit": "../test/unit",
    "dist": "../dist",
    "components": "../components",
    "lat-mixins": "../components/lat-mixins/dist"
  }
});

if(typeof(QUnit) != 'undefined') {
  require(['unit/index'], function() {
    QUnit.start();
  });
}
else {
  require(['jquery', 'main'], function($, main) {
    $(function() {
      //Initialize after doc ready
      main.init();
    });
  });
}

