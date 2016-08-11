Ext.define('GoodsIssue.model.SelectOptionModel', {
	extend: 'Ext.data.Model',
	alias: 'model.selectoptionmodel',

	requires: [
		'Ext.data.field.String',
		'Ext.data.field.Integer'
	],

	fields: [
		{
			type: 'int',
			name: 'id'
		},
		{
			type: 'string',
			name: 'code'
		},
		{
			type: 'string',
			name: 'name'
		}
	]
});