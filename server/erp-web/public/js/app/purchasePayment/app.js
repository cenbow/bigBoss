/**
 * Created by Junyi on 2016/7/25.
 */

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
  //models: [
  //  'MainViewportGridModel'
  //],
  stores: [
    'MainViewportGridStore'
  ],
  views: [
    'MainViewport'
  ],
  name: 'PurchasePayment',
  appFolder: "js/app/purchasePayment",

  launch: function () {
    Ext.create('PurchasePayment.view.MainViewport');
  }

});
