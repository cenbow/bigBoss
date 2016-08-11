Ext.define('Common.model.PurchaseOrderLineModel', {
  extend: 'Ext.data.Model',
  alias: 'model.purchaseorderlinemodel',

  requires: [
    'Ext.data.field.Field'
  ],

  fields: [
    {
      name: 'id'
    },
    {
      name: 'purchaseOrderId'
    },
    {
      name: 'purchaseOrderNo'
    },
    {
      name: 'status',
      convert: function (value) {
        var valueName = "";
        if (value == 'DRAFT') {valueName = '草稿';}
        if (value == 'PENDING_RECEIVE') {valueName = '待收货';}
        if (value == 'PARTIALLY_RECEIVED') {valueName = '部分收货';}
        if (value == 'FULLY_RECEIVED') {valueName = '完成收货';}
        if (value == 'COMPLETED') {valueName = '已完成';}
        if (value == 'CANCELLED') {valueName = '已取消';}
        return valueName;
      }
    },
    {
      name: 'statusDesc'
    },
    {
      name: 'productCode'
    },
    {
      name: 'productName'
    },
    {
      name: 'skuId'
    },
    {
      name: 'skuCode'
    },
    {
      name: 'skuName'
    },
    {
      name: 'quantity' //计划采购数量合计
    },
    {
      name: 'stockQty' //实际入库
    },
    {
      name: 'remainingQty' //剩余到货
    },
    {
      name: 'overReceiptQty' //超收数量
    },
    {
      name: 'expectedReceiptDate',  //预计到货日期
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      name: 'memo'
    },
    {
      name: 'price' //采购成本（出库成本）
    }
  ]
});