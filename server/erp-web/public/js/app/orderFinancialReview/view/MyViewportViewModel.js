Ext.define('OrderFinancialReview.view.MyViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.myviewport',

  requires: [
    'OrderFinancialReview.store.OrderFinancialReviewGridStore'
  ],

  stores: {
	orderFinancialReviewGridStore: {
	  storeId: 'orderFinancialReviewGridStore',
      type: 'orderfinancialreviewgridstore'
    }
  }
  
});