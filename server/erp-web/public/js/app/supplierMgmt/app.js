
Ext.require([
  'Common.util.TipsUtil',
  'Common.util.DoActionUtil',
  'Ext.ux.ProgressBarPager',
  'Common.ux.PagingToolbarCustom',
  //"Common.overrides.JSONReader',
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom',
  'Common.overrides.GridHeaderContainer',
  'Common.overrides.JsonWrite'
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
  name: 'SupplierMgmt',
  appFolder: "js/app/supplierMgmt",

  launch: function () {
    Ext.create('SupplierMgmt.view.MainViewport');
  }

});
