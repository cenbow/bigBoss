var url = require('url'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me-extended').Strategy,
    config = require('./config'),
    logger = require('./logger'),
    common_util = require('./util/common_util'),
    http_util = require('./util/http_util');

module.exports = {
  passport: passport,
  setRememberMeCookie: setRememberMeCookie,

  // Redirect to the login page if not authenticated
  requireAuth: function(options) {
    var opts = options || {},
        failureRedirect = opts.failureRedirect || 'passport-login.html';
    return function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect(failureRedirect);
    };
  },

  // Returns json err message for ajax requests
  requireAuthAjax: function(options) {
    var opts = options || {},
        status = opts.status || 401;
    return function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      var errMsg = {
        success: false,
        error: {
          code: status,
          message: '您的会话已过期，请重新登录'
        }
      };
      if (opts.dataType === 'text') {
        res.status(status).end(JSON.stringify(errMsg));
      } else {
        res.status(status).json(errMsg);
      }
    };
  },

  // Requires user not only authenticated, but also authorized
  requirePermissionAjax: function() {
    if (!arguments.length) {
      throw new TypeError('No permission specified');
    }
    var args = [];
    for (var i = 0; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }
    return function(req, res, next) {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            code: 401,
            message: '您的会话已过期，请重新登录'
          }
        });
        return;
      }
      var userPermissions = req.user.permissions || [];
      for (var i = 0; i < args.length; i++) {
        var permission = args[i];
        if (userPermissions.indexOf(permission) > -1) {
          return next();
        }
      }
      logger.warn('Access denied: %s, user ip: %s', req.originalUrl, common_util.getReqIP(req));
      res.status(403).json({
        success: false,
        error: {
          code: 403,
          message: '未授权，禁止访问'
        }
      });
    };
  }
};


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.
passport.serializeUser(function(user, done) {
  done(null, user);  // save directly to session (and then to redis)
});

passport.deserializeUser(function(user, done) {
  done(null, user);  // use the `user` object in session (retrieved from redis)
});


// Use the LocalStrategy within Passport.
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
     http_util.request('facade', {
         method: 'POST',
         url: '/login',
         data: {
           username: username,
           password: password,
           company: req.body.company,
           rememberMe: req.body.rememberMe
         }
       })
       .done(
         function(json) {
           if (json.success) {
             done(null, json.data);
           } else {
             logger.warn('Login failed, username: %s, ip: %s, reason: %s', username, common_util.getReqIP(req), json.error.message);
             done(null, false, json.error || 'Login failed');
           }
         },
         function(err) {
           done(err, null);
         }
       );
  }
));

// Remember Me cookie strategy
var rememberMeCookieConfig = config.cookie.rememberMe;
passport.use(new RememberMeStrategy({
    key: rememberMeCookieConfig.key,
    cookie: rememberMeCookieConfig.options
  },
  function(token, done) {
    var rememberMeToken = common_util.decryptCookie(token);
    if (!rememberMeToken) {
      logger.warn('Failed to decrypt rememberMeToken: ' + token);
      done(null, false);
      return;
    }
    http_util.request('facade', {
        method: 'POST',
        url: '/rememberMeLogin',
        data: {
          rememberMeToken: rememberMeToken
        }
      })
      .done(
        function(json) {
          if (json.success) {
            var user = json.data;
            logger.info('User ' + user.mobile + ' (id: ' + user.id + ') login using rememberMeToken');
            done(null, user);
          } else {
            done(null, false, 'Login failed using rememberMeToken');
          }
        },
        function(err) {
          done(err, null);
        }
      );
  },
  issueRememberMeToken
));

// The original design: The token is single-use, so a new token is then issued to replace it.
// BUT now we're going to reuse the token if possible
function issueRememberMeToken(user, done) {
  done(null, common_util.encryptCookie(user.rememberMeToken));
}

function setRememberMeCookie(res, token) {
  res.cookie(rememberMeCookieConfig.key, common_util.encryptCookie(token), rememberMeCookieConfig.options);
}
