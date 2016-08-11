Ext.define('Common.view.PurchaseSearchFormViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.purchasesearchform',

  init: function () {
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var comboboxStore = viewModel.getStore('inStatusStore');
    var type = view.inventoryType;
    viewModel.set('inventoryType', type);
    if (type == 'PURCHASE_RECEIPT') {
      viewModel.set('postDateLabel', '入库日期');
      viewModel.set('baseNoLabel', '收货单号');
    } else if (type == 'PURCHASE_RETURN') {
      viewModel.set('postDateLabel', '出库日期');
      viewModel.set('baseNoLabel', '退货单号');
      comboboxStore = viewModel.getStore('outStatusStore');
    }

    var combobox = Ext.ComponentQuery.query('#status')[0];

    combobox.bindStore(comboboxStore);

    Ext.each(view.items.items, function(item) {
      item.addListener('specialkey', me.onFastSearch, me)
    });
    
    var whsStore = viewModel.getStore('whsStore');
    me._insertOptionAll(whsStore);
    
    var supplierStore = viewModel.getStore('supplierStore');
    me._insertOptionAll(supplierStore);
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
  },

	/**
   *  更改日期选择条件
   */
  postDateFromChage :function(me, newValue, oldValue, eOpts ) {
    var postDateToEl = Ext.getCmp('purchaseSearchPostDateTo');
    postDateToEl.setMinValue( newValue );
  },
  postDateTo:function(me, newValue, oldValue, eOpts ) {
    var postDateFromEL = Ext.getCmp('purchaseSearchPostDateFrom');
    postDateFromEL.setMaxValue( newValue );
  }

});