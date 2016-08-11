var express = require('express'),
    auth = require('../../auth'),
    logger = require('../../logger'),
    common_data = require('../../common_data'),
    common_util = require('../../util/common_util'),
    http_util = require('../../util/http_util');

// ------------------------------------------------------------------------
// 采购管理
// ------------------------------------------------------------------------

var router = express.Router();


router.get("/order/filter",
    auth.requirePermissionAjax('purchaseOrder:view'),
    function (req, res, next) {
        http_util.pipe('wms', {
            url: '/purchase/order/filter',
            method: 'POST',
            requestedBy: req.user,
            data: req.query
        }, res);
    }
);

router.post("/order/update/:id",
    auth.requirePermissionAjax('purchaseOrder:edit'),
    function (req, res, next) {
        var id = req.params.id;
        http_util.pipe('wms', {
            url: '/purchase/order/update/'+id,
            method: 'POST',
            requestedBy: req.user,
            data: req.body
        }, res);
    }
);

router.post("/order/add",
    auth.requirePermissionAjax('purchaseOrder:edit'),
    function (req, res, next) {
        http_util.pipe('wms', {
            url: '/purchase/order/add',
            method: 'POST',
            requestedBy: req.user,
            data: req.body
        }, res);
    }
);

router.post("/order/find/:id",
    auth.requirePermissionAjax('purchaseOrder:edit'),
    function (req, res, next) {
        var id = req.params.id;
        http_util.pipe('wms', {
            url: '/purchase/order/find/'+id,
            method: 'POST',
            requestedBy: req.user
        }, res);
    }
);

router.get("/order/find",
    auth.requirePermissionAjax('purchaseOrder:view'),
    function (req, res, next) {
        var id = req.query.id;
        http_util.pipe('wms', {
            url: '/purchase/order/find/'+id,
            method: 'POST',
            requestedBy: req.user
        }, res);
    }
);

router.post("/order/cancel/check/:id",
    auth.requirePermissionAjax('purchaseOrder:view'),
    function (req, res, next) {
        var id = req.params.id;
        http_util.pipe('wms', {
            url: '/purchase/order/cancel/check/'+id,
            method: 'POST',
            requestedBy: req.user
        }, res);
    }
);

router.post("/order/cancel/:id",
    auth.requirePermissionAjax('purchaseOrder:view'),
    function (req, res, next) {
        var id = req.params.id;
        http_util.pipe('wms', {
            url: '/purchase/order/cancel/'+id,
            method: 'POST',
            requestedBy: req.user
        }, res);
    }
);

router.post("/order/complete/check/:id",
    auth.requirePermissionAjax('purchaseOrder:view'),
    function (req, res, next) {
        var id = req.params.id;
        http_util.pipe('wms', {
            url: '/purchase/order/complete/check/'+id,
            method: 'POST',
            requestedBy: req.user
        }, res);
    }
);
router.post("/order/complete/:id",
    auth.requirePermissionAjax('purchaseOrder:view'),
    function (req, res, next) {
        var id = req.params.id;
        http_util.pipe('wms', {
            url: '/purchase/order/complete/'+id,
            method: 'POST',
            requestedBy: req.user
        }, res);
    }
);

router.get("/order/payment",
    auth.requirePermissionAjax('purchaseOrder:view'),
    function (req, res, next) {
        var id = req.query.id;
        http_util.pipe('wms', {
            url: '/purchase/order/payment/'+id,
            method: 'POST',
            requestedBy: req.user
        }, res);
    }
);

//采购收货打印
router.post('/purchase/receipt/print',
    auth.requirePermissionAjax('purchaseReceipt:view'),
    function(req, res, next) {
        var receiptId = req.body.receiptId;
        var reqs = [],spreadOpts = [],type = 'PURCHASE_RECEIPT';
        //1. 获取打印模版
        reqs.push(http_util.request('facade', {
            method: 'GET',
            url: '/print/template/list/'+ type,
            requestedBy: req.user
        }));
        spreadOpts.push({name: 'template', ignoreError: false});
        //2. 获取采购出库单
        reqs.push(http_util.request('wms', {
            method: 'GET',
            url: '/purchase/receipt/print/'+ receiptId,
            requestedBy: req.user,
            timeout: 50000
        }));

        spreadOpts.push({name: 'print', ignoreError: false});
        //调用打印接口
        http_util.multiRequest(reqs)
            .spread(http_util.spreadMap(spreadOpts))
            .done(
                function(result) {
                    if(result.template && result.template.length) {
                        var template = result.template[0];
                        var data = {
                            templateData: JSON.stringify(result.print),
                            companyId: req.user.companyId
                        };
                        http_util.pipe('report', {
                            method: 'POST',
                            url: '/template/print/'+template.id,
                            data: data
                        }, res);
                    }
                },
                http_util.errorHandlerJSON(req, res, next)
            );
    }
);

