Ext.define('GoodsIssue.model.GoodsIssueLineModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Integer',
		'Ext.data.field.String'
	],
	idProperty: 'skuId',
	fields: [{
		type: 'int',
		name: 'id'
	}, {
		type: 'string',
		name: 'productCode'
	}, {
		type: 'string',
		name: 'skuCode'
	}, {
		type: 'string',
		name: 'skuName'
	}, {
		type: 'int',
		name: 'whsId'
	}, {
		type: 'int',
		name: 'whsAreaId'
	}, {
		type: 'string',
		name: 'whsPickLoc'
	}, {
		type: 'int',
		name: 'quantity'
	}, {
		type: 'string',
		name: 'price'
	}, {
		type: 'string',
		name: 'lineTotal'
	}, {
		type: 'string',
		name: 'memo'
	}, {
		type: 'int',
		name: 'stockAreaAvailable'
	}]
});