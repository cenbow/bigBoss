Ext.Loader.setConfig({
  enabled: true,
  paths: {
    'Common': 'js/common',
    'Ext': 'js/extjs'
  }
});

Ext.tip.QuickTipManager.init();

Ext.apply(Ext.button.Button.prototype, {
  focusCls: ""
});
Ext.apply(Ext.resizer.Splitter.prototype, {
  focusCls: ""
});

Ext.onReady(function () {
  Ext.get('loading').fadeOut({
    duration: 200, //遮罩渐渐消失
    remove: true
  });

  Ext.get('loading-mask').fadeOut({
    duration: 200,
    remove: true
  });
});

Ext.application({
  views: [
    'IndexViewport',
    'NorthPanel',
    'CenterTabPanel',
    'WestTreePanel'
  ],
  name: 'Index',
  appFolder: "js/app/index",

  launch: function () {
    Ext.create('Index.view.IndexViewport');
  },

  init: function() {
    var me = this;
    me.setDefaultToken('all');
  }

});
