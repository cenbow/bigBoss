/*
 * File: app/view/MyViewportViewController.js
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

Ext.define('ExpressMgmt.view.MyViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.myviewport',
  init: function() {

  },
  /**
   * 添加物流信息
   * @param button
   * @param e
   * @param eOpts
   */
  onButtonClick: function (button, e, eOpts) {
    var viewCtr = this;

    var view = Ext.create('ExpressMgmt.view.ExpressWindow');
    var gridStore = viewCtr.getView().down('grid').store;
    view.getViewModel().set('gridStore', gridStore);
    view.show();
  },

  onButtonSearchClick: function (button, e, eOpts) {
    var viewCtr = this;
    var gridStore = viewCtr.getView().down('grid').store;
    var text = button.getValue();

    gridStore.getProxy().extraParams = {'text': text};
    gridStore.load();
  },
  /**
   * 快速搜索回车
   */
  onFastSearchTextFieldSpecialKey: function(field, e, options){
    if (e.getKey() === e.ENTER) {
      var me = this;
      var text = field.getValue();
      var gridStore = me.getView().down('grid').store;
      gridStore.getProxy().extraParams = {'text': text};
      gridStore.load();
    }
  },
  onCommandColumnClick: function (btn, event) {
    var viewCtr = this,
      command = btn.command,
      grid = viewCtr.getView().down('grid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'Update') {
      viewCtr._openUpdateDialog(record);
    } else if (command == 'Setting') {
      viewCtr._openSettingDialog(record);
    } else if (command == 'Delete') {
      viewCtr._deleteRecord(record);
    }
  },

  // private
  _openUpdateDialog: function (record) {
    var viewCtr = this;
    var grid = viewCtr.getView().down('grid');
    var ewView = Ext.create('ExpressMgmt.view.ExpressWindow');

    var weViewModel = ewView.getViewModel();
    weViewModel.set('gridStore', grid.store);
    weViewModel.set('isEdit', true);
    var form = ewView.down('form');
    form.loadRecord(record);

    ewView.show();

  },
  _openSettingDialog: function (record) {
    var viewCtr = this;

    var grid = viewCtr.getView().down('grid');
    var selectedData = record.data;

    var view = Ext.create('ExpressMgmt.view.WhsChooseWindow');
    var viewModel = view.getViewModel();
    viewModel.set('gridStore', grid.store);
    viewModel.set('logisticsId', selectedData.id);
    viewModel.set('logisticsName', selectedData.name);
    view.getController().refreshStore();
    view.show();

  },
  _deleteRecord: function (record) {
    var store = this.getView().down('grid').store;
    Ext.MessageBox.confirm('提示', '确认删除？', function (option) {
      if (option === 'yes') {
        store.remove(record);

        if (store.getCount() == 0) {
          store.reload({page: store.currentPage - 1});
        } else {
          store.reload();
        }

      }
    })
  },

  cellclick: function (tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    if (tableview.getGridColumns()[cellIndex].dataIndex == 'activeFlag') {
      record.set('activeFlag', record.get('activeFlag') === 'A' ? 'I' : 'A');
    }
  },
  itemdblclick: function (dataview, record, item, index, e, eOpts) {

    this._openUpdateDialog(record);
  }

});
