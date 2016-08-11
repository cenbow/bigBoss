Ext.define('GoodsIssue.view.AddDialogViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.adddialog',

	requires: [
		'GoodsIssue.store.CommonComboboxStore',
		'Common.store.CommonWhsStore',
		'Common.store.CommonWhsAreaStore',
		'GoodsIssue.store.GoodsIssueLineStore',
	],

	data: {
		typeId: null,
		postDate: new Date(),
		whsId: null,
		whsAreaId: null,
		memo: null
	},
	stores: {
		issuetype: {
			type: 'commoncomboboxstore',
			autoLoad: true,
			storeId: 'goodsIssue.issuetype'
		},
		whsStore: {
			type: 'commonwhsstore',
			autoLoad: true
		},
		whsAreaStore: {
			type: 'commonwhsareastore',
			autoLoad: true
		},
		goodsIssueLineStore: {
			type: 'goodsissuelinestore'
		}
	}
});