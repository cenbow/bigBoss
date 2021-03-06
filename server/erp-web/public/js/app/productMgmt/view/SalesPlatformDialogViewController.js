/*
 * File: app/view/CenterSalesPlatformDialogViewController.js
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

Ext.define('ProductMgmt.view.SalesPlatformDialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.salesplatformdialog',

  init: function() {
    var viewCtr = this,
         gridStore = viewCtr.getStore('gridstore') ;

    gridStore.getProxy().extraParams =  {
      skuId: viewCtr.getView().skuId
    };

    gridStore.load();
  },

  /**
   * 保存
   */
  onSaveButtonClick: function () {
    var viewCtr = this,
      currWin = viewCtr.getView(),
      gridstore = viewCtr.getStore('gridstore'),
      url = '/api/product/sku/platform/save',
      validateErrorInfo,gridDatas;

    if (!gridstore.isDirty()) {
      TipsUtil.showTips('提示', '当前数据没有变化，无需保存', TipsUtil.WARING);
      return ;
    }

    validateErrorInfo = gridstore.getValidateErrorMessage();
    if (validateErrorInfo.length > 0) {
      TipsUtil.showTips("提示", validateErrorInfo.join('<br/>'), TipsUtil.WARING);
      return ;
    }

    gridDatas = gridstore.getCurrPageDatas(currWin.skuId) || [];

    currWin.el.mask("正在保存，请稍候...");

    Ext.Ajax.request({
      url: url,
      params : {
        data: Ext.JSON.encode(gridDatas),
        skuId: currWin.skuId
      },
      method : 'POST',
      timeout :60000,
      success : function(response, options) {
        var result = Ext.JSON.decode(response.responseText), recs;

        currWin.el.unmask();

        if (result.success) {
          TipsUtil.showTips("提示", result.data, TipsUtil.INFO, function() {
            viewCtr.closeView();
          });
        } else {
          TipsUtil.showTips("提示", result.error.message, TipsUtil.WARING);
        }
      },
      failure : function(response, options) {
        currWin.el.unmask();
        TipsUtil.showTips('提示', "[" + response.status + "]: " + options.url + ":" + response.statusText, TipsUtil.ERROR);
      }
    });
  },

  /**
   * 添加一条记录
   */
  onAddNewSkuButtonClick: function() {
    var viewCtr = this,
      gridstore = viewCtr.getStore('gridstore');

    gridstore.addCounts = (++gridstore.addCounts) || 1;
    gridstore.insertNewRec(viewCtr.getView().skuId);
  },

  /**
   * 删除一条记录
   */
  onDeleteButtonClick: function(btn, event) {
    var viewCtr = this,
      gridstore = viewCtr.getStore('gridstore'),
      record = btn.ownerCt.getWidgetRecord();

    gridstore.addCounts = --gridstore.addCounts;
    gridstore.remove(record);
  },

  /**
   * 取消
   */
  onCancelButtonClick: function() {
    var viewCtr = this,
        gridstore = viewCtr.getStore('gridstore');

    if (gridstore.isDirty()) {
      Ext.MessageBox.confirm("警告", "当前页面数据已被修改，是否丢弃已修改的数据？", function(btnId) {
        if (btnId == 'yes') {
          gridstore.rejectChanges();
          viewCtr.closeView();
        }
      });
    } else {
      viewCtr.closeView();
    }
  },

  _onPlatfromRender: function(v) {
    switch (v) {
      case 'HIGOUMALL': return '易宝分销平台';
      case 'TAOBAO': return '淘宝';
      case 'TMALL': return '天猫';
      case 'JD': return '京东';
    }
  },

  _onCellBeforeEdit: function(editor, context, eOpts ) {
    if (context.colIdx == 1 || context.colIdx == 2) {
      if (context.record.get('createDate')) {
        return false;
      }
    }
    return true;
  }
});
