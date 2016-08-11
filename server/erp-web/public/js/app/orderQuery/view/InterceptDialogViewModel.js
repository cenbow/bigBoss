Ext.define('OrderQuery.view.InterceptDialogViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.interceptdialog',

	requires: [
		'OrderQuery.store.CommonComboboxStore'
	],

	stores: {
		intercepttype: {
			type: 'commoncomboboxstore',
			//autoLoad: true
			storeId: 'qrderquery.intercepttype'
		}
	}
})