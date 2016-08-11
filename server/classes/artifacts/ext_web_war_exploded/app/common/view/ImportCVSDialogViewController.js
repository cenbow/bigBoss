Ext.define('Common.view.ImportCVSDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.importcvsdialog',

  onBatchImportButtonClick: function (button, e, eOpts) {

    //var viewCtr = this;
    //var formPanel = this.getView().down("form");
    //var form = formPanel.getForm();
    //var path = form.getFieldValues()['file'];
    //var ext = path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase();
    //if (ext != "csv")
    //    Ext.Msg.alert("错误","请选择CSV格式的文件!");
    //else {
    //    form.submit({
    //        url: '/api/general/import/csv',
    //        waitMsg: '正在上传文件... 请耐心等待.',
    //        method: 'post',
    //        success : function(form, action) {
    //            alert("chenggong");
    //            //var flag=action.result.success;
    //            //if(flag) {
    //            //    Ext.getStore('gridStore').reload();
    //            //    viewCtr.getView().close();
    //            //} else {
    //            //    Ext.Msg.alert('错误', action.result.error.message);
    //            //}
    //
    //        },
    //        failure : function(form,action) {
    //            var flag=action.result.error.message;
    //            Ext.Msg.alert('错误', flag, function() {
    //            });
    //        }
    //    });
    //}
    var me = this;
    var view = me.getView();
    var viewModel = me.getViewModel();
    var formPanel = view.down("form");
    var form = formPanel.getForm();
    var path = form.getFieldValues()['file'];
    var removeBlank = viewModel.get('removeBlank');
    var ext = path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase();
    if (ext != 'csv') {
      TipsUtil.showTips('提示', "请选择CSV格式的文件");
    } else {
      form.submit({
        url: '/api/common/import/csv',
        waitMsg: '正在上传数据...',
        params: {removeBlank: removeBlank || 'N'},
        success: function (form, action, request) {
          var json = action.response.responseText;
          if (json) {
            var result = Ext.decode(json);
            view.callback(result.data);
            view.close();
          }

        },
        failure: function (form, action, response, b) {
          var success = action.result.success;
          if (!success) {
            var message = action.result.error.message;
            Ext.MessageBox.alert('错误', message);
          }
        }
      });
    }
    //this.getView().close();
  },

  //form.submit({
  //waitTitle: '提示',//标题
  //waitMsg: '正在提交数据请稍后...',//提示信息
  //url: url,
  //method: 'post',
  //success: function (form, action) {
  //    var flag = action.result.success;
  //    if (flag) {
  //        windowViewModel.get('gridStore').reload();
  //        windowView.close();
  //    } else {
  //        Ext.MessageBox.alert('错误', json.result.error.message);
  //    }
  //
  //},
  //failure: function (form, action, response, b) {
  //    var success = action.result.success;
  //    if (!success) {
  //        var message = action.result.error.message;
  //        Ext.MessageBox.alert('错误', message);
  //    }

  onCancelButtonClick: function (button, e, eOpts) {
    this.getView().close();
  }
});