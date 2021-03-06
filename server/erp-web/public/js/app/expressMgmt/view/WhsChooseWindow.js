/*
 * File: app/view/WhsWindow.js
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

Ext.define('ExpressMgmt.view.WhsChooseWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.whschoosewindow',

  requires: [
    'ExpressMgmt.view.WhsChooseWindowViewModel',
    'ExpressMgmt.view.WhsChooseWindowViewController',
    'Ext.grid.Panel',
    'Ext.grid.column.Number',
    'Ext.grid.column.Boolean'
  ],

  controller: 'whschoosewindow',
  viewModel: {
    type: 'whschoosewindow'
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
      bind: {
        store: '{whsStore}'
      },
      columns: [
        {
          text: '序号',
          xtype: 'rownumberer',
          width: 37
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
          iconCls: 'btn-save',
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