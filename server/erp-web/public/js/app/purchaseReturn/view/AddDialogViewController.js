Ext.define('PurchaseReturn.view.AddDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.adddialog',

  requires: [
    'Common.ux.StoreLoadCoordinator'
  ],

  init: function () {

  },

  /**
   * 初始化页面数据
   */
  initPage: function () {
    var me = this;
    var viewModel = me.getViewModel();
    var purchaseReturnId = viewModel.get("purchaseReturnId");
    Ext.Ajax.request({
      method: 'GET',
      url: '/api/inventory/purchase/return/view',
      params: {purchaseReturnId: purchaseReturnId},
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (json.success) {
            viewModel.set(json.data);
            var supplierIdEL = Ext.getCmp("supplierId");
            supplierIdEL.submitValue = true;
            supplierIdEL.disable(false);
            var whsIdEL = Ext.getCmp('whsId');
            whsIdEL.submitValue = true;
            whsIdEL.disable(false);
          } else {
            TipsUtil.showTips("错误", json.error.message || "服务器错误！");
          }
        }
      }
    });

    var whsStore = viewModel.getStore("whsStore"),
        whsAreaStore = viewModel.getStore("whsAreaStore"),
        supplierStore = viewModel.getStore("supplierStore");

    Ext.create('Common.ux.StoreLoadCoordinator', {
      stores: [whsStore, whsAreaStore, supplierStore],
      listeners: {
        load: function () {
          //等仓库和库区、供应商的store加载完了再获取数据
          var store = viewModel.getStore('returnDetailGridStore');
          store.load({params: {purchaseReturnId: purchaseReturnId}});
        }
      }
    });
  },

  /**
   * 仓库修改之后，更新库区名称下拉框，清空明细列表grid
   * @param option
   */
  onWhsChange: function (option) {
    var me = this;
    var viewModel = me.getViewModel();

    var whsId = option.getValue();
    var store = viewModel.getStore("whsAreaStore");
    if (store && Number.isInteger(parseInt(whsId))) {
      store.load({
        params: {id: whsId},
        scope: store
      });
    }
    var gridstore = this.getView().down('grid').store;
    gridstore.removeAll();
  },

  /**
   * 库区修改之后，更新grid里面的入库库区
   * @param option
   */
  onWhsAreaChange: function (option) {
    var me = this;
    var viewModel = me.getViewModel();

    var whsAreaId = option.getValue();
    var store = viewModel.getStore("returnDetailGridStore");
    store.queryBy(function (item) {
      if (whsAreaId) {
        item.set("whsAreaId", whsAreaId);
      } else {
        item.set("whsAreaId", '');
      }
    })
  },

  /**
   * 供应商修改之后，清空明细列表grid
   * @param option
   */
  onSupplierChange: function (option) {
	var gridstore = this.getView().down('grid').store;
    gridstore.removeAll();
  },
  
  /**
   * grid里修改库区
   */
  renderAreaStore: function (whsAreaId, meta, record) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("whsAreaStore");
    var whsRecord = store.getById(whsAreaId);
    me.getPickLoc(record);
    //grid上返回库区显示
    return whsRecord ? whsRecord.get("name") : null;
  },

  /**
   * grid里修改退货类型
   */
  renderType: function (type, meta, record) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("purchaseReturnTypeStore");
    var typeRecord = store.findRecord("code", type);
    //grid上返回类型显示
    return typeRecord ? typeRecord.get("name") : null;
  },
  
  editRow: function() {
    var me = this, view = me.getView();
    var grid = view.down('grid'), selection = grid.getSelectionModel().getSelection();
    if(selection && selection.length) {
      var record = selection[0];
      me.getLineTotal(record);
    }
  },
  
  getLineTotal: function (record) {	
    var quantity = record.get('quantity');
	var totalStockQty = record.get('totalStockQty');
	var totalOverReceiptQty = record.get('totalOverReceiptQty');
	var num = totalStockQty - totalOverReceiptQty - quantity;
	if(num < 0) {
	  TipsUtil.showTips("提示", "退货数量不符合要求");
	  record.set('quantity', 1);
	}
    var price = record.get('price');
    var lineTotal = quantity * price;
    record.set('lineTotal', lineTotal);
  },

  getPickLoc: function (record) {
    var whsId = record.get('whsId'),
      whsAreaId = record.get('whsAreaId'),
      skuId = record.get('skuId');

    if (whsId && whsAreaId && skuId) {
      Ext.Ajax.request({
        method: 'GET',
        url: '/api/inventory/warehouse/pickloc/view',
        params: {skuId: skuId, whsId: whsId, whsAreaId: whsAreaId},
        success: function (request) {
          if (request.responseText) {
            var json = Ext.decode(request.responseText);
            if (json.success) {
              if (json.data) {
                record.set("whsPickLoc", json.data.location);
              } else {
                record.set("whsPickLoc", '');
              }
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      })
    } else {
      record.set("whsPickLoc", '');
    }
  },

  /**
   * 统一获取提交数据
   * @returns {*}
   * @private
   */
  _dataForSubmit: function () {
    var me = this;
    var form = me.getView().down('form');
    if (!form.isValid()) {
      return false;
    }

    var viewModel = me.getViewModel();
    var store = viewModel.getStore("returnDetailGridStore");
    if (store.getCount() == 0) {
      TipsUtil.showTips("提示", "缺少采购订单明细信息");
      return;
    }
    var purchaseReturn = form.getValues() || {};

    if (!purchaseReturn.postDate) {
      delete purchaseReturn.postDate;
    }
    
    var lines = store.getRange();
    var lineArr = [];
    var whs = Ext.ComponentQuery.query("#whs")[0];
    var whsId = whs.getValue();
    if( isNaN(whsId) ) {
      TipsUtil.showTips("提示", "请选择仓库");
      return;
    }
    var lineFail = false;
    Ext.each(lines, function (line) {
      line.set("whsId", whsId);
      lineArr.push(line.getData());
      var whsAreaId = line.get('whsAreaId');
      if(isNaN(whsAreaId)) {
        TipsUtil.showTips("提示", "采购订单明细中请选择库区");
        lineFail = true;
        return false;
      }
      var typeCode = line.get('type');
      if(!typeCode) {
        TipsUtil.showTips("提示", "采购订单明细中请选择退货类型");
        lineFail = true;
        return false;
      }
      var quantity = line.get('quantity');
  	  var totalStockQty = line.get('totalStockQty');
  	  var totalOverReceiptQty = line.get('totalOverReceiptQty');
  	  var num = totalStockQty - totalOverReceiptQty - quantity;
  	  if(num < 0) {
  	    TipsUtil.showTips("提示", "退货数量不符合要求");
  	    lineFail = true;
        return false; 
  	  }
      var memo = line.get('memo');
      if(memo.length > 255) {
    	TipsUtil.showTips("提示", "备注不能超过255个字符");
        lineFail = true;
        return false; 
      }
    });
    if(lineFail) {
      return;
    }
    purchaseReturn.purchaseReturnLines = Ext.encode(lineArr);
    return purchaseReturn;
  },
  
  /**
   * 保存成草稿
   */
  onButtonSaveDraftClick: function () {
    var me = this;
    var view = me.getView();
    var purchaseReturn = me._dataForSubmit();
    if (purchaseReturn) {
      Ext.Ajax.request({
        method: 'POST',
        url: '/api/inventory/purchase/return/draft',
        params: purchaseReturn,
        success: function (request) {
          if (request.responseText) {
            var json = Ext.decode(request.responseText);
            if (json.success) {
              view.callback();
              view.close()
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      });
    }
  },
  
  /**
   * 保存并出库
   */
  onButtonSavePostClick: function () {
    var me = this;
    var view = me.getView();
    var purchaseReturn = me._dataForSubmit();
    if (purchaseReturn) {
      Ext.Ajax.request({
        method: 'POST',
        url: '/api/inventory/purchase/return/out',
        params: purchaseReturn,
        success: function (request) {
          if (request.responseText) {
            var json = Ext.decode(request.responseText);
            if (json.success) {
              view.callback();
              view.close()
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      });
    }
  },
  
  /**
   * 取消出库
   */
  onButtonCancelClick: function () {
    var me = this;
    var view = me.getView();
    var form = view.down('form');
    var data = form.getValues();
    if (data.id) {
      Ext.MessageBox.confirm('提示', '确认取消？',function(option) {
        if (option === 'yes') {
          Ext.Ajax.request({
            method: 'POST',
            url: '/api/inventory/purchase/return/cancel/' + data.id,
            success: function (request) {
              if (request.responseText) {
                var json = Ext.decode(request.responseText);
                if (json.success) {
                  view.callback();
                  view.close()
                } else {
                  TipsUtil.showTips("错误", json.error.message || "服务器错误！");
                }
              }
            }
          });
        }
      });
    }
  },
  
  /**
   * 关闭窗口
   */
  onButtonCloseClick: function () {
    var me = this;
    me.getView().close()
  },

  /**
   * btn-group的动作进行
   * @param btn
   * @param event
   */
  onCommandColumnClick: function (btn, event) {
    var viewCtr = this,
      command = btn.command,
      grid = viewCtr.getView().down('grid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'Delete') {
      viewCtr._deleteRecord(record);
    }
  },
  
  /**
   * 删除采购订单明细中的采购订单
   * @param record
   * @private
   */
  _deleteRecord: function (record) {
    var store = this.getView().down('grid').store;
    Ext.MessageBox.confirm('提示', '确认删除？', function (option) {
      if (option === 'yes') {
        store.remove(record);
      }
    })
  },

  /**
   * 选择采购订单明细
   */
  onButtonChooseClick: function () {
    var me = this;
    me._openChooseDialog();
  },
  
  _openChooseDialog: function (records) {
    var me = this;
    var vm = me.getViewModel();
    
    var supplier = Ext.ComponentQuery.query("#supplier")[0];
    var supplierId = supplier.getValue();    
    var whs = Ext.ComponentQuery.query("#whs")[0];
    var whsId = whs.getValue();
    if( !whsId || !supplierId) {
      TipsUtil.showTips("提示", "请先选择供应商和仓库");
      return;
    }
    
    var orderlinesChoose = Ext.create("Common.view.PurchaseOrderLineDialog", {
      parent: me.getView(),
      callback: me.getOrderLineSummaries,
      scope: me
    });
    
    orderlinesChoose.show();
  },
  
  /**
   * 从采购订单明细选择中回调
   * @param records
   */
  getOrderLineSummaries: function (records) {
    var me = this.scope;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("returnDetailGridStore");

    var grid = view.down('grid'), selections = grid.getSelectionModel().getSelection();
    me._addOrderLineListIntoStore(store, records, {selections:selections});
  },
  
  /**
   * 将采购订单明细放入明细列表里
   * @param store
   * @param list
   * @private
   */
  _addOrderLineListIntoStore: function (store, list, option) {
    option = option || {};
    var me = this;
    var view = me.getView();

    //找到空行并添加
    store.queryBy(function(item) {
      option.selections = option.selections || [];
      var selection = option.selections[0] || {};
      if(isNaN(item.id) && selection.id != item.id) {
        option.selections.push(item)
      }
    });

    var whs = Ext.ComponentQuery.query("#whs")[0];
    var whsArea = Ext.ComponentQuery.query("#whsArea")[0];

    var whsId = whs.getValue();
    var whsAreaId = whsArea.getValue();

    if (list && Ext.isArray(list)) {
      var index = 0;
      Ext.each(list, function (orderLine) {
        var record = store.getById(orderLine.id);
        if(record) { //已存在不作处理
        } else {
          var purchaseOrderLineId = orderLine.id;
          var purchaseOrderId = orderLine.purchaseOrderId;
          var purchaseOrderNo = orderLine.purchaseOrderNo;
          var productCode = orderLine.productCode;
          var skuCode = orderLine.skuCode;
          var skuName = orderLine.skuName;
          var totalStockQty = parseInt(orderLine.stockQty);
          var totalOverReceiptQty = parseInt(orderLine.overReceiptQty);
          var quantity = 1;
          var price = parseFloat(orderLine.price || 0.0);
          var lineTotal = quantity * price;
          var memo = orderLine.memo || '';
         
          record = new store.model(orderLine);
          store.add(record);
          
          record.set("purchaseOrderLineId", purchaseOrderLineId);
          record.set("purchaseOrderId", purchaseOrderId);
          record.set("purchaseOrderNo", purchaseOrderNo);
          record.set("productCode", productCode);
          record.set("skuCode", skuCode);
          record.set("skuName", skuName);
          record.set("totalStockQty", totalStockQty);
          record.set("totalOverReceiptQty", totalOverReceiptQty);
          record.set("quantity", quantity);
          record.set("whsId", whsId);
          record.set("whsAreaId", whsAreaId);
          record.set("price", price);
          record.set("lineTotal", lineTotal);
          record.set("memo", memo);
          index++;
        }       
      });
    }
  }
});