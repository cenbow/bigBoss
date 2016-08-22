Ext.Loader.setConfig({
  enabled: true,
  paths: {
    'Common': 'app/common',
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
  appFolder: "app/index",

  launch: function () {
    Ext.create('Index.view.IndexViewport');
  },

  init: function() {
    var me = this;
    me.setDefaultToken('all');

    var login = JSON.parse(localStorage.getItem("login"));
    if(!login){
      window.location.replace(FACADE_URL+'/login.html');
    }
  }

});
