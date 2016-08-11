/**
 * Created by Junyi on 2016/7/26.
 */
Ext.define('PurchasePayment.store.PurchasePaymentTypeStore', {
  extend: 'Ext.data.Store',
  alias: 'store.purchasepaymenttypestore',

  requires: [
    'Common.model.SelectOptionModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.SelectOptionModel',
      proxy: {
        type: 'memory'
      },
      data: [
        {
          name: '付款',
          code: 'PAY'
        },
        {
          name: '收款',
          code: 'REFUND'
        }
      ]
    }, cfg)]);
  }
});