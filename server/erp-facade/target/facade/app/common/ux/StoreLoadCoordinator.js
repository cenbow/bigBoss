/**
 * 对多个store进行监听，所有store都load完数据之后触发load事件
 */
Ext.define('Common.ux.StoreLoadCoordinator', {
  mixins: {
    observable: 'Ext.util.Observable'
  },
  resetStoreLoadStates: function () {
    var me = this;
    this.storeLoadStates = {};

    Ext.each(me.stores, function (store) {
      var storeId = store.getId();
      me.storeLoadStates[storeId] = false;
    }, me);
  },
  isLoadingComplete: function () {
    var me = this;
    for (var i = 0; i < this.stores.length; i++) {
      var key = me.stores[i].getId();

      if (this.storeLoadStates[key] == false) {
        return false;
      }
    }
    return true;
  },
  onStoreLoad: function (store, records, successful, eOpts, storeName) {
    this.storeLoadStates[store.getId()] = true;

    if (this.isLoadingComplete() == true) {
      this.fireEvent('load');
      this.resetStoreLoadStates();
    }
  },
  constructor: function (config) {
    var me = this;

    this.mixins.observable.constructor.call(me, config);

    this.resetStoreLoadStates();

    Ext.each(this.stores, function (store) {
      store.on('load', Ext.bind(me.onStoreLoad, me, [store], true));
    }, this);

  }
});