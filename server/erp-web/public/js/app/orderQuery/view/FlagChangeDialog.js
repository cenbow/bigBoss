Ext.define('OrderQuery.view.FlagChangeDialog', {
	extend: 'Ext.window.Window',
	alias: 'widget.flagchangedialog',
	modal: true,

	requires: [
		'OrderQuery.view.FlagChangeDialogViewController',
		'OrderQuery.view.FlagChangeDialogViewModel',
		'Ext.form.field.TextArea'
	],

	controller: 'flagchangedialog',
	viewModel: {
		type: 'flagchangedialog'
	},

	width: 350,
	layout: 'fit',
	title: '批量改旗帜备注',
	items: [
		{
			xtype: 'form',
			layout: 'column',
			bodyPadding: 10,
			defaults: {
				margin: 6,
				labelWidth:80,
				columnWidth:.9,
			},
			items: [
				{
					xtype: 'checkboxfield',
					id: 'checkbox1',
					columnWidth:.1,
				},
				{
					xtype: 'textfield',
					fieldLabel: '要求交货日'
				},
				{
					xtype: 'checkboxfield',
					id: 'checkbox2',
					columnWidth:.1,
				},
				{
					xtype: 'combobox',
					fieldLabel: '旗帜类型'
				},
				{
					xtype: 'checkboxfield',
					id: 'checkbox3',
					columnWidth:.1,
				},
				{
					xtype: 'textareafield',
					fieldLabel: '卖家备注'
				}
			],
			dockedItems: [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				items: [
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'button',
						iconCls: 'btn-save',
						text: '保存',
						listeners: {
							click: 'onSaveButtonClick'
						}
					},
					{
						xtype: 'button',
						iconCls: 'btn-cancel',
						text: '取消',
						listeners: {
							click: 'onCancelButtonClick'
						}
					}
				]
			}
		]

		}
	]
})