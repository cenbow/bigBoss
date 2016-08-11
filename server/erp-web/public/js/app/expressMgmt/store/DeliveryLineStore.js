Ext.define('ExpressMgmt.store.DeliveryLineStore', {
  extend: 'Ext.data.Store',
  alias: 'store.deliverylinestore',

  requires: [
    'ExpressMgmt.model.DeliveryLineModel',
    'Ext.data.proxy.Ajax',
    'Ext.data.reader.Array'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'DeliveryLineStore',
      model: 'ExpressMgmt.model.DeliveryLineModel',

      proxy: {
        api: {
          create: '/api/general/logistics/delivery/line/create',
          read: '/api/general/logistics/delivery/line/list',
          update: '/api/general/logistics/delivery/line/update',
          destroy: '/api/general/logistics/delivery/line/delete'
        },

        type: 'ajax',
        reader: {
          type: 'json',
          rootProperty: 'data'
        },

        writer: {
          type: 'json',
          clientIdProperty: 'clientId'
        },
        listeners: {
          /*exception: function (proxy, response) {
            var msg = '服务器异常!';
            if(response && response.responseText) {
              var json = Ext.decode(response.responseText);
              msg = json.error && json.error.message? json.error.message : msg;
            }
            Ext.Msg.alert('错误', msg);
           /!* me.rejectChanges();*!/
          }*/
        }
      }
    }, cfg)]);
  }

});