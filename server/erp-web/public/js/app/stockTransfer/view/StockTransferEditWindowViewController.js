Ext.define('StockTransfer.view.StockTransferEditWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.stocktransfereditwindow',

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
    var transferId = viewModel.get("transferId");
    Ext.Ajax.request({
      method: 'GET',
      url: '/api/inventory/stock/transfer/view',
      params: {transferId: transferId},
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (json.success) {
            viewModel.set(json.data);
          } else {
            TipsUtil.showTips("错误", json.error.message || "服务器错误！");
          }
        }
      }
    });


    var fromWhsStore = viewModel.getStore("fromWhsStore"),
      toWhsStore = viewModel.getStore("toWhsStore"),
      fromWhsAreaStore = viewModel.getStore("fromWhsAreaStore"),
      toWhsAreaStore = viewModel.getStore("toWhsAreaStore");
    Ext.create('Common.ux.StoreLoadCoordinator', {
      stores: [fromWhsStore, toWhsStore, fromWhsAreaStore, toWhsAreaStore],
      listeners: {
        load: function () {
          //等4个store加载完了再获取数据
          var store = viewModel.getStore('transferDetailStore');
          store.load({params: {transferId: transferId}});
        }
      }
    });

  },

  /**
   * 获取库区信息
   */
  onFromWhsChange: function (option) {
    var me = this;
    var viewModel = me.getViewModel();

    var fromWhsId = option.getValue();
    var store = viewModel.getStore("fromWhsAreaStore");
    if (store && Number.isInteger(parseInt(fromWhsId))) {
      store.load({
        params: {id: fromWhsId},
        scope: store
      })
    }
    var gridstore = viewModel.getStore("transferDetailStore");
    gridstore.queryBy(function(item) {
      item.set('fromWhsId', fromWhsId);
    })
  },
  /**
   * 库区修改之后，整体修改调拨明细的库区
   * @param option
   */
  onFromWhsAreaChange: function (option) {
    var me = this;
    var viewModel = me.getViewModel();

    var fromWhsAreaId = option.getValue();
    var store = viewModel.getStore("transferDetailStore");
    store.queryBy(function (item) {
      if (fromWhsAreaId) {
        item.set("fromWhsAreaId", fromWhsAreaId);
      } else {
        item.set("fromWhsAreaId", '');
      }
    });

  },
  /**
   * 更新grid里面的发货仓库
   * @param option
   */
  onToWhsChange: function (option) {
    var me = this;
    var viewModel = me.getViewModel();

    var toWhsId = option.getValue();
    var store = viewModel.getStore("toWhsAreaStore");
    if (store && Number.isInteger(parseInt(toWhsId))) {
      store.load({
        params: {id: toWhsId},
        scope: store
      })
    }
    var gridstore = viewModel.getStore("transferDetailStore");
    gridstore.queryBy(function(item) {
      item.set('toWhsId', toWhsId);
    })
  },
  /**
   * 更新grid里面的收货仓库
   * @param option
   */
  onToWhsAreaChange: function (option) {

    var me = this;
    var viewModel = me.getViewModel();

    var toWhsAreaId = option.getValue();
    var store = viewModel.getStore("transferDetailStore");

    store.queryBy(function (item) {
      if (toWhsAreaId) {
        item.set("toWhsAreaId", toWhsAreaId);
      } else {
        item.set("toWhsAreaId", '');
      }
    })
  },
  renderFromAreaStore: function (whsAreaId, meta, record) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("fromWhsAreaStore");
    var whsRecord = store.getById(whsAreaId);
    me.getWhsAreaStock(record);
    me.getPickLoc(record, 'from');
    return whsRecord ? whsRecord.get("name") : null;
  },
  renderToAreaStore: function (whsAreaId, meta, record) {
    var me = this;
    var viewModel = me.getViewModel();
    var store = viewModel.getStore("toWhsAreaStore");
    var whsRecord = store.getById(whsAreaId);
    me.getPickLoc(record, 'to');
    return whsRecord ? whsRecord.get("name") : null;
  },

  getPickLoc: function (record, direct) {

    var whsId = record.get(direct+'WhsId'),
      whsAreaId = record.get(direct+'WhsAreaId'),
      skuId = record.get('skuId');
    if(isNaN(whsId) || isNaN(whsAreaId) || isNaN(skuId)) {
      return;
    }
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
                record.set(direct + "WhsPickLoc", json.data.location);
              } else {
                record.set(direct + "WhsPickLoc", '');
              }
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      })
    } else {
      record.set(direct + "WhsPickLoc", '');
    }
  },
  _submit: function(post) {
    var url = '/api/inventory/stock/transfer/' + (post === true ? 'post': 'draft');
    var me = this;
    var view = me.getView();
    var stockTransfer = me._dataForSubmit();
    if (stockTransfer) {
      Ext.Ajax.request({
        method: 'POST',
        url: url,
        params: stockTransfer,
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
   * 保存成草稿
   */
  onButtonSaveDraftClick: function () {
    var me = this;
    me._submit(false);
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
    var store = viewModel.getStore("transferDetailStore");
    if (store.getCount() == 0) {
      TipsUtil.showTips("提示", "缺少商品信息");
      return false;
    }
    var stockTransfer = form.getValues() || {};

    if (!stockTransfer.postDate) {
      delete stockTransfer.postDate;
    }
    var lines = store.getRange();
    var lineArr = [];

    var fromWhs = Ext.ComponentQuery.query("#fromWhs")[0];
    var toWhs = Ext.ComponentQuery.query("#toWhs")[0];

    var fromWhsId = fromWhs.getValue();
    var toWhsId = toWhs.getValue();
    if(isNaN(fromWhsId) || isNaN(toWhsId)) {
      TipsUtil.showTips("提示", "请选择仓库");
      return
    }
    var lineFail = false;
    Ext.each(lines, function (line) {
      line.set('fromWhsId', fromWhsId);
      line.set('toWhsId', toWhsId);
      var skuId = line.get('skuId');
      var fromWhsAreaId = line.get('fromWhsAreaId');
      var toWhsAreaId = line.get('fromWhsAreaId');
      var quantity = line.get('quantity');
      var skuId = line.get('skuId');
      if(isNaN(skuId) || isNaN(fromWhsAreaId) || isNaN(toWhsAreaId) || isNaN(quantity)) {
        TipsUtil.showTips("提示", "商品信息有误");
        lineFail = true;
        return false;
      }

      if(line.get('memo') && line.get('memo').length>255) {
        TipsUtil.showTips("提示", "备注长度不能超过255个字符");
        lineFail = true;
        return false;
      }
      lineArr.push(line.getData())
    });
    if(lineFail) {
      return;
    }
    stockTransfer.lines = Ext.encode(lineArr);
    return stockTransfer;
  },
  /**
   * 保存并调拨
   */
  onButtonSavePostClick: function () {
    var me = this;
    me._submit(true);
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
            url: '/api/inventory/stock/transfer/cancel/' + data.id,
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
    } else {
      view.close()
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
    var store = viewModel.getStore("transferDetailStore");

    Ext.Ajax.request({
      method: 'GET',
      url: '/api/product/summary/sku/barCode',
      params: {text: text},
      success: function (request) {
        if (request.responseText) {
          var json = Ext.decode(request.responseText);
          if (Array.isArray(json.data) && json.data.length > 1) {
            me._openChooseDialog(json.data);
          } else {
            me._addSkuListIntoStore(store, json.data);
          }
        }
      }
    });
  },
  /**
   * 将获取到的sku信息包括上传文件中的quantity和memo导入到库存调拨的sku列表里
   * @param store
   * @param list
   * @private
   */
  _addSkuListIntoStore: function (store, list, option) {
    var me = this;
    var view = me.getView();
    option = option || {};

    //找到空行并添加
    store.queryBy(function(item) {
      option.selections = option.selections || [];
      var selection = option.selections[0] || {};
      if(isNaN(item.id) && selection.id != item.id) {
        option.selections.push(item)
      }
    });

    var fromWhs = Ext.ComponentQuery.query("#fromWhs")[0];
    var toWhs = Ext.ComponentQuery.query("#toWhs")[0];
    var fromWhsArea = Ext.ComponentQuery.query("#fromWhsArea")[0];
    var toWhsArea = Ext.ComponentQuery.query("#toWhsArea")[0];

    var fromWhsId = fromWhs.getValue();
    var toWhsId = toWhs.getValue();
    var fromWhsAreaId = fromWhsArea.getValue();
    var toWhsAreaId = toWhsArea.getValue();

    if (list && Ext.isArray(list)) {
      var index = 0;
      Ext.each(list, function (sku) {
        var record = store.getById(sku.skuId);
        if(record && option.mustUnique) {
          TipsUtil.showTips("错误", "添加重复商品");
          return false;
        }
        var quantity = parseInt(sku.quantity || 1);
        var memo = sku.memo || '';
        if (record) {
          record.set("quantity", record.get("quantity") + quantity);
        } else {
          //用选择的第一行替换当前行
          if(option.selections && option.selections.length && option.selections.length>index) {
            record = option.selections[index];
            for(var key in sku) {
              record.set(key, sku[key])
            }
          } else {
            record = new store.model(sku);
            store.add(record);
          }
          //默认数量为1
          record.set("quantity", 1);
          index++;
        }

        if (memo) {
          record.set("memo", memo);
        }
        record.set("fromWhsId", fromWhsId);
        record.set("toWhsId", toWhsId);
        record.set("fromWhsAreaId", fromWhsAreaId);
        record.set("toWhsAreaId", toWhsAreaId);
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
   * 删除库存调拨里的sku
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
    var view = me.getView();
    var vm = me.getViewModel();
    //Ext.bind(me.getRecords, me);
    var goodsChoose = Ext.create("Common.view.GoodsChooseDialog", {
      parent: view,
      callback: Ext.bind(me.getRecordsBySkuId, me),
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
  getRecordsBySkuId: function (records) {
  /*  var me = this.scope;
    me.putRecordsIntoGrid(records, {field: 'skuId', url: '/api/product/summary/list/sku'})*/
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var store = viewModel.get("transferDetailStore");

    var grid = view.down('grid'), selections = grid.getSelectionModel().getSelection();
    me._addSkuListIntoStore(store, records, {selections: selections, mustUnique:viewModel.get('mustUnique')});
  },
  /**
   * 从批量导入中回调
   * 1. 获取records中的skuCode list
   * 2. 批量从es中获取sku summmary信息
   * 3. 加入到当前库存调拨的sku列表里
   * @param records
   */
  getRecordsBySkuCode: function (records) {
    var me = this;

    var viewModel = me.getViewModel();
    var skuCodeList = [];
    Ext.each(records, function (sku) {
      var skuCode = sku.skuCode;
      skuCodeList.push(skuCode);
    });
    var store = viewModel.get("transferDetailStore");

    var params = {skuCode : skuCodeList};
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
                Ext.copy(sku, summaryMap[sku.skuCode], copyFields);
              })
            }
            me._addSkuListIntoStore(store, records, {mustUnique:true});
          } else {
            TipsUtil.showTips("错误", json.error.message || "服务器错误！");
          }
        }
      }
    });
  },
  onButtonLineAddClick: function (button, e, eOpts) {
    var model = this.getViewModel();
    var store = model.getStore('transferDetailStore');
    var exist = false;
    store.queryBy(function(item) {
      var skuId = item.get('skuId');
      if(isNaN(skuId)) {
        exist = true;
      }
    });
    if(!exist) {
      store.add({});
    }
  },
  /**
   * 打开批量上传窗口
   */
  onButtonBatchInputClick: function () {
    var me = this;
    //Ext.bind(me.getRecords, me);
    var importCVSDialog = Ext.create("Common.view.ImportCVSDialog", {
      parent: me.getView(),
      callback: Ext.bind(me.getRecordsBySkuCode, me),
    });
    var cvsViewModel = importCVSDialog.getViewModel();
    cvsViewModel.set('type', 'STOCK_TRANSFER_IMPORT');
    importCVSDialog.show();
  },
  getWhsAreaStock: function (record) {
    var whsId = record.get('fromWhsId'),
      whsAreaId = record.get('fromWhsAreaId'),
      skuId = record.get('skuId');
    if(isNaN(whsId) || isNaN(whsAreaId) || isNaN(skuId)) {
      return;
    }
    if (whsId && whsAreaId) {
      Ext.Ajax.request({
        method: 'GET',
        url: '/api/product/sku/stock',
        params: {whsId: whsId, whsAreaId: whsAreaId, skuId: skuId},
        success: function (request) {
          if (request.responseText) {
            var json = Ext.decode(request.responseText);
            if (json.success) {
              var stockArea = json.data;
              if (stockArea) {
                record.set("availableStock", stockArea.available);
              } else {
                record.set("availableStock", 0);
              }
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      });
    } else {
      record.set("availableStock", 0);
    }
  }

});
