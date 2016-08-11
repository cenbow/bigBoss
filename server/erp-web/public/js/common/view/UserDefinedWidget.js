Ext.define('Common.view.UserDefinedWidget', {
  extend: 'Ext.form.field.ComboBox',
  alias: 'widget.userdefinedwidget',

  requires: [
    'Common.util.TipsUtil'
  ],

  innerDialogConfig: null,

  defaultInnerDialogConfig: {
    dialogTitle: '',
    height: 260,
    width: 350,
    dataIndex: 'name',
    columnTitle: '',
    column1: {
      xtype: 'rownumberer'
    },
    column2: {
      xtype: 'actioncolumn',
      width: 30,
      sortable: false,
      menuDisabled: false,
      align: "center",
      items: [{
        iconCls: 'btn-delete',
        tooltip: '删除',
        isDisabled: function(view, rowIndex, colIndex, item, record) {
          var isSystem = record.get('isSystem');
          return isSystem && isSystem === 'Y';
        }
      }],
      /*renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
        record.set('editable', false)
      }*/
    },
    column3: {
      xtype: 'gridcolumn',
      flex: 1,
      align: 'center',
      text: '',
      editor: {
        xtype: 'textfield',
        allowBlank: false,
        blankText: '',
        msgTarget: 'side',
        maxLength: 20,
        maxLengthText: '长度控制在20个字符内',
      }
    }
  },

  constructor: function (cfg) {
    var me = this, cfg = cfg || {};

    if (cfg.defaultInnerDialogConfig) {
      Ext.raise('defaultInnerDialogConfig属性为私有属性，无法覆盖');
    }

    cfg.triggers = {
      innerDialogTriggers: {
        handler: me.createInnerDialog,
        extraCls: 'x-form-edit-trigger',
        weight: -1
      }
    };

    me.callParent(arguments);
  },

  createInnerDialog: function () {
    var me = this,
      defaultConfig = me.defaultInnerDialogConfig,
      innerDialogConfig = me.innerDialogConfig || {},
      columns = [], win;

    Ext.apply(defaultConfig, innerDialogConfig);

    Ext.Object.each(defaultConfig, function (key, value, myself) {
      if (key == 'column1' || key == 'column2' || key == 'column3') {
        if (key == 'column2') {
          value.items[0].handler = me.onRemoveButtonClick;
        }

        if (key == 'column3') {
          value.dataIndex = defaultConfig.dataIndex;
          value.text = defaultConfig.columnTitle;
          value.editor.blankText = '请填写' + defaultConfig.columnTitle + '名称';
        }
        columns.push(value);
      }
    });

    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
      pluginId: "selectIdCellEdit",
      clicksToEdit: 1,
      listeners: {
        beforeedit: me.onCellBeforeEdit
      }
    });

    win = Ext.create("Ext.window.Window", {
      title: defaultConfig.dialogTitle,
      height: defaultConfig.height,
      width: defaultConfig.width,
      modal: true,
      layout: 'fit',
      items: [{
        xtype: 'gridpanel',
        border: false,
        title: '',
        store: me.store,
        plugins: [cellEditing],
        columns: columns
      }],
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
          xtype: "button",
          text: "添加",
          iconCls: "btn-add",
          scope: me,
          handler: me.onAddButtonClick
        }]
      }, {
        xtype: 'toolbar',
        dock: 'bottom',
        layout: {
          pack: 'end',
          type: 'hbox'
        },
        ui: 'footer',
        items: [{
          xtype: "button",
          text: "保存",
          iconCls: "btn-save",
          scope: me,
          handler: me.onSaveButtonClick
        }, {
          xtype: "button",
          text: "取消",
          iconCls: "btn-cancel",
          scope: me,
          handler: me.onCancelButtonClick
        }]
      }]
    });

    me.win = win;
    win.show();

  },

  /**
   * 添加
   */
  onAddButtonClick: function () {
    var me = this,
      grid = me.win.down('grid'),
      store = me.store,
      model = store.getModel(),
      config = {},
      rec;

    config[me.defaultInnerDialogConfig.dataIndex] = "";
    rec = new model(config);

    store.insert(0, rec);
    grid.getPlugin("selectIdCellEdit").startEditByPosition({
      row: 0,
      column: 2
    });
    store.addCounts = (++store.addCounts) || 1;
  },

  /**
   * 删除
   */
  onRemoveButtonClick: function (grid, rowIndex) {
    var me = this,
      store = grid.getStore();

    store.remove(store.getAt(rowIndex));
    store.addCounts = --store.addCounts;
  },

  /**
   * 保存
   */
  onSaveButtonClick: function () {
    var me = this,
      defaultConfig = me.defaultInnerDialogConfig,
      grid = me.win.down("grid"),
      store = grid.getStore(),
      validateErrorInfo, gridDatas;

    if (!me.isStoreDirty(store)) {
      TipsUtil.showTips('提示', '当前数据没有变化，无需保存', TipsUtil.WARING);
      return ;
    }

    validateErrorInfo = me.getValidateErrorMessage(store);
    if (validateErrorInfo.length > 0) {
      TipsUtil.showTips("提示", validateErrorInfo.join('<br/>'), TipsUtil.WARING);
      return ;
    }

    gridDatas = me.getCurrPageDatas(store) || [];

    me.win.el.mask("正在保存，请稍候...");

    Ext.Ajax.request({
      url: store.getProxy().api['save'],
      params : {
        data: Ext.JSON.encode(gridDatas)
      },
      method : 'POST',
      timeout :60000,
      success : function(response, options) {
        var result = Ext.JSON.decode(response.responseText);
        me.win.el.unmask();
        if (result.success) {
          TipsUtil.showTips("提示", result.data, TipsUtil.INFO, function() {
            if(me.store) {
              me.store.reload();
            }
            var stores = defaultConfig.refreshToolbarStore.split(',');
            for(var i = 0; i < stores.length; i++){
              var refreshToolbarStore = Ext.getStore(stores[i]);
              if (refreshToolbarStore) {
                refreshToolbarStore.load();
              }
            }
            me.win.close();
          });
        } else {
          TipsUtil.showTips("提示", result.error.message, TipsUtil.WARING);
        }
      },
      failure : function(response, options) {
        me.win.el.unmask();
        TipsUtil.showTips('提示', "[" + response.status + "]: " + options.url + ":" + response.statusText, TipsUtil.ERROR);
      }
    });
  },

  /**
   * 取消
   */
  onCancelButtonClick: function (btn) {
    var me = this;

    if (me.isStoreDirty(me.store)) {
      Ext.MessageBox.confirm("警告", "当前页面数据已被修改，是否丢弃已修改的数据？", function(btnId) {
        if (btnId == 'yes') {
          me.store.rejectChanges();
          me.store.addCounts = 0;
          me.win.close();
        }
      });
    } else {
      me.win.close();
    }
  },

  onCellBeforeEdit: function(editor, context, eOpts ) {
    if (context.colIdx == 2) {
      var phantom = context.record.phantom;
      var isSystem = context.record.get('isSystem');
      if (!phantom || (isSystem === 'Y')) {
        return false;
      }
    }
    return true;
  },

  isStoreDirty: function(store) {
    var dirty = store.getModifiedRecords().length;
    dirty = dirty || store.getNewRecords().length;
    dirty = dirty || store.getRemovedRecords().length;
    dirty = dirty || store.addCounts;

    return !!dirty;
  },

  getCurrPageDatas: function(store) {
    var resultArray = [];

    if (store.getCount() == 0) {
      return ;
    }

    store.each(function(item) {
      var data = Ext.clone(item.data);
      if (!data.createDate) {
        delete data.id;
      }
      resultArray.push(data);
    });

    return resultArray;
  },

  getValidateErrorMessage: function(store) {
    var me = this,
      defaultConfig = me.defaultInnerDialogConfig,
      validateKeys = [defaultConfig.dataIndex],
      validateResult = [];

    var rowNum = 0;
    store.each(function(item) {
      rowNum++;
      if (!item.isValid()) {
        var error = item.validate();
        var temp = [];
        Ext.Array.each(validateKeys, function(key) {
          var errorInfo = error.get(key);
          if (errorInfo && item.data.hasOwnProperty(key)) {
            temp.push(errorInfo.getMessage());
          }
        });
        if (temp.length > 0) {
          validateResult.push('第' + rowNum + '行数据:' + temp.join(' ; '));
        }
      } else {
        if (Ext.String.trim(item.data[defaultConfig.dataIndex]) == '') {
          validateResult.push('第' + rowNum + '行数据:数据未填写');
        }
      }
    });

    return validateResult;
  }
});