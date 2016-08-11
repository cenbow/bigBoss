var EventEmitter = require('events'),
    Q = require('q'),
    logger = require('./logger'),
    http_util = require('./util/http_util');

var CACHE = {},
    EVENTS = new EventEmitter();

module.exports = {
  // events hub
  events: EVENTS,
  // init
  initialize: initialize,
  // getters
  getCountryTree: function() {
    return CACHE.countryTree;
  },
  getAreas: function() {
    return CACHE.areas;
  },
  getArea: function(id) {
    return CACHE.areasMap[id];
  },
};

function initialize() {
  logger.info('[common_data] Initializing...');
  return Q.all([_initCache(), _initAreaCache(), _initColdCache()])
    .then(function() {
      logger.info('[common_data] Initialized!');
    });
}

function _initCache() {
  var deferred = Q.defer();

  deferred.resolve();
  return deferred.promise;
}

function _initAreaCache() {
  var deferred = Q.defer();
  http_util.multiRequest(
      http_util.request('facade', '/config/area/tree/1')
    )
    .spread(http_util.spreadMap('countryTree'))
    .done(
      function(result) {
        CACHE.countryTree = result.countryTree;
        EVENTS.emit('regions');
        deferred.resolve();
      },
      function(err) {
        deferred.reject(err);
      }
    );
  return deferred.promise;
}

//area数据作为常量，不需要时常刷新
function _initColdCache() {
  var deferred = Q.defer();
  http_util.multiRequest(
      http_util.request('facade', {
    	  url : '/config/area/list',
    	  timeout : 5000
    	})
    )
    .spread(http_util.spreadMap('areas'))
    .done(
      function(result) {
        mapAreas(result.areas);
        EVENTS.emit('area');
        deferred.resolve();
      },
      function(err) {
        deferred.reject(err);
      }
    );
  _planToRefreshColdCache();
  return deferred.promise;
}

function _planToRefreshColdCache() {
  setTimeout(function() {
    logger.info('[common_data] Start to refresh cold cache...');
    _initColdCache()
      .then(function() {
        logger.info('[common_data] Cold cache refreshed!');
      })
      .catch(function(err) {
        logger.error(err);
      });
  }, 60 * 60 * 1000 /* 1 hour */);
}

function mapAreas(areas) {
  var areasMap = CACHE.areasMap = {};
  areas.forEach(function (area) {
    areasMap[area.id] = area;
  });
  var areasTree = CACHE.areas = [];
  areas.forEach(function (area) {
    if (area.type === 1) areasTree.push(area);
    if (area.parentId) {
      var parentArea = areasMap[area.parentId];
      if (!parentArea) return;
      if (!parentArea.subAreas) parentArea.subAreas = [];
      parentArea.subAreas.push(area);
    }
  });
}