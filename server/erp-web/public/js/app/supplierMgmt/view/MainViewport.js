Ext.define('SupplierMgmt.view.MainViewport', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.mainviewport',

  requires: [
    'SupplierMgmt.view.MainViewportViewController',
    'SupplierMgmt.view.MainViewportViewModel',
    'Common.ux.CommandColumn'
  ],

  controller: 'mainviewport',
  viewModel: {
    type: 'mainviewport'
  },
  layout: 'fit',

  items: [{
    xtype: 'gridpanel',
    title: '供应商管理',
    reference: 'supplierMgmtGrid',
    header: false,
    bind: {
      store: '{gridStore}'
    },
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'top',
      items: [{
        xtype: 'button',
        iconCls: 'btn-add',
        text: '添加供应商',
        bind: {
          disabled: '{addButonDisabled}'
        },
        listeners: {
          click: 'onAddSupplierButtonClick'
        }
      }, {
        xtype: 'tbfill'
      }, {
        xtype: 'textfield',
        width: 255,
        fieldLabel: '快速搜索',
        labelAlign: 'right',
        labelWidth: 60,
        emptyText: '输入供应商编码/供应商名称',
        triggers: {
          fastQueryTrigger: {
            handler: 'onFastQueryButtonClick',
            cls: 'x-form-search-trigger'
          }
        },
        listeners: {
          specialkey: 'onEnterKey'
        }
      }]
    }, {
      xtype: 'pagingcustomtoolbar',
      dock: 'bottom',
      displayInfo: true,
      bind: {
        store: '{gridStore}'
      }
    }],
    columns: {
      defaults: {
    	cls: 'titleAlign',
        tdCls: 'with-btngroup',
        sortable:false
      },
      items: [{
        text: '序号',
        xtype: 'rownumberer',
        align: 'center',
        width: 37
      }, {
        text: '操作',
        xtype: 'widgetcolumn',
        align: 'center',
        width: 70,
        tdCls: 'btngroup',
        dataIndex: 'progress',
        widget: {
          xtype: 'buttongroup',
          baseCls: '',
          layout: {
            type: 'column'
          },
          listeners: {
            beforerender: '_onButtonGroupBeforeRender'
          },
          defaults: {
            handler: 'onCommandColumnClick'
          },
          items: [{
            xtype: 'button',
            command: 'Update',
            iconCls: 'btn-edit',
            text: '编辑'
          }]
        }
      }, {
          xtype: 'gridcolumn',
          tdCls: 'grid-switch',
          align: 'center',
          dataIndex: 'activeFlag',
          text: '是否启用',
          renderer: function(value,metadata,record,rowIndex,colIndex,store,view) {
            if (value === 'A') {
              return '<img src="/images/SwitchOn.png" />';
            } else {
              return '<img src="/images/SwitchOff.png" />';
            }
          }
      }, {
    	  xtype: 'gridcolumn',
    	  dataIndex: 'code',
    	  align: 'center',
    	  text: '供应商编码'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        align: 'left',
        text: '供应商名称'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'coopStartTime',
        formatter: 'date("Y/m/d")',
        align: 'center',
        text: '合作起始时间'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'contactName',
        align: 'left',
        text: '联系人'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'contactPhone',
        align: 'center',
        text: '电话'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'bankName',
        align: 'left',
        text: '开户行'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'bankAccount',
        align: 'center',
        text: '银行账号'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'provinceName',
        align: 'center',
        text: '省份'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'cityName',
        align: 'center',
        text: '市'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'districtName',
        align: 'center',
        text: '区(县)'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'zipCode',
        align: 'center',
        text: '邮编'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'address',
        align: 'left',
        text: '详细地址'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'produceCat',
        align: 'left',
        text: '生产类目'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'produceItems',
        align: 'left',
        text: '生产商品'
      }, {
        xtype: 'gridcolumn',
        dataIndex: 'memo',
        align: 'left',
        text: '备注'
      }]
    },
    listeners: {
      itemdblclick: 'onGridpanelItemDblClick',
      cellclick: 'cellclick'
    }
  }]

});