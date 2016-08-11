Ext.define('ProductMgmt.view.MainViewportViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewport',
  uses: [
    'ProductMgmt.view.ProductInfoDialog',
    'ProductMgmt.view.CustomsSettingsDialog',
    'ProductMgmt.view.SalesPlatformDialog',
    'ProductMgmt.view.CategoryInfoDialog',
    'ProductMgmt.view.BatchProductInfoDialog'
  ],

  init: function () {
    var viewCtr = this,
      view = viewCtr.getView(),
      grid = view.down('grid'),
      viewModel = viewCtr.getViewModel(),
      centergridstore, brandToolbarStore, originToolbarStore;

    viewModel.set('mainGridSelectedCache', {
      spuIds: [],
      skuIds: []
    });

    viewModel.notify();

    centergridstore = viewModel.getStore('centergridstore');
    centergridstore.addListener('load', function (curr, recs) {
      var skuIds = viewModel.get('mainGridSelectedCache.skuIds');
      Ext.Array.each(recs, function (item) {
        if (Ext.Array.contains(skuIds, item.get('skuId'))) {
          grid.getSelectionModel().select(item, true, true);
        }
      });
    });

    brandToolbarStore = viewModel.getStore('brandToolbarStore');
    brandToolbarStore.addListener('load', function (curr, recs) {
      brandToolbarStore.insert(0, {id: -1, name: '全部'});
    });

    originToolbarStore = viewModel.getStore('originToolbarStore');
    originToolbarStore.addListener('load', function (curr, recs) {
      originToolbarStore.insert(0, {id: -1, name: '全部'});
    });
  },


  /***以下左侧导航功能函数******************************/

  /**
   * 添加商品类目
   */
  onAddWestCatalogButtonClick: function (button, e, eOpts) {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel(),
      catelogNav = viewModel.get('catelogNav'),
      selectedNode = catelogNav.selection,
      dialogViewModel;

    if (!selectedNode) {
      TipsUtil.showTips("提示", '请选择节点', TipsUtil.WARING);
      return;
    }

    if (selectedNode.get('isParent') == 'N') {
      TipsUtil.showTips("提示", '当前节点不允许添加子节点', TipsUtil.WARING);
      return;
    }

    dialog = Ext.create('ProductMgmt.view.CategoryInfoDialog', {
      title: '添加商品类目'
    });

    dialogViewModel = dialog.getViewModel();
    dialogViewModel.set('addFlag', true);
    var parentId = selectedNode.get('id') == 'root' ? 0 : selectedNode.get('id');
    dialogViewModel.set('formData.parentId', parentId);
    dialogViewModel.set('formData.parentName', selectedNode.get('name'));
    dialogViewModel.set('formData.isParent', true);

    var childNodes = selectedNode.childNodes;
    var sorOrder = childNodes.length ? (childNodes.length + 1) : 1;
    dialogViewModel.set('formData.sortOrder', sorOrder);

    var path = selectedNode.getPath();
    path = path.replace(/\/root\/|\/root/g, '').replace('/', ',');
    path = path == '' ? path : path + ',';
    dialogViewModel.set('formData.path', path);

    var level = selectedNode.getDepth() + 1;
    dialogViewModel.set('formData.level', level);
    dialogViewModel.set('referController', viewCtr);

    dialog.show();
  },

  /**
   * 编辑商品类目
   */
  onUpdateWestCatalogButtonClick: function (button, e, eOpts) {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel(),
      catelogNav = viewModel.get('catelogNav'),
      selectedNode = catelogNav.selection,
      dialogViewModel;

    if (!selectedNode) {
      TipsUtil.showTips("提示", '请选择节点', TipsUtil.WARING);
      return;
    }

    dialog = Ext.create('ProductMgmt.view.CategoryInfoDialog', {
      title: '编辑商品类目'
    });

    dialogViewModel = dialog.getViewModel();
    dialogViewModel.set('addFlag', false);

    var parentNode = selectedNode.parentNode;
    dialogViewModel.set('formData.parentId', parentNode.get('id'));

    dialogViewModel.set('formData.parentName', parentNode.get('text'));
    dialogViewModel.set('formData.name', selectedNode.get('text'));

    var isParent = selectedNode.get('isParent') == 'Y' ? true : false;
    dialogViewModel.set('formData.isParent', isParent);

    dialogViewModel.set('formData.id', selectedNode.get('id'));
    dialogViewModel.set('formData.customsCatId', selectedNode.get('id'));
    dialogViewModel.set('referController', viewCtr);

    var customsCatId = selectedNode.get('customsCatId') == -1 ? '' : selectedNode.get('customsCatId');
    dialogViewModel.set('formData.customsCatId', customsCatId);

    Ext.defer(function () {
      dialog.show();
    }, 20);
  },

  /**
   * 商品类目tree-itemclick事件
   */
  onWestCatelogNavTreePanelItemClick: function (curr, record, item, index, e, eOpts) {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel(),
      isRootNode = false;

    viewModel.set('searchData.catIdCascade', record.get('id'));
    if (record.get('id') == 'root') {
      isRootNode = true;
      viewModel.set('searchData.catIdCascade', null);
    }
    viewModel.notify();
    viewModel.getStore('centergridstore').load({
      start: 0,
      page: 1
    });

    if (Ext.Array.contains(_USER.permissions, 'productMgmt:edit')) {
      viewModel.set('westUpdateBtnStatus', isRootNode);
    }
  },

  /***以下中心面板功能函数******************************/

  onAddCenterProductInfoButtonClick: function (btn) {
    var viewCtr = this;

    viewCtr._openCenterProductInfoDialog(btn, null);
  },

  /**
   * 快速搜索
   */
  onFastQueryButtonClick: function (field, trigger, e) {
    var viewCtr = this;

    viewCtr._onFastSearchFn();
  },

  /**
   * 快速搜索回车
   */
  onFastSearchTextFieldSpecialKey: function (field, e, options) {
    var viewCtr = this;
    if (e.getKey() === e.ENTER) {
      viewCtr._onFastSearchFn();
    }
  },

  /**
   * 快速查询
   * @private
   */
  _onFastSearchFn: function () {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel();

    viewModel.notify();
    viewModel.getStore('centergridstore').load({
      start: 0,
      page: 1
    });
  },

  /**
   * 批量修改
   */
  onEditBatchProductButtonClick: function (button, e, eOpts) {
    var viewCtr = this,
      dialog, comboxWithDialogBrandStore, comboxWithDialogOriginStore;

    if (!viewCtr.getView().down('grid').getSelectionModel().hasSelection()) {
      TipsUtil.showTips("提示", '请先选择记录', TipsUtil.WARING);
      return;
    }

    comboxWithDialogBrandStore = viewCtr.getStore('comboxWithDialogBrandStore');
    if (!comboxWithDialogBrandStore.isLoaded()) {
      comboxWithDialogBrandStore.load();
    }

    comboxWithDialogOriginStore = viewCtr.getStore('comboxWithDialogOriginStore');
    if (!comboxWithDialogOriginStore.isLoaded()) {
      comboxWithDialogOriginStore.load();
    }

    dialog = Ext.create('ProductMgmt.view.BatchProductInfoDialog');
    dialog.getViewModel().set('referController', viewCtr);
    dialog.show();
  },

  /**
   * 主页命令行操作
   */
  onCommandColumnClick: function (btn, event) {
    var viewCtr = this,
      command = btn.command,
      grid = viewCtr.lookupReference('productMgmtGrid'),
      record = btn.ownerCt.getWidgetRecord();

    event.stopEvent();
    grid.getSelectionModel().select(record);

    if (command == 'Update') {
      viewCtr._openCenterProductInfoDialog(btn, record);
    } else if (command == 'Enable') {
      viewCtr._openCenterEnableDialog(record);
    } else if (command == 'CustomsSettings') {
      viewCtr._openCenterCustomsSettingsDialog(record);
    } else if (command == 'Sales') {
      viewCtr._openCenterSalesDialog(record);
    }
  },

  /**
   *  商品资料dialog
   * @private
   */
  _openCenterProductInfoDialog: function (btn, record) {
    var viewCtr = this,
      dialog = Ext.create('ProductMgmt.view.ProductInfoDialog'),
      dialogViewModel = dialog.getViewModel(),
      loadDataErrorForUpdate, formData, comboxWithDialogBrandStore, comboxWithDialogOriginStore;

    comboxWithDialogBrandStore = viewCtr.getStore('comboxWithDialogBrandStore');
    if (!comboxWithDialogBrandStore.isLoaded()) {
      comboxWithDialogBrandStore.load();
    }

    comboxWithDialogOriginStore = viewCtr.getStore('comboxWithDialogOriginStore');
    if (!comboxWithDialogOriginStore.isLoaded()) {
      comboxWithDialogOriginStore.load();
    }

    if (btn.action == 'add') {
      formData = {
        skuList: []
      };
    } else {
      formData = {};
      DoActionUtil.request(
        'POST',
        '/api/product/sku/view/' + record.get('productId'),
        {},
        function (result) {
          if (result.success) {
            formData = result.data;
            //console.info(formData);
          } else {
            TipsUtil.showTips("提示", result.error.message, TipsUtil.WARING);
            loadDataErrorForUpdate = true;
          }
        }
        , true);

      if (loadDataErrorForUpdate) {
        return;
      }
    }
    dialogViewModel.set('formData', formData);
    dialogViewModel.set('referController', viewCtr);
    dialogViewModel.notify();
    dialogViewModel.getStore('skugridstore').loadSkuDatas(formData.skuList);
    Ext.defer(function () {
      dialog.show();
    }, 10);
  },

  /**
   * 双击编辑操作
   * @private
   */
  _onMainViewportItemDbClick: function( curr, record, item, index, e, eOpts ) {
    var viewCtr = this,
        hasPermission = Ext.Array.contains(_USER.permissions, 'productMgmt:edit');

    if (!hasPermission) {
      return ;
    }

    var mockBtn = {action: 'update'},
        mockRec = record;
    viewCtr._openCenterProductInfoDialog(mockBtn, mockRec);
  },

  /**
   *  海关设置dialog
   * @private
   */
  _openCenterCustomsSettingsDialog: function (record) {
    var viewCtr = this,
      dialog = Ext.create('ProductMgmt.view.CustomsSettingsDialog'),
      viewModel = dialog.getViewModel();

    viewModel.set('skuId', record.data.skuId);
    dialog.show();
  },

  /**
   *  停用/启用dialog
   * @private
   */
  _openCenterEnableDialog: function (record) {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel();


    var data = record.data;
    Ext.MessageBox.confirm("警告", "你确定停用商品" + data.productName + "？", function (btnId) {
      if (btnId == 'yes') {
        Ext.getBody().el.mask('正在保存, 请稍候...');
        DoActionUtil.request(
          'POST',
          '/api/product/recycle/' + data.skuId,
          {},
          function (result) {
            Ext.getBody().el.unmask();
            if (result.success) {
              TipsUtil.showTips("提示", data.productName + "已停用", TipsUtil.INFO, function () {
                viewModel.getStore('centergridstore').load();
              });
            } else {
              TipsUtil.showTips("提示", result.error.message, TipsUtil.WARING);
            }
          }
        );
      }
    });
  },

  /**
   *  分销dialog
   * @private
   */
  _openCenterSalesDialog: function (record) {
    var viewCtr = this;

    Ext.create('ProductMgmt.view.SalesPlatformDialog', {
      skuId: record.data.skuId
    }).show()
  },

  /**
   * 刷新store
   * @private
   */
  _refreshLeftcategorytreestore: function () {
    var viewCtr = this,
      leftcategorytreestore = viewCtr.getStore('leftcategorytreestore');

    leftcategorytreestore.load();
  },

  _onRowDeselect: function (curr, deSelected, eOpts) {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel(),
      spuIds = viewModel.get('mainGridSelectedCache.spuIds'),
      skuIds = viewModel.get('mainGridSelectedCache.skuIds');

    if (!Ext.Array.contains(_USER.permissions, 'productMgmt:edit')) {
      return;
    }

    spuIds = Ext.Array.filter(spuIds, function (item) {
      return item != deSelected.get("productId");
    });

    skuIds = Ext.Array.filter(skuIds, function (item) {
      return item != deSelected.get("skuId");
    });

    skuIds.length == 0 ? viewModel.set('toolbarBatchBtnSatus', true) :
      viewModel.set('toolbarBatchBtnSatus', false);

    viewModel.set('mainGridSelectedCache', {
      spuIds: spuIds,
      skuIds: skuIds
    });

    viewModel.notify();
  },

  _onRowSelect: function (curr, selected, eOpts) {
    var viewCtr = this,
      viewModel = viewCtr.getViewModel(),
      spuIds = viewModel.get('mainGridSelectedCache.spuIds'),
      skuIds = viewModel.get('mainGridSelectedCache.skuIds');

    if (!Ext.Array.contains(_USER.permissions, 'productMgmt:edit')) {
      return;
    }

    spuIds.push(selected.get('productId'));
    skuIds.push(selected.get('skuId'));

    spuIds = Ext.Array.unique(spuIds);
    skuIds = Ext.Array.unique(skuIds);

    viewModel.set('mainGridSelectedCache', {
      spuIds: spuIds,
      skuIds: skuIds
    });

    viewModel.set('toolbarBatchBtnSatus', false);

    viewModel.notify();
  }
});
