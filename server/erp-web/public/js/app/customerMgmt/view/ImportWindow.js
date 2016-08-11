/**
 * Created by Junyi on 2016/8/4.
 */
/*
 * File: app/view/Uploadwindow.js
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

Ext.define('CustomerMgmt.view.ImportWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.importwindow',

  requires: [
    'CustomerMgmt.view.ImportWindowViewController',
    'CustomerMgmt.view.ImportWindowViewModel',
    'Ext.form.Panel',
    'Ext.form.field.File',
    'Ext.toolbar.Toolbar',
    'Ext.button.Button'
  ],
  controller: 'importwindow',
  viewModel: {
    type: 'importwindow'
  },
  autoHeight: true,
  width: 300,
  frame: true,
  iconCls: 'btn-permission',
  title: '导入会员信息',

  layout: 'fit',
  buttonsAlign: 'right',
  modal:true,
  items: [{
    xtype: 'form',
    reference: 'form',
    layout: 'column',
    bodyPadding: 10,
    defaults: {
      margin: 7,
      labelAlign: 'left',
      labelWidth: 60
    },
    buttons: [{
      xtype: 'button',
      text: '确认',
      listeners: {
        click: 'onBatchImportButtonClick'
      }
    }, {
      xtype: 'button',
      text: '取消',
      listeners: {
        click: 'onCancelButtonClick'
      }
    }],
    items: [{
      xtype: 'label',
      text: '导入模版',
      columnWidth: .3,
    }, {
      xtype: 'textfield',
      name: 'type',
      bind: '{type}',
      hidden: true,
    }, {
      xtype: 'button',
      iconCls: 'page-excel',
      text: '会员导入模版',
      columnWidth: 0.7,
    },
      {
        xtype: 'label',
        text: '导入文件',
        columnWidth: .3,
      }, {
        width: 200,
        xtype: 'filefield',
        columnWidth: 0.7,
        emptyText:'请选择CSV文件',
        name: 'file',
        fieldLabel: '',
        buttonText: '选择',
        value: "请选择CSV文件",
        iconCls: "btn-link",
        buttonConfig: {
          iconCls: "btn-link"
        }
      }]
  }]

});