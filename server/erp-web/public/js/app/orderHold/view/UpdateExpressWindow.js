/**
 * Created by Junyi on 2016/8/4.
 */

Ext.define('OrderHold.view.UpdateExpressWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.updateexpresswindow',

  requires: [
    'OrderHold.model.UpdateExpressModel',
    'OrderHold.view.UpdateExpressWindowViewController',
    'OrderHold.view.UpdateExpressWindowViewModel',
    'Ext.grid.Panel',
    'Ext.grid.column.Number',
    'Ext.grid.column.Boolean'
  ],

  controller: 'updateexpresswindow',
  viewModel: {
    type: 'updateexpresswindow'
  },
  modal: true,
  width: 300,
  height: 300,
  layout: 'fit',
  title: '选择快递',
  stateful: false,
  items: [
    {
      xtype: 'gridpanel',
      header: false,
      store: 'UpdateExpressStoreId',
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
          text: '快递代码',
          sortable: false,
          flex: 1
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          text: '快递名称',
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