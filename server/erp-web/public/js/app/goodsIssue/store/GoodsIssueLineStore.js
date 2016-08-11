Ext.define('GoodsIssue.store.GoodsIssueLineStore', {
	extend: 'Ext.data.Store',
	alias: 'store.goodsissuelinestore',

	requires: [
		'GoodsIssue.model.GoodsIssueLineModel',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			model: 'GoodsIssue.model.GoodsIssueLineModel',
			proxy: {
				type: 'ajax',
				url: '/api/inventory/goods/issue/list/goods',
				reader: {
					type: 'json',
					rootProperty: 'data'
				},
				writer: {
					type: 'json',
					clientIdProperty: 'clientId'
				},
			}
		}, cfg)]);
	}
});