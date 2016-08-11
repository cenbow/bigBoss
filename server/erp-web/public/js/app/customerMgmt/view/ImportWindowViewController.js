/**
 * Created by Junyi on 2016/8/4.
 */
Ext.define('CustomerMgmt.view.ImportWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.importwindow',

  requires: [],
  /**
   * 取消
   */
  onCancelButtonClick: function () {
    this.getView().close();
  },
  /**
   * 确认
   */
  onBatchImportButtonClick: function (button, e, eOpts) {
    var viewCtr = this;
    var formPanel = this.getView().down("form");
    var form = formPanel.getForm();
    var path = form.getFieldValues()['file'];
    var ext = path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase();
    if (ext != "csv")
      Ext.Msg.alert("错误","请选择CSV格式的文件!");
    else {
      form.submit({
        url: '/api/inventory/warehouse/pickloc/importPickLocCsv',
        waitMsg: '正在上传文件... 请耐心等待.',
        method: 'post',
        success : function(form, action) {
          var flag=action.result.success;
          if(flag) {
            Ext.getStore('MainViewportStore').reload();
            //viewCtr.getView().close();
          } else {
            TipsUtil.showTips('错误', action.result.error.message,'error');
          }
        },
        failure : function(form,action) {
          if(!action.result){
            TipsUtil.showTips('错误','上传失败','error');
          }
          TipsUtil.showTips('错误',action.result.error.message|| '上传失败','error');
        }
      });
    }

  }
});