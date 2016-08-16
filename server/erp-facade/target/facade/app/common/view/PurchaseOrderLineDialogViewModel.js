Ext.define('Common.view.PurchaseOrderLineDialogViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.purchaseorderlinedialog',

	requires: [
		'Common.store.PurchaseOrderLineStore'
	],
	data: {
		selectedData: [],
	},


	stores: {
		gridStore: {
			type: 'purchaseorderlinestore',
			//autoLoad: true
		}
	}
});