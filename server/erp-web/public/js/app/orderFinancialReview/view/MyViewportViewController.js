Ext.define('OrderFinancialReview.view.MyViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.myviewport',

  /**
   * 中心gridstore数据刷新
   */
  refreshCenterGridStore: function(viewport, reqOpts) {
    var viewCtr = this;
    var store = viewCtr.getViewModel().get('orderFinancialReviewGridStore');

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
  onGridItemSelect: function (dataview, record, item, index, e, eOpts) {
    var viewCtr = this;
    var commtab = viewCtr.getView().down("#commtab");
    commtab.getController().fireViewEvent('loadTabDatas', record);
  },

  /**
   * 财审通过
   */
  onButtonClickPassAudit: function (button, e, eOpts) {

  },

  /**
   * 打回待审
   */
  onButtonClickCancelAudit: function (button, e, eOpts) {

  },
  
  renderOrderStatus: function (status, meta, record) {
	var me = this;
	var viewModel = me.getViewModel();
	var store = viewModel.getStore("orderStatusStore");
	var record = store.findRecord("code", status);
	return record ? record.get("name") : null;
  },

  renderOrderType: function (type, meta, record) {
    var me = this;
    var viewModel = me.getViewModel();
	var store = viewModel.getStore("orderTypeStore");
	var record = store.findRecord("code", type);
	return record ? record.get("name") : null;
  },

  renderOrderHoldingReason: function (holdingReason, meta, record) {
	var me = this;
	var viewModel = me.getViewModel();
	var store = viewModel.getStore("holdingReasonStore");
	var record = store.findRecord("code", holdingReason);
	return record ? record.get("name") : null;
  },
	
  renderIdCardType: function (idCardType, meta, record) {
	var me = this;
	var viewModel = me.getViewModel();
	var store = viewModel.getStore("idCardTypeStore");
	var record = store.findRecord("code", idCardType);
	return record ? record.get("name") : null;
  },
  
});
