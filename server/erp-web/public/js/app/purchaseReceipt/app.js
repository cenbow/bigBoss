
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
  name: 'PurchaseReceipt',
  appFolder: "js/app/purchaseReceipt",

  launch: function () {
    Ext.create('PurchaseReceipt.view.MyViewport');
  }

});
