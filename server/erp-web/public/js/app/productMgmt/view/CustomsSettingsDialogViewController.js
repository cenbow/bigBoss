/*
 * File: app/view/CenterCustomsSettingsDialogViewController.js
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

Ext.define('ProductMgmt.view.CustomsSettingsDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.customssettingsdialog',

  /**
   * 关闭按钮
   */
  onCloseButtonClick: function () {
    var viewCtr = this;

    viewCtr.getView().close();
  },

  _onDataCustomsBeforeRender: function () {
    var viewCtr = this,
      customsList = viewCtr.lookupReference('customsList');

    viewCtr._refreshCustomsPanel();
  },

  _refreshCustomsPanel: function () {
    var viewCtr = this,
      customsList = viewCtr.lookupReference('customsList');

    DoActionUtil.request(
      'GET',
      '/api/customs/customs/list',
      {
        activeFlag: 'A',
        yesNoFlag: 'Y'
      },
      function (result) {
        if (result.success) {
          var data = result.data;
          viewCtr._pupulateCheckGroupItems(data);
        } else {
          TipsUtil.showTips("提示", result.error.message, TipsUtil.WARING);
        }
      }
    );
  },

  _pupulateCheckGroupItems: function (customsDatas) {
    var viewCtr = this,
      customsList = viewCtr.lookupReference('customsList'),
      customsSelectList = viewCtr.lookupReference('customsSelectList');

    if (customsDatas.length == 0) {
      TipsUtil.showTips("提示", '相关海关信息未设置，请设置后重新操作', TipsUtil.ERROR, function() {
        viewCtr.closeView();
      });

      return ;
    }

    Ext.batchLayouts(function () {

      if (customsList.rendered) {
        customsList.removeAll();
      }

      Ext.Array.each(customsDatas, function (item) {
        customsList.add({
          xtype: 'button',
          text: item.name,
          listeners: {
            click: 'selectCustomsOnButtonClick',
            param: item
          }
        });
      });

    });
  },

  selectCustomsOnButtonClick: function (btn, event, data) {
    var viewCtr = this,
      view = viewCtr.getView(),
      viewModel = view.getViewModel();
    var customsId = data.param.id,
      skuId = viewModel.data.skuId;
    var formPanel = view.down("form");
    formPanel.reset();


    formPanel.down("#customName").setValue(data.param.name);

    formPanel.down("#customId").setValue(customsId);
    formPanel.getForm().load({
      url: '/api/customs/product/customs/list',
      params: {
        customsId: customsId,
        skuId: skuId
      },
      success: function (form, json) {
      },
      failure: function (form, json) {
      }
    });
  },

  saveChangeOnButtonClick: function (btn, event) {
    var viewCtr = this,
      view = viewCtr.getView(),
      viewModel = view.getViewModel();
    var skuId = viewModel.data.skuId;
    var formPanel = view.down("form");

    if (!formPanel.isValid()) {
      TipsUtil.showTips("提示", '请检查数据填写是否完整', TipsUtil.WARING);
      return ;
    }

    view.el.mask("正在保存，请稍候...");

    formPanel.getForm().submit({
      url: '/api/customs/product/customs/add',
      params: {
        skuId: skuId
      },
      success: function (form, json) {
        view.el.unmask();
        TipsUtil.showTips("提示", json.result.data, TipsUtil.INFO, function() {
          viewCtr.getView().close();
        });
      },
      failure: function (form, json) {
        view.el.unmask();
        TipsUtil.showTips("提示", '服务器错误', TipsUtil.ERROR);
      }
    });
  },

  customsResetOnButtonClick: function(btn,event,data){
    var viewCtr = this,
      view = viewCtr.getView(),
      viewModel = view.getViewModel();
    var formPanel = view.down("form");
    data.param = {};
    data.param.id = formPanel.down("#customId").getValue();
    data.param.name = formPanel.down("#customName").getValue();

    viewCtr.selectCustomsOnButtonClick(null, event, data);
  }

});
