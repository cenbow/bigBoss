/**
 * 保存用户窗口状态信息
 */
Ext.define('Common.ux.RemoteStorageProvider', {
  extend: 'Ext.state.Provider',
  alias: 'state.remotestorage',

  //加载,设置,删除,重置
  loadAction: '/api/common/state/list',
  setAction: '/api/common/state/save',
  deleteAction: '/api/common/state/delete',

  constructor: function (cfg) {
    var me = this;
    me.callParent(arguments);
    cfg = cfg || {};
    me.store = me.load(cfg.appId);
    me.appId = cfg.appId;
    if(me.store) {
      me.state = me.readStore();
    } else {
      me.state = {};
    }

  },

  load: function (appId) {
    var me = this, store = {};
    Ext.Ajax.request({
      async : false,
      url: me.loadAction,
      params: {appId: appId},
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if(json && Ext.isArray(json.data)) {
            Ext.each(json.data, function (setting) {
              store[setting.stateId] = setting;
            });
          }
        }
      }
    });
    return store;
  },

  readStore: function() {
    var me = this, store = me.store,
      data = {};

    for (var stateId in store) {
      var setting = store[stateId];
      if(setting && setting.stateValue) {
        var stateValue = me.decodeValue(setting.stateValue);
        data[stateId] = stateValue;
        me.superclass.set.call(me, stateId, stateValue);
      }
    }

    return data;
  },

  //增强SET方法,修改本地同时提交服务器
  set: function (name, value) {
    var me = this;


    if (typeof value == "undefined" || value === null) {
      me.clear(name);
      return;
    }

    if (me.encodeValue(me.state[name]) == me.encodeValue(value)) {
      return;
    }

    var record = me.store[name] || {appId: me.appId, stateId: name};
    record.stateValue = me.encodeValue(value);
    Ext.Ajax.request({
      async : false,
      url: me.setAction,
      params: record,
      success: function(request) {
        var json = Ext.decode(request.responseText);
        if(json && json.data) {
          var setting = json.data;
          var stateId = setting.stateId;
          if(stateId) {
            me.store[stateId] = setting;
            me.state[stateId] = value;
            /*me.superclass.set.call(me, stateId, value);*/
          }
        }
      }
    });

    me.callParent(arguments);

  },
  get: function (name, value) {
    var me = this;
    return me.callParent(arguments);
  },
  /**
   * @private
   */
  clear: function (name) {
    var me = this;
    var record = me.store[name] || {};
    Ext.Ajax.request({
      url: me.deleteAction,
      params: record.id,
      success: function(res, opts) {
        delete me.store[name]
      }
    });
    me.callParent(arguments);
  }

});

