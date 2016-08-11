/**
 * Created by Junyi on 2016/8/9.
 */
Ext.define('CustomerMgmt.store.ReceiptDetailGridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.receiptdetailgridstore',

  requires: [
    'CustomerMgmt.model.BottomViewportModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'CustomerMgmt.model.BottomViewportModel',
      proxy: {
        type: 'ajax',
        url: '/api/general/customer/Line',
        reader: {
          type: 'json',
          rootProperty: 'data'
        },
        writer: {
          type: 'json',
          clientIdProperty: 'clientId'
        }
      }
    }, cfg)]);
  }
});