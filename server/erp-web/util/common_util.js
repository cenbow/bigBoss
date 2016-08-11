var url = require('url'),
    crypto = require('crypto'),
    extend = require('extend'),
    config = require('../config'),
    logger = require('../logger');

var WEB_NAME = config.web.name,
    URI_APPENDIX = config.web.uriAppendix;

module.exports = {
  // Come up missing fields for rendering
  renderEx: _renderEx,
  // internal use only
  dataForRenderEx: _dataForRenderEx,

  // 将请求的url变成服务器可以接受的格式
  rewriteUrl: _rewriteUrl,
  // 将uri变成浏览器接受的格式
  rewriteReverse: _rewriteReverse,

  // 通过AES加密Cookie
  encryptCookie: _encryptCookie,
  // 通过AES解密Cookie
  decryptCookie: _decryptCookie,

  getReqIP: _getReqIP,
  disableBrowserCache: _disableBrowserCache,
  shouldReturnJSON: _shouldReturnJSON
};

// 将请求的url变成服务器可以接受的格式
function _rewriteUrl(req, res, next) {
  // @see https://nodejs.org/api/http.html#http_message_url
  var urlObj = url.parse(req.url),
      pathname = urlObj.pathname,
      len = URI_APPENDIX.length;
  if (!pathname || pathname === '/')
    return next();  // 首页(包括wap端)
  // 页面请求必须以设定的URI_APPENDIX结尾
  var idx = pathname.indexOf(URI_APPENDIX);
  if (idx > -1 && idx === pathname.length - len) {
    // 去除url结尾的.html后缀，并作rewrite
    pathname = pathname.slice(0, -len);
    pathname = pathname.replace(/-/g, '/');
    urlObj.pathname = pathname;
    req.url = url.format(urlObj);
    return next();
  }
  // 如果是GET请求，但不是通过ajax发送的，返回404错误
  if (!req.xhr && req.method === 'GET') {
    var err = new Error('URL invalid');
    err.status = 404;
    return next(err);
  }
  return next();
}

// 将uri变成浏览器接受的页面格式
function _rewriteReverse(uri) {
  var idx = uri.indexOf('?'),
      pathname = uri,
      search = '';
  if (idx !== -1) {
    search = uri.substring(idx);
    pathname = uri.slice(0, idx);
  }
  if (pathname) {
    if (pathname[0] === '/') {
      pathname = '/' + pathname.substring(1).replace(/\//g, '-');
    } else {
      pathname = pathname.replace(/\//g, '-');
    }
  }
  return pathname + URI_APPENDIX + search;
}


// ------------------------------------------------------------------------
// Encrypt and Decrypt
// ------------------------------------------------------------------------

var algorithm = 'aes-128-ecb';
var secret = config.cookie.secret;
var clearEncoding = 'utf8';
var cipherEncoding = 'base64';

function _encryptCookie(data) {
  var cipher = crypto.createCipher(algorithm, secret);
  try {
    return cipher.update(data, clearEncoding, cipherEncoding) + cipher.final(cipherEncoding);
  } catch (e) {
    logger.error('Failed to encrypt: "' + data + '", ' + e.stack);
    return null;
  }
}

function _decryptCookie(data) {
  var decipher = crypto.createDecipher(algorithm, secret);
  try {
    return decipher.update(data, cipherEncoding, clearEncoding) + decipher.final(clearEncoding);
  } catch (e) {
    logger.error('Failed to decrypt: "' + data + '", ' + e.stack);
    return null;
  }
}

// ------------------------------------------------------------------------
// Come up missing fields for rendering
// ------------------------------------------------------------------------

var seoConfig = config.web.seo || {};

function _renderEx(req, res, view, locals, callback) {
  res.render(view, _dataForRenderEx(req, locals), callback);
}

function _dataForRenderEx(req, locals) {
  // 比较通用的数据，包括：
  // 1.登陆用户
  // 2.默认SEO配置
  // 3.默认网站配置
  // 等
  var data = {
    _user: req.user,
    _siteName: WEB_NAME,
  };
  if (locals) extend(data, locals);
  return data;
}


// ------------------------------------------------------------------------
// Get the request IP address and normalize
// see http://stackoverflow.com/questions/24896386/request-connection-remoteaddress-now-prefixed-in-ffff-in-node-js
// and http://stackoverflow.com/questions/31100703/stripping-ffff-prefix-from-request-connection-remoteaddress-nodejs
// ------------------------------------------------------------------------

var ipaddr = require('ipaddr.js');
function _getReqIP(req) {
  //var ipString = req.ip;  // the simple way
  var ipString = req.headers["x-forwarded-for"];
  if (ipString) {
    ipString = ipString.split(',')[0];
    return ipString;  // This request is forwarded by nginx, which is guaranteed to be IPv4
  } else {
    ipString = req.connection.remoteAddress;
  }
  if (!ipString || ipString === 'localhost' || ipString === '::1') {
    return '127.0.0.1';
  }
  if (ipaddr.isValid(ipString)) {
    try {
      var addr = ipaddr.parse(ipString);
      if (ipaddr.IPv6.isValid(ipString) && addr.isIPv4MappedAddress()) {
        return addr.toIPv4Address().toString();
      }
      return addr.toNormalizedString();
    } catch (e) {
      return ipString;
    }
  }
  return 'unknown';
}

// ------------------------------------------------------------------------
// Disable browser cache
// see http://madhatted.com/2013/6/16/you-do-not-understand-browser-history
// and https://mixmax.com/blog/chrome-back-button-cache-no-store
// ------------------------------------------------------------------------

function _disableBrowserCache(res) {
  res.setHeader('Cache-Control', 'must-revalidate, no-store, no-cache, private');
  res.setHeader('Pragma', 'no-store, no-cache');
}

// 如果是Ajax请求，而且要求返回json
function _shouldReturnJSON(req) {
  return req.xhr && req.headers.accept && /application\/json/ig.test(req.headers.accept);
}