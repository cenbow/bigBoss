Ext.define('ProductRecycled.view.MainViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.mainviewport',

  requires: [
    'ProductRecycled.store.MainViewportGridStore'
  ],
  /*
   formulas: {
   addButonDisabled: function (get) {
   return !Ext.Array.contains(_USER.permissions, 'ProductRecycled:edit');
   }
   },*/

  /*stores: {
   gridStore: {
   storeId: 'gridStore',
   type: 'mainviewportgridstore',
   autoLoad: true,
   autoSync: true
   }
   }*/

  data: {
    query: null,
    referController: null,
    productCatIdValue:false,
    productBrandIdValue:false,
    productOriginIdValue:false,
    skuStatusValue:false,
    convertBarCodeValue:false
  },

  stores: {
    gridStore: {
      type: 'mainviewportgridstore',
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: '/api/product/search/sku',
        extraParams: {
          query: '{query}',
          searchRecycled:true
        },
        reader: {
          type: 'json',
          rootProperty: 'data.pageData',
          totalProperty: 'data.totalCount'
        }
      }
    }
  }

});