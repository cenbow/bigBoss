Ext.define('Common.view.ImportCVSDialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.importcvsdialog',

  requires: [
    'Common.view.ImportCVSDialogViewController',
    'Common.view.ImportCVSDialogViewModel'
  ],

  controller: 'importcvsdialog',
  viewModel: {
    type: 'importcvsdialog'
  },
  autoHeight: true,
  width: 300,
  frame: true,
  //labelSelector: '：',
  title: '导入商品信息',

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
      text: '商品导入模版',
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