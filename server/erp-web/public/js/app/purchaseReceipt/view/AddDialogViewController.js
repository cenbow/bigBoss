Ext.define('PurchaseReceipt.view.AddDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.adddialog',

  requires: [
    'Common.ux.StoreLoadCoordinator'
  ],

  init: function () {
    var me = this;
    Ext.Ajax.request({
      url: '/api/general/company/setting/view',
      success: function (response, opts) {
        var data = JSON.parse(response.responseText).data;
        var viewModel = me.getViewModel();
        viewModel.set('purchaseAllowOverReceipt',data.purchaseAllowOverReceipt)
      }
    });
  },

  /**
   * 初始化页面数据
   */
  initPage: function () {
    var me = this;
    var viewModel = me.getViewModel();
    var purchaseReceiptId = viewModel.get("purchaseReceiptId");
    Ext.Ajax.request({
      method: 'GET',
      url: '/api/purchase/purchase/receipt/view',
      params: {purchaseReceiptId: purchaseReceiptId},
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (json.success) {
            viewModel.set(json.data);
            var supplierIdEL = Ext.getCmp("supplierId");
            supplierIdEL.disable(false);
            supplierIdEL.submitValue = true;
            var whsIdEL = Ext.getCmp("whsId");
            whsIdEL.disable(false);
            whsIdEL.submitValue = true;
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
          var store = viewModel.getStore('purchaseReceiptLineGridStore');
          store.load({params: {purchaseReceiptId: purchaseReceiptId}});
        }
      }
    });
  },

  /**
   * 仓库修改之后，更新库区名称下拉框，重新查询明细列表grid
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
    var gridstore = viewModel.getStore("purchaseReceiptLineGridStore");
    gridstore.queryBy(function (item) {
      item.set('whsId', whsId);
    })
  },

  /**
   * 库区修改之后，更新grid里面的入库库区
   * @param option
   */
  onWhsAreaChange: function (option) {
    var me = this;
    var viewModel = me.getViewModel();

    var whsAreaId = option.getValue();
    var store = viewModel.getStore("purchaseReceiptLineGridStore");
    store.queryBy(function (item) {
      if (whsAreaId) {
        item.set("whsAreaId", whsAreaId);
      } else {
        item.set("whsAreaId", '');
      }
    })
  },

  /**
   * 供应商修改之后，重新查询明细列表grid
   * @param option
   */
  onSupplierChange: function (option) {
    var me = this;
    var viewModel = me.getViewModel();

    var supplierId = option.getValue();
    var store = viewModel.getStore("purchaseReceiptLineGridStore");
    store.queryBy(function (item) {
      if (whsAreaId) {
        item.set("whsAreaId", whsAreaId);
      } else {
        item.set("whsAreaId", '');
      }
    })
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

  ///**
  // * grid里修改退货类型
  // */
  //renderType: function (type, meta, record) {
  //  var me = this;
  //  var viewModel = me.getViewModel();
  //  var store = viewModel.getStore("purchaseReturnTypeStore");
  //  var whsRecord = store.getById(type);
  //  //grid上返回类型显示
  //  return whsRecord ? whsRecord.get("name") : null;
  //},
  
  editRow: function() {
    var me = this, view = me.getView();
    var grid = view.down('grid'), selection = grid.getSelectionModel().getSelection();
    if(selection && selection.length) {
      var record = selection[0];
      me.getLineTotal(record);
    }
  },
  
  getLineTotal: function (record) {
    var viewModel = this.getViewModel();
    var purchaseAllowOverReceipt = viewModel.get('purchaseAllowOverReceipt')

    //本次入库数量
    var purchaseQty = record.get('purchaseQty');//本次收货数量
    var price = record.get('price');//单价
    var proportion = record.get('proportion');
    record.set('quantity',purchaseQty*proportion);

    //超收成本平均
    var remainingQty = record.get('remainingQty');//剩余到货数量

    if(purchaseQty*proportion > remainingQty && purchaseAllowOverReceipt=="false"){
      TipsUtil.showTips("提示", "公司不允许超收货物");
      viewModel.set('isOver', "true");
      return;
    }else {
      viewModel.set('isOver', "false")
    }

    var purchaseUnit = record.get('purchaseUnit');//采购单位
    if(purchaseUnit.length>20){
      TipsUtil.showTips("提示", "单位字符长度不允许超过20");
      viewModel.set('isUnitOver', "true");
    }else{
      viewModel.set('isUnitOver', "false");
    }

    if(purchaseQty > remainingQty) {
      price = price*remainingQty/(purchaseQty*proportion);
      record.set('price',price);
    }

    var quantity = record.get('quantity');
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
    var store = viewModel.getStore("purchaseReceiptLineGridStore");
    if (store.getCount() == 0) {
      TipsUtil.showTips("提示", "缺少采购订单明细信息");
      return;
    }
    var purchaseReceipt = form.getValues() || {};

    if (!purchaseReceipt.postDate) {
      delete purchaseReceipt.postDate;
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
      var skuId = line.get('skuId');
      var whsAreaId = line.get('whsAreaId');
      if(isNaN(skuId) || isNaN(whsAreaId)) {
        TipsUtil.showTips("提示", "采购订单明细信息有误");
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
    purchaseReceipt.purchaseReceiptLines = Ext.encode(lineArr);
    return purchaseReceipt;
  },
  
  /**
   * 保存成草稿
   */
  onButtonSaveDraftClick: function () {
    var me = this;
    var view = me.getView();
    var viewModel = this.getViewModel();
    var isOver = viewModel.get('isOver');
    if(isOver == 'true'){
      TipsUtil.showTips("提示", "公司不允许超收货物");
      return;
    }

    var isUnitOver = viewModel.get('isUnitOver');
    if(isUnitOver == 'true'){
      TipsUtil.showTips("提示", "单位字符长度不允许超过20");
      return;
    }

    var purchaseReturn = me._dataForSubmit();
    if (purchaseReturn) {
      purchaseReturn.status = 'DRAFT';
      me.receiptUpate(purchaseReturn);
    }
  },
  
  /**
   * 保存并出库
   */
  onButtonSavePostClick: function () {
    var me = this;
    var view = me.getView();
    var viewModel = this.getViewModel();
    var isOver = viewModel.get('isOver');
    if(isOver == 'true'){
      TipsUtil.showTips("提示", "公司不允许超收货物");
      return;
    }

    var isUnitOver = viewModel.get('isUnitOver');
    if(isUnitOver == 'true'){
      TipsUtil.showTips("提示", "单位字符长度不允许超过20");
      return;
    }

    var purchaseReturn = me._dataForSubmit();
    if (purchaseReturn) {
      purchaseReturn.status = 'TRANSFERRED_IN';
      me.receiptUpate(purchaseReturn);
    }
  },

  receiptUpate: function(param)　{
    var view = this.getView();
    Ext.Ajax.request({
      method: 'POST',
      url: '/api/purchase/purchase/receipt/update',
      params: param,
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
            url: '/api/inventory/purchase/receipt/cancel/' + data.id,
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


  onButtonChooseClick: function() {
    var me = this;

    var purchaseOrderLineDialog = Ext.create('Common.view.PurchaseOrderLineDialog',{
      parent: me.getView(),
      callback: me.getOrderLineSummaries,
      scope: me
    });
    var supplierId = this.getView().down('#supplier').getValue();
    var whsId = this.getView().down('#whs').getValue();
    if(supplierId && whsId) {
      purchaseOrderLineDialog.show();
    }
  },

  /**
   * 从采购订单明细选择中回调
   * @param records
   */
  getOrderLineSummaries: function (records) {
    var me = this.scope;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("purchaseReceiptLineGridStore");

    var grid = view.down('grid'), selections = grid.getSelectionModel().getSelection();
    me._addOrderLineListIntoStore(store, records, {selections:selections, mustUnique:viewModel.get('mustUnique')});
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
        if(record && option.mustUnique) { //已存在不作处理
        } else {
          var purchaseOrderLineId = orderLine.id;
          var purchaseOrderId = orderLine.purchaseOrderId;
          var purchaseOrderNo = orderLine.purchaseOrderNo;
          var productCode = orderLine.productCode;
          var skuCode = orderLine.skuCode;
          var skuName = orderLine.skuName;
          var remainingQty = orderLine.remainingQty;
          var proportion = orderLine.proportion;
          var totalStockQty = parseInt(orderLine.stockQty);
          var totalOverReceiptQty = parseInt(orderLine.overReceiptQty);
          var quantity = 0;
          var price = parseFloat(orderLine.price || 0.0);
          var lineTotal = price;
          var memo = orderLine.memo || '';

          if(option.selections && option.selections.length && option.selections.length>index) {
            record = option.selections[index];
            for (var key in orderLine) {
              record.set(key, orderLine[key])
            }
          } else {
            record = new store.model(orderLine);
            store.add(record);
          }
          record.set("purchaseQty", 1);
          record.set("proportion", proportion?proportion:1);
          record.set("purchaseOrderLineId", purchaseOrderLineId);
          record.set("purchaseOrderId", purchaseOrderId);
          record.set("purchaseOrderNo", purchaseOrderNo);
          record.set("productCode", productCode);
          record.set("skuCode", skuCode);
          record.set("skuName", skuName);
          record.set("remainingQty",remainingQty);
          record.set("totalStockQty", totalStockQty);
          record.set("totalOverReceiptQty", totalOverReceiptQty);
          record.set("quantity", quantity);
          record.set("whsId", whsId);
          record.set("whsAreaId", whsAreaId);
          record.set("price", price);
          record.set("lineTotal", lineTotal);
          record.set("memo", memo);

          me.getLineTotal(record);

          index++;
        }
      });
    }
  },

});