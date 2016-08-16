Ext.define('Common.view.GoodsChooseDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.goodschoosedialog',

  /**
   * 快速搜索
   */
  onFastQueryButtonClick: function (button, trigger, e) {
    var me = this;
    var viewModel = me.getViewModel();
    var gridStore = viewModel.getStore("gridStore");
    var text = button.getValue();
    gridStore.load({params: {"query": text}});
  },

  /**
   * 回车快速搜索
   * @param field
   * @param e
   */
  onEnterKey: function (field, e) {
    if (e.getKey() == Ext.EventObject.ENTER) {
      this.onFastQueryButtonClick(field);
    }
  },

  onButtonSelectClick: function (button, e, eOpts) {
    var me = this;
    var view = me.getView();
    var grid = view.down('grid');
    var selections = grid.getSelectionModel().getSelection();
    if(selections && selections.length) {
      var arr = [];
      Ext.each(selections, function(selection) {
        arr.push(selection.getData());
      });

      view.callback(arr);
      view.close();
    } else {
      TipsUtil.showTips('提示', '请选择至少一件商品')
    }
  },

  onCancelButtonClick: function (button, e, eOpts) {
    var me = this;
    me.getView().close();
  }
});