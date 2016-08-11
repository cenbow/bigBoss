Ext.define('Common.view.InventorySearchForm', {
  extend: 'Ext.form.Panel',
  alias: 'widget.inventorysearchform',

  requires: [
    'Common.view.InventorySearchFormViewController',
    'Common.view.InventorySearchFormViewModel',
    'Common.view.GoodsChooseDialog'
  ],

  controller: 'inventorysearchform',
  viewModel: {
    type: 'inventorysearchform'
  },

  bodyPadding: 5,
  region: 'north',
  header: false,
  border: false,
  title: 'My Form',
  /* layout: 'hbox',
   defaults: {
   padding: 5
   },*/

  layout: 'column',
  defaults: {
    columnWidth:.2,
    labelWidth: 80,
    margin: 5
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
      fieldLabel: '从仓库',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      emptyText: "请选择",
      queryMode: 'local',
      name: 'fromWhsId',
      bind: {
        store: '{whsStore}',
        hidden: '{hiddenRange}'
      }
    },
    {
      xtype: 'combobox',
      fieldLabel: '至仓库',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      emptyText: "请选择",
      queryMode: 'local',
      name: 'toWhsId',
      bind: {
        store: '{whsStore}',
        hidden: '{hiddenRange}'
      }
    },
    {
      xtype: 'combobox',
      fieldLabel: '仓库',
      editable: false,
      displayField: 'name',
      valueField: 'id',
      emptyText: "请选择",
      queryMode: 'local',
      columnWidth:.2,
      name: 'whsId',
      bind: {
        store: '{whsStore}',
        hidden: '{!hiddenRange}'
      }
    },

    {
      xtype: 'textfield',
      fieldLabel: '备注',
      name: 'memo'
    },
    {
      /*xtype: 'tbspacer',*/
      xtype: 'displayfield',
      bind: {
        hidden: '{!hiddenRange}'
      }
    },
    {
      xtype: 'datefield',
      bind: {
        fieldLabel: '{postDateLabel}',
      },
      editable: false,
      name: 'postDateFrom',
      format: "Y/n/j",
      listeners: {
        select : function(view, fromValue) {
          var form = view.up('form');
          var postDateTo = form.getComponent('postDateTo');
          postDateTo.setMinValue(fromValue);
          var toValue = postDateTo.getValue();
          if(toValue < fromValue) {
            postDateTo.setValue('');
          }
        }
      }
    },
    {
      xtype: 'datefield',
      itemId: 'postDateTo',
      fieldLabel: '至',
      editable: false,
      name: 'postDateTo',
      format: "Y/n/j"
    },
    {
      xtype: 'textfield',
      columnWidth: 0.4,
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
      xtype: 'button',
      iconCls: 'btn-search',
      columnWidth:.08,
      text: '查询',
      listeners: {
        click: 'onButtonSearchClick'
      }
    },
    {
      xtype: 'button',
      iconCls: 'btn-clear',
      text: '清空',
      columnWidth:.08,
      listeners: {
        click: 'onButtonClearClick'
      }
    }
  ]
});