Ext.define('GoodsReceipt.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',

    requires: [
        'GoodsReceipt.view.MyViewportViewModel',
        'GoodsReceipt.view.MyViewportViewController',
        'Common.view.InventorySearchForm',
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
        xtype: 'inventorysearchform',
        inventoryType: 'GOODS_RECEIPT',
        bind: {
          store: '{goodsReceiptGridStore}'
        }
      },
      {
        xtype: 'gridpanel',
        region: 'center',
        columnLines: false,
        title: '杂项入库',
        header: false,
        bind: {
          store: '{goodsReceiptGridStore}'
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
              text: '序号',
              align: 'center',
              width: 37
            },
            {
              xtype: 'widgetcolumn',
              text: '操作',
              align: 'center',
              width: 120,
              tdCls: 'btngroup',
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

                  if (Ext.Array.contains(_USER.permissions, "goodsReceipt:edit")) {
                    if (record.get('status') !== 'DRAFT') {
                      btnArray[1].hide();
                    } else {
                      btnArray[1].show();
                    }
                  } else {
                    Ext.Array.each(btnArray, function(item, index) {
                      item.setDisabled(true);
                    });
                  }
                },
                defaults: {
                  handler: 'onCommandColumnClick'
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
                }]
              }
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'baseNo',
              text: '入库单号',
              align: 'center',
              width: 160
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'type',
              text: '入库类型',
              align: 'center',
              renderer: 'renderType'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'status',
              text: '状态',
              align: 'center',
              renderer: 'renderStatus'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsName',
              align: 'left',
              text: '仓库名称'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsAreaName',
              align: 'left',
              text: '库区名称'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'createDate',
              text: '创建日期',
              width: 150,
              align: 'center',
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'postDate',
              align: 'center',
              text: '入库日期',
              width: 150,
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'updateDate',
              text: '更新时间',
              align: 'center',
              width: 150,
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'createByName',
              align: 'left',
              text: '创建人'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'memo',
              align: 'left',
              width: 180,
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
              store: '{goodsReceiptGridStore}'
            }
          },
          {
            xtype: 'toolbar',
            dock: 'top',
            items: [
              {
                xtype: 'button',
                iconCls: 'btn-form-add',
                text: '杂项入库',
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
        title: '入库单明细',
        bind: {
          store: '{receiptDetailGridStore}'
        },
        columns: {
          defaults: {
        	cls: 'titleAlign',
            tdCls: 'with-btngroup',
            sortable:false
          },
          items: [
            {
              xtype: 'rownumberer',
              text: '序号',
              align: 'center',
              width: 37
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'productCode',
              align: 'center',
              text: '商品编码'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'skuCode',
              align: 'center',
              text: '规格编码'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'skuName',
              align: 'left',
              text: '规格名称'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsAreaName',
              align: 'left',
              text: '入库库区'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsPickLoc',
              align: 'left',
              text: '入库库位'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'purchaseQty',
              text: '收货数量',
              align: 'right',
              format: '00'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'purchaseUnit',
              align: 'center',
              text: '收货单位'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'proportion',
              text: '比例',
              align: 'right',
              format: '00'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'quantity',
              text: '入库数量',
              align: 'right',
              format: '00'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'price',
              align: 'right',
              text: '入库成本'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'lineTotal',
              align: 'right',
              text: '成本合计'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'memo',
              align: 'left',
              width: 180,
              text: '备注'
            }
          ]
        }
      }
    ]
});