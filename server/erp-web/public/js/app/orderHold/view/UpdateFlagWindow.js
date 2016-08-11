/**
 * Created by Junyi on 2016/8/4.
 */

Ext.define('OrderHold.view.UpdateFlagWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.updateflagwindow',

  requires: [
    'OrderHold.view.UpdateFlagWindowViewController',
    'OrderHold.view.UpdateFlagWindowViewModel',
    'Common.ux.SaveCancelToolbar',
    'Ext.form.Panel',
    'Ext.toolbar.Toolbar',
    'Ext.form.field.Checkbox',
    'Ext.form.field.ComboBox',
    'Ext.form.trigger.Trigger',
    'Ext.toolbar.Fill',
    'Ext.button.Button'
  ],

  controller: 'updateflagwindow',
  viewModel: {
    type: 'updateflagwindow'
  },
  autoShow: true,
  height: 266,
  width: 316,
  layout: 'fit',
  iconCls: 'btn-edit',
  bodyBorder: true,
  title: '批量信息修改',

  items: [
    {
      xtype: 'form',
      padding: '',
      width: '',
      layout: 'column',
      bodyBorder: false,
      bodyPadding: 10,
      header: false,
      title: 'My Form',
      items: [
        {
          xtype: 'checkboxfield',
          margin: '10 0 0 15',
          width: 20,
          fieldLabel: 'Label',
          hideLabel: true
        },
        {
          xtype: 'datefield',
          margin: '10 0 0 0',
          fieldLabel: '要求交货日',
          labelWidth: 70
        },
        {
          xtype: 'checkboxfield',
          margin: '10 0 0 15',
          width: 20,
          fieldLabel: 'Label',
          hideLabel: true
        },
        {
          xtype: 'combobox',
          margin: '10 0 0 0',
          fieldLabel: '旗帜类型',
          labelWidth: 70,
          emptyText: '请选择'
        },
        {
          xtype: 'checkboxfield',
          margin: '10 0 0 15',
          width: 20,
          fieldLabel: 'Label',
          hideLabel: true
        },
        {
          xtype: 'textareafield',
          margin: '10 0 0 0',
          fieldLabel: '卖家备注',
          labelWidth: 70
        }
      ]
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
          text: '保存',
          listeners: {
            click: 'onSaveButtonClick'
          }
        },
        {
          xtype: 'button',
          iconCls: 'btn-cancel',
          text: '取消',
          listeners: {
            click: 'onCancelButtonClick'
          }
        }
      ]
    }
  ]


});