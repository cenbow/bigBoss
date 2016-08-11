Ext.define('GoodsIssue.view.AddDialogViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.adddialog',

	requires: [
		'Common.ux.StoreLoadCoordinator'
	],

	init: function () {
		var addFlag = this.view.addFlag;
		var cancelButton = Ext.getCmp("cancelButton");
		if (addFlag == "true") {
			cancelButton.hidden = true;
		} else {
			//this.getViewModel().notify();
			cancelButton.hidden = false;
			this.initEditDialog();
		}
	},
	//出库类型编辑界面show
	onIssueTypeEditTriggerClick: function () {
		Ext.create("GoodsIssue.view.CommonComboxWithDialog", {store: Ext.getStore("goodsIssue.issuetype")}).show();
	},
	//统一获取提交数据
	_dataForSubmit: function () {
		var me = this;
		var form = me.getView().down('form');
		if (!form.isValid()) {
			return false;
		}

		var viewModel = me.getViewModel();
		var store = viewModel.getStore("goodsIssueLineStore");
		if (store.getCount() == 0) {
			TipsUtil.showTips("提示", "缺少商品信息");
			return;
		}
		var goodsIssue = form.getValues() || {};

		if (!goodsIssue.postDate) {
			delete goodsIssue.postDate;
		}
		if (this.view.addFlag != "true") {
			goodsIssue.id = this.view.record.getData().baseId;
		}

		goodsIssue.typeName = me.getView().down('#comboType').getRawValue();
		var lines = store.getRange();
		var lineArr = [];
		var whs = Ext.ComponentQuery.query("#whsStoreCom")[0];
		var whsId = whs.getValue();

		var lineFail = false;
		Ext.each(lines, function (line) {
			line.set("whsId", whsId);
			lineArr.push(line.getData());

			if (line.get('memo') && line.get('memo').length > 255) {
				TipsUtil.showTips("提示", "备注长度不能超过255个字符");
				lineFail = true;
				return false;
			}
		});
		if (lineFail) {
			return;
		}


		goodsIssue.goodsIssueLines = Ext.encode(lineArr);
		return goodsIssue;
	},
	//保存至草稿
	onSaveToDraftButtonClick: function (button, e, eOpts) {
		this.saveGoodsIssue('DRAFT');
	},
	//保存并出库
	onSaveToIssueButtonClick: function (button, e, eOpts) {
		var me = this;
		var viewModel = me.getViewModel();
		var store = viewModel.getStore("goodsIssueLineStore");
		var index = 0;
		var dataFlagErr = false;
		store.each(function (item) {
			index++;
			if (dataFlagErr) {
				return;
			}
			var stockAreaAvailable = item.get('stockAreaAvailable');//可用库存
			var quantity = item.get('quantity');//出库数量
			if (stockAreaAvailable < quantity) {
				TipsUtil.showTips("错误", "第" + index + "条数据，出库数量不能大于库存");
				dataFlagErr = true;
			}
		});
		if (!dataFlagErr) {
			this.saveGoodsIssue('TRANSFERRED_OUT');
		}
	},
	//取消出库
	onCancelToIssueButtonClick: function (button, e, eOpts) {
		this.saveGoodsIssue('CANCELLED');
	},
	//保存或更新杂项出库
	saveGoodsIssue: function (status) {
		var me = this;
		var view = me.getView();
		var goodsIssue = me._dataForSubmit();
		goodsIssue.status = status;
		if (goodsIssue) {
			Ext.Ajax.request({
				method: 'POST',
				url: '/api/inventory/goods/issue/saveOrUpdate',
				params: goodsIssue,
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
	//取消
	onCancelButtonClick: function (button, e, eOpts) {
		this.getView().close();
	},
	onBeforeRenderOperate: function () {
		var grid = viewCtr.getView().down('grid');
	},
	//初始化编辑弹出框
	initEditDialog: function () {
		var me = this;
		var viewModel = me.getViewModel();
		var issueId = this.view.record.getData().baseId;

		Ext.Ajax.request({
			method: 'GET',
			url: '/api/inventory/goods/issue/view',
			params: {issueId: issueId},
			success: function (request) {
				if (request.responseText) {
					var json = Ext.decode(request.responseText);
					if (json.success) {
						var issueTypeStore = me.view.issueTypeStore;
						var issueTypeIdExist = false;
						for (var i = 0; i < issueTypeStore.getCount(); i++) {
							var issueTypeId = issueTypeStore.getAt(i).get('id');
							if (issueTypeId == json.data.typeId) {
								issueTypeIdExist == true;
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

		var whsStore = viewModel.get("whsStore"),
			whsAreaStore = viewModel.get("whsAreaStore");

		Ext.create('Common.ux.StoreLoadCoordinator', {
			stores: [whsStore, whsAreaStore],
			listeners: {
				load: function () {
					//等4个store加载完了再获取数据
					var store = viewModel.getStore('goodsIssueLineStore');
					store.load({params: {issueId: issueId}});
				}
			}
		});
	},
	//获取仓库信息
	whsStoreList: function (option) {
		var me = this;
		var addFlag = this.view.addFlag;
		var whsStoreCom = this.view.down('#whsStoreCom');
		var whsId = whsStoreCom.getValue();
		var whsAreaId = null;
		if (addFlag != "true") {
			whsAreaId = this.view.record.getData().whsAreaId;
		}

		var whsAreaStoreCom = this.view.down('#whsAreaStoreCom');
		whsAreaStoreCom.clearValue();
		whsAreaStoreCom.store.load({
			params: {id: whsId},
			callback: function (records, options, success) {
				whsAreaStoreCom.setValue(records);
				var flag = false;
				//if(addFlag == "true"){
				//    return;
				//}
				for (var i = 0; i < records.length; i++) {
					if (whsAreaId === records[i].data.id) {
						whsAreaStoreCom.select(records[i]);
						flag = true;
					}
				}
				if (!flag) {
					whsAreaStoreCom.select(records[0]);
				}
				var viewModel = me.getViewModel();
				var store = viewModel.getStore("goodsIssueLineStore");
				store.each(function (item) {
					//if (whsAreaId) {
					//item.set("whsAreaId", records[0].data.id);
					item.set("whsAreaId", whsAreaStoreCom.getValue());
					item.set("whsId", whsId);
					me.getWhsAreaStock(item);
					me.getGoodsPrice(item);
					me.getPickLoc(item);
					//} else {
					//    item.set("whsAreaId", ' ');
					//}
				});
			}
		});
	},
	// 获取库区信息
	WhsAreaStoreList: function (option) {
		var me = this;
		var viewModel = me.getViewModel();
		var whsAreaId = option.getValue();
		var store = viewModel.getStore("goodsIssueLineStore");

		store.each(function (item) {
			if (whsAreaId) {
				item.set("whsAreaId", whsAreaId);
			} else {
				item.set("whsAreaId", ' ');
			}
		});
	},
	//grid里修改库区
	renderAreaStore: function (whsAreaId, meta, record) {
		var me = this;
		var viewModel = me.getViewModel();
		var store = viewModel.getStore("whsAreaStore");
		var wshRecord = store.getById(whsAreaId);
		me.getWhsAreaStock(record);
		me.getGoodsPrice(record);
		me.getPickLoc(record);
		//返回选择的库区
		return wshRecord ? wshRecord.get("name") : null;
	},
	onWhsAreaChanged: function (record) {
		var me = this;

		if (record.isModified('whsId') || record.isModified('whsPickLoc')) {
			me.getPickLoc(record);
		}
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
	// 打开模板批量导入杂项出库
	onGuideIntoDialogButtonClick: function () {
		var me = this;
		var importCVSDialog = Ext.create("Common.view.ImportCVSDialog", {
			parent: me.getView(),
			callback: me.getRecordsBySkuCode,
			scope: me
		});
		var cvsViewModel = importCVSDialog.getViewModel();
		cvsViewModel.set('type', 'GOODS_ISSUE_IMPORT');
		importCVSDialog.show();
	},
	//从批量导入中回调
	getRecordsBySkuCode: function (records) {
		var me = this.scope;
		me.getRecords(records, {field: 'skuCode', url: '/api/product/summary/sku/skuCode'});
	},
	/**
	 * 1. 获取records中的skuId list或skuCode list
	 * 2. 批量从es中获取sku summmary信息
	 * 3. 加入到当前出库的sku列表里
	 * @param records
	 * @param option
	 */
	getRecords: function (records, option) {
		var me = this;
		var viewModel = me.getViewModel();
		var fieldList = [];
		var skuMap = {};
		Ext.each(records, function (sku) {
			var fieldId = sku[option.field];
			fieldList.push(fieldId);

			//因上传文件里包含数量及备注
			skuMap[fieldId] = sku;
		});
		var store = viewModel.get("goodsIssueLineStore");

		var params = {};
		params[option.field] = fieldList;
		Ext.Ajax.request({
			method: 'POST',
			url: option.url,
			params: params,
			success: function (request) {
				if (request.responseText) {
					var json = Ext.decode(request.responseText);
					if (json.success) {
						var skuSummaries = json.data;
						if (Array.isArray(skuSummaries)) {
							Ext.each(skuSummaries, function (summary) {
								//获取批量上传中的quantity和memo
								Ext.copyIf(summary, skuMap[summary[option.field]], "quantity, memo");
							})
						}
						me._addSkuListIntoStore(store, skuSummaries);
					} else {
						TipsUtil.showTips("错误", json.error.message || "服务器错误！");
					}
				}
			}
		});
	},
	//将获取到的sku信息包括上传文件中的quantity和memo导入到出库的sku列表里
	_addSkuListIntoStore: function (store, list, option) {
		var me = this;
		var view = me.getView();
		option = option || {};

		//找到空行并添加
		store.queryBy(function (item) {
			option.selections = option.selections || [];
			var selection = option.selections[0] || {};
			if (isNaN(item.id) && selection.id != item.id) {
				option.selections.push(item);
			}
		});

		var whsStoreCom = Ext.ComponentQuery.query("#whsStoreCom")[0];
		var whsAreaStoreCom = Ext.ComponentQuery.query("#whsAreaStoreCom")[0];

		var whsId = whsStoreCom.getValue();
		var whsAreaId = whsAreaStoreCom.getValue();

		if (list && Ext.isArray(list)) {
			var index = 0;
			Ext.each(list, function (sku) {
				var record = store.getById(sku.skuId);
				if (record && option.mustUnique) {
					TipsUtil.showTips("错误", "添加重复商品");
					return false;
				}
				var quantity = parseInt(sku.quantity || 1);
				var memo = sku.memo || '';
				if (record) {
					record.set("quantity", record.get("quantity") + quantity);
				} else {
					//用选择的第一行替换当前行
					if (option.selections && option.selections.length && option.selections.length > index) {
						record = option.selections[index];
						for (var key in sku) {
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
				record.set("whsAreaId", whsAreaId);
				record.set("whsId", whsId);
			});
		}
	},
	//获取商品在库区下的可用库存
	getWhsAreaStock: function (record) {
		var whsId = record.get('whsId'),
			whsAreaId = record.get('whsAreaId'),
			skuId = record.get('skuId');

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
								record.set("stockAreaAvailable", stockArea.available);
							} else {
								record.set("stockAreaAvailable", 0);
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
	},
	//获取商品的价格成本
	getGoodsPrice: function (record) {
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
								record.set("price", stock.stockPrice);
								record.set("lineTotal", stock.stockPrice * record.get("quantity"));
							} else {
								record.set("price", 0);
								record.set("lineTotal", 0);
							}
						} else {
							TipsUtil.showTips("错误", json.error.message || "服务器错误！");
						}
					}
				}
			});
		} else {
			record.set("price", 0);
		}
	},
	//杂项出库添加单个详情
	onButtonLineAddClick: function (button, e, eOpts) {
		var model = this.getViewModel();
		var store = model.getStore('goodsIssueLineStore');
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
	},
	//选择商品
	onButtonChooseClick: function () {
		var me = this;
		me._openChooseDialog();
	},
	//打开选择商品的界面
	_openChooseDialog: function (records) {
		var me = this;
		var vm = me.getViewModel();
		var goodsChoose = Ext.create("Common.view.GoodsChooseDialog", {
			parent: me.getView(),
			callback: me.getRecordsBySkuId,
			scope: me
		});
		var viewModel = goodsChoose.getViewModel();
		var gridStore = viewModel.get("gridStore");
		if (records && Array.isArray(records)) {
			Ext.each(records, function (record) {
				var model = new gridStore.model(record);
				gridStore.add(model);
			})
		} else {
			gridStore.load();
		}
		if (records) {
			//搜索barCode
			vm.set("mustUnique", false);
		} else {
			vm.set("mustUnique", true);
		}
		goodsChoose.show();
	},
	//从商品选择中回调
	getRecordsBySkuId: function (records) {
		var me = this.scope;
		//me.getRecords(records, {field: 'skuId', url: '/api/product/summary/list/sku'})
		//var me = this;
		var view = me.getView();
		var viewModel = me.getViewModel();
		var store = viewModel.get("goodsIssueLineStore");

		var grid = view.down('grid'), selections = grid.getSelectionModel().getSelection();
		me._addSkuListIntoStore(store, records, {selections: selections, mustUnique: viewModel.get('mustUnique')})
	},
	//btn-group的动作进行
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
	//删除杂项入库里的sku
	_deleteRecord: function (record) {
		var store = this.getView().down('grid').store;
		Ext.MessageBox.confirm('提示', '确认删除？', function (option) {
			if (option === 'yes') {
				store.remove(record);
			}
		})
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
						if (json.data.length > 1) {
							me._openChooseDialog(json.data);
						} else {
							me._addSkuListIntoStore(store, json.data);
						}
					} else {
						TipsUtil.showTips("提示", "该条形码不存在！", 'error', function () {
							var fastSearchField = me.getView().down('#fastSearchField');
							fastSearchField.reset();
							fastSearchField.focus();
						});
					}
				}
			}
		});
	},
});