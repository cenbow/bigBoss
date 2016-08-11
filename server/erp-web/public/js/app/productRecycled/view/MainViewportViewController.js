Ext.define('ProductRecycled.view.MainViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',

  requires: [
  ],

  /**
   * 批量恢复
   */
  onRecycledAll: function (record) {
    var viewCtr = this,
      dialog;

    var selModel = viewCtr.getView().down('grid').getSelectionModel();
    //console.info(selModel);

    if (!viewCtr.getView().down('grid').getSelectionModel().hasSelection()) {
      TipsUtil.showTips("提示", '请先选择记录', TipsUtil.WARING);
      return ;
    }

    dialog = Ext.MessageBox.confirm('提示', '确定批量恢复？', function (option){
      if(option=='yes') {
        var selected = selModel.getSelection();
        var Ids=[];
        Ext.each(selected, function (item) {
          Ids.push(item.data.skuId);
        });
        //console.info(Ids);
        Ext.getBody().el.mask('正在恢复, 请稍候...');
        Ext.Ajax.request({
          url: '/api/product/updateBulk',
          method: 'POST',
          params: {
            ids: Ids.join(','),
            status: 'ON_SALE'
          },
          scope: viewCtr,
          success: function(response, opts) {
            var res =Ext.JSON.decode(response.responseText);
            if(res.success){
              Ext.getBody().el.unmask();
              viewCtr.onFastQueryButtonClick();
              TipsUtil.showTips('提示','商品批量恢复成功', TipsUtil.INFO);
            }else{
              TipsUtil.showTips('提示','商品批量恢复失败', TipsUtil.INFO);
            }
          }
        });
      }
    });
  },


  /**
   * 单个恢复
   */
  _onRecycledOne: function (record) {
    var viewCtr = this;
    Ext.MessageBox.confirm('提示', '确定恢复？', function (option){
      if(option==='yes'){
        Ext.getBody().el.mask('正在恢复, 请稍候...');
        //console.info(record.get("skuId"));
        Ext.Ajax.request({
          url: '/api/product/recover/'+record.get("skuId"),
          method: 'POST',
          success: function(response, opts) {
            var res = Ext.JSON.decode(response.responseText);
            if (res.success) {
              Ext.getBody().el.unmask();
              viewCtr.onFastQueryButtonClick();
              TipsUtil.showTips('提示', '商品恢复成功', TipsUtil.INFO);
            } else {
              TipsUtil.showTips('提示', '商品恢复失败', TipsUtil.INFO);
            }
          }
        });
        //viewCtr.getView().el.mask("正在保存，请稍候...");

      }
    });
  },

  /**
   * 快速搜索
   */
  onFastQueryButtonClick: function (field, trigger, e) {
    var viewCtr = this;
    viewCtr._onFastSearchFn();
  },

  /**
   * 快速搜索回车
   */
  onFastSearchTextFieldSpecialKey: function(field, e, options){
    var viewCtr = this;
    if (e.getKey() === e.ENTER) {
      viewCtr._onFastSearchFn();
    }
  },

  /**
   * 快速查询
   * @private
   */
  _onFastSearchFn: function () {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel();

    viewModel.getStore('gridStore').load({
      start: 0,
      page: 1
    });

  },

  /**
   * 主页命令行操作
   */
  onCommandColumnClick: function (btn, event) {
    var viewCtr = this,
      command = btn.command,
      grid = viewCtr.lookupReference("ProductRecycledGrid"),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'Recycled') {
      viewCtr._onRecycledOne(record);
    }
  },


  /**private***********************/

  /**
   * buttonGroup渲染前操作
   * @param buttonGroup
   * @param record 当前选中记录
   * @private
   */
  _onButtonGroupBeforeRender: function (buttonGroup, event) {
    var btnArray = buttonGroup.items.items,
      record = btnArray[0].ownerCt.getWidgetRecord();

    Ext.Array.each(btnArray, function(item, index) {
      if (Ext.Array.contains(_USER.permissions, "productRecycled:edit")) {
        Ext.Array.each(btnArray, function(item, index) {
          item.setDisabled(false);
        });
      } else {
        Ext.Array.each(btnArray, function(item, index) {
          item.setDisabled(true);
        });
      }
    });
  }
});