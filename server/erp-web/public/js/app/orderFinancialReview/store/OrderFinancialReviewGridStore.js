Ext.define('OrderFinancialReview.store.OrderFinancialReviewGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.orderfinancialreviewgridstore',
  
  requires: [
    'OrderFinancialReview.model.OrderFinancialReviewGridModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'OrderFinancialReview.model.OrderFinancialReviewGridModel',
      /*
      proxy: {
        type: 'ajax',
        url: '/api/order',
        reader: {
          type: 'json',
          rootProperty: 'data.result',
          startProperty: 'data.start',
          limitProperty: 'data.pageSize',
          totalProperty: 'data.totalCount'
        }
      }
      */
    }, cfg)]);
  }
});