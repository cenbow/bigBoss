/*
 * File: app/view/MyViewport.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('StockTransfer.view.MyViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.myviewport',

  requires: [
    'StockTransfer.view.MyViewportViewModel',
    'StockTransfer.view.MyViewportViewController',
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
      inventoryType: 'STOCK_TRANSFER',
      bind: {
        store: '{stockTransferStore}'
      }
    },
    {
      xtype: 'gridpanel',
      region: 'center',
      header: false,
      title: '库存调拨',
      bind: {
        store: '{stockTransferStore}'
      },
      /*viewConfig:{
        enableTextSelection:true
      },*/
      columns: {
        defaults: {
          align: 'center',
          tdCls: 'with-btngroup'
        },
        items: [
          {
            text: '序号',
            xtype: 'rownumberer',
            width: 50
          },
          {
            text: '操作',
            xtype: 'widgetcolumn',
            width: 120,
            tdCls: 'btngroup',
            dataIndex: 'progress',
            widget: {
              xtype: 'buttongroup',
              baseCls: 'center',
              layout: {
                type: 'column'
              },
              defaultBindProperty: 'permission',
              setPermission: function(){
                var buttonGroup = this,
                  btnArray = buttonGroup.items.items,
                  record = btnArray[0].ownerCt.getWidgetRecord();

                if (Ext.Array.contains(_USER.permissions, "stockTransfer:edit")) {
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
                command: 'Print',
                iconCls: 'btn-printer',
                text: '打印'
              }, {
                xtype: 'button',
                command: 'Update',
                iconCls: 'btn-edit',
                text: '编辑'
              }]
            }
          },
          {
            xtype: 'gridcolumn',
            width: 160,
            dataIndex: 'baseNo',
            text: '调拨单号'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'status',
            text: '调拨状态',
            renderer: 'renderStatus'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'fromWhsName',
            text: '从仓库'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'fromWhsAreaName',
            text: '从库区'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'toWhsName',
            text: '至仓库'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'fromWhsAreaName',
            text: '至库区'
          },
          {
            xtype: 'datecolumn',
            dataIndex: 'createDate',
            text: '创建时间',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'datecolumn',
            dataIndex: 'postDate',
            text: '调拨日期',
            width: 150,
            formatter: 'date("Y/m/d H:i:s")'
          },
          {
            xtype: 'datecolumn',
            dataIndex: 'updateDate',
            text: '更新时间',
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
            text: '备注',
            flex: 1
          }
        ]
      },
      dockedItems: [
        {
          xtype: 'pagingcustomtoolbar',
          dock: 'bottom',
          displayInfo: true,
          bind: {
            store: '{stockTransferStore}'
          }
        },
        {
          xtype: 'toolbar',
          dock: 'top',
          items: [
            {
              xtype: 'button',
              iconCls: 'btn-form-add',
              text: '库存调拨',
              listeners: {
                click: 'onButtonAddClick'
              }
            }
          ]
        }
      ],
      listeners: {
        itemdblclick: 'onTableItemDblClick',
        selectionchange: 'onSelectionChange',
      }
    },
    {
      xtype: 'gridpanel',
      region: 'south',
      collapseMode: 'mini',
      collapsible: true,
      split: true,
      height: 150,
      title: '库存调拨明细',
      bind: {
        store: '{transferDetailStore}'
      },
      columns: [
        {
          text: '序号',
          xtype: 'rownumberer',
          width: 50
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'productCode',
          text: '商品编码'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'skuCode',
          text: '规格编码'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'skuName',
          text: '规格名称'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'fromWhsName',
          text: '发货仓库'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'fromWhsAreaName',
          text: '发货库区'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'fromWhsPickLoc',
          text: '发货库位'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'toWhsName',
          text: '收货仓库'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'toWhsAreaName',
          text: '收货库区'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'toWhsPickLoc',
          text: '收货库位'
        },
        {
          xtype: 'numbercolumn',
          dataIndex: 'quantity',
          text: '调拨数量',
          format: '00'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'memo',
          text: '备注'
        }
      ]
    }
  ]


});