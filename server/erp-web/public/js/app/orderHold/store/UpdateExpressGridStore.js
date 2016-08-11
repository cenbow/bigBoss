/**
 * Created by Junyi on 2016/8/4.
 */

Ext.define('OrderHold.store.UpdateExpressGridStore', {
  extend: 'Ext.data.Store',

  requires: [
    'OrderHold.model.UpdateExpressModel'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'UpdateExpressStoreId',
      model: 'OrderHold.model.UpdateExpressModel',
      data: [
        {
          code:"QW21",
          name:"圆通速递"
        }
      ]
    }, cfg)]);
  }
});
