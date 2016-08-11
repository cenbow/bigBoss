Ext.require([
  'Common.util.TipsUtil',
  'Common.util.DoActionUtil',
  'Ext.ux.ProgressBarPager',
  'Common.ux.PagingToolbarCustom',
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom',
  'Common.overrides.GridHeaderContainer',
  'Common.overrides.JsonWrite',
  'Common.ux.SaveCancelToolbar'
]);

Ext.application({
  stores: [
    'ShopOrderTypeStore',
    'OrderAgoTypeStore',
    'OrderStatusStore',
    'GridStore',
    'ShopOrderLineStore'
  ],
  views: [
    'MyViewport'
  ],
  name: 'ShopOrderList',
  appFolder: "js/app/shopOrderList",

  launch: function () {
    Ext.create('ShopOrderList.view.MyViewport');
  }

});
