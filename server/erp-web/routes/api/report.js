var express = require('express'),
    auth = require('../../auth'),
    logger = require('../../logger'),
    common_data = require('../../common_data'),
    common_util = require('../../util/common_util'),
    http_util = require('../../util/http_util');

// ------------------------------------------------------------------------
// 报表分析
// ------------------------------------------------------------------------

var router = express.Router();


router.post('/stockJournal/filter',
  auth.requirePermissionAjax('stockJournalSummary:view'),
  function(req, res, next) {
      http_util.pipe('wms', {
          method: 'POST',
          data: req.body,
          url: '/stock/journal/filter',
          requestedBy: req.user
      }, res);
  });

router.post('/stockInvoicing/filter',
    auth.requirePermissionAjax('stockInvoicingSummary:view'),
    function(req, res, next) {
        http_util.pipe('wms', {
            method: 'POST',
            data: req.body,
            url: '/stock/invoicing/filter',
            requestedBy: req.user
        }, res);
    });

module.exports = router;
