/*
 * File: app/view/MainViewportViewController.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CustomerMgmt.view.MainViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',

  requires: [],

  init: function () {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel();
    var userGrantShopStore = viewModel.getStore('usergrantshopstore');
    userGrantShopStore.addListener('load', function (curr, recs) {
      userGrantShopStore.insert(0, {key: -1, value: '全部'});
    });
  },
  /**
   * 查询
   */
  onButtonSearchClick: function ( button) {
    //Ext.MessageBox.confirm('提示', '查询?', function (option) {
    //})

    var form = button.ownerCt;
    if (!form.isValid()) {
      Ext.MessageBox.show({
        title : '错误',
        headerPosition: 'bottom',
        modal: true,
        msg : '查询条件格式不正确.',
        buttons : Ext.MessageBox.OK,
        icon : Ext.MessageBox.WARNING
      });
      return;
    }

    var formData = form.getValues();

    var store = Ext.data.StoreManager.getByKey('MainViewportStore');
    store.getProxy().extraParams = formData;
    store.load();
  },
  /**
   * 清空
   */
  onButtonClearClick: function (button) {
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var form = button.ownerCt;
    form.reset();
    var viewCtr = this;
    var store = Ext.data.StoreManager.getByKey('MainViewportStore');
    store.getProxy().extraParams = {};
    store.load();
  },

  /**
   * 添加用户   打开二级页面
   */
  onButtonAdduserClick: function (btn) {
    //Ext.create('CustomerMgmt.view.InfoDialogWindow').show();
    var viewCtr = this,
      dialog = Ext.create('CustomerMgmt.view.InfoDialogWindow');
    dialog.getViewModel().set('MainViewportViewController', viewCtr);
    dialog.show();
  },


  /**
   * 添加地址   打开二级页面
   */
  onButtonAddressClick: function (customerId) {
    var viewCtr = this,
      dialog = Ext.create('CustomerMgmt.view.AddressWindow');
    dialog.getViewModel().set('MainViewportViewController', viewCtr);
    dialog.show();
  },

  /**
   * 导入会员信息  打开二级页面
   */
  onButtonImportClick: function () {
    //Ext.create('CustomerMgmt.view.ImportWindow').show();
    var viewCtr = this,
      dialog = Ext.create('CustomerMgmt.view.ImportWindow');
    dialog.getViewModel().set('MainViewportViewController', viewCtr);
    dialog.show();
  },

  /**
   * 导出EXCEL
   */
  onButtonExportClick: function () {

  },

  /**
   * 操作  客户信息
   */

  onUserColumnClick: function (btn, event) {
    var me = this,
      command = btn.command,
      grid = me.lookupReference('CustomerMgmtGrid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);
    if (command == 'Update') {
      me._openUpdateDialog(record);
    }
  },
  _openUpdateDialog: function (record) {
    var me = this,
      dialog = Ext.create('CustomerMgmt.view.InfoDialogWindow', {}),
      dialogViewModel = dialog.getViewModel();
    dialogViewModel.set('mainViewportController', me);

    Ext.Ajax.request({
      url: '/api/general/customer/view/'+record.getData().id,
      method : 'GET',
      success: function(response){
        var formData = dialogViewModel.get('formData');
        var editData = Ext.decode(response.responseText).data;
        if (formData) {
          for (property in editData) {
            if (formData[property] !== undefined) {
              formData[property] = editData[property];
            }
          }
          formData.customerId = record.get('id')
        }
        dialog.getViewModel().set('formData', formData);//数据回现
      }
    });

    dialog.show();
  },

  /**
   * 操作  收货地址
   */
  onCommandColumnClick: function (btn, event) {
    var me = this,
      command = btn.command,
      grid = me.lookupReference('CustomerMgmtBottomGrid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);
    if (command == 'Update') {
      me._openAddress(record);
    } else if (command == 'Delete') {
      me._openDeleteDialog(record);
    }
  },

  /**
   * 打开收货信息
   * @param record
   * @private
   */
  _openAddress: function (record) {
    var viewCtr = this;
    var view = Ext.create("CustomerMgmt.view.AddressWindow" , {
      cityId: record.getData().cityId,
      districtId: record.getData().districtId
    });
    var form = view.down("form");
    form.loadRecord(record);
    view.show();
  },
  /**
   * 删除
   */
  _openDeleteDialog: function (record) {
    var store = this.getView().down('grid').store;
    Ext.MessageBox.confirm('提示', '确认删除?', function (option) {
      if (option === 'yes') {
        store.remove(record);
        console.log(record)
        if (store.getCount() == 0) {
          store.reload({page: store.currentPage - 1});
        } else {
          store.reload();
        }
      }
    })
  },

  /**
   * 同步
   */
  onSelectionChange: function (dataview, selected, eOpts) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore('receiptDetailGridStore');
    if (selected.length == 0) {
      store.removeAll();
    } else if (selected.length == 1) {
      var record = selected[0];
      var customerId = record.get("id");
      if (customerId) {
        var memberNick = record.get('memberNick');
        store.load({params: {customerId: customerId}, callback: function(records) {
          Ext.each(records, function(record) {
            record.set("memberNick", memberNick);
          });
        }});
      }
    }
  },
  /**
   * 双击编辑
   */
  onTableItemDblClick: function (dataview, record, item, index, e, eOpts) {
    this._openUpdateDialog(record);
  }
});
