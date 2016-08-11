Ext.define('PurchaseReturn.store.PurchaseReturnTypeStore', {
  extend: 'Ext.data.Store',
  alias: 'store.purchasereturntypestore',

  requires: [
    'Common.model.SelectOptionModel'
  ],

  constructor: function(cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      model: 'Common.model.SelectOptionModel',
      data: [
        {
          name: '退款',
          code: 'RETURN_REFUND'
        },
        {
          name: '换货',
          code: 'RETURN_EXCHANGE'
        },
        {
          name: '正常损耗',
          code: 'NORMAL_LOSS'
        }
      ]
    }, cfg)]);
  }
});