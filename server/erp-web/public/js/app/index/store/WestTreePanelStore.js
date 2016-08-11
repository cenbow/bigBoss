Ext.define('Index.store.WestTreePanelStore', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.westtreepanelstore',
  requires: [
    'Ext.data.field.Field'
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'WestTreePanelStore',
      root: {
        text: 'nav',
        expanded: true,
        children: [
          {
            text: '基础信息',
            qtip: '基础信息',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '账号管理',
                qtip: '账号管理',
                url: 'app-accountMgmt.html',
                id: 'accountMgmt',
                leaf: true
              },
              {
                text: '店铺授权',
                qtip: '店铺授权',
                url: 'app-shopMgmt.html',
                id: 'shopMgmt',
                leaf: true
              },
              {
                text: '物流管理',
                qtip: '物流管理',
                url: 'app-expressMgmt.html',
                id: 'expressMgmt',
                leaf: true
              },{
                text:'会员管理',
                qtip:'会员管理',
                url:'app-customerMgmt.html',
                id:'customerMgmt',
                leaf:'true'
              },
              {
                text: '供应商',
                qtip: '供应商',
                url: 'app-supplierMgmt.html',
                id: 'supplierMgmt',
                leaf: true
              },
              {
                text: '打印模板',
                qtip: '打印模板',
                url: 'app-printTemplate.html',
                id: 'printTemplate',
                leaf: true
              },
              {
                text: '基础设置',
                qtip: '基础设置',
                url: 'app-companySetting.html',
                id: 'companySetting',
                leaf: true
              }
            ]
          },
          {
            text: '商品管理',
            qtip: '商品管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '商品资料',
                qtip: '商品资料',
                url: 'app-productMgmt.html',
                id: 'productMgmt',
                leaf: true
              },
              {
                text: '回收站',
                qtip: '回收站',
                url: 'app-productRecycled.html',
                id: 'productRecycled',
                leaf: true
              }
            ]
          },
          {
            text: '销售管理',
            qtip: '销售管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '手工开单',
                qtip: '手工开单',
                url: 'app-orderManually.html',
                id: 'orderManually',
                leaf: true
              },
              {
                text: '平台订单',
                qtip: '平台订单',
                url: 'app-shopOrderList.html',
                id: 'shopOrderList',
                leaf: true
              },
              {
            	  text: '订单客审',
                qtip: '订单客审',
                url: 'app-orderReview.html',
                id: 'orderReview',
                leaf: true
              },
              {
            	text: '订单财审',
                qtip: '订单财审',
                url: 'app-orderFinancialReview.html',
                id: 'orderFinancialReview',
                leaf: true
              },
              {
                text: '订单查询',
                qtip: '订单查询',
                url: 'app-orderQuery.html',
                id: 'orderQuery',
                leaf: true
              },
              {
                text:'异常订单',
                qtip: '订单查询',
                url: 'app-orderHold.html',
                id: 'orderHold',
                leaf: true
              },
              {
                text: '售后单查询',
                qtip: '售后单查询',
                leaf: true
              }
            ]
          },
          {
            text: '库存管理',
            qtip: '库存管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '仓库管理',
                qtip: '仓库管理',
                url: 'app-whsMgmt.html',
                id: 'whsMgmt',
                leaf: true

              },
              {
                text: '库位管理',
                qtip: '库位管理',
                url: 'app-pickLocation.html',
                id: 'pickLocation',
                leaf: true

              },
              {
                text: '库存调拨',
                qtip: '库存调拨',
                url: 'app-stockTransfer.html',
                id: 'stockTransfer',
                leaf: true
              },
              {
                text: '杂项入库',
                qtip: '杂项入库',
                url: 'app-goodsReceipt.html',
                id: 'goodsReceipt',
                leaf: true
              },
              {
                text: '杂项出库',
                qtip: '杂项出库',
                url: 'app-goodsIssue.html',
                id: 'goodsIssue',
                leaf: true
              },
              {
                text: '采购收货',
                qtip: '采购收货',
                url: 'app-purchaseReceipt.html',
                id: 'purchaseReceipt',
                leaf: true
              },
              {
                text: '采购退货',
                qtip: '采购退货',
                url: 'app-purchaseReturn.html',
                id: 'purchaseReturn',
                leaf: true
              },
              {
                text: '库存盘点',
                qtip: '库存盘点',
                leaf: true,
                url: 'app-stockTaking.html',
                id: 'stockTaking'
              }
            ]
          },
          {
            text: '采购管理',
            qtip: '采购管理',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '采购订单',
                qtip: '采购订单',
                leaf: true,
                url: 'app-purchaseOrder.html',
                id: 'purchaseOrder'
              },
              {
                text: '采购结款',
                qtip: '采购结款',
                leaf: true,
                url: 'app-purchasePayment.html',
                id: 'purchasePayment'
              }
            ]
          },
          {
            text: '报表分析',
            qtip: '报表分析',
            leaf: false,
            expanded: true,
            children: [
              {
                text: '销售订单统计报表',
                qtip: '销售订单统计报表',
                leaf: true
              },
              {
                text: '商品资料统计表表',
                qtip: '商品资料统计表表',
                leaf: true
              },
              {
                text: '出入库明细报表',
                qtip: '出入库明细报表',
                leaf: true,
                url: 'app-stockJournalSummary.html',
                id: 'stockJournalSummary'
              },
              {
                text: '进销存统计报表',
                qtip: '进销存统计报表',
                leaf: true,
                url: 'app-stockInvoicingSummary.html',
                id: 'stockInvoicingSummary'
              }
            ]
          },
          {
            text: '海关设置',
            qtip: '库存管理',
            leaf: false,
            expanded: false,
            children: [
              {
                text: '海关备案设置',
                qtip: '海关备案设置',
                leaf: true
              }
            ]
          }
        ]
      },
      fields: [
        {
          name: 'text'
        }
      ]
    }, cfg)]);
  }
});