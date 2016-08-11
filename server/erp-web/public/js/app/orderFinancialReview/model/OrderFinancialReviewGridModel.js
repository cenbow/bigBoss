Ext.define('OrderFinancialReview.model.OrderFinancialReviewGridModel', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Field'
  ],
  idProperty: 'id',
  fields: [
	{
      type: 'int',
      name: 'id'
    },
    {
      type: 'int',
      name: 'version'
    },
    {
      type: 'int',
      name: 'companyId'
    },
    {
      type: 'string',
      name: 'orderNo'
    },
    {
      type: 'string',
      name: 'orderType'
    },
    {
      type: 'string',
      name: 'orderStatus'
    },
    {
      type: 'int',
      name: 'orderTag'
    },
    {
      type: 'int',
      name: 'shopId'
    },
    {
      type: 'string',
      name: 'shopOrderNo'
    },
    {
      type: 'string',
      name: 'shopOrderStatus'
    },
    {
      type: 'string',
      name: 'shopOrderStatusName'
    },
    {
      type: 'string',
      name: 'holdingReason'
    },
    {
      type: 'string',
      name: 'holdingMemo'
    },
    {
      type: 'string',
      name: 'memberNick'
    },
    {
      type: 'int',
      name: 'whsId'
    },
    {
      type: 'int',
      name: 'whsAreaId'
    },
    {
      type: 'number',
      name: 'totalWeight'
    },
    {
      type: 'int',
      name: 'totalQuantity'
    },
    {
      type: 'int',
      name: 'totalFee'
    },
    {
      type: 'int',
      name: 'discountFee'
    },
    {
      type: 'int',
      name: 'shippingFee'
    },
    {
      type: 'int',
      name: 'taxFee'
    },
    {
      type: 'int',
      name: 'adjustFee'
    },
    {
      type: 'int',
      name: 'orderFee'
    },
    {
      type: 'int',
      name: 'paymentFee'
    },
    {
      type: 'date',
      name: 'paymentTime',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'string',
      name: 'paymentMethod'
    },
    {
      type: 'string',
      name: 'paymentTradeNo'
    },
    {
      type: 'string',
      name: 'paymentStatus'
    },
    {
      type: 'date',
      name: 'orderTime',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'date',
      name: 'expectedConsignTime',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'date',
      name: 'consignTime',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'date',
      name: 'completeTime',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'date',
      name: 'createTime',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'string',
      name: 'buyerMemo'
    },
    {
      type: 'string',
      name: 'sellerMemo'
    },
    {
      type: 'string',
      name: 'sellerFlag'
    },
    {
      type: 'string',
      name: 'receiverName'
    },
    {
      type: 'int',
      name: 'receiverStateId'
    },
    {
      type: 'string',
      name: 'receiverStateName'
    },
    {
      type: 'int',
      name: 'receiverProvinceId'
    },
    {
      type: 'string',
      name: 'receiverProvinceName'
    },
    {
      type: 'int',
      name: 'receiverCityId'
    },
    {
      type: 'string',
      name: 'receiverCityName'
    },
    {
      type: 'int',
      name: 'receiverDistrictId'
    },
    {
      type: 'string',
      name: 'receiverDistrictName'
    },
    {
      type: 'string',
      name: 'receiverAddress'
    },
    {
      type: 'string',
      name: 'receiverZipCode'
    },
    {
      type: 'string',
      name: 'receiverMobile'
    },
    {
      type: 'string',
      name: 'receiverPhone'
    },
    {
      type: 'string',
      name: 'idCardType'
    },
    {
      type: 'string',
      name: 'idCardNo'
    },
    {
      type: 'string',
      name: 'invoiceType'
    },
    {
      type: 'string',
      name: 'invoiceName'
    },
    {
      type: 'string',
      name: 'invoiceMemo'
    },
    {
      type: 'int',
      name: 'invoiceAmount'
    },
    {
      type: 'string',
      name: 'invoiceStatus'
    },
    {
      type: 'string',
      name: 'invoiceNo'
    },
    {
      type: 'date',
      name: 'invoiceDate',
      convert: function (value) {
    	return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'string',
      name: 'invoiceExpressNo'
    },
    {
      type: 'int',
      name: 'expressId'
    },
    {
      type: 'string',
      name: 'expressName'
    },
    {
      type: 'string',
      name: 'expressTrackNo'
    },
    {
      type: 'int',
      name: 'printTag'
    },
    {
      type: 'int',
      name: 'printCount'
    },
    {
      type: 'string',
      name: 'printBatchNo'
    },
    {
      type: 'number',
      name: 'estimatedWeight'
    },
    {
      type: 'number',
      name: 'actualWeight'
    },
    {
      type: 'int',
      name: 'estimatedShippingFee'
    },
    {
      type: 'int',
      name: 'actualShippingFee'
    },
    {
      type: 'int',
      name: 'totalStockValue'
    },
    {
      type: 'int',
      name: 'orderProfit'
    },
    {
      type: 'number',
      name: 'orderProfitRatio'
    },
    {
      type: 'int',
      name: 'lockedBy'
    },
    {
      type: 'date',
      name: 'lastLockDate',
      convert: function (value) {
      	return value ? new Date(Number(value)) : "";
      }
    },
    {
      type: 'int',
      name: 'manualCreateBy'
    },
    {
      type: 'string',
      name: 'updateType'
    },
    {
      type: 'int',
      name: 'updateBy'
    },
    {
      type: 'date',
      name: 'updateDate',
      convert: function (value) {
        return value ? new Date(Number(value)) : "";
      }
    }
  ]
});