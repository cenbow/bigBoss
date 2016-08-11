Ext.application({
   stores: [
        'WarehousesStore',
        'GridStore',
        'ChannelsStore',
        'ShopPrintStore'
  ],
  views: [
    'ShopInfoViewPort',
    'ShopInfoWindow',
    'GrantWarehouseWindow'
  ],
  name: 'ShopMgmt',
  appFolder: "js/app/shopMgmt",

  launch: function () {
    Ext.create('ShopMgmt.view.ShopInfoViewPort');
  }

});
