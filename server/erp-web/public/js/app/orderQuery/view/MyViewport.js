Ext.define('OrderQuery.view.MyViewport', {
	extend: 'Ext.container.Viewport',
	alias: 'widget.myviewport',

	requires: [
		'OrderQuery.view.MyViewportViewModel',
		'OrderQuery.view.MyViewportViewController',
		'Common.ux.PagingToolbarCustom',
	],

	controller: 'myviewport',
	viewModel: {
		type: 'myviewport'
	},
	layout: 'border',
	items: [
		{
			xtype: 'form',
			region: 'north',
			layout: 'column',
			bodyPadding: 10,
			header: false,
			title: '订单查询条件',
			defaults: {
				columnWidth:.14,
				labelWidth: 53,
				margin: 6
			},
			items: [
				{
					xtype: 'textfield',
					fieldLabel: '店铺'
				},{
					xtype: 'combobox',
					fieldLabel: '订单类型',
					displayField: '',
					valueField: ''
				},{
					xtype: 'combobox',
					fieldLabel: '订单标签',
					displayField: '',
					valueField: ''
				},{
					xtype: 'combobox',
					fieldLabel: '下单距今',
					displayField: '',
					valueField: ''
				},{
					xtype: 'combobox',
					fieldLabel: '仓库',
					displayField: '',
					valueField: ''
				},{
					xtype: 'combobox',
					fieldLabel: '系统状态',
					displayField: '',
					valueField: ''
				},{
					xtype: 'combobox',
					fieldLabel: '发货状态',
					displayField: '',
					valueField: ''
				},{
					xtype: 'textfield',
					fieldLabel: '平台单号'
				},{
					xtype: 'textfield',
					fieldLabel: '系统单号'
				},,{
					xtype: 'textfield',
					fieldLabel: '客户名称'
				},{
					xtype: 'textfield',
					fieldLabel: '联系电话'
				},{
					xtype: 'textfield',
					fieldLabel: '包含商品',
					columnWidth:.28,
					emptyText: '商品编码/规则编码/规格名称',
					triggers: {
						mytrigger: {
							handler: 'onButtonGoodsChooseClick',
							cls: 'x-form-ellipsis-trigger'
						}
					}
				},{
					xtype: 'button',
					iconCls: 'btn-search',
					columnWidth:.07,
					text: '查询',
					listeners: {
						click: 'onButtonSearchClick'
					}
				},
				{
					xtype: 'button',
					iconCls: 'btn-clear',
					text: '清空',
					columnWidth: .07,
					listeners: {
						click: 'onButtonClearClick'
					}
				}
			]
		},{
			xtype: 'gridpanel',
			region: 'center',
			header: false,
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
					tdCls: 'with-btngroup'
				},
				items: [
					{
						xtype: 'rownumberer',
						text: '序号',
						align: "center",
						width: 37
					},{
						xtype: 'gridcolumn',
						text: '订单标签'
					},{
						xtype: 'gridcolumn',
						text: '打印标签'
					},{
						xtype: 'gridcolumn',
						text: '打印批次',
						align: "center"
					},{
						xtype: 'gridcolumn',
						text: '系统订单号',
						align: "center"
					},{
						xtype: 'gridcolumn',
						text: '平台订单号',
						align: "center"
					},{
						xtype: 'gridcolumn',
						text: '买家留言'
					},{
						xtype: 'gridcolumn',
						text: '卖家备注'
					},{
						xtype: 'gridcolumn',
						text: '客户名称'
					},{
						xtype: 'gridcolumn',
						text: '平台订单状态'
					},{
						xtype: 'gridcolumn',
						text: '系统订单状态'
					},{
						xtype: 'gridcolumn',
						text: '订单类型'
					},{
						xtype: 'gridcolumn',
						text: '拦截原因'
					},{
						xtype: 'gridcolumn',
						text: '拦截备注'
					},{
						xtype: 'gridcolumn',
						text: '店铺'
					},{
						xtype: 'gridcolumn',
						text: '包裹标准重量(kg)',
						width: 110
					},{
						xtype: 'gridcolumn',
						text: '包裹实际称重(kg)',
						width: 110
					},{
						xtype: 'gridcolumn',
						text: '商品总件数'
					},{
						xtype: 'gridcolumn',
						text: '标准物流成本'
					},{
						xtype: 'gridcolumn',
						text: '实际物流成本'
					},{
						xtype: 'gridcolumn',
						text: '应付金额'
					},{
						xtype: 'gridcolumn',
						text: '订单毛利润'
					},{
						xtype: 'gridcolumn',
						text: '订单利润率'
					},{
						xtype: 'gridcolumn',
						text: '支付方式'
					},{
						xtype: 'gridcolumn',
						text: '快递公司'
					},{
						xtype: 'gridcolumn',
						text: '快递单号'
					},{
						xtype: 'gridcolumn',
						text: '收货人姓名'
					},{
						xtype: 'gridcolumn',
						text: '手机'
					},{
						xtype: 'gridcolumn',
						text: '固话'
					},{
						xtype: 'gridcolumn',
						text: '证件类型'
					},{
						xtype: 'gridcolumn',
						text: '证件号码'
					},{
						xtype: 'gridcolumn',
						text: '详细收货地址'
					},{
						xtype: 'gridcolumn',
						text: '要求交货日'
					},{
						xtype: 'gridcolumn',
						text: '发货仓库'
					},{
						xtype: 'gridcolumn',
						text: '下单距今'
					},{
						xtype: 'gridcolumn',
						text: '平台下单时间'
					},{
						xtype: 'gridcolumn',
						text: '创建时间'
					},{
						xtype: 'gridcolumn',
						text: '支付时间'
					},{
						xtype: 'gridcolumn',
						text: '清关时间'
					},{
						xtype: 'gridcolumn',
						text: '发货时间'
					},{
						xtype: 'gridcolumn',
						text: '完成时间'
					},{
						xtype: 'gridcolumn',
						text: '锁定人'
					}
				]
			},
			dockedItems: [
				{
					xtype: 'pagingcustomtoolbar',
					dock: 'bottom',
					displayInfo: true,
					bind: {
						store: '{purchaseReceiptGridStore}'
					}
				},
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							xtype: 'button',
							iconCls: 'btn-form-add',
							text: '订单拦截',
							listeners: {
								click: 'interceptDialogShow'
							}
						},{
							xtype: 'button',
							iconCls: 'btn-form-add',
							text: '订单加急',
							listeners: {
								click: 'b'
							}
						},{
							xtype: 'button',
							iconCls: 'btn-form-add',
							text: '取消加急',
							listeners: {
								click: 'c'
							}
						},{
							xtype: 'button',
							iconCls: 'btn-form-add',
							text: '批量改旗帜备注',
							listeners: {
								click: 'flagChangeDialogShow'
							}
						}

					]
				}
			],
		},
		//详细

	]
})