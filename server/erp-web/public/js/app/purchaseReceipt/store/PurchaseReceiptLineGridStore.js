Ext.define('PurchaseReceipt.store.PurchaseReceiptLineGridStore', {
	extend: 'Ext.data.Store',
	alias: 'store.purchasereceiptlinegridstore',

	requires: [
		'PurchaseReceipt.model.PurchaseReceiptLineGridModel',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			model: 'PurchaseReceipt.model.PurchaseReceiptLineGridModel',
			proxy: {
				type: 'ajax',
				url: '/api/purchase/purchase/receipt/lines',
				reader: {
					type: 'json',
					rootProperty: 'data'
				},
				writer: {
					type: 'json',
					clientIdProperty: 'clientId'
				}
			}
		}, cfg)]);
	}
})