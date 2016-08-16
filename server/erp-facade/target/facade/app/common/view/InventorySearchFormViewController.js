Ext.define('Common.view.InventorySearchFormViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.inventorysearchform',

  init: function () {
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var comboboxStore = viewModel.getStore('inStatusStore');
    var type = view.inventoryType;
    viewModel.set('hiddenRange', true);
    viewModel.set('inventoryType', type);
    if (type == 'STOCK_TRANSFER') {
      viewModel.set('postDateLabel', '调拨时间');
      viewModel.set('baseNoLabel', '调拨单号');
      viewModel.set('hiddenRange', false);
    } else if (type == 'GOODS_RECEIPT') {
      viewModel.set('postDateLabel', '入库时间');
      viewModel.set('baseNoLabel', '入库单号');
    } else if (type == 'GOODS_ISSUE') {
      viewModel.set('postDateLabel', '出库时间');
      viewModel.set('baseNoLabel', '出库单号');
      comboboxStore = viewModel.getStore('outStatusStore');
    }

    var combobox = Ext.ComponentQuery.query('#status')[0];

    combobox.bindStore(comboboxStore);

    Ext.each(view.items.items, function(item) {
        item.addListener('specialkey', me.onFastSearch, me)
    });
    var whsStore = viewModel.getStore('whsStore');
    me._insertOptionAll(whsStore);
  },
  _insertOptionAll : function(store) {
    store.on('load', function() {
      store.insert(0, {id: -1, name: '全部'});
    })
  },

  /**
   * 搜索
   */
  onButtonSearchClick: function () {
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var form = Ext.ComponentQuery.query('form')[0];
    if (!form.isValid()) {
      Ext.MessageBox.alert("提示", "查询条件格式不正确.");
      return;
    }
    var formData = form.getValues();
    var store = viewModel.get('store');
    for (var key in formData) {
      var data = formData[key];
      if(!data || data == -1) {
        delete formData[key];
      }
    }
    store.getProxy().extraParams = formData;
    store.load();
  },
  /**
   * 快速搜索
   * @param field
   * @param e
   */
  onFastSearch: function (field, e) {
    var me = this;
    if (e.getKey() === e.ENTER) {
      me.onButtonSearchClick();
    }
  },
  /**
   * 清空
   */
  onButtonClearClick: function () {
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var form = Ext.ComponentQuery.query('form')[0];
    form.reset();
    
    var store = viewModel.get('store');
    store.getProxy().extraParams = {};
    store.loadPage(1);
  },
  /**
   * 搜索商品
   * @param field
   */
  onButtonGoodsChooseClick: function (field) {
    var dialog = Ext.create('Common.view.GoodsChooseDialog', {
      callback: function (records) {
        var arr = [];
        if (!records) {
          return;
        }
        Ext.Array.each(records, function (record) {
          arr.push(record.skuCode);
        });
        field.setValue(arr.join(','));
      }
    });
    var dialogStore = dialog.getViewModel().getStore("gridStore");
    dialogStore.load();
    dialog.show();
  }
});