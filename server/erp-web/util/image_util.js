var config = require('../config');

module.exports = {
  getImageUrl: getImageUrl,
  getImageUrlInterlace: getImageUrlInterlace,
  getImageUrlPNG: getImageUrlPNG,
  getImageUrlCrop: getImageUrlCrop,
  getImageUrlResize: getImageUrlResize,
  getImageUrlBoxed: getImageUrlBoxed
};

var IMAGE_JPG = '/format/jpg';
var IMAGE_PNG = '/format/png';
// LxC(2016-03-09): 默认的quanlity是75，很多图片的文字会糊掉，修改为90
var IMAGE_JPG_HIGH_QUALITY = '/format/jpg/q/90';
var IMAGE_INTERLACE = '/interlace/1';  // 支持interlace渐进加载

function getImageUrl(imageUri, width, height) {
  if (!imageUri) return '';
  var imageUrl = encodeURI(getNextImageServer() + imageUri);
  if (typeof width === 'number') {
    if (typeof height !== 'number') height = width;
    // 限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪
    imageUrl += '?imageView2/2/w/' + width + '/h/' + height + IMAGE_JPG_HIGH_QUALITY;
  }
  return imageUrl;
}

function getImageUrlInterlace(imageUri, width, height) {
  if (!imageUri) return '';
  var imageUrl = encodeURI(getNextImageServer() + imageUri);
  if (typeof width === 'number') {
    if (typeof height !== 'number') height = width;
    // 限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪
    imageUrl += '?imageView2/2/w/' + width + '/h/' + height + IMAGE_JPG_HIGH_QUALITY + IMAGE_INTERLACE;
  }
  return imageUrl;
}

function getImageUrlPNG(imageUri, width, height) {
  if (!imageUri) return '';
  var imageUrl = encodeURI(getNextImageServer() + imageUri);
  if (typeof width === 'number') {
    if (typeof height !== 'number') height = width;
    // 限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪
    imageUrl += '?imageView2/2/w/' + width + '/h/' + height + IMAGE_PNG;
  }
  return imageUrl;
}

function getImageUrlCrop(imageUri, width, height) {
  if (!imageUri) return '';
  var imageUrl = encodeURI(getNextImageServer() + imageUri);
  if (typeof width === 'number') {
    if (typeof height !== 'number') height = width;
    // 限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，居中裁剪
    imageUrl += '?imageView2/1/w/' + width + '/h/' + height + IMAGE_JPG_HIGH_QUALITY + IMAGE_INTERLACE;
  }
  return imageUrl;
}

function getImageUrlResize(imageUri, width, height) {
  if (!imageUri) return '';
  var imageUrl = encodeURI(getNextImageServer() + imageUri);
  if (typeof width === 'number') {
    if (typeof height !== 'number') height = width;
    // 限定缩略图的宽为<Width>，高为<Height>，进行缩小或者放大，不维持原来的比例
    imageUrl += '?imageMogr2/thumbnail/' + width + 'x' + height + '!';
  }
  return imageUrl;
}

var originalSizeRE = /_(\d+)x(\d+)\./;
function getImageUrlBoxed(imageUri, width, height) {
  if (!imageUri) return '';
  var imageUrl = encodeURI(getNextImageServer() + imageUri);
  if (typeof width === 'number') {
    if (typeof height !== 'number') height = width;
    // 查看原先的图片名是否包含了长宽信息
    var result = originalSizeRE.exec(imageUri), cropped = false;
    if (result && result.length === 3) {
      var originalWidth = result[1]-0, originalHeight = result[2]-0;
      if (originalWidth / originalHeight > width / height) {
        // 限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，居中裁剪
        imageUrl += '?imageView2/1/w/' + width + '/h/' + height + IMAGE_JPG_HIGH_QUALITY;
        cropped = true;
      }
    }
    if (!cropped) {
      // 限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪
      imageUrl += '?imageView2/2/w/' + width + '/h/' + height + IMAGE_JPG_HIGH_QUALITY;
    }
  }
  return imageUrl;
}


var nextIndexRR = 0,
    cdnServers = config.servers.cdn;
if (!cdnServers || !cdnServers.length) throw new TypeError('CDN servers not defined');
// Use Round-Robin to get the image url
var getNextImageServer;
if (cdnServers.length === 1) {
  var server = cdnServers[0];
  getNextImageServer = module.exports.getNextImageServer = function() {
    return server;
  };
} else {
  getNextImageServer = module.exports.getNextImageServer = function() {
    nextIndexRR = (nextIndexRR + 1) % cdnServers.length;
    return cdnServers[nextIndexRR];
  };
}
