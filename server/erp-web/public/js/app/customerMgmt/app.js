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
  models: [
    'BottomViewportModel',
    'MainViewportModel'
  ],
  stores: [
    'MainViewportStore',
    'CommonComboboxStore',
    'DocumentTypeStore',
    'ReceiptDetailGridStore'
  ],
  views: [
    'MainViewport',
    'InfoDialogWindow',
    'AddressWindow'
  ],
  name: 'CustomerMgmt',
  appFolder: "js/app/customermgmt",

  launch: function () {
    Ext.create('CustomerMgmt.view.MainViewport');
  }

});