/**
 * Created by Junyi on 2016/8/4.
 */

Ext.define('OrderHold.view.UpdateWarehouseWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.updatewarehousewindow',

  requires: [
    'OrderHold.view.UpdateWarehouseWindowViewController',
    'OrderHold.view.UpdateWarehouseWindowViewModel',
    'Ext.grid.Panel',
    'Ext.grid.column.Number',
    'Ext.grid.column.Boolean'
  ],

  controller: 'updatewarehousewindow',
  viewModel: {
    type: 'updatewarehousewindow'
  },
  modal: true,
  width: 300,
  height: 300,
  layout: 'fit',
  title: '选择仓库',
  stateful: false,
  items: [
    {
      xtype: 'gridpanel',
      header: false,
      title: 'My Grid Panel',
      columns: [
        {
          text: '序号',
          xtype: 'rownumberer',
          align: 'center',
          width: 50
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'code',
          text: '仓库编码',
          sortable: false,
          flex: 1
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          text: '仓库名称',
          sortable: false,
          flex: 1
        }
      ],
      listeners: {
        itemdblclick: 'itemdblclick'
      }
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      ui: 'footer',
      items: [
        {
          xtype: 'tbfill'
        },
        {
          xtype: 'button',
          iconCls: 'btn-select',
          text: '选择',
          handler: 'onButtonSelectClick'
        },
        {
          xtype: 'button',
          iconCls: 'btn-cancel',
          text: '取消',
          handler: 'onButtonCancelClick'
        }
      ]
    }
  ]


});