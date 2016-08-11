/**
 * Created by Junyi on 2016/8/4.
 */

Ext.define('OrderHold.view.UpdateWarehouseWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.updatewarehousewindow',

  /**
   * 保存
   * @param record
   */
  onButtonSelectClick:function(record){
    Ext.Msg.alert("我是提示","选择")
  },

  /**
   * 取消
   * @param button
   * @param e
   * @param eOpts
   */
  onButtonCancelClick: function (button, e, eOpts) {
    var viewCtr = this;

    viewCtr.getView().close();
  },

  itemdblclick:function(){
    this.onButtonSelectClick();
  }
});