/**
 * Created by Junyi on 2016/8/4.
 */

Ext.define('OrderHold.view.UpdateFlagWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.updateflagwindow',

  /**
   * 保存
   * @param record
   */
  onSaveButtonClick:function(record){
    Ext.Msg.alert("我是提示","保存")
  },

  /**
   * 取消
   * @param button
   * @param e
   * @param eOpts
   */
  onCancelButtonClick: function (button, e, eOpts) {
    var viewCtr = this;

    viewCtr.getView().close();
  }
});