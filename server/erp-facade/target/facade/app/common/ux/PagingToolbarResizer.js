/**
 * 表格分页修改每页记录数的插件
 */
Ext.define('Common.ux.PagingToolbarResizer', {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.pagingtoolbarresizer',

  comboStore : Ext.create('Ext.data.Store', {
    fields: ['size'],
    data : [
      {size: 10},
      {size: 30},
      {size: 50},
      {size: 100}
    ]
  }),

  constructor: function (config) {
    if(config) {
      Ext.apply(this, config);
    }
  },

  init: function (parent) {
    var comboStore = this.comboStore;
    var combo = Ext.create('Ext.form.field.ComboBox', {
      editable: false,
      displayField: 'size',
      queryMode: 'local',
      store: comboStore,
      anchor: '100%',
      lazyRender: true,
      hideLabel: true,
      submitValue: false,
      isFormField: false,
      value: Ext.data.Store.prototype.config.pageSize,
      width:50,
      listeners: {
        select: function (combo, value, i) {
          var ptStore = parent.store;
          var size = value.data.size;
          ptStore.pageSize = size;
          parent.pageSize = size;
          ptStore.loadPage(1);
        }
      }
    });

    parent.pageSize = Ext.data.Store.prototype.config.pageSize;

    var index = parent.items.indexOf(parent.items.map['refresh']);
    parent.insert(++index, '每页行数');
    parent.insert(++index, combo);

    parent.on({
      beforedestroy: function () {
        combo.destroy();
      }
    });
  }
});