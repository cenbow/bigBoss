Ext.define('ProductMgmt.view.MainViewportViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.mainviewport',
  requires: [
    'ProductMgmt.store.CommonComboboxStore'
  ],

  data: {
    searchData: { // 查询条件
      query: '',
      brandId: -1,
      originId: -1,
      catIdCascade: ''
    },
    westAddBtnStatus: !Ext.Array.contains(_USER.permissions, 'productMgmt:edit'),
    westUpdateBtnStatus: !Ext.Array.contains(_USER.permissions, 'productMgmt:edit'),
    toolbarAddBtnSatus: !Ext.Array.contains(_USER.permissions, 'productMgmt:edit'),
    toolbarBatchBtnSatus: true /*true表示禁用*/
  },

  stores: {
    leftcategorytreestore: {
      type: 'mainviewporttreestore',
      storeId: 'mainviewporttreestore',
      listeners: {
        load: function() {
          var productInfoComboboxTreeStore = Ext.getStore('productInfoComboboxTreeStore');
          if (productInfoComboboxTreeStore) {
            productInfoComboboxTreeStore.load();
          }

          var productBatchComboboxTreeStore = Ext.getStore('productBatchComboboxTreeStore');
          if (productBatchComboboxTreeStore) {
            productBatchComboboxTreeStore.load();
          }
        }
      }
    },

    centergridstore: {
      type: 'mainviewportgridstore',
      autoLoad: true,
      groupField: 'displayName',
      proxy: {
        type: 'ajax',
        url: '/api/product/search/sku',
        extraParams: {
          query: '{searchData.query}',
          brandId: '{searchData.brandId}',
          originId: '{searchData.originId}',
          catIdCascade: '{searchData.catIdCascade}'
        },
        reader: {
          type: 'json',
          rootProperty: 'data.pageData',
          totalProperty: 'data.totalCount'
        }
      }
    },

    /**
     * 全局商品品牌（CommonComboxWithDialog使用）
     */
    comboxWithDialogBrandStore: {
      type: 'productmgmt.commoncomboboxstore',
      autoLoad: false,
      api: {
        save: '/api/product/brand/save', /*2016.7.19修改*/
        read    : '/api/product/brand/list'
      }
    },

    /**
     * 全局商品产地（CommonComboxWithDialog使用）
     */
    comboxWithDialogOriginStore: {
      type: 'productmgmt.commoncomboboxstore',
      autoLoad: false,
      api: {
        save: '/api/product/origin/save', /*2016.7.19修改*/
        read    : '/api/product/origin/list'
      }
    },

    /**
     * 主页toolbar商品品牌
     */
    brandToolbarStore: {
      type: 'productmgmt.commoncomboboxstore',
      storeId: 'brandToolbarStore',
      autoLoad: true,
      api: {
        read: '/api/product/brand/list'
      }
    },

    /**
     * 主页toolbar商品产地
     */
    originToolbarStore: {
      type: 'productmgmt.commoncomboboxstore',
      storeId: 'originToolbarStore',
      autoLoad: true,
      api: {
        read: '/api/product/origin/list'
      }
    }
  }

});