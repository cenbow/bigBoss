var express = require('express'),
    auth = require('../../auth'),
    logger = require('../../logger'),
    common_data = require('../../common_data'),
    common_util = require('../../util/common_util'),
    http_util = require('../../util/http_util');

// ------------------------------------------------------------------------
// 商品管理
// ------------------------------------------------------------------------

var router = express.Router();

/**
 * 商品资料主页面tree列表
 */
router.get('/category/tree',
  auth.requirePermissionAjax('productMgmt:view'),
  function(req, res, next) {
    http_util.request('gds', {
      url : '/product/cat/tree',
      method: 'GET',
      requestedBy: req.user
    }).done(
      http_util.resultMessageHandler(function(result) {
        res.json(result);
      }, req, res, next),
      http_util.errorHandler(req, res, next)
    );
  });

/**
 * 查询关联品类类别
 */
router.get('/category/list/custom',
  auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/cat/list/customs',
      method: 'GET',
      requestedBy: req.user
    }, res);

  });

/**
 * 添加商品类目
 */
router.post('/category/add',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/cat/add',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);

  });

/**
 * 修改商品类目
 */
router.post('/category/update',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/cat/update',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);

  });

/**
 * 查询商品产地
 */
router.get('/origin/list',
  auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/origin/list',
      method: 'GET',
      requestedBy: req.user
    }, res);

  });

/**
 * 添加(添加和删除合并)商品产地
 */
router.post('/origin/save',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/origin/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  });

/**
 * 查询商品品牌
 */
router.get('/brand/list',
  auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/brand/list',
      method: 'POST',
      requestedBy: req.user
    }, res);

  });

/**
 * 保存(添加和删除合并)商品品牌
 */
router.post('/brand/save',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/brand/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  });

/**
 * 查找指定商品的skus
 */
router.post('/sku/view/:productId',
  auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/detail/' + req.params.productId,
      method: 'GET'
    },res);

  });

/**
 * 添加商品信息
 */
router.post('/add',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/add',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);

  });

/**
 * 修改商品信息
 */
router.post('/update',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/update',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);

  });

/**
 * 批量修改商品信息
 */
router.post('/updateBulk',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/updateBulk',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);

  });

/**
 * 查询所有已开通的分销平台列表
 */
router.get('/platform/list',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/ext/platform/list',
      method: 'GET',
      requestedBy: req.user
    }, res);

  });

/**
 * 查询sku对应分销平台列表
 */
router.get('/sku/platform/list',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/ext/view',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);

  });

/**
 * 保存sku对应分销平台列表
 */
router.post('/sku/platform/save',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/ext/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);

  });

router.get('/search/sku',
    auth.requireAuth(),
    function (req, res, next) {
      req.query.brandId = req.query.brandId == -1 ? '' : req.query.brandId;
      req.query.originId = req.query.originId == -1 ? '' : req.query.originId;
        http_util.pipe('gds', {
            url: '/product/search/sku',
            method: 'POST',
            data: req.query,
            requestedBy: req.user
        }, res);
    });

/**
 * 搜索商品编码/规格编码/规格名称/条形码
 * 不分页
 */
router.get('/summary/sku/barCode',
  auth.requireAuth(),
  function (req, res, next) {
    var text = req.query.text;

    http_util.pipe('gds', {
      url: '/product/summary/sku/barCode/'+text,
      method: 'GET',
      requestedBy: req.user
    }, res);
});

router.post('/summary/sku/skuCode',
  auth.requireAuth(),
  function (req, res, next) {
    var skuCodes = req.body.skuCode;
    if(Array.isArray(skuCodes)) {
      skuCodes = skuCodes.join(',');
    }

    http_util.pipe('gds', {
      url: '/product/summary/sku/skuCode/'+skuCodes,
      method: 'GET',
      requestedBy: req.user
    }, res);
  });

router.post('/summary/list/sku/',
  auth.requireAuth(),
  function (req, res, next) {
    var skuIds = req.body.skuId;
    if(Array.isArray(skuIds)) {
      skuIds = skuIds.join(',');
    }

    http_util.pipe('gds', {
      url: '/product/summary/list/sku/'+skuIds,
      method: 'GET',
      requestedBy: req.user
    }, res);
});



//查找特定库区下的商品库存
router.get('/sku/stock',
  auth.requireAuth(),
  function(req, res, next) {
    http_util.pipe('wms', {
      method: 'GET',
      url: '/product/sku/stock',
      data: req.query,
      requestedBy: req.user
    }, res);
  }
);

//查找特定库区下的商品库存成本价
router.get('/sku/price',
  auth.requireAuth(),
  function(req, res, next) {
    http_util.pipe('wms', {
      method: 'GET',
      url: '/product/sku/price',
      data: req.query,
      requestedBy: req.user
    }, res);
  }
);


/**
 * 停用商品spu
 */
router.post('/recycle/:productId',
  auth.requirePermissionAjax('productMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/recycle/' + req.params.productId,
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);

  });

//回收站商品的恢复功能
router.post('/recover/:skuId',
  auth.requirePermissionAjax('productRecycled:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/recover/' + req.params.skuId,
      method: 'POST',
      requestedBy: req.user
    },res);
  });



module.exports = router;
