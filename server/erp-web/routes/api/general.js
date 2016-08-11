var express = require('express'),
  extend = require('extend'),
  auth = require('../../auth'),
  logger = require('../../logger'),
  common_data = require('../../common_data'),
  common_util = require('../../util/common_util'),
  http_util = require('../../util/http_util');

// ------------------------------------------------------------------------
// 基础信息
// ------------------------------------------------------------------------

var router = express.Router();

/**
 * 账号管理主页面grid列表
 */
router.get('/user/filter',
  auth.requirePermissionAjax('accountMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/user/filter',
      data: req.query,
      requestedBy: req.user
    }, res);
  });

/**
 * 部门，分部，职位查询
 */
router.get('/company/related/filter',
  auth.requirePermissionAjax('accountMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/company/related/list',
      data: {
        type: req.query.type
      },
      requestedBy: req.user
    }, res);
  });

/**
 * 保存部门，分部，职位
 */
router.post('/company/related/save',
  auth.requirePermissionAjax('accountMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/company/related/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);
  }
);

/**
 * 添加用户
 */
router.post('/user/add',
  auth.requirePermissionAjax('accountMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/user/add',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

/**
 * 密码修改
 */
router.post('/user/password/update/:userId',
  auth.requirePermissionAjax('accountMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/user/password/update/' + req.params.userId,
      data: req.body,
      requestedBy: req.user
    }, res);
  });

/**
 * 当前用户所在的公司模块权限列表
 */
router.get('/permission/tree',
  auth.requirePermissionAjax('accountMgmt:view'),
  function (req, res, next) {
    http_util.request('facade', {
      url: '/permission/tree',
      method: 'GET',
      requestedBy: req.user
    }).done(
      http_util.resultMessageHandler(function (result) {
        res.json(result);
      }, req, res, next),
      http_util.errorHandler(req, res, next)
    );
  });

/**
 * 当前用户所在的公司的店铺，仓库权限列表
 */
router.post('/user/grant/data/list',
  auth.requirePermissionAjax('accountMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/user/grant/data/list',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

/**
 * 保存权限修改
 */
router.post('/user/grant/update/:userId',
  auth.requirePermissionAjax('accountMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/user/grant/update/' + req.params.userId,
      data: req.body,
      requestedBy: req.user
    }, res);
  });

/**
 * 查找选中用户的权限列表
 */
router.post('/permission/list',
  auth.requirePermissionAjax('accountMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/permission/list',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

/**
 * 查找用户列表
 */
router.get('/user/list',
  auth.requirePermissionAjax('accountMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/user/list',
      requestedBy: req.user
    }, res);
  });

/**
 * 删除用户
 */
router.post("/user/delete/:userId",
  auth.requirePermissionAjax('accountMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/user/delete/' + req.params.userId,
      requestedBy: req.user
    }, res);
  }
);

router.get('/user/view/:userId',
  auth.requirePermissionAjax('accountMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/user/view/' + req.params.userId,
      requestedBy: req.user
    }, res);
  });

router.post('/user/update/:userId',
  auth.requirePermissionAjax('accountMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/user/update/' + req.params.userId,
      data: req.body,
      requestedBy: req.user
    }, res);
  });


// ------------------------------------------------------------------------
// 物流信息
// ------------------------------------------------------------------------

//店铺授权
router.post('/shop/add',
  auth.requirePermissionAjax('shopMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/shop/add',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

router.post('/shop/update',
  auth.requirePermissionAjax('shopMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/shop/update',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

router.get('/shop/view/:shopId',
  auth.requirePermissionAjax('shopMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/shop/view/' + req.params.shopId
    }, res);
  });

router.get('/shop/filter',
  auth.requirePermissionAjax('shopMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      data: req.query,
      url: '/shop/filter',
      requestedBy: req.user
    }, res);
  });

router.get('/shop/showWarehouses',
  auth.requirePermissionAjax('shopMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/shop/showWarehouses',
      data: req.query,
      requestedBy: req.user
    }, res);
  });

router.get('/shop/showPrintTemps',
  auth.requirePermissionAjax('shopMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/shop/showPrintTemps',
      data: req.query,
      requestedBy: req.user
    }, res);
  });


router.get('/shop/obtainGrantWhs/:shopId',
  auth.requirePermissionAjax('shopMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/shop/obtainGrantWhs/' + req.params.shopId,
      requestedBy: req.user
    }, res);
  });

