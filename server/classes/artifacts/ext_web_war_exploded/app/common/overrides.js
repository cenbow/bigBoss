Ext.Loader.setConfig({
  // TODO remove the following line in production
  disableCaching: false,
  enabled: true,
  paths: {
    'Common': 'js/common',
    'Ext': 'js/extjs'
  }
});

/**
 * store默认分页为30
 */
Ext.data.Store.override({
  pageSize: 30
});

/**
 * 默认不允许排序
 */
Ext.apply(Ext.grid.column.Column.prototype, {
  sortable: false
});

Ext.tip.QuickTipManager.init();

Ext.apply(Ext.button.Button.prototype, {
  focusCls: ""
});
Ext.apply(Ext.resizer.Splitter.prototype, {
  focusCls: ""
});

Ext.get(window).on('load', function () {
  var job = new Ext.util.DelayedTask(function () {
    Ext.get('loading').fadeOut({
      duration: 200, //遮罩渐渐消失
      remove: true
    });

    Ext.get('loading-mask').fadeOut({
      duration: 200,
      remove: true
    });
  });
  job.delay(5);
});

Ext.Ajax.on('requestexception', function(conn, response, options, e) {
  var status = response.status,
      result, message;

  console.info(response);
  if (status == 403 || status == 401) {
    result = Ext.decode(response.responseText);
    message = result.error.message;
  }

  if (status == 404) {
    try {
      result = Ext.decode(response.responseText);
      message = result.error.message;
    } catch(e) {
      message = "地址：[" + options.url + "]不正确";
    }
  }

  if (status == 500) {
    message = "服务器错误";
  }

  Ext.MessageBox.show({
    title : "提示",
    msg : message,
    buttons : Ext.MessageBox.OK,
    icon : Ext.MessageBox.ERROR,
    fn: function() {
      if (status == 401) {
        window.location.href = '';
      }
    }
  });
});

Ext.grid.Panel.override({
  stateful: this.stateful ? this.stateful : true,
  getStateId: function () {
    var me = this, defaultId = me.id, pos = defaultId.lastIndexOf('-');
    if (pos !== -1) {
      defaultId = defaultId.substring(0, pos);
    }

    var win = me.up('window', true);
    if (win) {
      var defaultWinId = win.id;
      if (win.autoGenId) {
        defaultWinId = defaultWinId.substring(0, defaultWinId.lastIndexOf('-'));
      }
      defaultId = defaultWinId + '_' + defaultId;
    } else {
      var grids = Ext.ComponentQuery.query('gridpanel');
      //viewport里有多个grid时,自动生成stateId
      if (grids && Ext.isArray(grids)) {
        Ext.each(grids, function (grid, index) {
          if (grid.id == me.id) {
            defaultId += '_' + index;
          }
        });
      } else {
        return;
      }
    }

    return me.stateId || (me.autoGenId ? defaultId : me.id);
  }
});

//Ext.state.Manager.setProvider(Ext.create('Common.ux.RemoteStorageProvider', {appId: _APPID}));
