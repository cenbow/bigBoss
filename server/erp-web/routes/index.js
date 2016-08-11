var express = require('express'),
    Q = require('q'),
    extend = require('extend'),
    auth = require('../auth'),
    logger = require('../logger'),
    common_data = require('../common_data'),
    common_util = require('../util/common_util'),
    http_util = require('../util/http_util');

var appMap = require('./app.json');

var router = express.Router();

router.get('/',
  auth.requireAuth(),
  function(req, res, next) {
    var user = req.user;

    common_util.renderEx(req, res, 'main', {
      title: user.companyName,
      userJsonStr: JSON.stringify(filterUser(user))
    });
  });

// TODO 如果session过期，是否可以让用户的浏览器跳转到登录页面
router.get('/app/:appId',
  auth.requireAuth(),
  function(req, res, next) {
    var appId = req.params.appId,
        module = appMap[appId];
    if (!module) {
      var err = new Error('Unknown app: ' + appId);
      err.status = 404;
      return next(err);
    }
    // 判断用户是否有权限访问该页面
    var user = req.user,
        userPermissions = user.permissions || [],
        pagePermission = appId + ':view';
    if (user.isAdmin == 'N' && userPermissions.indexOf(pagePermission) === -1) {
      logger.warn('Access denied: %s, user ip: %s', req.originalUrl, common_util.getReqIP(req));
      res.status(403);
      common_util.renderEx(req, res, '403');
      return;
    }
    // 渲染页面
    common_util.renderEx(req, res, 'app', {
      title: module.name,
      appId: appId,
      userJsonStr: JSON.stringify(filterUser(user))
    });
  });

function filterUser(user) {
  if (user.rememberMeToken) {
    user.rememberMeToken = undefined;
  }
  return user;
}

module.exports = router;
