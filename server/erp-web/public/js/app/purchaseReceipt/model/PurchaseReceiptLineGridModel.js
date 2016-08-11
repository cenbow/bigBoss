Ext.define('PurchaseReceipt.model.PurchaseReceiptLineGridModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],
	idProperty: 'skuId',
	fields: [{
		type: 'int',
		name: 'id'
	},{
		type: 'int',
		name: 'purchaseReceiptId' /*采购收货单ID*/
	},{
		type: 'int',
		name: 'purchaseOrderId' /*采购订单ID*/
	},{
		type: 'string',
		name: 'purchaseOrderNo'
	},{
		type: 'int',
		name: 'purchaseOrderLineId' /*采购订单明细ID*/
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
		name: 'whsPickLoc'
	},{
		type: 'int',
		name: 'skuId'
	},{
		type: 'string',
		name: 'skuCode'
	},{
		type: 'string',
		name: 'skuName'
	},{
		type: 'string',
		name: 'productCode'
	},{
		type: 'string',
		name: 'productName'
	},{
		type: 'string',
		name: 'purchaseUnit'
	},{
		type: 'int',
		name: 'proportion'
	},{
		type: 'int',
		name: 'purchaseQty'
	},{
		type: 'string',
		name: 'unit'
	},{
		type: 'int',
		name: 'quantity'
	},{
		type: 'string',
		name: 'price'
	},{
		type: 'string',
		name: 'lineTotal'
	},{
		type: 'string',
		name: 'memo'
	},{
		type: 'int',
		name: 'remainingQty'
	//},{
	//	type: 'int',
	//	name: 'receiveNumber'
	}]
})