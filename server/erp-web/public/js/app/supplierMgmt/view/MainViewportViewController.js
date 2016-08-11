Ext.define('SupplierMgmt.view.MainViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',

  requires: [
  ],
           
  /**
   * 添加供应商
   */
  onAddSupplierButtonClick: function (button, e, eOpts) {
    Ext.create("SupplierMgmt.view.AddDialog",{addFlag:'true'}).show();
  },

  /**
   * 快速搜索
   */
  onFastQueryButtonClick: function (button, trigger, e) {
	  var viewCtr = this;
      var gridStore = viewCtr.getView().down('grid').store;
      var text = button.getValue();
      gridStore.getProxy().setExtraParam("text", text);
      gridStore.load();
  },
  
  /**
   * 回车快速搜索
   * @param field
   * @param e
   */
  onEnterKey: function(field, e){
    if (e.getKey() == Ext.EventObject.ENTER) {
      this.onFastQueryButtonClick(field);
    }
  },

  /**
   * grid记录双击
   */
  onGridpanelItemDblClick: function (dataview, record, item, index, e, eOpts) {
	  if (Ext.Array.contains(_USER.permissions, "supplierMgmt:edit")) {
		  this._openInfoDialog(record);
	  }
  },

  /**
   * 是否启用
   */
  cellclick: function (tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
	  if (Ext.Array.contains(_USER.permissions, "supplierMgmt:edit")) {
		if (tableview.getGridColumns()[cellIndex].dataIndex == "activeFlag") {
		  record.set('activeFlag', record.get("activeFlag") === 'A' ? 'I' : 'A');
		}
	  }
  },

  /**
   * 主页命令行操作
   */
  onCommandColumnClick: function (btn, event) {
    var viewCtr = this,
        command = btn.command,
        grid = viewCtr.lookupReference("supplierMgmtGrid"),
        record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'Update') {
      viewCtr._openInfoDialog(record);
    }
  },
  
  /**
   * 弹出供应商编辑窗口
   * @param record
   */
  _openInfoDialog: function(record) {
    var viewCtr = this;
    var view = Ext.create("SupplierMgmt.view.AddDialog" , {
      gridStore : viewCtr.getView().down('grid').store,
      supplierId: record.getData().id,
      cityId: record.getData().cityId,
      districtId: record.getData().districtId
    });
    var form = view.down("form");
    form.loadRecord(record);
    view.show();
  },

  /**private***********************/

  /**
   * buttonGroup渲染前操作
   * @param buttonGroup
   * @param record 当前选中记录
   * @private
   */
  _onButtonGroupBeforeRender: function (buttonGroup, event) {
    var btnArray = buttonGroup.items.items,
        record = btnArray[0].ownerCt.getWidgetRecord();

    Ext.Array.each(btnArray, function(item, index) {
      if (Ext.Array.contains(_USER.permissions, "supplierMgmt:edit")) {
        Ext.Array.each(btnArray, function(item, index) {
          item.setDisabled(false);
        });
      } else {
        Ext.Array.each(btnArray, function(item, index) {
          item.setDisabled(true);
        });
      }
    });
  }
});
