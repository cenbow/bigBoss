Ext.define('ProductRecycled.view.MainViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.mainviewport',

  requires: [
    'ProductRecycled.view.MainViewportViewController',
    'ProductRecycled.view.MainViewportViewModel',
    'Common.ux.CommandColumn',
    'Ext.tree.Panel',
    'Ext.tree.View',
    'Ext.button.Button',
    'Ext.grid.Panel',
    'Ext.menu.Menu',
    'Ext.menu.Item',
    'Ext.form.field.ComboBox',
    'Ext.form.trigger.Trigger',
    'Ext.grid.column.RowNumberer',
    'Ext.selection.CheckboxModel',
    'Ext.toolbar.Paging',
    'Ext.grid.column.Check'
  ],

  controller: 'mainviewport',
  viewModel: {
    type: 'mainviewport'
  },
  layout: 'fit',

  items: [{
    xtype: 'gridpanel',
    title: '回收站',
    //columnLines: true,
    reference: "ProductRecycledGrid",
    header: false,
    //store:'MainViewportGridStore',//数据绑定，绑定store
    collapseMode: 'mini',
    region: 'west',
    split: true,
    collapsible: true,
    bind: {
      store: "{gridStore}"
    },
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'top',
      items: [{
        xtype: 'button',
        iconCls: 'btn-add',
        text: '批量恢复',
        /*bind: {
          disabled: '数据绑定'
        },*/
        listeners: {
          click: 'onRecycledAll'
        }
      }, {
        xtype: 'tbfill'
      }, {
        xtype: 'textfield',
        width: 300,
        fieldLabel: '快速搜索',
        labelAlign: 'right',
        labelWidth: 60,
        emptyText: '商品编码/规格编码/规格名称/条形码',
        enableKeyEvents: true,
        listeners: {
          specialKey: 'onFastSearchTextFieldSpecialKey'
        },
        triggers: {
          fastQueryTrigger: {
            handler: 'onFastQueryButtonClick',
            cls: 'x-form-search-trigger'
          }
        },
        bind: {
          value: "{query}"
        }
      }]
    }, {
      xtype: 'pagingcustomtoolbar',
      dock: 'bottom',
      displayInfo: true,
      bind: {
        store: "{gridStore}"
      }
    }],
    columns: {
      defaults: {
        align: "center",
        menuDisabled: true,
        tdCls: 'with-btngroup'
      },
      items: [{
        text: '序号',
        xtype: 'rownumberer',
        width: 37
      },{
        text: '操作',
        xtype: 'widgetcolumn',
        width: 70,
        tdCls: 'btngroup',
        dataIndex: 'progress',
        widget: {
          xtype: 'buttongroup',
          baseCls: "",
          layout: {
            type: "column"
          },
          /* listeners: {
           beforerender: '_onButtonGroupBeforeRender'
           },*/
          defaults: {
            handler: 'onCommandColumnClick'
          },
          items: [{
            xtype: "button",
            command: "Recycled",
            iconCls: "btn-add",
            text: "恢复"
          }]
        }
      },{
        xtype: 'gridcolumn',
        dataIndex: 'skuId',
        text: 'skuId',
        hidden: true
      },{
        xtype: 'gridcolumn',
        dataIndex: 'productCode',
        text: '商品编码'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'skuCode',
        text: '规格编码'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'skuName',
        text: '规格名称'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'barCode',
        text: '条形码'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'productCatName',
        text: '商品类目'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'productOriginName',
        text: '产地'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'productBrandName',
        text: '品牌'
      },{
        xtype: 'gridcolumn',
        dataIndex: 'weight',
        text: '计费重量（kg）'
      },{
        xtype: 'gridcolumn',
        dataIndex: 'size',
        text: '体积（m3）'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'unit',
        text: '计量单位'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'purchaseUnit',
        text: '采购单位'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'proportion',
        text: '采购比例'
      },{
        xtype: 'gridcolumn',
        width: 200,
        dataIndex: 'createDate',
        formatter: 'date("Y/m/d H:i:s")',
        text: '创建日期'
      },{
        xtype: 'gridcolumn',
        dataIndex: 'updateDate',
        width: 200,
        renderer:Ext.util.Format.dateRenderer('Y/m/d H:i:s'),
        text: '更新时间'
      },{
        xtype: 'gridcolumn',
        dataIndex: 'updateByName',
        text: '更新人'
      },{
        xtype: 'gridcolumn',
        dataIndex: 'status',
        text: '状态',
        hidden: true
      }]
    },

    selModel: {
      selType: 'checkboxmodel',
      injectCheckbox: 1
    }

  }]

});