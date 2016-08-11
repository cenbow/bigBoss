Ext.define('PurchaseReceipt.model.PurchaseReceiptGridModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],
	idProperty: 'baseId',
	fields: [{
		type: 'int',
		name: 'baseId'
	},{
		type: 'int',
		name: 'companyId'
	},{
		type: 'string',
		name: 'purchaseReceiptNo' /*收货单号(系统生成)*/
	},{
		type: 'string',
		name: 'status',
		convert: function (value) {
			var valueName = "";
			if (value == 'DRAFT') {
				valueName = '草稿';
			}
			if (value == 'TRANSFERRED_IN') {
				valueName = '已入库';
			}
			if (value == 'CANCELLED') {
				valueName = '已取消';
			}
			return valueName;
		}
	},{
		type: 'string',
		name: 'statusName'
	},{
		type: 'int',
		name: 'supplierId'
	},{
		type: 'string',
		name: 'supplierName'
	},{
		type: 'int',
		name: 'whsId'
	},{
		type: 'string',
		name: 'whsName'
	},{
		type: 'int',
		name: 'whsAreaId'
	},{
		type: 'string',
		name: 'whsAreaName'
	},{
		type: 'string',
		name: 'memo'
	},{
		type: 'date',
		name: 'postDate',
		convert: function (value) {
			return value ? new Date(Number(value)) : "";
		}
	},{
		type: 'int',
		name: 'createBy'
	},{
		type: 'string',
		name: 'createByName'
	},{
		type: 'date',
		name: 'createDate',
		convert: function (value) {
			return value ? new Date(Number(value)) : "";
		}
	},{
		type: 'int',
		name: 'updateBy'
	},{
		type: 'string',
		name: 'updateByName'
	},{
		type: 'date',
		name: 'updateDate',
		convert: function (value) {
			return value ? new Date(Number(value)) : "";
		}
	}]
})
