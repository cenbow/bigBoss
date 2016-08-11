Ext.define('GoodsIssue.store.StockRecordStatusStore', {
	extend: 'Ext.data.Store',
	alias: 'store.stockrecordstatusstore',

	requires: [
		'GoodsIssue.model.SelectOptionModel'
	],

	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			model: 'GoodsIssue.model.SelectOptionModel',
			data: [
				{
					name: '草稿',
					code: 'DRAFT'
				},
				{
					name: '已入库',
					code: 'TRANSFERRED_IN'
				},
				{
					name: '已取消',
					code: 'CANCELLED'
				}
			]
		}, cfg)]);
	}
});