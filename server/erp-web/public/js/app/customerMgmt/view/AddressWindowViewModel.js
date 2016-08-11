/**
 * Created by Junyi on 2016/8/4.
 */
Ext.define('CustomerMgmt.view.AddressWindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.addresswindow',

  requires: [],
  stores: {
    idcardtype: {
      type: 'documenttypestore'
    },
    province: {
      type: 'commoncomboboxstore',
      autoLoad: true,
      storeId: 'supplierMgmt.province',
      proxy: {
        type: 'ajax',
        url: '/api/common/area/province',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    },
    city: {
      type: 'commoncomboboxstore',
      autoLoad: false,
      storeId: 'supplierMgmt.city',
      proxy: {
        type: 'ajax',
        url: '/api/common/area/item',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    },
    district: {
      type: 'commoncomboboxstore',
      autoLoad: false,
      storeId: 'supplierMgmt.district',
      proxy: {
        type: 'ajax',
        url: '/api/common/area/item',
        reader: {
          type: 'json',
          rootProperty: 'data'
        }
      }
    }
    }
});