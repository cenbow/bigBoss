Ext.define('PurchaseReturn.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',

    requires: [
      'PurchaseReturn.view.MyViewportViewModel',
      'PurchaseReturn.view.MyViewportViewController',
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
        inventoryType: 'PURCHASE_RETURN',
        bind: {
          store: '{purchaseReturnGridStore}'
        }
      },
      {
        xtype: 'gridpanel',
        region: 'center',
        columnLines: false,
        title: '采购退货',
        header: false,
        bind: {
          store: '{purchaseReturnGridStore}'
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
              xtype: 'widgetcolumn',
              text: '操作',
              width: 180,
              align: 'center',
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

                  if (Ext.Array.contains(_USER.permissions, "purchaseReturn:edit")) {
                    if (record.get('status') == 'DRAFT') {
                      btnArray[1].show();
                      btnArray[2].show();
                    } else {
                      btnArray[1].hide();
                      btnArray[2].hide();
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
              text: '退货单号',
              align: 'center',
              width: 160
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'status',
              align: 'left',
              text: '状态',
              renderer: 'renderStatus'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'purchaseOrderNo',
              align: 'center',
              text: '采购订单号',
              width: 160
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsName',
              align: 'left',
              text: '仓库名称'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'supplierName',
              align: 'left',
              text: '供应商'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'createDate',
              align: 'center',
              text: '创建日期',
              width: 150,
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'postDate',
              align: 'center',
              text: '出库日期',
              width: 150,
              formatter: 'date("Y/m/d H:i:s")'
            },
            {
              xtype: 'datecolumn',
              dataIndex: 'updateDate',
              align: 'center',
              text: '更新时间',
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
              store: '{purchaseReturnGridStore}'
            }
          },
          {
            xtype: 'toolbar',
            dock: 'top',
            items: [
              {
                xtype: 'button',
                iconCls: 'btn-form-add',
                text: '采购退货',
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
        title: '退货单明细',
        bind: {
          store: '{returnDetailGridStore}'
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
              dataIndex: 'purchaseOrderNo',
              align: 'center',
              text: '采购单号'
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
              xtype: 'numbercolumn',
              dataIndex: 'quantity',
              text: '本次退货数量',
              align: 'right',
              format: '00'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'type',
              align: 'left',
              text: '退货类型',
              renderer: 'renderType'         
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsAreaName',
              align: 'left',
              text: '出库库区'
            },
            {
              xtype: 'gridcolumn',
              dataIndex: 'whsPickLoc',
              align: 'left',
              text: '出库库位'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'price',
              align: 'right',
              text: '出库成本'
            },
            {
              xtype: 'numbercolumn',
              dataIndex: 'lineTotal',
              align: 'right',
              text: '成本合计'
            }
          ]
        }
      }
    ]
});