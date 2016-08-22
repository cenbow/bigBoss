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

Ext.define('CategoryMgmt.view.InfoDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.infodialog',

  requires: [],

  init: function () {
    this.getViewModel().set("formData", {
      id: '',
      name: '',
      columnId: '',
      columnName: '',
      upClassId: '',
      upClassName: '',
      leaf: '',
      status: ''
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
      TipsUtil.showTips("提示", "信息填写有误", TipsUtil.WARING);
      return;
    }

    var formData = viewModel.get("formData");
    console.info(formData);
    if (!formData.upClassId || formData.upClassId == 0) {
      formData.leaf = 1;
    } else {
      formData.leaf = 2;
    }
    var requestFormData = Ext.clone(formData);


    var url = FACADE_URL + '/category/';

    if (formData.id) {
      Ext.Ajax.request({
        method: 'POST',
        url: url + 'update',
        params: requestFormData,
        success: function (request) {
          if (request.responseText) {
            var json = Ext.decode(request.responseText);
            if (json.success) {
              //console.info(json);
              TipsUtil.showTips("成功", json.data, TipsUtil.INFO, function () {
                currWin.close();
                Ext.StoreMgr.get('mainViewPortGridStore').load();
              });
              //viewModel.getStore("mainviewstore").load();
              return;
            } else {
              TipsUtil.showTips("错误", json.error.message || "服务器错误！");
            }
          }
        }
      });
    } else {
      url += '/user/add';
    }


  },


  /**
   * 取消
   */
  onCancelButtonClick: function (button, e, eOpts) {
    var viewCtr = this;

    viewCtr.getView().close();
  },

  onColumnChange: function (field, value) {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel(),
      view = viewCtr.getView();
    var code = "";
    if (value == '信息披露') {
      code = "0001";
    } else if (value == '学习园地') {
      code = "0002";
    } else if (value == '市场资讯') {
      code = "0003";
    } else if (value == '通知公告') {
      code = "0004";
    } else {
      code = value;
    }
    console.log("currentId"+viewModel.get("formData").id)
    viewModel.set('columnCode', code);
    var upClassId = field.up("form").down("#categoryComboxStore");
    upClassId.clearValue();
    upClassId.store.load({
      params: {
        code: code,
        currentId: viewModel.get("formData").id
      }
    })
    /*var store = viewModel.getStore('categorycomboboxstore');
     if (store) {
     //store.removeAll();
     Ext.getCmp('categoryComboxStore').clearValue();
     store.load({
     params: {code: code},
     scope: store
     });
     }*/
  }

});
