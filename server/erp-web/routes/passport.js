var express = require('express'),
    auth = require('../auth'),
    config = require('../config'),
    logger = require('../logger'),
    common_util = require('../util/common_util'),
    http_util = require('../util/http_util');

var router = express.Router();

// ------------------------------------------------------------------------
// pages
// ------------------------------------------------------------------------

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    // 已登录，跳转到首页
    res.redirect('/');
    return;
  }

  common_util.renderEx(req, res, 'passport/login', {
    title: '登录'
  });
});

router.get('/logout', function(req, res, next) {
  // 登出当前session
  req.logout();
  req.session.destroy();
  // 清除rememberMe cookie
  res.clearCookie(config.cookie.rememberMe.key);
  // 返回首页
  res.redirect('/');
});

// 用于登出时强制调到登录页面
router.get('/forceLogin',function(req, res, next){
  // 登出当前session
  req.logout();
  // 清除rememberMe cookie
  res.clearCookie(config.cookie.rememberMe.key);

  res.redirect('/passport-login.html');
});

// ------------------------------------------------------------------------
// APIs
// ------------------------------------------------------------------------

// 判断用户是否已经登录
router.post('/check',
  auth.requireAuthAjax(),
  function(req, res, next) {
    res.json({
      success: true
    });
  });

router.post('/login',
  function(req, res, next) {
    auth.passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        var errorMsg='';
        if (info.code === 401) {
          errorMsg = "公司信息不存在";
        } else if (info.code === 402) {
          errorMsg = "公司尚未激活，请联系管理员";
        } else if (info.code === 403) {
          errorMsg = "账户被锁定，请联系管理员";
        } else if (info.code === 404){
          errorMsg = "登录名或者密码错误";
        } else {
          errorMsg = info.message;
        }
        res.status(401);
        res.json({
          success: false, error: {
            code: 401,
            message: errorMsg
          }
        })
      } else if(user){
        req.login(user, function(err) {
          if (err) { return next(err); }
          if (req.body.rememberMe === 'Y') {
            auth.setRememberMeCookie(res, user.rememberMeToken);
          }
          res.json({
            success: true,
            data: {
              redirectUrl: '/'
            }
          });
        });
      }
    })(req, res, next);
  }
);

module.exports = router;
