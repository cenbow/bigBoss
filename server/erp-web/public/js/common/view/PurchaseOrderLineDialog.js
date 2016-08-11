Ext.define('Common.view.PurchaseOrderLineDialog', {
	extend: 'Ext.window.Window',
	alias: 'widget.purchaseorderlinedialog',

	requires: [
		'Common.util.TipsUtil',
		'Common.view.PurchaseOrderLineDialogViewController',
		'Common.view.PurchaseOrderLineDialogViewModel',
		'Ext.form.field.Text',
		'Ext.form.field.TextArea',
		'Common.ux.PagingToolbarCustom',
		'Common.overrides.Button',
		'Common.overrides.Splitter',
		'Common.overrides.PagingToolbarCustom',
		'Common.overrides.GridHeaderContainer',
		'Common.overrides.JsonWrite'
	],

	controller: 'purchaseorderlinedialog',
	viewModel: {
		type: 'purchaseorderlinedialog'
	},

	autoHeight: true,
	width: 800,
	height:600,
	frame: true,
	modal:true,
	labelSelector: '：',
	title: '选择采购订单明细',
	layout: 'fit',
	items: {
		xtype: 'gridpanel',
		header: false,
		bind: {
			store: '{gridStore}'
		},
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
				xtype: 'textfield',
				itemId: 'fastSearchField',
				fieldLabel: '扫描条码',
				labelWidth: 60,
				listeners: {
					specialKey: 'onFastSearch'
				}
			},{
				xtype: 'tbfill'
			},{
				xtype: 'textfield',
				width: 300,
				fieldLabel: '快速搜索',
				labelAlign: 'right',
				labelWidth: 60,
				emptyText: '商品编码/规格编码/规格名称/条形码',
				triggers: {
					fastQueryTrigger: {
						handler: 'onFastQueryButtonClick',
						cls: 'x-form-search-trigger'
					}
				},
				listeners: {
					specialkey: 'onEnterKey'
				}
			}]
		}, {
			xtype: 'pagingtoolbar',
			dock: 'bottom',
			displayInfo: true,
			bind: {
				store: '{gridStore}'
			},
			plugins : [
				Ext.create("Ext.ux.ProgressBarPager"),
				Ext.create("Common.ux.PagingToolbarResizer",{}),
				Ext.create("Common.ux.PagingSelectionRecorder",{})
			]
			/* xtype: 'pagingcustomtoolbar',
			 dock: 'bottom',
			 displayInfo: true,
			 bind: {
			 store: '{gridStore}'
			 },
			 plugins : [
			 Ext.create("Common.ux.PagingSelectionRecorder",{})
			 ]*/
		}],
		selModel: {
			type: 'checkboxmodel',
			injectCheckbox: 1,
			pruneRemoved : false,
			enableKeyNav:false,
			mode: 'SIMPLE'
		},
		columns: {
			defaults: {
				//align: "center",
				cls: 'titleAlign',
				width: 90
			},
			items: [{
				xtype: 'rownumberer',
				text: '序号',
				align: "center",
				width: 37
			}, /*{
			 xtype: 'checkcolumn',
			 text: '选择'
			 }, */{
				xtype: 'gridcolumn',
				dataIndex: 'purchaseOrderNo',
				align: "center",
				text: '采购订单号'
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'status',
				text: '状态'
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'productCode',
				text: '商品编码'
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'skuCode',
				text: '规格编码'
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'skuName',
				text: '规格名称'
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'quantity',
				align: "right",
				text: '计划采购合计'
			}, {
				xtype: 'gridcolumn',
				align: "right",
				dataIndex: 'stockQty',
				text: '实际入库'
			}, {
				xtype: 'gridcolumn',
				align: "right",
				dataIndex: 'remainingQty',
				text: '剩余到货'
			}, {
				xtype: 'gridcolumn',
				align: "right",
				dataIndex: 'overReceiptQty',
				text: '超收数量'
			}, {
				xtype: 'datecolumn',
				width: 135,
				align: "center",
				dataIndex: 'expectedReceiptDate',
				text: '预计到货日期',
				formatter: 'date("Y/m/d H:i:s")'
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'memo',
				text: '备注'
			}]
		}
	},
	buttonsAlign: 'right',
	buttons: [{
		xtype: 'button',
		iconCls: 'btn-select',
		text: '选择',
		listeners: {
			click:'onButtonSelectClick'
		}
	},{
		xtype: 'button',
		iconCls: 'btn-cancel',
		text: '取消',
		listeners: {
			click: 'onCancelButtonClick'
		}
	}]
});