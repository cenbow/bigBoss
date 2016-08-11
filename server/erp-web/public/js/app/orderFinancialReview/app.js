
Ext.require([
  'Common.overrides.Button',
  'Common.overrides.Splitter',
  'Common.overrides.PagingToolbarCustom',
  'Common.overrides.GridHeaderContainer',
  'Common.overrides.GridFeatureGrouping',
  'Common.Constant',
  'Common.util.TipsUtil'
]);

Ext.application({
  views: [
    'MyViewport'
  ],
  name: 'OrderFinancialReview',
  appFolder: "js/app/orderFinancialReview",

  launch: function () {
    Ext.create('OrderFinancialReview.view.MyViewport');
  }

});
