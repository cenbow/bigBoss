
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
  'Common.overrides.JsonWrite',
  'Common.ux.SaveCancelToolbar'
]);

Ext.application({
  models: [
    'MainViewportGridModel'
  ],
  views: [
    'MainViewport'
  ],
  name: 'ProductRecycled',
  appFolder: "js/app/productRecycled",

  launch: function () {
    Ext.create('ProductRecycled.view.MainViewport');
  }

});
