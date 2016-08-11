var express = require('express'),
    auth = require('../../auth'),
    logger = require('../../logger'),
    common_data = require('../../common_data'),
    common_util = require('../../util/common_util'),
    http_util = require('../../util/http_util');

// ------------------------------------------------------------------------
// 报关设置
// ------------------------------------------------------------------------

var router = express.Router();

/**
 * 查询海关信息
 */
router.get('/customs/list',
  auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    http_util.pipe('facade', {
      url: '/customs/list/grant',
      method: 'GET',
      data: req.query,
      requestedBy: req.user
    }, res);
  });

router.post('/product/customs/list',
  auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/customs/list',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

router.post('/product/customs/add',
  auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    http_util.pipe('gds', {
      url: '/product/customs/add',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);
  });

module.exports = router;
