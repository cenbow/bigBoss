/*
 * File: app/view/LogDiffDialog.js
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

Ext.define('OrderReview.view.OrderConcatSliceDialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.orderconcatslicedialog',

  requires: [
    'OrderReview.view.OrderConcatSliceDialogViewController',
    'OrderReview.view.OrderConcatSliceDialogViewModel',
    'Ext.form.field.Number',
    'Ext.button.Button',
    'Ext.grid.Panel',
    'Ext.view.Table',
    'Ext.grid.column.RowNumberer',
    'Ext.toolbar.Toolbar',
    'Ext.toolbar.Fill'
  ],

  controller: 'orderconcatslicedialog',
  viewModel: {
    type: 'orderconcatslicedialog'
  },
  height: 288,
  width: 500,
  minWidth: 490,
  modal: true,
  autoShow: true,
  title: '订单合并和拆分通用面板',

  layout: {
    type: 'fit'
  },
  items: [
    {
      xtype: 'gridpanel',
      reference: 'centergrid',
      border: false,
      title: '明细商品',
      header: false,
      bind: {
        store: '{orderconcatslicedialoggridstore}'
      },
      columns: {
        defaults: {
          cls: 'titleAlign',
          tdCls: 'with-btngroup'
        },
        items: [
          {
            xtype: 'rownumberer',
            width: 37,
            align: 'center',
            text: '序号'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'A02',
            text: '商品编码',
            renderer: 'onShopSkuRenderer'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'A03',
            text: '规格编码'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'A04',
            text: '规格名称'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'A06',
            text: '数量'
          },
          {
            xtype: 'numbercolumn',
            dataIndex: 'A07',
            text: '计量单位'
          },
          {
            xtype: 'numbercolumn',
            dataIndex: 'A08',
            text: '计费重量(kg)'
          },
          {
            xtype: 'numbercolumn',
            dataIndex: 'A09',
            text: '售价'
          },
          {
            xtype: 'numbercolumn',
            dataIndex: 'A10',
            text: '行售价'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'A18',
            text: '行备注'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'A19',
            text: 'A19'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'A20',
            text: 'A20'
          }
        ]
      }
    }
  ],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      ui: 'footer',
      items: []
    }
  ],

  constructor: function (cfg) {
    var me = this;
    cfg = cfg || {};
    var columns = me.items[0].columns.items;
    var column1 = {
        xtype: 'widgetcolumn',
        width: 60,
        align: 'center',
        tdCls: 'btngroup',
        text: '',
        dataIndex: 'A00',
        widget: {
          xtype: 'buttongroup',
          baseCls: "",
          layout: {
            type: "column"
          },
          defaultBindProperty: 'permission',
          setPermission: function () {
            var buttonGroup = this,
              btnArray = buttonGroup.items.items,
              record = btnArray[0].ownerCt.getWidgetRecord(),
              quantity = record.get('A06');

            if (Ext.Array.contains(_USER.permissions, "accountMgmt:edit111")) {

            } else {
              Ext.Array.each(btnArray, function (item, index) {
                item.setDisabled(quantity <= 1);
              });
            }

          },
          defaults: {
            handler: "onCommandColumnClick"
          },
          items: [
            {
              xtype: 'button',
              iconCls: "btn-edit",
              text: '拆分',
              command: "Slice"
            }
          ]
        }
      },
      column2 = {
        text: '所属订单',
        width: 80,
        xtype: 'widgetcolumn',
        align: 'center',
        tdCls: 'btngroup',
        widget: {
          xtype: 'combo',
          editable: false,
          anyMatch: true,
          displayField: 'name',
          queryMode: 'local',
          valueField: 'id',
          store: Common.Constant.ORDER_BELONGS_DATAS,
        }
      },
      tbfill = {
        xtype: 'tbfill'
      },
      concatOkBtn = {
        xtype: 'button',
        icon: '',
        iconCls: 'btn-save',
        text: '确认合并',
        listeners: {
          click: 'onButtonOkConcatClick'
        }
      },
      sliceOkBtn = {
        xtype: 'button',
        icon: '',
        iconCls: 'btn-save',
        text: '确认拆分',
        listeners: {
          click: 'onButtonOkSliceClick'
        }
      },
      cancelBtn = {
        xtype: 'button',
        icon: '',
        iconCls: 'btn-cancel',
        text: '取消',
        listeners: {
          click: 'onButtonCloseClick'
        }
      };


    switch (cfg.flag) {
      case
        'concat':
          if (columns[1].xtype == 'widgetcolumn') {
            columns.splice(1, 2);
          }
          me.dockedItems[0].items = [tbfill, concatOkBtn, cancelBtn];
          break;
      case
        'slice' :
          if (columns[1].xtype != 'widgetcolumn') {
            columns.splice(1, 0, column1, column2);
          }
          me.dockedItems[0].items = [tbfill, sliceOkBtn, cancelBtn];
          break;
    }
    me.callParent([Ext.apply({}, cfg)]);
  }

});