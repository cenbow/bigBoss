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
  'Common.overrides.GridFeatureGrouping',
  'Common.overrides.JsonWrite',
  'Common.ux.SaveCancelToolbar'
]);

Ext.application({
  stores: [
    'MainViewportTreeStore',
    'MainViewportGridStore'
  ],
  views: [
    'MainViewport'
  ],
  name: 'ProductMgmt',
  appFolder: "js/app/productMgmt",

  launch: function () {
    Ext.create('ProductMgmt.view.MainViewport');
  }

});
