Ext.define('OrderFinancialReview.view.MyViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.myviewport',

  requires: [
    'OrderFinancialReview.view.MyViewportViewModel',
    'OrderFinancialReview.view.MyViewportViewController',
    'Common.view.order.OrderReviewCommToolbar',
    'Common.view.order.OrderRelatedInfoCommTab',
    'Ext.grid.Panel',
    'Ext.view.Table',
    'Ext.button.Button',
    'Ext.toolbar.Separator',
    'Ext.menu.Menu',
    'Ext.menu.Item',
    'Ext.grid.column.RowNumberer',
    'Ext.grid.column.Number',
    'Ext.grid.column.Date',
    'Ext.selection.CheckboxModel',
    'Ext.toolbar.Paging',
    'Ext.tab.Panel'
  ],

  controller: 'myviewport',
  viewModel: {
    type: 'myviewport'
  },
  layout: 'border',

  listeners: {
	refreshCenterGridStore: 'refreshCenterGridStore'
  },
	  
  items: [
    {
      xtype: 'gridpanel',
      region: 'center',
      columnLines: false,
      title: '订单财审',
      header: false,
      bind: {
    	store: '{orderFinancialReviewGridStore}'
      },

      columns: {
        defaults: {
          cls: 'titleAlign',
          tdCls: 'with-btngroup',
          sortable: false
        },
        items: [
          {
            xtype: 'rownumberer',
            align: 'center',
            text: '序号',
            width: 37
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderTag',
            text: '订单标签',
            align: 'center'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'printTag',
            align: 'left',
            text: '打印标签'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'printCount',
            align: 'center',
            text: '打印批次'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderNo',
            align: 'left',
            text: '系统订单号'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'shopOrderNo',
            align: 'left',
            text: '平台订单号'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'buyerMemo',
            align: 'center',
            text: '买家留言'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'sellerMemo',
            align: 'center',
            text: '卖家留言'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'memberNick',
            align: 'center',
            text: '客户名称' /*会员名称*/
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'shopOrderStatusName',
            align: 'left',
            text: '平台订单状态'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderStatus',
            align: 'left',
            text: '系统订单状态',
            renderer: 'renderOrderStatus'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderType',
            align: 'left',
            text: '订单类型',
            renderer: 'renderOrderType'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'holdingReason',
            align: 'left',
            text: '拦截原因',
            renderer: 'renderOrderHoldingReason'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'holdingMemo',
            align: 'left',
            text: '拦截备注'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'shopName',
            align: 'left',
            text: '店铺'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'estimatedWeight',
            align: 'left',
            text: '包裹标准重量(kg)'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'actualWeight',
            align: 'left',
            text: '包裹实际称重(kg)'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'totalQuantity',
            align: 'left',
            text: '商品总件数'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'estimatedShippingFee',
            align: 'left',
            text: '标准物流成本'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'actualShippingFee',
            align: 'left',
            text: '实际物流成本'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderFee',
            align: 'left',
            text: '应付金额'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderProfit',
            align: 'left',
            text: '订单毛利润'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderProfitRatio',
            align: 'left',
            text: '订单利润率'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'expressName',
            align: 'left',
            text: '快递公司'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'expressTrackNo',
            align: 'left',
            text: '快递单号'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'receiverName',
            align: 'left',
            text: '收货人姓名'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'receiverMobile',
            align: 'left',
            text: '手机'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'receiverPhone',
            align: 'left',
            text: '固话'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'idCardType',
            align: 'left',
            text: '证件类型',
            renderer: 'renderIdCardType'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'idCardNo',
            align: 'left',
            text: '证件号码'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'receiverAddress',
            align: 'left',
            text: '详细收货地址'
          },
          {
        	xtype: 'datecolumn',
            dataIndex: 'expectedConsignTime',
            align: 'center',
            text: '要求发货日',
            width: 150,
            formatter: 'date("Y/m/d")'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'whsName',
            align: 'left',
            text: '发货仓库'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: '',
            align: 'left',
            text: '下单距今'
          },
          {
        	xtype: 'datecolumn',
            dataIndex: 'orderTime',
            align: 'center',
            text: '平台下单时间',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'datecolumn',
            dataIndex: 'createTime',
            align: 'center',
            text: '创建时间',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'datecolumn',
            dataIndex: 'paymentTime',
            align: 'center',
            text: '支付时间',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'datecolumn',
            dataIndex: '',
            align: 'center',
            text: '清关时间',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'datecolumn',
            dataIndex: 'consignTime',
            align: 'center',
            text: '发货时间',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'datecolumn',
            dataIndex: 'completeTime',
            align: 'center',
            text: '完成时间',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'lockedByName',
            align: 'left',
            text: '锁定人'
          }
        ]
      },
      selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE',
        pruneRemoved: false,
        enableKeyNav: false,
        injectCheckbox: 1
      },
      dockedItems: [
        {
          xtype: 'pagingcustomtoolbar',
          dock: 'bottom',
          displayInfo: true,
          bind: {
            store: '{orderFinancialReviewGridStore}'
          }
        },
        {
          xtype: 'toolbar',
          dock: 'top',
          items: [
            {
              xtype: 'button',
              iconCls: 'btn-form-add',
              text: '财审通过',
              listeners: {
                click: 'onButtonClickPassAudit'
              }
            }, {
              xtype: 'button',
              iconCls: 'btn-form-add',
              text: '打回待审',
              listeners: {
                click: 'onButtonClickCancelAudit'
              }
            }
          ]
        }
      ],
      listeners: {
        select: 'onGridItemSelect'
      }
    },
    {
      xtype: 'order.orderreviewcommtoolbar',
      itemId: 'mytoolbar',
      region: 'north'
    },
    {
      xtype: 'order.orderrelatedinfocommtab',
      communicate: true,
      collapsible: true,
      itemId: 'commtab',
      region: 'south',
      split: {
        style: 'margin: auto 5px;background-color: #E0E0E0;'
      }
    }
  ]
});