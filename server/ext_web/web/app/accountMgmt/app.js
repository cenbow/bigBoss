Ext.Loader.setConfig({
  enabled: true,
  paths: {
    'Common': 'app/common',
    'Ext': 'js/extjs'
  }
});
Ext.require([
  'Common.util.TipsUtil',
  'Common.util.DoActionUtil',
  'Ext.ux.ProgressBarPager',
  'Common.ux.PagingToolbarCustom',
  //'Common.overrides.JSONReader',
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom',
  'Common.overrides.GridHeaderContainer',
  'Common.overrides.JsonWrite'
  //,
  //
  //'Common.ux.GridButtonGroupAction'
]);

Ext.application({
  models: [
    'MainViewportGridModel'
  ],
  stores: [
    'MainViewportGridStore'
  ],
  views: [
    'MainViewport'
  ],
  name: 'AccountMgmt',
  appFolder: 'js/app/accountMgmt',
  //config: {
  //  permissions: null
  //},

  init: function (app) {
    //var permissionsMap = new Ext.util.HashMap();
    //Ext.Array.each(_USER.permissions, function (item) {
    //  var moduleAndPermissions = item.split(":");
    //  var app = moduleAndPermissions[0];
    //  var appPermission = moduleAndPermissions[1];
    //  var appPermissions = permissionsMap.get(app);
    //  if (!appPermissions) {
    //    appPermissions = [];
    //  }
    //  appPermissions.push(appPermission);
    //  permissionsMap.add(app, Ext.Array.unique(appPermissions));
    //});
    //permissionsMap.each(function(key, value, length){
    //  console.log(key, value);
    //});
    //app.setPermissions(permissionsMap);

  },

  launch: function () {
    Ext.create('AccountMgmt.view.MainViewport');
  }

});
