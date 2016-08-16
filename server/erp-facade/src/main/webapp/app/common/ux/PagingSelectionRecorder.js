/**
 * 表格分页多行选择记录插件
 */
Ext.define('Common.ux.PagingSelectionRecorder', {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.pagingselectionrecorder',

  constructor: function (config) {
    Ext.apply(this, config);
    this.callParent(arguments);
  },

  init: function (pagingToolbar) {
    var label = Ext.create('Ext.form.Label');

    var index = pagingToolbar.items.indexOf(pagingToolbar.items.map['refresh']) + 2;
    pagingToolbar.insert(++index, '-');
    pagingToolbar.insert(++index, label);

    pagingToolbar.on({
      beforedestroy: function () {
        if(label && label.destory) {
          label.destory();
        }
      }
    });

    var grid = pagingToolbar.up('grid');
    grid.on("selectionchange", function () {
      var selections = grid.getSelectionModel();
      if (selections.getCount() > 0) {
        label.setText("已选中" + selections.getCount() + "行");
      }
      else {
        label.setText("");
      }
    });
  }
});
