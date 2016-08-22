/*
 * File: app/view/InfoDialogViewController.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MarketInfoMgmt.view.InfoDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.infodialog',

  requires: [

  ],

  init: function() {
    this.getViewModel().set("formData", {
      id:'',
      name:'',
      levelOne:'',
      levelTwo:'',
      text:'',
      columnId:'',
      columnName: '',
      companyId:'',
      companyName:''
    });

  },
  /**
   * 更新
   */
  onSaveButtonClick: function (button, e, eOpts) {
    var viewCtr = this,
        currWin = viewCtr.getView(),
        viewModel = this.getViewModel(),
        formCmp = currWin.down("form");

    if (!formCmp.isValid()) {
      TipsUtil.showTips('提示', "市场资讯信息填写不完整");
      return;
    }

    formCmp.getForm().submit({
      url: FACADE_URL+'/information/update',
      waitTitle : '提示',//标题
      waitMsg : '正在提交数据请稍后...',//提示信息
      success : function(form, action) {
        var flag=action.result.success;
        if(flag) {
          TipsUtil.showTips('提示', action.result.data,TipsUtil.WARING);
          var viewportCtr = viewCtr.getViewModel().get('mainViewportController');
          viewportCtr.getViewModel().getStore('gridstore').load();
          viewCtr.getView().close();
        } else {
          TipsUtil.showTips('错误', action.result.data);
        }
      },
      failure : function(form,action) {
        TipsUtil.showTips('错误', action.result.error.message||'提交失败');
      }
    });
  },

  /**
   * 取消
   */
  onCancelButtonClick: function (button, e, eOpts) {
    var viewCtr = this;

    viewCtr.getView().close();
  },

  changeLevelOne:function(field, value){
    var viewCtr = this,
        viewModel = viewCtr.getViewModel(),
        view = viewCtr.getView();
    var levelTwo = field.up("form").down("#levelTwo");
    levelTwo.clearValue();
    levelTwo.store.load({
      params: {id: value}
    })
    /*var store = viewModel.getStore('categorybyupclassidcomboboxstore');
    if (store) {
      if(!viewModel.get('isView')){
        Ext.getCmp('levelTwo').clearValue();
        store.load({
          params: {id: value}
        });
      }
    }*/
  }

});
