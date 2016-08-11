Ext.define('ShopOrderList.store.GridStore', {
  extend: 'Ext.data.Store',
  alias: 'store.gridstore',

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'GridStore',
      fields: ["shopOrderNo", "buyerMemo", "sellerMemo", "memberNick", "orderStatusName", "orderType", "shopName",
        "expressName", "expressTrackNo", "receiverName", "receiverPhone", "idCardNo", "receiverAddress", "whsName",
        "orderTime", "createTime", "paymentTime", "consignTime", "completeTime", "totalQuantity", "orderFee",
        "paymentFee"],
      data: [
        {
          shopOrderNo: '160709182710001',
          buyerMemo: 'good',
          sellerMemo: 'hahaha',
          memberNick: '张三',
          orderStatusName: '未发货',
          orderType: '货到付款',
          shopName: '蚂蚁海沟',
          expressName: '快递公司123',
          expressTrackNo: 'TESTE4545458484',
          receiverName: 'jack',
          receiverMobile: '12345678910',
          receiverPhone: '1234567',
          idCardNo: '34646646589895115X',
          receiverAddress: '浙江省杭州市西湖区西园八路西园三路口西湖广告大厦4楼402',
          whsName: '保税仓1',
          orderTime: '2016-08-08 10:08:00',
          createTime: '2016-08-08 10:03:00',
          paymentTime: '2016-08-08 11:08:00',
          consignTime: '2016-08-09 12:05:00',
          completeTime: '2016-08-011 16:21:15',
          totalQuantity: 5,
          orderFee: 25.50,
          paymentFee: 25.50,
          receiverProvince: '浙江省',
          receiverCity: '杭州市',
          receiverDistrict: '西湖区',
          receiverZipCode: '600000',
          idCardType: '身份证',
          shippingFee: 10.2,
          taxFee:3.6,
          discountFee: 2.3,
          totalFee: 25.00,
          adjustFee: 2.50,
          totalWeight: 2.5,
          paymentTradeNo: '121554644548748787',
          paymentMethod: '支付宝',
          paymentStatus: '已支付'
        },
        {
          shopOrderNo: '160709182710002',
          buyerMemo: '好好',
          memberNick: '李四',
          orderStatusName: '已发货',
          orderTime: '2016-08-06 13:12:00'
        },
        {
          shopOrderNo: '160709182710003',
          buyerMemo: '呵呵',
          memberNick: '王二',
          orderStatusName: '未发货',
          orderTime: '2016-07-01 01:01:00'
        }
      ],
      proxy: {
        type: 'ajax',
        reader: {
          type: 'json'
        }
      }
    }, cfg)]);
  }
});