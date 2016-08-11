Ext.define('GoodsReceipt.view.AddDialogViewController', {
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
    var receiptId = viewModel.get("receiptId");
    Ext.Ajax.request({
      method: 'GET',
      url: '/api/inventory/goods/receipt/view',
      params: {receiptId: receiptId},
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (json.success) {
        	var receiptTypesStore = me.view.receiptTypesStore;
            var receiptTypeIdExist = false;
            for (var i = 0; i < receiptTypesStore.getCount(); i++) {
              var receiptTypeId = receiptTypesStore.getAt(i).get('id');
              if(receiptTypeId == json.data.typeId){
            	receiptTypeIdExist == true;
                viewModel.set(json.data);
                return;
              }
            }
            json.data.typeId = null;
            viewModel.set(json.data);
          } else {
            TipsUtil.showTips("错误", json.error.message || "服务器错误！");
          }
        }
      }
    });

    var whsStore = viewModel.getStore("whsStore"),
        whsAreaStore = viewModel.getStore("whsAreaStore");

    Ext.create('Common.ux.StoreLoadCoordinator', {
      stores: [whsStore, whsAreaStore],
      listeners: {
        load: function () {
          //等仓库和库区的store加载完了再获取数据
          var store = viewModel.getStore('receiptDetailGridStore');
          store.load({params: {receiptId: receiptId}});
        }
      }
    });
  },

  /**
   * 仓库修改之后，更新库区名称下拉框
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
    var gridstore = viewModel.getStore("receiptDetailGridStore");
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
    var store = viewModel.getStore("receiptDetailGridStore");
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
    me.getStockPrice(record);
    me.getPickLoc(record);
    //grid上返回库区显示
    return whsRecord ? whsRecord.get("name") : null;
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
    var purchaseQty = record.get('purchaseQty');
    var proportion = record.get('proportion');
    var price = record.get('price');
    var lineTotal = purchaseQty * proportion * price;
    record.set('lineTotal', lineTotal);
    record.set('quantity', purchaseQty * proportion)
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
    var store = viewModel.getStore("receiptDetailGridStore");
    if (store.getCount() == 0) {
      TipsUtil.showTips("提示", "缺少商品信息");
      return;
    }
    var goodsReceipt = form.getValues() || {};

    if (!goodsReceipt.postDate) {
      delete goodsReceipt.postDate;
    }

    goodsReceipt.typeName = me.getView().down('#comboType').getRawValue();

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
        TipsUtil.showTips("提示", "商品信息有误");
        lineFail = true;
        return false;
      }
      var purchaseUnit = line.get('purchaseUnit');
      if(purchaseUnit.length > 20) {
    	TipsUtil.showTips("提示", "收货单位不能超过20个字符");
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
    goodsReceipt.goodsReceiptLines = Ext.encode(lineArr);
    return goodsReceipt;
  },
  /**
   * 保存成草稿
   */
  onButtonSaveDraftClick: function () {
    var me = this;
    var view = me.getView();
    var goodsReceipt = me._dataForSubmit();
    if (goodsReceipt) {
      Ext.Ajax.request({
        method: 'POST',
        url: '/api/inventory/goods/receipt/draft',
        params: goodsReceipt,
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
   * 保存并入库
   */
  onButtonSavePostClick: function () {
    var me = this;
    var view = me.getView();
    var goodsReceipt = me._dataForSubmit();
    if (goodsReceipt) {
      Ext.Ajax.request({
        method: 'POST',
        url: '/api/inventory/goods/receipt/in',
        params: goodsReceipt,
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
   * 取消调拨
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
            url: '/api/inventory/goods/receipt/cancel/' + data.id,
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
   * 搜索条形码
   * @param field
   * @param e
   */
  onFastSearch: function (field, e) {
    var me = this;
    if (e.getKey() === e.ENTER) {
      var text = field.getValue();
      if (text) {
        me._onFastSearchFn(text);
      }
    }
  },
  _onFastSearchFn: function (text) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("receiptDetailGridStore");

    Ext.Ajax.request({
      method: 'GET',
      url: '/api/product/summary/sku/barCode',
      params: {text: text},
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (Array.isArray(json.data)) {
        	if( json.data.length > 1) {
              me._openChooseDialog(json.data);
	        } else {
	          me._addSkuListIntoStore(store, json.data);
	        }
          } else {       	
        	TipsUtil.showTips("提示", json.error.message, 'error', function(){
              var fastSearchField = me.getView().down('#fastSearchField');
              fastSearchField.reset();
              fastSearchField.focus();
            });
          }
        }
      }
    });
  },
  /**
   * 将获取到的sku信息包括上传文件中的信息导入到杂项明细的sku列表里
   * @param store
   * @param list
   * @private
   */
  _addSkuListIntoStore: function (store, list, option) {
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
      Ext.each(list, function (sku) {
        var record = store.getById(sku.skuId);
        if(record && option.mustUnique) {
          TipsUtil.showTips("错误", "添加重复商品");
          return false;
        }
        var purchaseQty = parseInt(sku.purchaseQty || 1);
        var purchaseUnit = sku.purchaseUnit || '';
        var memo = sku.memo || '';
        var proportion = parseInt(sku.proportion || 1);
        var price = parseFloat(sku.price || 0.0);
        var drTotal = purchaseQty * proportion * price;
        if (record) {
          record.set("lineTotal", record.get("lineTotal") + drTotal);
          record.set("purchaseQty", record.get("purchaseQty") + purchaseQty);
          record.set("proportion", record.get("proportion"));
          record.set("price", record.get("lineTotal") / record.get("purchaseQty") / record.get("proportion"));
        } else {
          //替换当前行
          if(option.selections && option.selections.length && option.selections.length>index) {
            record = option.selections[index];
            for (var key in sku) {
              record.set(key, sku[key])
            }
          } else {
            record = new store.model(sku);
            store.add(record);
          }
          record.set("purchaseQty", purchaseQty);
          record.set("proportion", proportion);
          record.set("price", price);
          record.set("lineTotal", purchaseQty * proportion * price);
          index++;
        }
        if (memo) {
          record.set("memo", memo);
        }
        if (purchaseUnit) {
          record.set("purchaseUnit", purchaseUnit);
        }
        record.set("whsId", whsId);
        record.set("whsAreaId", whsAreaId);
        record.set("quantity", record.get("purchaseQty") * record.get("proportion"));
      });
    }
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
   * 删除杂项入库里的sku
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
   * 选择商品
   */
  onButtonChooseClick: function () {
    var me = this;
    me._openChooseDialog();
  },
  _openChooseDialog: function (records) {
    var me = this;
    var vm = me.getViewModel();
    var goodsChoose = Ext.create("Common.view.GoodsChooseDialog", {
      parent: me.getView(),
      callback: me.getProductSummaries,
      scope: me
    });
    var viewModel = goodsChoose.getViewModel();
    var gridStore = viewModel.getStore("gridStore");
    if (records && Array.isArray(records)) {
      Ext.each(records, function (record) {
        var model = new gridStore.model(record);
        gridStore.add(model);
      })
    } else {
      gridStore.load();
    }
    if(records) {
      //搜索barCode
      vm.set("mustUnique", false);
    } else {
      vm.set("mustUnique", true);
    }
    goodsChoose.show();
  },
  /**
   * 从商品选择中回调
   * @param records
   */
  getProductSummaries: function (records) {
    var me = this.scope;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("receiptDetailGridStore");

    var grid = view.down('grid'), selections = grid.getSelectionModel().getSelection();
    me._addSkuListIntoStore(store, records, {selections:selections, mustUnique:viewModel.get('mustUnique')});
  },
  /**
   * 从模板批量导入中回调
   * 1. 获取records中的skuCode list
   * 2. 批量从es中获取sku summmary信息
   * 3. 加入到当前杂项明细列表里
   * @param records
   */
  getRecordsBySkuCode: function (records) {
    var me = this.scope;
    var viewModel = me.getViewModel();
    var skuCodeList = [];
    Ext.each(records, function (sku) {
      var skuCode = sku.skuCode;
      skuCodeList.push(skuCode);
    });
    var store = viewModel.getStore("receiptDetailGridStore");

    var params = {skuCode: skuCodeList};
    Ext.Ajax.request({
      method: 'POST',
      url: '/api/product/summary/sku/skuCode',
      params: params,
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (json.success) {
            var skuSummaries = json.data;
            if (Array.isArray(skuSummaries)) {
              var summaryMap = {};
              Ext.each(skuSummaries, function(summary) {
                summaryMap[summary.skuCode] = summary;
              });
              Ext.each(records, function (sku) {
                var copyFields = ['skuId', 'skuCode', 'skuName', 'productCode', 'productName','proportion', 'purchaseUnit'];
                Ext.copyIf(sku, summaryMap[sku.skuCode], copyFields);
              })
            }
            me._addSkuListIntoStore(store, records, {mustUnique: true});
          } else {
            TipsUtil.showTips("错误", json.error.message || "服务器错误！");
          }
        }
      }
    });
  },
  /**
   * 打开模板批量上传窗口
   */
  onButtonBatchInputClick: function () {
    var me = this;
    var importCVSDialog = Ext.create("Common.view.ImportCVSDialog", {
      parent: me.getView(),
      callback: me.getRecordsBySkuCode,
      scope: me
    });
    var cvsViewModel = importCVSDialog.getViewModel();
    cvsViewModel.set('type', 'GOODS_RECEIPT_IMPORT');
    cvsViewModel.set('removeBlank', 'Y');
    importCVSDialog.show();
  },
  /**
   * 杂项入库类型编辑
   */
  onReceiptTypeEditTriggerClick: function () {
    var me = this;
    var viewModel = me.getViewModel();

    var store = viewModel.getStore('receiptTypeStore');
    Ext.create("GoodsReceipt.view.ReceiptTypeEditDialog", {
      store: store
    }).show();
  },

  getStockPrice: function (record) {
    var whsId = record.get('whsId'),
      whsAreaId = record.get('whsAreaId'),
      skuId = record.get('skuId');

    if (whsId && whsAreaId) {
      Ext.Ajax.request({
        method: 'GET',
        url: '/api/product/sku/price',
        params: {whsId: whsId, whsAreaId: whsAreaId, skuId: skuId},
        success: function (request) {
          if (request.responseText) {
            var json = Ext.decode(request.responseText);
            if (json.success) {
              var stock = json.data;
              if (stock) {
                record.set("stockPrice", stock.stockPrice);
              } else {
                record.set("stockPrice", 0);
              }
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      });
    } else {
      record.set("stockPrice", 0);
    }
  },

  onButtonLineAddClick: function (button, e, eOpts) {
    var model = this.getViewModel();
    var store = model.getStore('receiptDetailGridStore');
    var exist = false;
    store.queryBy(function (item) {
      var skuId = item.get('skuId');
      if (isNaN(skuId)) {
        exist = true;
      }
    });
    if (!exist) {
      store.add({});
    }
  }

});