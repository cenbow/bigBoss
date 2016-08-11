
Ext.require([
  'Common.util.TipsUtil',
  'Common.util.DoActionUtil',
  'Ext.ux.ProgressBarPager',
  'Common.ux.PagingToolbarCustom',
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom'
]);

Ext.application({
  views: [
    'MyViewport'
  ],
  name: 'GoodsReceipt',
  appFolder: "js/app/goodsReceipt",

  launch: function () {
    Ext.create('GoodsReceipt.view.MyViewport');
  }

});
