/**
 * Created by Junyi on 2016/7/28.
 */

Ext.define('PurchasePayment.store.PurchasePaymentLineStore', {
  extend: 'Ext.data.Store',
  alias: 'store.purchasepaymentlinestore',

  requires: [
    'PurchasePayment.model.PurchasePaymentLineModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Json'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'PurchasePayment.model.PurchasePaymentLineModel',
      proxy: {
        type: 'ajax',
        url: '/api/purchase/payment/lines',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
        /*  writer: {
         type: 'json',
         clientIdProperty: 'clientId'
         }*/
      }

    }, cfg)]);
  }
});