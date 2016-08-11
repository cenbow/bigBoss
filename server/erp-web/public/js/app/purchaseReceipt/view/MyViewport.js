Ext.define('PurchaseReceipt.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',

    requires: [
      'PurchaseReceipt.view.MyViewportViewModel',
      'PurchaseReceipt.view.MyViewportViewController',
      'Common.view.PurchaseSearchForm',
      'Ext.form.Panel',
      'Ext.form.field.ComboBox',
      'Ext.form.field.Date',
      'Ext.toolbar.Spacer',
      'Ext.button.Button',
      'Ext.grid.Panel',
      'Ext.grid.column.Number',
      'Ext.grid.column.Boolean',
      'Ext.view.Table',
      'Ext.grid.column.Date',
      'Ext.toolbar.Paging',
      'Ext.ProgressBar'
    ],

    controller: 'myviewport',
    viewModel: {
        type: 'myviewport'
    },
    layout: 'border',

    items: [
      {
        xtype: 'purchasesearchform',
        inventoryType: 'PURCHASE_RECEIPT',
        bind: {
          store: '{purchaseReceiptGridStore}'
        }
      },
      {
        xtype: 'gridpanel',
        region: 'center',
        columnLines: false,
        title: '采购收货',
        header: false,
        bind: {
          store: '{purchaseReceiptGridStore}'
        },
          
        columns: {
          defaults: {
            //align: "center",
            cls: 'titleAlign',
            tdCls: 'with-btngroup',
            sortable: false
          },
          items: [
            {
              xtype: 'rownumberer',
              text: '序号',
              align: "center",
              width: 37
            },
            {
              xtype: 'widgetcolumn',
              text: '操作',
              width: 180,
              tdCls: 'btngroup',
              align: "center",
              dataIndex: 'progress',
              widget: {
                xtype: 'buttongroup',
                baseCls: '',
                layout: {
                  type: "column"
                },
                defaultBindProperty: 'permission',
                setPermission: function(){
                  var buttonGroup = this,
                    btnArray = buttonGroup.items.items,
                    record = btnArray[0].ownerCt.getWidgetRecord();

                  if (Ext.Array.contains(_USER.permissions, "purchaseReceipt:edit")) {
                    if (record.get('status') !== '草稿') {
                      btnArray[1].hide();
                      btnArray[2].hide();
                    } else {
                      btnArray[1].show();
                      btnArray[2].show();
                    }
                  } else {
                    Ext.Array.each(btnArray, function(item, index) {
                      item.setDisabled(true);
                    });
                  }
                },
                defaults: {
                  handler: 'onCommandColumnClick',
                },
                items: [{
                  xtype: 'button',
                  command: 'print',
                  iconCls: 'btn-printer',
                  text: '打印'
                },{
                  xtype: 'button',
                  command: 'update',
                  iconCls: 'btn-edit',
                  text: '编辑'
                },{
                  xtype: 'button',
                  command: 'cancel',
                  iconCls: 'btn-cancel',
                  text: '取消'
                }]
              }
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'baseNo',
              text: '收货单号',
              align: "center",
              width: 160
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'status',
              text: '状态'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'purchaseOrderNo',
              text: '采购订单号',
              align: "center",
              width: 160
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsName',
              text: '仓库名称'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'supplierName',
              text: '供应商'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'createDate',
              text: '创建日期',
              align: "center",
              width: 150,
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'postDate',
              text: '入库日期',
              align: "center",
              width: 150,
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'updateDate',
              text: '更新时间',
              align: "center",
              width: 150,
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'createByName',
              text: '创建人'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'memo',
              text: '备注'
            }
          ]
        },
        dockedItems: [
          {
            xtype: 'pagingcustomtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: {
              store: '{purchaseReceiptGridStore}'
            }
          },
          {
            xtype: 'toolbar',
            dock: 'top',
            items: [
              {
                xtype: 'button',
                iconCls: 'btn-form-add',
                text: '采购收货',
                listeners: {
                  click: 'onButtonAddClick'
                }
              }
            ]
          }
        ],
        listeners: {
          select: 'onGridItemSelect',
          itemdblclick: 'onTableItemDblClick'
        }
      },
      {
        xtype: 'gridpanel',
        region: 'south',
        collapseMode: 'mini',
        collapsible: true,
        split: true,
        height: 150,
        columnLines: false,
        title: '收货单明细',
        bind: {
          store: '{purchaseReceiptLineGridStore}'
        },
        columns: {
          defaults: {
            //align: "center",
            cls: 'titleAlign',
            tdCls: 'with-btngroup',
            sortable:false
          },
          items: [
            {
              xtype: 'rownumberer',
              text: '序号',
              align: "center",
              width: 37
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'purchaseOrderNo',
              align: "center",
              text: '采购订单号'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'productCode',
              align: "center",
              text: '商品编码'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'skuCode',
              align: "center",
              text: '规格编码'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'skuName',
              text: '规格名称'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'purchaseQty',
              text: '收货数量',
              format: '00'
            },
            {
              xtype: 'gridcolumn',
              text: '单位',
              dataIndex: 'purchaseUnit'
            },
            {
              xtype: 'gridcolumn',
              text: '比例',
              align: "right",
              dataIndex: 'proportion'
            },
            {
              xtype: 'gridcolumn',
              text: '入库数量',
              align: "right",
              dataIndex: 'quantity'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsAreaName',
              text: '入库库区'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsPickLoc',
              text: '入库库位'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'price',
              align: "right",
              text: '入库成本'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'lineTotal',
              align: "right",
              text: '成本合计'
            },
            {
              xtype: 'gridcolumn',
              text: '备注',
              dataIndex: 'memo'
            }
          ]
        }
      }
    ]
});