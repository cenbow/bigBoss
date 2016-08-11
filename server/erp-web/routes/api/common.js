var express = require('express'),
    extend = require('extend'),
    auth = require('../../auth'),
    logger = require('../../logger'),
    common_data = require('../../common_data'),
    common_util = require('../../util/common_util'),
    http_util = require('../../util/http_util');

// ------------------------------------------------------------------------
// 公共api
// ------------------------------------------------------------------------

var router = express.Router();

/**
 * 默认获取整颗树，并且自带checked属性，
 */
router.get('/country/tree',
  auth.requireAuth(),
  function(req, res, next) {
    var tree = common_data.getCountryTree();
    var list = req.body.list;

    res.json(tree);


  });

// 获取省份信息
router.get('/area/province',
  auth.requireAuth(),
  function(req, res, next) {
    var region = common_data.getArea(1);
    if (!region) {
      res.json({success: false, error: {message: 'no region info found by id 1'}})
    } else {
      var subs = region.subAreas;
      if (subs && subs.length) {
        var arr = subs.map(function (sub) {
          return {
            id: sub.id,
            name: sub.name,
            type: sub.type,
            parentId: sub.parentId
          };
        });

        res.json({success: true, data: arr});
      } else {
        res.json({success: true, data: (subs || [])});
      }
    }
  });

//获取地址信息-根据id,获取下级列表
router.get('/area/item',
  auth.requireAuth(),
  function(req, res, next) {
    var parentId = req.query.parentId;
    var region = common_data.getArea(parentId);
    if (!region) {
      res.json({success: false, error: {message: 'no region info found by id ' + parentId}})
    } else {
      var subs = region.subAreas;
      if (subs && subs.length) {
        var arr = subs.map(function (sub) {
          return {
            id: sub.id,
            name: sub.name,
            type: sub.type,
            parentId: sub.parentId
          };
        });
        res.json({success: true, data: arr});
      } else {
        res.json({success: true, data: (subs || [])});
      }
    }
  });

/**
 * 获取用户页面配置state list
 */
router.post('/state/list',
  auth.requireAuth(),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/user/page/list',
      requestedBy: req.user,
      method: 'POST',
      data:req.body
    }, res, res, next);
  }
);

/**
 * 用户拖动窗口，移动grid column之后保存页面配置
 */
router.post('/state/save',
  auth.requireAuth(),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      url: '/user/page/save',
      method: 'POST',
      requestedBy: req.user
    }, req, res, next);
  }
);

/**
 * 删除页面配置
 */
router.post('/state/delete',
  auth.requireAuth(),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      url: '/user/page/delete',
      method: 'POST',
      requestedBy: req.user
    }, req, res, next);
  }
);


/**
 * 模板列表
 */
router.get('/print/template/list',
  auth.requireAuth(),
  function(req, res, next) {
    var type = req.query.type;
    http_util.pipe('facade', {
      method: 'GET',
      url: '/print/template/list/'+type,
      requestedBy: req.user
    }, res)
  });

/**
 * 查询仓库
 */
router.get('/warehouse/list',
  auth.requireAuth(),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/warehouse/list',
      method: 'GET',
      requestedBy: req.user
    }, res, next);
  }
);

/**
 * 查询库区
 */
router.get('/warehouse/area/list',
  auth.requireAuth(),
  function (req, res, next) {
    var whsId = req.query.id;
    var isDeleted = req.query.isDeleted;
    if(whsId) {
      http_util.pipe('wms', {
        url: '/warehouse/area/list/'+whsId,
        method: 'GET',
        data: {'isDeleted':isDeleted},
        requestedBy: req.user
      }, res, next);
    } else {
      res.json({data: []});
    }

  }
);

router.get('/product/search/sku',
  auth.requireAuth(),
  function (req, res, next) {
	http_util.request('gds', {
	  method: 'POST',
	  url: '/product/search/sku',
	  data: req.query,
	  requestedBy: req.user
	})
	.done(
	  http_util.resultMessageHandler(function(result) {
	    res.json(result);
	  }, req, res, next),
	  http_util.errorHandler(req, res, next)
	);	
});

/**
 * 上传csv文件
 */
router.post('/import/csv',
  auth.requireAuth(),
  function(req, res, next) {
    http_util.upload('wms', {
      url: '/import/csv',
      method: 'POST',
      timeout: 50000,
      requested: req.user
    }, req).pipe(res);
  }
);

/**
 *  供应商列表
 */
router.get('/supplier/list/enabled',
  auth.requireAuth(),
  function(req, res, next) {
    http_util.pipe('facade', {
      url: '/supplier/list/enabled',
      method: 'POST',
      requestedBy: req.user
    },res, res, next);
  }
);

/**
 * 采购单明细查询
 */
router.get('/purchase/order/line/filter',
  auth.requireAuth(),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/order/line/filter',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res, next);
  }
);

module.exports = router;
