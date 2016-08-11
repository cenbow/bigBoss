var express = require('express'),
    path = require('path'),
    extend = require('extend'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    template = require('art-template/node/template-native'),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    flash = require('connect-flash'),
    passport = require('./auth').passport,
    config = require('./config'),
    logger = require('./logger'),
    common_util = require('./util/common_util');

var app = express();

// Hide X-Powered-By
app.disable('x-powered-by');

// view engine setup
template.config('extname', '.html');
if (app.get('env') === 'development') {
  template.config('cache', false);  // 开发环境，不开启缓存
} else {
  template.config('compress', true);  // 正式环境，开启压缩，去除HTML多余空白字符
}
require('./util/art_template_helpers')(template);
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// LxC(2016-02-14): static middleware is useful only for DEV. static resources are served by nginx on other ENV's
app.use(express.static(path.join(__dirname, 'public')));
// LxC(2016-01-29): Redirect morgan log to our logger
morgan.format('accesslog', ':method :url HTTP/:http-version :status :res[content-length] - :response-time ms ":referrer"');
// see http://stackoverflow.com/questions/27906551/node-js-logging-use-morgan-and-winston
app.use(morgan('accesslog', {
  stream: {
    write: function(message, encoding) {
      logger.info('[access] ' + message.substr(0, message.length - 1) /* 去除结尾\n换行 */);
    }
  }
}));
// Protect from some well-known web vulnerabilities by setting HTTP headers appropriately using helmet
app.use(helmet());
//app.use(bodyParser.json());  // <-- Do not use json request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 检查服务器是否正在关闭(为了重新部署)
app.use(function(req, res, next) {
  if (global.gracefullyClosing) {
    res.setHeader('Connection', 'close');
    res.send(502, 'Server is in the process of restarting');
  } else {
    next();
  }
});

// session
app.use(session({
  name: config.sessionKey,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  secret: config.cookie.secret,
  // By default cookie.maxAge is null, meaning no "expires" parameter is set
  // so the cookie becomes a browser-session cookie. When the user closes
  // the browser the cookie (and session) will be removed.
  // cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
  store: new RedisStore(
    extend({
      ttl: config.sessionTTL  // let redis control session timeout
    }, config.servers.redis[0])
  )
}));
app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

// rewrite url
app.use(common_util.rewriteUrl);

// routes
app.use('/', require('./routes/index'));
app.use('/passport', require('./routes/passport'));
require('./routes/api/')(app);

// 404
app.use(function(req, res, next) {
  res.status(404);
  // check if client expects JSON reponse
  if (common_util.shouldReturnJSON(req)) {
    res.json({
      success: false,
      error: {
        code: 404,
        message: 'Resource not found: ' + req.originalUrl
      }
    });
    return;
  }
  // render a customized 404 page
  common_util.renderEx(req, res, '404');
});

// error handler
if (app.get('env') === 'development') {
  // development will print stacktrace
  app.use(function(err, req, res, next) {
    var statusCode = err.status || 500;
    logger.error('[Status: ' + statusCode + '] ' + (err.stack ? err.stack : err));
    if (common_util.shouldReturnJSON(req)) {
      res.json({
        success: false,
        error: {
          code: statusCode,
          message: err.message || err
        }
      });
    } else {
      res.status(statusCode);
      res.render('error', {
        message: err.message,
        error: err
      });
    }
  });
} else {
  // production
  app.use(function(err, req, res, next) {
    var statusCode = err.status || 500;
    // log it, no stacktraces leaked to user
    logger.error('[Status: ' + statusCode + '] ' + (err.stack ? err.stack : err));
    if (common_util.shouldReturnJSON(req)) {
      res.json({
        success: false,
        error: {
          code: statusCode,
          message: err.message || err
        }
      });
    } else {
      // render a customized error page
      if (statusCode === 404) {
        common_util.renderEx(req, res, '404'); // <-- 如果页面抛出错误，指定404，渲染404页面
      } else {
        common_util.renderEx(req, res, '500');
      }
    }
  });
}

module.exports = app;
