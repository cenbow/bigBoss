Ext.define('GoodsIssue.store.CommonComboboxStore', {
	extend: 'Ext.data.Store',
	alias: 'store.commoncomboboxstore',

	requires: [
		'GoodsIssue.model.CommonComboboxModel'
	],

	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			model: 'GoodsIssue.model.CommonComboboxModel',
			proxy: {
				type: 'ajax',
				api: {
					save: '/api/inventory/goods/issue/type/save',
					read: '/api/inventory/goods/issue/type/list',
					//create  : '/api/inventory/goods/issue/type/add',
					//update  : '/api/inventory/goods/issue/type/update',
					//destroy : '/api/inventory/goods/issue/type/delete'
				},
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		}, cfg)]);
	}

});