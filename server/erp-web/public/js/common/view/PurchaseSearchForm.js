Ext.define('Common.view.PurchaseSearchForm', {
  extend: 'Ext.form.Panel',
  alias: 'widget.purchasesearchform',

  requires: [
    'Common.view.PurchaseSearchFormViewController',
    'Common.view.PurchaseSearchFormViewModel',
    'Common.view.GoodsChooseDialog'
  ],

  controller: 'purchasesearchform',
  viewModel: {
    type: 'purchasesearchform'
  },

  bodyPadding: 5,
  region: 'north',
  header: false,
  border: false,
  title: 'My Form',

  layout: 'column',
  defaults: {
    columnWidth:.2,
    labelWidth: 60,
    margin: 5,
    labelAlign: "left"
  },

  setStore: function(store) {
    var viewModel = this.getViewModel();
    viewModel.set('store', store);
  },
  items: [
    {
      xtype: 'textfield',
      bind: {
        fieldLabel: '{baseNoLabel}',
      },
      name: 'baseNo'
    },
    {
      itemId: 'status',
      xtype: 'combobox',
      fieldLabel: '状态',
      editable: false,
      displayField: 'name',
      valueField: 'code',
      queryMode: 'local',
      emptyText: "请选择",
      name: 'status'
    },
    {
      xtype: 'combobox',
      fieldLabel: '仓库',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      emptyText: "请选择",
      queryMode: 'local',
      name: 'whsId',
      bind: {
        store: '{whsStore}'
      }
    },
    {
      xtype: 'combobox',
      fieldLabel: '供应商',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      emptyText: "请选择",
      queryMode: 'local',
      name: 'supplierId',
      bind: {
        store: '{supplierStore}'
      }
    },
    {
      xtype: 'textfield',
      fieldLabel: '备注',
      name: 'memo'
    },
    {
      xtype: 'datefield',
      id: 'purchaseSearchPostDateFrom',
      bind: {
        fieldLabel: '{postDateLabel}',
      },
      editable: false,
      name: 'postDateFrom',
      format: "Y/n/j",
      listeners: {
        change: 'postDateFromChage'
      }
    },
    {
      xtype: 'datefield',
      fieldLabel: '至',
      editable: false,
      id: 'purchaseSearchPostDateTo',
      name: 'postDateTo',
      format: "Y/n/j",
      listeners: {
        change: 'postDateTo'
      }
    },
    {
      xtype: 'textfield',
      fieldLabel: '包含商品',
      emptyText: '规格编码（多个商品以逗号分隔）',
      name: 'skuCodes',
      triggers: {
        mytrigger: {
          handler: 'onButtonGoodsChooseClick',
          cls: 'x-form-ellipsis-trigger'
        }
      }
    },
    {
      xtype: 'textfield',
      fieldLabel: '采购单号',
      name: 'purchaseOrderNo'
    },
    //{
    //  xtype: 'dislable',
    //  columnWidth:.08,
    //},
    {
      xtype: 'button',
      iconCls: 'btn-search',
      text: '查询',
      columnWidth:.1,
      defaultAlign :'right',
      margin: '5 0 0 50',
      listeners: {
        click: 'onButtonSearchClick'
      }
    },
    {
      xtype: 'button',
      iconCls: 'btn-clear',
      text: '清空',
      columnWidth:.1,
      margin: '5 7 0 43',
      listeners: {
        click: 'onButtonClearClick'
      }
    }
  ]
});