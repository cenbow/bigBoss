
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
  name: 'StockTransfer',
  appFolder: 'js/app/stockTransfer',
  launch: function () {
    Ext.create('StockTransfer.view.MyViewport');
  }
});
