Ext.define('ShopOrderList.view.MyViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.myviewport',

  requires: [
    'ShopOrderList.view.MyViewportViewController',
    'ShopOrderList.view.MyViewportViewModel',
    'Ext.grid.Panel',
    'Ext.form.Panel',
    'Ext.form.field.ComboBox',
    'Ext.toolbar.Toolbar',
    'Ext.form.field.Display',
    'Ext.grid.column.RowNumberer',
    'Ext.view.Table',
    'Ext.tab.Panel',
    'Ext.tab.Tab',
    'Ext.form.FieldContainer',
    'Common.ux.PagingToolbarCustom',
    'Common.overrides.PagingToolbarCustom',
    'Common.ux.CommandColumn',
    'Common.view.GoodsChooseDialog',
    "Common.ux.NumberFieldCustom"
  ],

  controller: 'myviewport',
  viewModel: {
    type: 'myviewport'
  },
  layout: 'border',

  items: [
    {
      xtype: 'gridpanel',
      region: 'center',
      header: false,
      title: 'My Grid Panel',
      store: 'GridStore',
      listeners: {
        rowClick: 'onGridpanelRowClick'
      },
      dockedItems: [
        {
          xtype: 'form',
          dock: 'top',
          height: 78,
          width: 100,
          layout: 'column',
          bodyPadding: 10,
          items: [
            {
              xtype: 'combobox',
              columnWidth: 0.18,
              margin: '0 0 10 0',
              fieldLabel: '店铺',
              editable: false,
              queryMode: 'local',
              labelWidth: 70,
              displayField: 'value',
              valueField: 'key',
              bind: {
                store: '{usergrantshopstore}',
                value: '{formData.shopId}'
              }
            },
            {
              xtype: 'combobox',
              columnWidth: 0.18,
              margin: '0 0 10 10',
              fieldLabel: '订单类型:',
              labelWidth: 70,
              queryMode: 'local',
              editable: false,
              displayField: 'value',
              valueField: 'key',
              store: 'ShopOrderTypeStore',
              bind: {
                value: '{formData.shopOrderType}'
              }
            },
            {
              xtype: 'combobox',
              columnWidth: 0.18,
              margin: '0 0 10 10',
              fieldLabel: '下单距今',
              labelWidth: 70,
              queryMode: 'local',
              editable: false,
              displayField: 'value',
              valueField: 'key',
              store: 'OrderAgoTypeStore',
              bind: {
                value: '{formData.orderAgoTypeStore}'
              }
            },
            {
              xtype: 'combobox',
              columnWidth: 0.18,
              margin: '0 0 10 10',
              fieldLabel: '仓库',
              labelWidth: 70,
              queryMode: 'local',
              editable: false,
              displayField: 'name',
              valueField: 'id',
              bind: {
                store: '{commonwhsstore}',
                value: '{formData.grantWhsId}'
              }
            },
            {
              xtype: 'combobox',
              columnWidth: 0.18,
              margin: '0 0 10 10',
              fieldLabel: '平台订单状态',
              queryMode: 'local',
              editable: false,
              displayField: 'value',
              valueField: 'key',
              labelWidth: 85,
              store: 'OrderStatusStore',
              bind: {
                value: '{formData.orderStatus}'
              }
            },
            {
              xtype: 'button',
              columnWidth: 0.05,
              margin: '0 0 0 10',
              text: '查询',
              listeners: {
                click: 'searchShopOrderList'
              }
            },
            {
              xtype: 'button',
              columnWidth: 0.05,
              margin: '0 0 0 10',
              text: '清空',
              listeners: {
                click: 'searchRecover'
              }
            },
            {
              xtype: 'textfield',
              columnWidth: 0.18,
              fieldLabel: '平台单号',
              //maxLength: 40,
              //maxLengthText: '长度限制在40个字符内',
              regex: /^[0-9a-zA-Z]{0,40}$/,
              regexText: '请输入40个字符以内的字母或数字',
              labelWidth: 70,
              bind: {
                value: '{formData.shopOrderNo}'
              }
            },
            {
              xtype: 'textfield',
              columnWidth: 0.18,
              margin: '0 0 0 10',
              fieldLabel: '客户名称',
              maxLength: 20,
              maxLengthText: '长度限制在20个字符内',
              labelWidth: 70,
              bind: {
                value: '{formData.memberNick}'
              }
            },
            {
              xtype: 'textfield',
              columnWidth: 0.18,
              margin: '0 0 0 10',
              fieldLabel: '联系电话',
              regex: /^[0-9]{0,11}$/,
              regexText: '请输入11个字符以内的数字',
              labelWidth: 70,
              bind: {
                value: '{formData.receiverMobile}'
              }
            },
            {
              xtype: 'textfield',
              columnWidth: 0.36,
              margin: '0 0 0 10',
              fieldLabel: '包含商品',
              labelWidth: 70,
              bind: {
                value: '{formData.skuCodes}'
              },
              triggers: {
                mytrigger: {
                  cls: 'x-form-ellipsis-trigger',
                  handler: '_openProductWindow'
                }
              }
            },
            {
              xtype: 'button',
              columnWidth: 0.1,
              margin: '0 0 0 10',
              text: '拓展条件'
            }
          ]
        },
        {
          xtype: 'toolbar',
          dock: 'top',
          items: [
            {
              xtype: 'button',
              text: '订单EXCEL导出',
              iconCls: 'page-excel'
            }
          ]
        },
        {
          xtype: 'pagingcustomtoolbar',
          id: 'pickLocationGrid',
          dock: 'bottom',
          displayInfo: true
        }
      ],
      columns: {
        defaults: {
          cls: 'titleAlign',
          tdCls: 'with-btngroup'
        },
        items: [{
          xtype: 'rownumberer',
          text: '序号',
          align: 'center',
          width: 37
        },
          {
            xtype: 'gridcolumn',
            dataIndex: 'shopOrderNo',
            align: 'center',
            width: 130,
            text: '平台订单号'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'buyerMemo',
            text: '买家留言'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'sellerMemo',
            text: '卖家留言'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'memberNick',
            text: '客户名称'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderStatusName',
            align: 'center',
            text: '平台订单状态'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderType',
            align: 'center',
            text: '订单类型'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'shopName',
            text: '店铺'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'expressName',
            text: '快递公司'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'expressTrackNo',
            text: '快递单号'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'receiverName',
            text: '收货人姓名'
          },
          {
            xtype: 'gridcolumn',
            width: 150,
            text: '手机/固话',
            renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
              var data = record.data;
              if (Ext.isEmpty(data.receiverMobile) && Ext.isEmpty(data.receiverPhone))
                return "";
              else if (!Ext.isEmpty(data.receiverMobile) && !Ext.isEmpty(data.receiverPhone))
                return data.receiverMobile + '/' + data.receiverPhone;
              else if (!Ext.isEmpty(data.receiverMobile))
                return data.receiverMobile;
              else if (!Ext.isEmpty(data.receiverPhone))
                return data.receiverPhone;
            }
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'idCardNo',
            width: 150,
            text: '证件号码'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'receiverAddress',
            minWidth: 300,
            text: '详细收货地址'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'whsName',
            text: '发货仓库'
          },
          {
            xtype: 'gridcolumn',
            align: 'center',
            dataIndex: 'orderTime',
            text: '下单距今',
            renderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
              if (Ext.isEmpty(value)) {
                return '';
              }
              var beginTime = new Date(value);
              var now = new Date();
              var secondAgo = Math.floor((now.getTime() - beginTime.getTime()) / 1000);
              var dayAgo = Math.floor(secondAgo / (60 * 60 * 24));
              secondAgo -= dayAgo * (60 * 60 * 24);
              var hourAgo = Math.floor(secondAgo / (60 * 60));
              secondAgo -= hourAgo * (60 * 60);
              var minuteAgo = Math.floor(secondAgo / 60);
              if (dayAgo >= 1 && dayAgo < 7) {
                metadata.style = "background-color:yellow;";
              }
              if (dayAgo >= 7) {
                metadata.style = "background-color:red;";
              }
              return dayAgo + "天" + hourAgo + "小时" + minuteAgo + "分";
            }
          },
          {
            xtype: 'gridcolumn',
            align: 'center',
            dataIndex: 'orderTime',
            width: 145,
            text: '平台下单时间'
          },
          {
            xtype: 'gridcolumn',
            align: 'center',
            dataIndex: 'createTime',
            width: 145,
            text: '创建时间'
          },
          {
            xtype: 'gridcolumn',
            align: 'center',
            dataIndex: 'paymentTime',
            width: 145,
            text: '支付时间'
          },
          {
            xtype: 'gridcolumn',
            align: 'center',
            dataIndex: 'consignTime',
            width: 145,
            text: '发货时间'
          },
          {
            xtype: 'gridcolumn',
            align: 'center',
            dataIndex: 'completeTime',
            width: 145,
            text: '完成时间'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'totalQuantity',
            align: 'right',
            text: '商品总件数'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'orderFee',
            align: 'right',
            formatter: 'currency(" ", 2)',
            text: '应付金额(元)',
            width: 100
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'paymentFee',
            align: 'right',
            formatter: 'currency(" ", 2)',
            text: '实付金额(元)',
            width: 100
          }]
      },
      viewConfig: {
        height: 491
      }
    },
    {
      xtype: 'tabpanel',
      region: 'south',
      height: 230,
      collapsible: true,
      split: true,
      header: false,
      activeTab: 0,
      items: [
        {
          xtype: 'panel',
          title: '明细商品',
          items: [
            {
              xtype: 'gridpanel',
              header: false,
              title: 'My Grid Panel',
              store: 'ShopOrderLineStore',
              columns: {
                defaults: {
                  cls: 'titleAlign',
                  tdCls: 'with-btngroup'
                },
                items: [{
                  xtype: 'rownumberer',
                  text: '序号',
                  align: 'center',
                  width: 37
                },
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'outerSkuId',
                    width: 210,
                    text: '平台规格编码'
                  },
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'outerSkuName',
                    width: 210,
                    text: '平台规格名称'
                  },
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'price',
                    align: 'right',
                    width: 120,
                    text: '单价(元)'
                  },
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'quantity',
                    align: 'right',
                    width: 120,
                    text: '数量'
                  },
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'weight',
                    align: 'right',
                    formatter: 'currency(" ", 2)',
                    width: 120,
                    text: '重量(千克)'
                  },
                  {
                    xtype: 'gridcolumn',
                    dataIndex: 'lineTotal',
                    align: 'right',
                    width: 140,
                    text: '行总价(元)'
                  }]
              }
            }
          ]
        },
        {
          xtype: 'panel',
          layout: 'fit',
          title: '收货信息',
          items: [
            {
              xtype: 'form',
              layout: 'column',
              bodyPadding: 10,
              header: false,
              title: 'My Form',
              items: [
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 0',
                  fieldLabel: '收货人姓名',
                  editable: false,
                  labelWidth: 70,
                  bind: {
                    value: '{orderInfoFormData.receiverName}'
                  }
                },
                {
                  xtype: 'fieldcontainer',
                  columnWidth: 0.48,
                  margin: '0 0 10 10',
                  layout: 'column',
                  fieldLabel: '收货区域',
                  labelWidth: 70,
                  items: [
                    {
                      xtype: 'textfield',
                      columnWidth: '0.33',
                      editable: false,
                      fieldLabel: '',
                      bind: {
                        value: '{orderInfoFormData.receiverProvince}'
                      }
                    },
                    {
                      xtype: 'textfield',
                      columnWidth: '0.33',
                      margin: '0 0 0 10',
                      editable: false,
                      fieldLabel: '',
                      bind: {
                        value: '{orderInfoFormData.receiverCity}'
                      }
                    },
                    {
                      xtype: 'textfield',
                      columnWidth: '0.34',
                      margin: '0 0 0 10',
                      editable: false,
                      fieldLabel: '',
                      bind: {
                        value: '{orderInfoFormData.receiverDistrict}'
                      }
                    }
                  ]
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '手机号',
                  editable: false,
                  labelWidth: 60,
                  bind: {
                    value: '{orderInfoFormData.receiverMobile}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 0',
                  fieldLabel: '固话',
                  editable: false,
                  labelWidth: 70,
                  bind: {
                    value: '{orderInfoFormData.receiverPhone}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.48,
                  margin: '0 0 10 10',
                  fieldLabel: '详细地址',
                  editable: false,
                  labelWidth: 70,
                  bind: {
                    value: '{orderInfoFormData.receiverAddress}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '邮政编码',
                  editable: false,
                  labelWidth: 60,
                  bind: {
                    value: '{orderInfoFormData.receiverZipCode}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  fieldLabel: '证件类型',
                  editable: false,
                  labelWidth: 70,
                  bind: {
                    value: '{orderInfoFormData.idCardType}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 0 10',
                  fieldLabel: '证件号码',
                  editable: false,
                  labelWidth: 70,
                  bind: {
                    value: '{orderInfoFormData.idCardNo}'
                  }
                }
              ]
            }
          ]
        },
        {
          xtype: 'panel',
          height: 121,
          layout: 'fit',
          title: '基本信息',
          items: [
            {
              xtype: 'form',
              layout: 'column',
              bodyPadding: 10,
              header: false,
              title: 'My Form',
              items: [
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 0',
                  fieldLabel: '店铺',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.shopName}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '订单类型',
                  editable: false,
                  bind: {
                    value: '{orderInfoFormData.orderType}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '仓库',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.whsName}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '客户姓名',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.memberNick}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 0',
                  fieldLabel: '平台订单号',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.shopOrderNo}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0  0 10 10',
                  fieldLabel: '平台订单状态',
                  editable: false,
                  bind: {
                    value: '{orderInfoFormData.orderStatusName}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '平台下单时间',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.orderTime}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '创建时间',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.createTime}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  fieldLabel: '支付时间',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.paymentTime}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '发货时间',
                  editable: false,
                  bind: {
                    value: '{orderInfoFormData.consignTime}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '完成时间',
                  editable: false,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.completeTime}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '订单运费（元）',
                  editable: false,
                  forcePrecision: true,
                  readOnly: true,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.shippingFee}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.24,
                  margin: '0 0 10 0',
                  fieldLabel: '订单税费（元）',
                  editable: false,
                  forcePrecision: true,
                  readOnly: true,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.taxFee}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '折扣金额（元）',
                  editable: false,
                  forcePrecision: true,
                  readOnly: true,
                  bind: {
                    value: '{orderInfoFormData.discountFee}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '商品总价（元）',
                  editable: false,
                  forcePrecision: true,
                  readOnly: true,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.totalFee}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.24,
                  margin: '0 0 10 10',
                  fieldLabel: '应付金额（元）',
                  editable: false,
                  forcePrecision: true,
                  readOnly: true,
                  labelWidth: 90,
                  bind: {
                    value: '{orderInfoFormData.orderFee}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.24,
                  fieldLabel: '调整金额（元）',
                  editable: false,
                  labelWidth: 90,
                  forcePrecision: true,
                  readOnly: true,
                  bind: {
                    value: '{orderInfoFormData.adjustFee}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.24,
                  margin: '0 0 0 10',
                  fieldLabel: '订单重量（千克）',
                  editable: false,
                  forcePrecision: true,
                  readOnly: true,
                  bind: {
                    value: '{orderInfoFormData.totalWeight}'
                  }
                }
              ]
            }
          ]
        },
        {
          xtype: 'panel',
          layout: 'fit',
          title: '付款信息',
          items: [
            {
              xtype: 'form',
              layout: 'column',
              bodyPadding: 10,
              header: false,
              title: 'My Form',
              items: [
                {
                  xtype: 'textfield',
                  columnWidth: 0.32,
                  margin: '0 0 10 0',
                  fieldLabel: '支付流水号',
                  editable: false,
                  labelWidth: 70,
                  bind: {
                    value: '{orderInfoFormData.paymentTradeNo}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.32,
                  margin: '0 0 10 10',
                  fieldLabel: '支付方式',
                  labelWidth: 95,
                  editable: false,
                  bind: {
                    value: '{orderInfoFormData.paymentMethod}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.32,
                  margin: '0 0 10 10',
                  fieldLabel: '支付结果',
                  editable: false,
                  labelWidth: 60,
                  bind: {
                    value: '{orderInfoFormData.paymentStatus}'
                  }
                },
                {
                  xtype: 'textfield',
                  columnWidth: 0.32,
                  fieldLabel: '支付时间',
                  editable: false,
                  labelWidth: 70,
                  bind: {
                    value: '{orderInfoFormData.paymentTime}'
                  }
                },
                {
                  xtype: 'numberfieldcustom',
                  columnWidth: 0.32,
                  margin: '0 0 0 10',
                  fieldLabel: '实付金额（元）',
                  labelWidth: 95,
                  editable: false,
                  forcePrecision: true,
                  readOnly: true,
                  bind: {
                    value: '{orderInfoFormData.paymentFee}'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]

});