//采购退货打印
router.post('/purchase/return/print',
    auth.requirePermissionAjax('purchaseReturn:view'),
    function(req, res, next) {
        var returnId = req.body.returnId;
        var reqs = [],spreadOpts = [],type = 'PURCHASE_RETURN';
        //1. 获取打印模版
        reqs.push(http_util.request('facade', {
            method: 'GET',
            url: '/print/template/list/'+ type,
            requestedBy: req.user
        }));
        spreadOpts.push({name: 'template', ignoreError: false});
        //2. 获取采购出库单
        reqs.push(http_util.request('wms', {
            method: 'GET',
            url: '/purchase/return/print/'+ returnId,
            requestedBy: req.user,
            timeout: 50000
        }));

        spreadOpts.push({name: 'print', ignoreError: false});
        //调用打印接口
        http_util.multiRequest(reqs)
            .spread(http_util.spreadMap(spreadOpts))
            .done(
                function(result) {
                    if(result.template && result.template.length) {
                        var template = result.template[0];
                        var data = {
                            templateData: JSON.stringify(result.print),
                            companyId: req.user.companyId
                        };
                        http_util.pipe('report', {
                            method: 'POST',
                            url: '/template/print/'+template.id,
                            data: data
                        }, res);
                    }
                },
                http_util.errorHandlerJSON(req, res, next)
            );
    }
);

//采购订单 打印
router.post('/order/print',
    auth.requirePermissionAjax('purchaseOrder:view'),
    function(req, res, next) {
        var id = req.body.id;
        var reqs = [],spreadOpts = [],type = 'PURCHASE_ORDER';
        //1. 获取打印模版
        reqs.push(http_util.request('facade', {
            method: 'GET',
            url: '/print/template/list/'+ type,
            requestedBy: req.user
        }));
        spreadOpts.push({name: 'template', ignoreError: false});
        //2. 获取杂项收货单
        reqs.push(http_util.request('wms', {
            method: 'POST',
            url: '/purchase/order/print/'+ id,
            requestedBy: req.user,
            timeout: 50000
        }));

        spreadOpts.push({name: 'print', ignoreError: false});
        //调用打印接口
        http_util.multiRequest(reqs)
            .spread(http_util.spreadMap(spreadOpts))
            .done(
                function(result) {
                    if(result.template && result.template.length) {
                        var template = result.template[0];
                        var data = {
                            templateData: JSON.stringify(result.print),
                            companyId: req.user.companyId
                        };
                        http_util.pipe('report', {
                            method: 'POST',
                            url: '/template/print/'+template.id,
                            data: data
                        }, res);
                    }
                },
                http_util.errorHandlerJSON(req, res, next)
            );
    }
);


//采购结款
router.get("/payment/filter",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/payment/filter',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);
  }
);
router.get("/payment/view/:id",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    var id = req.params.id;
    http_util.pipe('wms', {
      url: '/purchase/payment/view/'+id,
      method: 'GET',
      requestedBy: req.user
    }, res);
  }
);
router.get("/payment/lines",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    var paymentId = req.query.paymentId;
    http_util.pipe('wms', {
      url: '/purchase/payment/lines/'+paymentId,
      method: 'GET',
      requestedBy: req.user
    }, res);
  }
);

router.get("/payment/order/filter",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/order/filter',
      method: 'POST',
      requestedBy: req.user,
      data: req.query
    }, res);
  }
);

router.get("/payment/order/view/:paymentOrderNo",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/order/filter',
      method: 'POST',
      requestedBy: req.user,
      data: {purchaseOrderNo: req.params.paymentOrderNo}
    }, res);
  }
);

router.post("/payment/draft",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    req.body.post = false;
    http_util.pipe('wms', {
      url: '/purchase/payment/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);
  }
);
router.post("/payment/post",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    req.body.post = true;
    http_util.pipe('wms', {
      url: '/purchase/payment/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res);
  }
);

router.post("/payment/cancel/:id",
  auth.requirePermissionAjax('purchasePayment:view'),
  function (req, res, next) {
    var paymentId = req.params.id;
    http_util.pipe('wms', {
      url: '/purchase/payment/cancel/'+paymentId,
      method: 'POST',
      requestedBy: req.user
    }, res);
  }
);

router.get('/payment/method/list',
  auth.requirePermissionAjax('purchasePayment:view'),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/payment/method/list',
      method: 'GET',
      requestedBy: req.user
    }, res);
  }
);

router.post('/payment/method/save',
  auth.requirePermissionAjax('purchasePayment:edit'),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/payment/method/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    },  res);
  }
);

//采购收货查询
router.get('/purchase/receipt/filter',
  auth.requirePermissionAjax('purchaseReceipt:view'),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/receipt/filter',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);
  }
);

//采购收货查询详细清单
router.get('/purchase/receipt/lines',
  auth.requirePermissionAjax('purchaseReceipt:edit'),
  function(req, res, next) {
    var purchaseReceiptId = req.query.purchaseReceiptId;
    http_util.pipe('wms', {
      url: '/purchase/receipt/lines/'+purchaseReceiptId,
      method: 'GET',
      requestedBy: req.user
    }, res)
  }
);

//采购收货提交
router.post('/purchase/receipt/update',
  auth.requirePermissionAjax('purchaseReceipt:edit'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/purchase/receipt/update',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);

//采购收货取消
router.post('/purchase/receipt/cancel/:id',
  auth.requirePermissionAjax('purchaseReceipt:edit'),
  function (req, res, next) {
    var receiptId = req.params.id;
    http_util.pipe('wms', {
      url: '/purchase/receipt/cancel/'+receiptId,
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);
//采购收货详情
router.get('/purchase/receipt/view',
  auth.requirePermissionAjax('purchaseReceipt:edit'),
  function(req, res, next) {
    var purchaseReceiptId = req.query.purchaseReceiptId;
    http_util.pipe('wms', {
      url: '/purchase/receipt/view/'+purchaseReceiptId,
      method: 'GET',
      requestedBy: req.user
    }, res)
  }
);

module.exports = router;
