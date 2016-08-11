/*
 * File: app/view/MainViewportViewController.js
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

Ext.define('OrderReview.view.MainViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',
  uses: [
    'OrderReview.view.OrderConcatSliceDialog'
  ],

  /**
   * 中心gridstore数据刷新
   */
  refreshCenterGridStore: function(viewport, reqOpts) {
    var viewCtr = this;
    var store = viewCtr.getViewModel().get('centergridstore');

    console.info(reqOpts);
    if (store) {
      store.on('beforeload', function(store) {
        store.proxy.extraParams = reqOpts;
      });

      store.load();
    }

  },

  /**
   * 主页面-grid鼠标单击操作
   */
  onTableItemClickMainViewportGrid: function (dataview, record, item, index, e, eOpts) {
    var viewCtr = this;
    var commtab = viewCtr.getView().down("#commtab");
    commtab.getController().fireViewEvent('loadTabDatas', record);
  },

  /**
   * 客审通过
   */
  onButtonClickReviewPass: function (button, e, eOpts) {

  },

  /**
   * 取消订单
   */
  onButtonClickCancelOrder: function (button, e, eOpts) {

  },

  /**
   * 客审锁定
   */
  onMenuItemClickReviewLocked: function (item, e, eOpts) {

  },

  /**
   * 取消锁定
   */
  onMenuItemClickReviewCancelLocked: function (item, e, eOpts) {

  },

  /**
   * 订单合并
   */
  onMenuItemClickOrderConcat: function (item, e, eOpts) {
    Ext.create('OrderReview.view.OrderConcatSliceDialog', {
      title: '订单合并',
      flag: 'concat'
    });
  },

  /**
   * 订单拆分
   */
  onMenuItemClickOrderSlice: function (item, e, eOpts) {
    Ext.create('OrderReview.view.OrderConcatSliceDialog', {
      title: '订单拆分',
      flag: 'slice'
    });
  },

  /**
   * 订单还原
   */
  onMenuItemClickOrderRevert: function (item, e, eOpts) {

  },

  /**
   * 订单加急
   */
  onMenuItemClickOrderUrgent: function (item, e, eOpts) {

  },

  /**
   * 取消加急
   */
  onMenuItemClickOrderCancelUrgent: function (item, e, eOpts) {

  },

  /**
   * 批量修改快递
   */
  onMenuItemClickBatchUpdateExpress: function (item, e, eOpts) {

  },

  /**
   * 批量修改仓库
   */
  onMenuItemClickBatchUpdateWarehouse: function (item, e, eOpts) {

  },

  /**
   * 批量修改旗帜备注
   */
  onMenuItemClickBatchUpdateFlagRemark: function (item, e, eOpts) {

  }

});
