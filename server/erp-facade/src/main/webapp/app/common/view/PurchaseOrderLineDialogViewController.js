Ext.define('Common.view.PurchaseOrderLineDialogViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.purchaseorderlinedialog',

	init: function() {
		var viewModel = this.getViewModel();
		viewModel.notify();
		var gridStore = viewModel.getStore('gridStore');
		var params = this.storeParamsDataLoad();
		if(!params.supplierId) {
			TipsUtil.showTips("提示","请先选择供应商");
		}
		if(!params.whsId) {
			TipsUtil.showTips("提示", "请选择仓库");
			return;
		}
		gridStore.load({params: params});
	},

	//商品条形码 barCode;
	//规格编码/规格名称/采购订单号 query
	//供应商ID supplierId
	// 仓库ID whsId
	storeParamsDataLoad: function() {
		var viewModel = this.getViewModel();
		console.log(viewModel);
		var params = {};
		params.supplierId = viewModel.get('supplierId');
		params.whsId = viewModel.get('whsId');
		params.statusList = viewModel.get('statusList');
		return params;
	},

	/**
	 * 快速搜索
	 */
	onFastQueryButtonClick: function (button, trigger, e) {
		var me = this;
		var viewModel = me.getViewModel();
		var gridStore = viewModel.getStore("gridStore");
		var text = button.getValue();
		var params = me.storeParamsDataLoad();
		params.query = text;
		gridStore.load(
			{
				params: params,
				//callback: function(records, options, success){
				//	if(records.length ==0) {
				//		TipsUtil.showTips("提示", "没有查到符合条件的信息！", 'error', function () {
				//			//var fastSearchField = me.getView().down('#fastSearchField');
				//			//fastSearchField.reset();
				//			//fastSearchField.focus();
				//		});
				//	}
				//}
			}
		);
	},

	/**
	 * 扫码
	 */
	onFastSearch: function (field, e) {
		if (e.getKey() == Ext.EventObject.ENTER) {
			var me = this;
			var viewModel = me.getViewModel();
			var gridStore = viewModel.getStore("gridStore");
			var params = me.storeParamsDataLoad();
			params.barCode = field.getValue();
			gridStore.load(
				{params: params,
					//callback: function(records, options, success){
					//	if(records.length ==0) {
					//		TipsUtil.showTips("提示", "该条形码不存在！", 'error', function () {
					//			var fastSearchField = me.getView().down('#fastSearchField');
					//			fastSearchField.reset();
					//			fastSearchField.focus();
					//		});
					//	}
					//}
				}
			);
		}
	},

	/**
	 * 回车快速搜索
	 * @param field
	 * @param e
	 */
	onEnterKey: function (field, e) {
		if (e.getKey() == Ext.EventObject.ENTER) {
			this.onFastQueryButtonClick(field);
		}
	},

	onButtonSelectClick: function (button, e, eOpts) {
		var me = this;
		var view = me.getView();
		var grid = view.down('grid');
		var selections = grid.getSelectionModel().getSelection();
		if(selections && selections.length) {
			var arr = [];
			Ext.each(selections, function(selection) {
				arr.push(selection.getData());
			});

			view.callback(arr);
			view.close();
		} else {
			TipsUtil.showTips('提示', '请选择至少一件商品')
		}
	},

	onCancelButtonClick: function (button, e, eOpts) {
		var me = this;
		me.getView().close();
	}
});