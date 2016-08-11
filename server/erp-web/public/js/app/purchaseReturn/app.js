
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
  name: 'PurchaseReturn',
  appFolder: "js/app/purchaseReturn",

  launch: function () {
    Ext.create('PurchaseReturn.view.MyViewport');
  }

});
