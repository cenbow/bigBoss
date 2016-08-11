Ext.define('OrderQuery.view.InterceptDialog', {
	extend: 'Ext.window.Window',
	alias: 'widget.interceptdialog',
	modal: true,

	requires: [
		'OrderQuery.view.InterceptDialogViewController',
		'OrderQuery.view.InterceptDialogViewModel',
		'Ext.form.field.TextArea'
	],

	controller: 'interceptdialog',
	viewModel: {
		type: 'interceptdialog'
	},

	width: 350,
	layout: 'fit',
	title: '订单拦截',
	items: [
		{
			xtype: 'form',
			reference: 'form',
			border: false,
			bodyPadding: 10,
			defaults: {
				anchor: '100%',
				labelWidth: 70,
				msgTarget: 'side'
			},
			items: [
				{
					xtype: 'combobox',
					emptyText: "请选择",
					editable: false,
					fieldLabel: '拦截原因',
					displayField: 'name',
					valueField: 'id',
					queryMode: 'local',
					triggers: {
						positionEditTrigger: {
							handler: 'onPositionInterceptTriggerClick',
							extraCls: 'x-form-edit-trigger',
							weight: -1
						}
					}
				},
				{
					xtype: 'textareafield',
					fieldLabel: '拦截备注'
				}
			]
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

})