router.post('/shop/grantWhs',
  auth.requirePermissionAjax('shopMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/shop/grantWhs',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

router.get('/shop/userGrantShopList',
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/shop/userGrantShopList',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

// 物流信息
router.get('/logistics/filter',
  auth.requirePermissionAjax('expressMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/logistics/filter',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);

  });

router.post('/logistics/create',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    var data = req.body;
    http_util.pipe('facade', {
      url: '/logistics/create',
      method: 'POST',
      data: data,
      requestedBy: req.user
    }, res);
  }
);

router.post('/logistics/update',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      url: '/logistics/update',
      method: 'POST'
    }, req, res, next)
  }
);


router.post('/logistics/delete',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      url: '/logistics/delete',
      method: 'POST'
    }, req, res, next)
  }
);
router.get('/logistics/template',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/delivery/template',
      method: 'GET',
      requestedBy: req.user
    }, res)
  }
);

router.get('/logistics/delivery',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    var param = {};
    param.logisticsId = req.query.logisticsId;
    param.whsId = req.query.whsId;
    var reqs = [], spreadOpts = [];
    reqs.push(
      http_util.request('facade', {
        method: 'POST',
        url: '/delivery/fee',
        data: param,
        requestedBy: req.user
      })
    );
    spreadOpts.push({name: 'fee', ignoreError: true});

    reqs.push(
      http_util.request('facade', {
        method: 'POST',
        url: '/delivery/line',
        data: param,
        requestedBy: req.user
      })
    );
    spreadOpts.push({name: 'lines'});

    http_util.multiRequest(reqs)
      .spread(http_util.spreadMap(spreadOpts))
      .done(
        function (result) {
          res.json(result);
        },
        http_util.errorHandler(req, res, next)
      );
  }
);

router.post('/logistics/delivery/fee/update',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    var param = req.body;
    http_util.pipe('facade', {
      method: 'POST',
      url: '/delivery/fee/save',
      data: param,
      requestedBy: req.user
    }, res)
  }
);


router.get('/logistics/delivery/line/list',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    var param = {};
    param.logisticsId = req.query.logisticsId;
    param.whsId = req.query.whsId;

    http_util.pipe('facade', {
      method: 'POST',
      url: '/delivery/line',
      data: param,
      requestedBy: req.user
    }, res)
  }
);

router.post('/logistics/delivery/line/create',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {

    http_util.handleMultiOpsForExt('facade', {
      url: '/delivery/line/save',
      method: 'POST'
    }, req, res, next);
  }
);
router.post('/logistics/delivery/line/update',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      url: '/delivery/line/save',
      method: 'POST'
    }, req, res, next);
  }
);
router.post('/logistics/delivery/line/delete',
  auth.requirePermissionAjax('expressMgmt:edit'),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      url: '/delivery/line/delete',
      method: 'POST'
    }, req, res, next)
  }
);


//供应商
router.get('/supplier/filter',
  auth.requirePermissionAjax('supplierMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      data: req.query,
      url: '/supplier/filter',
      requestedBy: req.user
    }, res);
  });

//供应商的添加
router.post('/supplier/add',
  auth.requirePermissionAjax('supplierMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/supplier/add',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

//供应商的修改
router.post('/supplier/update/:Id',
  auth.requirePermissionAjax('supplierMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/supplier/update/' + req.params.Id,
      data: req.body,
      requestedBy: req.user
    }, res);
  });

//供应商是否启用
router.post('/supplier/enable',
  auth.requirePermissionAjax('supplierMgmt:edit'),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      method: 'POST',
      url: '/supplier/enable',
      timeout: 50000
    }, req, res)
  });

//添加模板
router.post('/template/add',
  auth.requirePermissionAjax('printTemplate:edit'),
  function (req, res, next) {
    var rs = http_util.upload('report', {
      method: 'POST',
      url: '/template/upload'
    }, req);
    var chunks = [];
    rs.on('data', function (chunk) {
      chunks.push(chunk);
    });
    rs.on('end', function () {
      var data = Buffer.concat(chunks);
      var params = JSON.parse(data.toString());

      if (!params.success) {
        res.json(params);
      } else {
        http_util.pipe('facade', {
          method: 'POST',
          url: '/print/template/add',
          data: extend(params.data),
          requestedBy: req.user
        }, res)
      }
    });
  });

//修改模板
router.post('/template/update',
  auth.requirePermissionAjax('printTemplate:edit'),
  function (req, res, next) {
    var rs = http_util.upload('report', {
      method: 'POST',
      url: '/template/upload'
    }, req);
    var chunks = [];
    rs.on('data', function (chunk) {
      chunks.push(chunk);
    });
    rs.on('end', function () {
      var data = Buffer.concat(chunks);
      var params = JSON.parse(data.toString());

      if (!params.success) {
        res.json(params);
      } else {
        http_util.pipe('facade', {
          method: 'POST',
          url: '/print/template/update',
          data: extend(params.data),
          requestedBy: req.user
        }, res)
      }
    });
  });

