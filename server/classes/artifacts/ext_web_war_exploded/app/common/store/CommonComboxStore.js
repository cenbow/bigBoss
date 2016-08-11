Ext.define('Common.store.CommonComboxStore', {
  extend: 'Ext.data.Store',
  alias: 'store.common.commoncomboxstore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};

    if (!cfg.url) {
      Ext.raise('Need to configurate url');
    }

    if (!cfg.idMapping) {
      cfg.idMapping = 'id'
    }

    if (!cfg.nameMapping) {
      cfg.nameMapping = 'name'
    }

    me.callParent([Ext.apply({
      fields: [
        {
          name: 'id', mapping: cfg.idMapping
        },
        {
          name: 'name', mapping: cfg.nameMapping
        }
      ],
      proxy: {
        type: 'ajax',
        url: cfg.url,
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }, cfg)]);

    /*是否添加{id: -1, name: '全部'}*/
    if (cfg.allFlag) {
      var allRec = {id: -1, name: '全部'};

      me.insert(0, allRec);

      /*清空原有的store数据*/
      me.on('beforeload', function(store) {
        store.removeAll();
      }, me, {single: true});

      /*为新的纪录添加{id: -1, name: '全部'}*/
      me.on('load', function(store, recs) {
        if (recs && recs.length > 0) {
          store.insert(0, allRec);
        }
      }, me, {single: true});
    }
  }
});