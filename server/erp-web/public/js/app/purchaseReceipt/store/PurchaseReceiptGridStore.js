Ext.define('PurchaseReceipt.store.PurchaseReceiptGridStore', {
	extend: 'Ext.data.Store',
	alias: 'store.purchasereceiptgridstore',

	requires: [
		'PurchaseReceipt.model.PurchaseReceiptGridModel',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			model: 'PurchaseReceipt.model.PurchaseReceiptGridModel',
			proxy: {
				type: 'ajax',
				url: '/api/purchase/purchase/receipt/filter',
				reader: {
					type: 'json',
					rootProperty: 'data.result',
					startProperty: 'data.start',
					limitProperty: 'data.pageSize',
					totalProperty: 'data.totalCount'
				}
			}
		}, cfg)]);
	}
})