//模板预览
router.get('/preview/:id',
  auth.requirePermissionAjax('printTemplate:view'),
  function (req, res, next) {
    http_util.pipe('report', {
      url: '/template/preview/' + req.params.id,
      method: 'GET',
      data: {companyId: req.user.companyId}
    }, res);
  });

//打印模板
router.post('/print/template',
  auth.requirePermissionAjax('printTemplate:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/print/template/filter',
      data: req.body,
      requestedBy: req.user
    }, res)
  });

//删除模板
router.post('/print/delete',
  auth.requirePermissionAjax('printTemplate:edit'),
  function (req, res, next) {
    http_util.handleMultiOpsForExt('facade', {
      method: 'POST',
      url: '/print/template/delete',
      data: req.body,
      requestedBy: req.user
    }, req, res)
  });

//恢复系统模板
router.get('/print/template/resume/:id',
  auth.requirePermissionAjax('printTemplate:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/print/template/resume/' + req.params.id,
      requestedBy: req.user
    }, res)
  });

//下载模板
router.get('/download/:id',
  auth.requirePermissionAjax('printTemplate:view'),
  function (req, res, next) {
    http_util.pipe('report', {
      url: '/template/download/' + req.params.id,
      data: {companyId: req.user.companyId},
      method: 'GET'
    }, res);
  });

//上传cvs杂项出库-商品导入模板
router.post('/product/import/csv',
  auth.requirePermissionAjax('printTemplate:view'),
  function (req, res, next) {
    http_util.upload_file('wms', {
      url: '/product/import/csv',
      timeout: 1000 * 10,
      multipart: true,
      requestedBy: req.user
    }, res, req)
  });


//回收站查询
router.post('/product/search/sku',
  auth.requirePermissionAjax('productRecycled:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      method: 'POST',
      url: '/product/search/sku',
      data: req.body,
      requestedBy: req.user
    }, res)
  });

//基础设置-获取当前设置
router.get('/company/setting/view',
  auth.requirePermissionAjax('companySetting:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/company/setting/view',
      requestedBy: req.user
    }, res);
  });

//基础设置-客审类型列表
router.get('/company/setting/review/list',
  auth.requirePermissionAjax('companySetting:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/company/setting/review/list',
      requestedBy: req.user
    }, res);
  });

//基础设置-财审类型列表
router.get('/company/setting/review/financial/list',
  auth.requirePermissionAjax('companySetting:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/company/setting/review/financial/list',
      requestedBy: req.user
    }, res);
  });

//基础设置-发货类型列表
router.get('/company/setting/deliver/list',
  auth.requirePermissionAjax('companySetting:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/company/setting/deliver/list',
      requestedBy: req.user
    }, res);
  });

//基础设置-保存
router.post('/company/setting/save',
  auth.requirePermissionAjax('companySetting:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/company/setting/save',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

//会员管理
router.get('/customer/filter',
  auth.requirePermissionAjax('customerMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/customer/filter',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);
  });

router.post('/customer/add',
  auth.requirePermissionAjax('customerMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/customer/add',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

router.get('/customer/view/:customerId',
  auth.requirePermissionAjax('customerMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'GET',
      url: '/customer/view/' + req.params.customerId,
      requestedBy: req.user
    }, res);
  });

router.post('/customer/update/:customerId',
  auth.requirePermissionAjax('customerMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      method: 'POST',
      url: '/customer/update/' + req.params.customerId,
      data: req.body,
      requestedBy: req.user
    }, res);
  });
router.get('/customer/Line',
  auth.requirePermissionAjax('customerMgmt:view'),
  function(req, res, next) {
    var customerId = req.query.customerId;
    http_util.pipe('facade', {
      url: '/customer/Line/'+customerId,
      method: 'POST',
      requestedBy: req.user
    }, res)
  }
);
router.post('/customer/address/add',
  auth.requirePermissionAjax('customerMgmt:edit'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/customer/address/add',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);
  });
///Line/{customerId}

router.get('/customer/list',
  //auth.requirePermissionAjax('customerMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/customer/list',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);
  });
router.get('/customer/address/list',
  //auth.requirePermissionAjax('customerMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/customer/address/list/'+req.query.customerId,
      method: 'GET',
      requestedBy: req.user
    }, res);
  });
module.exports = router;