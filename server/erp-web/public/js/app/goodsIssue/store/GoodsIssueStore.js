Ext.define('GoodsIssue.store.GoodsIssueStore', {
	extend: 'Ext.data.Store',
	alias: 'store.goodsissuestore',

	requires: [
		'GoodsIssue.model.GoodsIssueModel'
	],

	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			model: 'GoodsIssue.model.GoodsIssueModel',
			proxy: {
				type: 'ajax',
				baseParams: {},
				api: {
					read: '/api/inventory/goods/issue/filter',
					//update: '/api/general/supplier/enable'
				},
				reader: {
					type: 'json',
					rootProperty: 'data.result',
					startProperty: 'data.start',
					limitProperty: 'data.pageSize',
					totalProperty: 'data.totalCount'
				}
			},
			listeners: {
				exception: function (proxy, type, action, options, response) {
					Ext.MessageBox.alert("错误", "服务器异常!");
					me.rejectChanges();
				}
			}
		}, cfg)]);
	}
});