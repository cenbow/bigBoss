Ext.define('GoodsIssue.view.AddDialog', {
	extend: 'Ext.window.Window',
	alias: 'widget.adddialog',
	modal: true,

	requires: [
		'GoodsIssue.view.AddDialogViewController',
		'GoodsIssue.view.AddDialogViewModel',
		'GoodsIssue.view.CommonComboxWithDialog',
		'Ext.form.field.Text',
		'Ext.form.field.TextArea'
	],

	controller: 'adddialog',
	viewModel: {
		type: 'adddialog'
	},
	autoHeight: true,
	width: 650,
	height: 400,
	frame: true,
	labelSelector: '：',
	title: '杂项出库',
	layout: 'anchor',
	items: [{
		xtype: 'form',
		reference: 'form',
		layout: 'column',
		anchor: '100% 50%',
		bodyPadding: 10,
		defaults: {
			columnWidth: .5,
			margin: 7,
			labelAlign: 'left',
			labelWidth: 60,
		},
		items: [
			{
				xtype: 'commoncomboxwithdialog',
				itemId: 'comboType',
				fieldLabel: '出库类型<span style="color:red">*</span>',
				blankText: '出库类型不能为空',
				emptyText: '请选择',
				editable: false,
				allowBlank: false,
				displayField: 'name',
				valueField: 'id',
				name: 'typeId',
				bind: {
					store: '{issueType}',
					value: '{typeId}'
				},
				innerDialogConfig: {
					columnTitle: '类型名称',
					dialogTitle: '出库类型',
					dataIndex: 'name',
					refreshToolbarStore: 'issueType'
				}
				//triggers: {
				//    positionEditTrigger: {
				//        handler: 'onIssueTypeEditTriggerClick',
				//        extraCls: 'x-form-edit-trigger',
				//        weight: -1
				//    }
				//}
			},
			{
				xtype: 'datefield',
				fieldLabel: '出库日期<span style="color:red">*</span>',
				blankText: '出库日期不能为空',
				name: 'postDate',
				editable: false,
				allowBlank: false,
				format: "Y/n/j",
				maxValue: new Date(),
				valueToRaw: function (value) {
					var me = this;
					if (!Ext.isDate(value)) {
						value = new Date(Number(value))
					}
					return me.formatDate(me.parseDate(value));
				},
				bind: {
					value: '{postDate}'
				}
			},
			{
				xtype: 'combobox',
				itemId: 'whsStoreCom',
				fieldLabel: '仓库名称<span style="color:red">*</span>',
				blankText: '仓库名称不能为空',
				emptyText: '请选择',
				editable: false,
				allowBlank: false,
				displayField: 'name',
				valueField: 'id',
				name: 'whsId',
				queryMode: 'local',
				bind: {
					store: '{whsStore}',
					value: '{whsId}'
				},
				listeners: {
					change: 'whsStoreList'
				}
			},
			{
				xtype: 'combobox',
				itemId: 'whsAreaStoreCom',
				fieldLabel: '库区名称<span style="color:red">*</span>',
				blankText: '库区名称不能为空',
				emptyText: '请选择',
				editable: false,
				//allowBlank: false,
				//forceSelection: true,
				displayField: 'name',
				valueField: 'id',
				queryMode: 'local',
				name: 'whsAreaId',
				bind: {
					store: '{whsAreaStore}',
					value: '{whsAreaId}'
				},
				listeners: {
					select: 'WhsAreaStoreList'
				}
			},
			{
				xtype: 'textareafield',
				fieldLabel: '备注',
				name: 'memo',
				columnWidth: 1,
				bind: {
					value: '{memo}'
				}
			}
		]

	},
		{
			xtype: 'gridpanel',
			title: 'My Grid Panel',
			anchor: '100% 50%',
			header: false,
			bind: {
				store: '{goodsIssueLineStore}'
			},
			defaults: {
				columnWidth: .5,
				labelAlign: 'left',
				labelWidth: 60,
			},
			buttonsAlign: 'right',
			buttons: [{
				xtype: 'button',
				text: '保存至草稿',
				iconCls: 'btn-save',
				listeners: {
					click: 'onSaveToDraftButtonClick'
				}
			}, {
				xtype: 'button',
				text: '保存并出库',
				iconCls: 'btn-save',
				listeners: {
					click: 'onSaveToIssueButtonClick'
				}
			}, {
				xtype: 'button',
				text: '取消出库',
				id: 'cancelButton',
				iconCls: 'btn-cancel',
				listeners: {
					click: 'onCancelToIssueButtonClick'
				}
			}, {
				xtype: 'button',
				text: '关闭',
				iconCls: 'btn-cancel',
				listeners: {
					click: 'onCancelButtonClick'
				}
			}],
			dockedItems: [{
				xtype: 'toolbar',
				items: [
					{
						xtype: 'button',
						text: '添加',
						iconCls: 'btn-add',
						listeners: {
							click: 'onButtonLineAddClick'
						}
					},
					{
						xtype: 'button',
						iconCls: 'btn-batch-import',
						text: '商品批量导入',
						listeners: {
							click: 'onGuideIntoDialogButtonClick'
						}
					},
					{
						xtype: 'textfield',
						itemId: 'fastSearchField',
						fieldLabel: '扫描条码',
						labelWidth: 60,
						style: 'border-left: solid 1px rgb(154, 142, 142);padding-left: 9px;',
						listeners: {
							specialKey: 'onFastSearch'
						}
					}
				]
			}
			],
			selModel: 'cellmodel',
			plugins: {
				ptype: 'cellediting',
				clicksToEdit: 1
			},
			viewConfig: {
				listeners: {
					itemupdate: 'onWhsAreaChanged'
				}
			},
			columns: {
				defaults: {
					align: 'center',
					tdCls: 'with-btngroup'
				},
				items: [{
					text: '序号',
					xtype: 'rownumberer',
					width: 37
				}, {
					xtype: 'widgetcolumn',
					text: '操作',
					width: 45,
					tdCls: 'btngroup',
					widget: {
						xtype: 'buttongroup',
						baseCls: '',
						layout: {
							type: 'column'
						},
						defaults: {
							handler: 'onCommandColumnClick'
						},
						items: [
							{xtype: 'button', command: 'Delete', iconCls: 'btn-delete'}
						]
					}
				}, {
					text: '商品编码',
					xtype: 'gridcolumn',
					name: 'productCode',
					dataIndex: 'productCode'
				}, {
					text: '规格编码',
					xtype: 'gridcolumn',
					name: 'skuCode',
					editor: {
						xtype: 'textfield',
						triggers: {
							mytrigger: {
								handler: 'onButtonChooseClick',
								cls: 'x-form-ellipsis-trigger'
							}
						}
					},
					dataIndex: 'skuCode'
				}, {
					text: '规则名称',
					xtype: 'gridcolumn',
					name: 'skuName',
					dataIndex: 'skuName'
				}, {
					text: '出库库区<span class="pencil"/>',
					xtype: 'gridcolumn',
					name: 'whsAreaId',
					dataIndex: 'whsAreaId',
					editor: {
						xtype: 'combobox',
						editable: false,
						displayField: 'name',
						valueField: 'id',
						emptyText: "请选择",
						queryMode: 'local',
						//forceSelection: true,
						bind: {
							value: '{name}',
							store: '{whsAreaStore}'
						}
					},
					renderer: 'renderAreaStore'
				}, {
					text: '出库库位',
					xtype: 'gridcolumn',
					name: 'whsPickLoc',
					dataIndex: 'whsPickLoc'
				}, {
					//    text: '成本单价',
					//    xtype: 'gridcolumn',
					//}, {
					text: '可用库存',
					xtype: 'gridcolumn',
					name: 'stockAreaAvailable',
					dataIndex: 'stockAreaAvailable'
				}, {
					text: '出库数量<span class="pencil"/>',
					xtype: 'gridcolumn',
					editor: {
						xtype: 'numberfield',
						minValue: 1
					},
					name: 'quantity',
					dataIndex: 'quantity'
				}, {
					text: '出库成本',
					xtype: 'gridcolumn',
					name: 'price',
					dataIndex: 'price'
				}, {
					text: '成本合计',
					xtype: 'gridcolumn',
					name: 'lineTotal',
					dataIndex: 'lineTotal'
				}, {
					text: '备注<span class="pencil"/>',
					xtype: 'gridcolumn',
					editor: {
						xtype: 'textfield'
					},
					name: 'memo',
					dataIndex: 'memo'
				}]
			}
		}]
});