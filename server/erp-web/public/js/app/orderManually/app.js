Ext.require([
  'Common.util.TipsUtil',
  'Common.util.DoActionUtil',
  'Ext.ux.ProgressBarPager',
  'Common.ux.PagingToolbarCustom',
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom',
  'Common.store.CommonUserGrantShopStore',
  'Common.store.CommonWhsStore'
]);

Ext.application({
  models: [
    'GridModel'
  ],
  stores: [
    'GridStore'
  ],
  views: [
    'OrderManuallyViewport',
    'ConsigneeWindow'
  ],
  name: 'OrderManually',
  appFolder: "js/app/orderManually",

  launch: function () {
    Ext.create('OrderManually.view.OrderManuallyViewport');
  }

});


