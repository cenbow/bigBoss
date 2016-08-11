var util = require('util'),
    url = require('url'),
    moment = require('moment'),
    config = require('../config');
    //image_util = require('./image_util');

// add helper functions to template
module.exports = function(template) {
  // common
  template.helper('encodeURI', encodeURI);
  template.helper('encodeURIComponent', encodeURIComponent);
  // self-expanded
  template.helper('timestamp', getTimestamp);
  template.helper('formatDate', formatDate);
  template.helper('formatMoney', formatMoney);
  template.helper('formatMoney2', formatMoney2);
  // template.helper('imageUrl', image_util.getImageUrl);
  // template.helper('imageUrlInterlace', image_util.getImageUrlInterlace);
  // template.helper('imageUrlPNG', image_util.getImageUrlPNG);
  // template.helper('imageUrlCrop', image_util.getImageUrlCrop);
  // template.helper('imageUrlResize', image_util.getImageUrlResize);
  // template.helper('imageUrlBoxed', image_util.getImageUrlBoxed);
  // template.helper('uploadUrl', image_util.getUploadUrl);
  // template.helper('mediaUrl', image_util.getMediaUrl);
  template.helper('outputConditionBegin', outputConditionBegin);
  template.helper('outputConditionEnd', outputConditionEnd);
};

function getTimestamp() {
  return Date.now();
}

/**
 * @see http://momentjs.com/docs/#/displaying/format/
 * @param date date
 * @param format format
 * @returns {*}
 */
function formatDate(date, format) {
  format = format || 'YYYY-MM-DD';
  return date ? moment(date).format(format) : '';
}

/**
 * 格式化指定的<code>num</code>，最多保留2位小数，并去除多余的0
 */
function formatMoney(num, defVal) {
  if (typeof num !== 'number') {
    num = Number(num);
    if (isNaN(num)) return defVal || '0';
  }
  var s = num.toFixed(2);
  if (s.indexOf('.') > -1) {
    var idx = s.length - 1;
    if (s[idx] === '0') {
      while (s[idx] === '0') idx -= 1;
      if (s[idx] === '.') idx -= 1;
      s = s.substring(0, idx + 1);
    }
  }
  return s;
}

/**
 * 格式化指定的<code>num</code>，保留2位小数
 */
function formatMoney2(num, defVal) {
  if (typeof num !== 'number') {
    num = Number(num);
    if (isNaN(num)) return defVal || '0.00';
  }
  return num.toFixed(2);
}

function outputConditionBegin(expression) {
  return '<!--[' + expression + ']>';
}

function outputConditionEnd() {
  return '<![endif]-->';
}
