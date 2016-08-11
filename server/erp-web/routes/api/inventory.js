var express = require('express'),
  auth = require('../../auth'),
  logger = require('../../logger'),
  common_data = require('../../common_data'),
  common_util = require('../../util/common_util'),
  http_util = require('../../util/http_util'),
  fs = require('fs'),
  extend = require('extend');

// ------------------------------------------------------------------------
// 库存管理
// ------------------------------------------------------------------------

var router = express.Router();

router.get("/warehouse/list",
  auth.requirePermissionAjax('whsMgmt:view'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url : '/warehouse/filter',
      method: 'POST',
      requestedBy: req.user
    }, res);
  }
);


router.get("/warehouse/stock/filter",
    auth.requirePermissionAjax('whsMgmt:view'),
    function (req, res, next) {
        http_util.pipe('wms', {
            url: '/warehouse/stock/filter',
            method: 'POST',
            requestedBy: req.user,
            data: req.query
        }, res);
    }
);

router.get("/warehouse/area/stock/filter",
    auth.requirePermissionAjax('whsMgmt:view'),
    function (req, res, next) {
        var areaId = req.query.whsId;
        http_util.pipe('wms', {
            url: '/warehouse/area/stock/filter/' + areaId,
            method: 'POST',
            requestedBy: req.user,
            data: req.query
        }, res);
    }
);

router.get("/warehouse/stock/export/csv",
    auth.requirePermissionAjax('whsMgmt:view'),
    function (req, res, next) {
        http_util.pipe('wms', {
            url: '/warehouse/stock/export/csv',
            method: 'GET',
            requestedBy: req.user,
            data: req.query
        }, res);
    }
);

router.get("/warehouse/area/stock/export/csv",
    auth.requirePermissionAjax('whsMgmt:view'),
    function (req, res, next) {
            var areaId = req.query.whsId;
            http_util.pipe('wms', {
            url : '/warehouse/area/stock/export/csv/'+areaId,
            method: 'GET',
            requestedBy: req.user,
            data:req.query
        }, res);
    }
);

router.get('/warehouse/filter',
    auth.requirePermissionAjax('whsMgmt:view'),
    function(req, res, next) {
        var isDeleted = req.query.isDeleted;
        var data = {'isDeleted' : isDeleted};
        http_util.request('wms', {
            method: 'POST',
            url: '/warehouse/filter',
            data: req.query,
            requestedBy: req.user
        }).done(
            function(json){
                var children = transformWarehouse(isDeleted,json);
                res.json(children);
            }
        );
    }
);

function transformWarehouse(isDeleted,json){
    var children = [];
    var data = json.data;
    data.forEach(function(obj){
        var item = {
            expanded: false,
            text: '',
            id: '',
            dbId:'',
            iconCls:'house',
            type: 'stock',
            children:[]
        };

        if(isDeleted == 'Y'){
            item = extend(item,{expanded:true,checked: false})
        }
        item.text = obj.name;
        item.id = obj.id;
        item.dbId = obj.id;
        if(obj.areas && obj.areas.length>0){
            var areas = obj.areas;
            areas.forEach(function(area){
                var itemLeaf = {
                    leaf: true,
                    text: '',
                    id: '',
                    dbId: '',
                    type: 'area',
                    pid: item.dbId
                }
                if(isDeleted == 'Y'){
                    itemLeaf = extend(itemLeaf,{checked: false})
                }
                itemLeaf.text = area.name;
                itemLeaf.id = item.id+"_"+area.id;
                itemLeaf.dbId = area.id;
                item.children.push(itemLeaf);
            })
        }
        children.push(item);
    })
    return children;
}

router.post('/warehouse/add',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var data = req.body;
    http_util.pipe('wms', {
      url: '/warehouse/add',
      method: 'POST',
      data : data,
      requestedBy: req.user
    }, res);
  }
);


router.post('/warehouse/update/:id',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var data = req.body;
    var id = req.params.id;
    http_util.pipe('wms', {
      url: '/warehouse/update/'+id,
      method: 'POST',
      data : data,
      requestedBy: req.user
    }, res);
  }
);

router.post('/warehouse/view/:whsId',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var whsId = req.params.whsId;
    var data = req.body;
    http_util.pipe('wms', {
      url: '/warehouse/view/'+whsId,
      method: 'POST',
      requestedBy: req.user
    }, res);
  }
);

router.post('/warehouse/delete/:whsId',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var whsId = req.params.whsId;
    http_util.pipe('wms', {
      url: '/warehouse/delete/'+whsId,
      method: 'POST',
      requestedBy: req.user
    }, res);
  }
);


router.post('/warehouse/area/add',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var data = req.body;
    http_util.pipe('wms', {
      url: '/warehouse/area/add',
      method: 'POST',
      data : data,
      requestedBy: req.user
    }, res);
  }
);


router.post('/warehouse/area/update/:id',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var data = req.body;
    var id = req.params.id;
    http_util.pipe('wms', {
      url: '/warehouse/area/update/'+id,
      method: 'POST',
      data : data,
      requestedBy: req.user
    }, res);
  }
);

router.post('/warehouse/area/view/:id',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var id = req.params.id;
    http_util.pipe('wms', {
      url: '/warehouse/area/view/'+id,
      method: 'POST',
      requestedBy: req.user
    }, res);
  }
);

router.post('/warehouse/area/delete/:id',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var id = req.params.id;
    http_util.pipe('wms', {
      url: '/warehouse/area/delete/'+id,
      method: 'POST',
      requestedBy: req.user
    }, res);
  }
);

router.get('/customs/list',
  auth.requireAuth(),
  function(req, res, next) {
    var data = {'yesNoFlag' : 'Y','activeFlag': 'A'};
    http_util.pipe('facade', {
      url: '/customs/list',
      method: 'GET',
      data: data,
      requestedBy: req.user
    }, res);
  }
);

router.post('/warehouse/area/batch/recover',
  auth.requirePermissionAjax('whsMgmt:edit'),
  function(req, res, next) {
    var data = req.body;
    http_util.pipe('wms', {
      url: '/warehouse/area/batch/recover',
      method: 'POST',
      data : data,
      requestedBy: req.user
    }, res);
  }
);


router.get('/warehouse/pickloc/list',
  auth.requirePermissionAjax('pickLocation:view'),
  function(req, res, next) {
    var skuId = req.query.skuId;
    http_util.pipe('wms', {
      url: '/warehouse/pickloc/list/'+skuId,
      method: 'GET',
      requestedBy: req.user,
      data: req.query
    }, res);
  }
);



router.post('/warehouse/pickloc/update',
  auth.requirePermissionAjax('pickLocation:edit'),
  function(req, res, next) {
    var id = req.query.id;
    http_util.pipe('wms', {
      url: '/warehouse/pickloc/update/'+id,
      method: 'POST',
      requestedBy: req.user,
      data: req.query
    }, res);
  }
);
router.post('/warehouse/pickloc/add',
  auth.requirePermissionAjax('pickLocation:edit'),
  function(req, res, next) {
    http_util.handleMultiOpsForExt('wms', {
      method: 'POST',
      url: '/warehouse/pickloc/add',
      requestedBy: req.user
    }, req, res, next)
  }
);

router.get('/warehouse/pickloc/export',
  auth.requirePermissionAjax('pickLocation:view'),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/warehouse/pickloc/export',
      method: 'GET',
      requestedBy: req.user,
      data: req.query
    }, res);
  }
);

router.post('/warehouse/pickloc/importPickLocCsv',
  auth.requirePermissionAjax('pickLocation:edit'),
  function(req, res, next) {
    http_util.upload('wms',{
      url: '/warehouse/pickloc/import',
      timeout:  1000 * 60,
      method: 'POST',
      requestedBy: req.user
    }, req).pipe(res);
  }
);

router.get('/warehouse/pickloc/view',
  auth.requirePermissionAjax('pickLocation:edit'),
  function(req, res, next) {
    http_util.pipe('wms',{
      method: 'GET',
      url: '/warehouse/pickloc/view',
      data: req.query,
      requestedBy: req.user
    }, res)
  }
);



//库存调拨
router.get('/stock/transfer/filter',
  auth.requirePermissionAjax('stockTransfer:view'),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/stock/transfer/filter',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);
  }
);

router.post('/stock/transfer/draft',
  auth.requirePermissionAjax('stockTransfer:edit'),
  function(req, res, next) {
    req.body.post = false;
    http_util.pipe('wms', {
      url: '/stock/transfer/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);

router.post('/stock/transfer/post',
  auth.requirePermissionAjax('stockTransfer:edit'),
  function(req, res, next) {
    req.body.post = true;
    http_util.pipe('wms', {
      url: '/stock/transfer/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);

router.post('/stock/transfer/cancel/:id',
  auth.requirePermissionAjax('stockTransfer:edit'),
  function(req, res, next) {
    var transferId = req.params.id;
    http_util.pipe('wms', {
      url: '/stock/transfer/cancel/'+transferId,
      method: 'POST',
      requestedBy: req.user
    }, res)
  }
);

router.get('/stock/transfer/view',
  auth.requirePermissionAjax('stockTransfer:view'),
  function(req, res, next) {
    var transferId = req.query.transferId;
    http_util.pipe('wms', {
      method: 'GET',
      url: '/stock/transfer/view/' + transferId,
      requestedBy: req.user
    }, res);
  }
);

router.get('/stock/transfer/lines',
  auth.requirePermissionAjax('stockTransfer:view'),
  function(req, res, next) {
    var transferId = req.query.transferId;
    http_util.pipe('wms', {
      url: '/stock/transfer/lines/'+transferId,
      method: 'GET',
      requestedBy: req.user
    }, res)
  }
);

router.post('/stock/transfer/print',
  auth.requirePermissionAjax('stockTransfer:view'),
  function(req, res, next) {
    var transferId = req.body.transferId;
    var reqs = [], spreadOpts = [], type = 'STOCK_TRANSFER';
    //1. 获取打印模版
    //
    reqs.push(http_util.request('facade', {
      method: 'GET',
      url: '/print/template/list/'+ type,
      requestedBy: req.user
    }));
    spreadOpts.push({name: 'template', ignoreError: false});
    //2. 获取调拨单
    reqs.push(http_util.request('wms', {
      method: 'GET',
      url: '/stock/transfer/print/'+ transferId,
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

//杂项出库类型添加
router.post('/goods/issue/type/add',
    auth.requirePermissionAjax('goodsIssue:edit'),
    function(req, res, next) {
        http_util.handleMultiOpsForExt('wms', {
            url: '/goods/issue/type/add',
            method: 'POST'
        },  req, res, next);
    }
);

//杂项出库类保存
router.post('/goods/issue/type/save',
    auth.requirePermissionAjax('goodsIssue:edit'),
    function(req, res, next) {
        http_util.pipe('wms', {
            url: '/goods/issue/type/save',
            method: 'POST',
            data: req.body,
            requestedBy: req.user
        },  res);
    }
);

//杂项出库类型展示
router.get('/goods/issue/type/list',
    //auth.requireAuth(),
    auth.requirePermissionAjax('goodsIssue:view'),
    function(req, res, next) {
        http_util.pipe('wms', {
            url: '/goods/issue/type/list',
            method: 'GET',
            requestedBy: req.user
        }, res);
    }
);

//杂项出库类型更新
router.post('/goods/issue/type/update',
    auth.requirePermissionAjax('goodsIssue:edit'),
    function(req, res, next) {
        http_util.handleMultiOpsForExt('wms', {
            url: '/goods/issue/type/update',
            method: 'POST',
            requestedBy: req.user
        }, req, res, next);
    }
);

//杂项出库类型删除
router.post('/goods/issue/type/delete',
    auth.requirePermissionAjax('goodsIssue:edit'),
    function(req, res, next) {
        http_util.handleMultiOpsForExt('wms', {
            url: '/goods/issue/type/delete',
            method: 'POST',
            requestedBy: req.user
        }, req, res, next);
    }
);

//杂项出库列表
router.get('/goods/issue/filter',
    //auth.requireAuth(),
    auth.requirePermissionAjax('goodsIssue:view'),
    function(req, res, next) {
        http_util.pipe('wms', {
            url: '/goods/issue/filter',
            method: 'POST',
            data: req.query,
            requestedBy: req.user
        }, res);
    }
);
//杂项出库详情
router.get('/goods/issue/view',
    auth.requirePermissionAjax('goodsIssue:view'),
    function(req, res, next) {
        var issueId = req.query.issueId;
        http_util.pipe('wms', {
            method: 'GET',
            url: '/goods/issue/view/' + issueId,
            requestedBy: req.user
        }, res);
    }
);

//杂项出库保存
router.post('/goods/issue/saveOrUpdate',
    auth.requirePermissionAjax('goodsIssue:edit'),
    function(req, res, next) {
        http_util.pipe('wms', {
            url: '/goods/issue/update',
            method: 'POST',
            data: req.body,
            requestedBy: req.user
        }, res)
    }
);


//杂项出库明细列表
router.get('/goods/issue/list/goods',
    auth.requirePermissionAjax('goodsIssue:view'),
    function(req, res, next) {
        var issueId = req.query.issueId;
        http_util.pipe('wms', {
            url: '/goods/issue/list/goods/' + issueId,
            method: 'GET',
            requestedBy: req.user
        }, res);
    }
);
//杂项出库打印
router.post('/goods/issue/print',
    auth.requirePermissionAjax('goodsIssue:view'),
    function(req, res, next) {
        var goodsIssueId = req.body.goodsIssueId;
        var reqs = [], spreadOpts = [], type = 'GOODS_ISSUE';
        //1. 获取打印模版
        //
        reqs.push(http_util.request('facade', {
            method: 'GET',
            url: '/print/template/list/'+ type,
            requestedBy: req.user
        }));
        spreadOpts.push({name: 'template', ignoreError: false});
        //2. 获取出库单
        reqs.push(http_util.request('wms', {
            method: 'GET',
            url: '/goods/issue/print/'+ goodsIssueId,
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


//杂项入库
router.get('/goods/receipt/type/list',
  auth.requirePermissionAjax('goodsReceipt:view'),
  auth.requireAuth(),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/goods/receipt/type/list',
      method: 'GET',
      requestedBy: req.user
	}, res);
  }
);

router.post('/goods/receipt/type/save',
  auth.requirePermissionAjax('goodsReceipt:edit'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/goods/receipt/type/save',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);

router.get('/goods/receipt/filter',
  auth.requirePermissionAjax('goodsReceipt:view'),
  function(req, res, next) {
    http_util.pipe('wms', {
      url: '/goods/receipt/filter',
      method: 'POST',
      data: req.query,
      requestedBy: req.user
    }, res);
  }
);

router.post('/goods/receipt/draft',
  auth.requirePermissionAjax('goodsReceipt:edit'),
  function(req, res, next) {
	req.body.status = 'DRAFT';
    http_util.pipe('wms', {
      url: '/goods/receipt/update',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);

router.post('/goods/receipt/in',
  auth.requirePermissionAjax('goodsReceipt:edit'),
  function (req, res, next) {
    req.body.status = 'TRANSFERRED_IN';
    http_util.pipe('wms', {
      url: '/goods/receipt/update',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);

router.post('/goods/receipt/cancel/:id',
  auth.requirePermissionAjax('goodsReceipt:edit'),
  function (req, res, next) {
    var receiptId = req.params.id;
    http_util.pipe('wms', {
      url: '/goods/receipt/cancel/'+receiptId,
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);

router.get('/goods/receipt/view',
  auth.requirePermissionAjax('goodsReceipt:edit'),
  function(req, res, next) {
    var receiptId = req.query.receiptId;
    http_util.pipe('wms', {
      method: 'GET',
      url: '/goods/receipt/view/' + receiptId,
      requestedBy: req.user
    }, res);
  }
);

//杂项入库 打印
router.post('/goods/receipt/print',
  auth.requirePermissionAjax('goodsReceipt:view'),
  function(req, res, next) {
    var receiptId = req.body.receiptId;
    var reqs = [],spreadOpts = [],type = 'GOODS_RECEIPT';
    //1. 获取打印模版
    reqs.push(http_util.request('facade', {
      method: 'GET',
      url: '/print/template/list/'+ type,
      requestedBy: req.user
    }));
    spreadOpts.push({name: 'template', ignoreError: false});
    //2. 获取杂项收货单
    reqs.push(http_util.request('wms', {
      method: 'GET',
      url: '/goods/receipt/print/'+ receiptId,
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

router.get('/goods/receipt/lines',
  auth.requirePermissionAjax('goodsReceipt:edit'),
  function(req, res, next) {
    var receiptId = req.query.receiptId;
    http_util.pipe('wms', {
      url: '/goods/receipt/lines/'+receiptId,
      method: 'GET',
      requestedBy: req.user
    }, res)
  }
);

router.get('/purchase/return/filter',
  auth.requirePermissionAjax('purchaseReturn:view'),
  function(req, res, next) {
	http_util.pipe('wms', {
	  url: '/purchase/return/filter',
	  method: 'POST',
	  data: req.query,
	  requestedBy: req.user
	}, res);
  }
);

router.get('/purchase/return/view',
  auth.requirePermissionAjax('purchaseReturn:edit'),
  function(req, res, next) {
	var purchaseReturnId = req.query.purchaseReturnId;
	http_util.pipe('wms', {
	  method: 'GET',
	  url: '/purchase/return/view/' + purchaseReturnId,
	  requestedBy: req.user
	}, res);
  }
);

router.get('/purchase/return/lines',
  auth.requirePermissionAjax('purchaseReturn:edit'),
  function(req, res, next) {
	var purchaseReturnId = req.query.purchaseReturnId;
	http_util.pipe('wms', {
	  url: '/purchase/return/lines/'+purchaseReturnId,
	  method: 'GET',
	  requestedBy: req.user
	}, res)
  }
);

router.post('/purchase/return/draft',
  auth.requirePermissionAjax('purchaseReturn:edit'),
  function(req, res, next) {
	req.body.status = 'DRAFT';
	http_util.pipe('wms', {
	  url: '/purchase/return/update',
	  method: 'POST',
	  data: req.body,
	  requestedBy: req.user
	}, res)
  }
);

router.post('/purchase/return/out',
  auth.requirePermissionAjax('purchaseReturn:edit'),
  function (req, res, next) {
	req.body.status = 'TRANSFERRED_OUT';
	http_util.pipe('wms', {
	  url: '/purchase/return/update',
	  method: 'POST',
	  data: req.body,
	  requestedBy: req.user
	}, res)
  }
);

router.post('/purchase/return/cancel/:id',
  auth.requirePermissionAjax('purchaseReturn:edit'),
  function (req, res, next) {
	var receiptId = req.params.id;
	http_util.pipe('wms', {
	  url: '/purchase/return/cancel/'+receiptId,
	  method: 'POST',
	  data: req.body,
	  requestedBy: req.user
	}, res)
  }
);


//库存盘点
router.post("/stock/taking/filter",
  auth.requirePermissionAjax('stockTaking:view'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/stock/taking/filterBy',
      method: 'POST',
      requestedBy: req.user,
      data: req.body
    }, res);
  }
);

//取消盘点单
router.post("/stock/taking/cancel",
  auth.requirePermissionAjax('stockTaking:edit'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/stock/taking/cancel/'+req.body.id,
      method: 'GET',
      requestedBy: req.user
    }, res);
  }
);

//下载盘点单
router.get("/stock/taking/download",
  auth.requirePermissionAjax('stockTaking:edit'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/stock/taking/download',
      method: 'POST',
      requestedBy: req.user,
      data:req.query
    }, res);
  }
);

//新增盘点单
router.post('/stock/taking/in',
  auth.requirePermissionAjax('stockTaking:edit'),
  function (req, res, next) {
    http_util.pipe('wms', {
      url: '/stock/taking/update',
      method: 'POST',
      data: req.body,
      requestedBy: req.user
    }, res)
  }
);


//上传盘点结果
router.post("/stock/taking/upload",
  auth.requirePermissionAjax('stockTaking:edit'),
  function (req, res, next) {
    http_util.upload('wms', {
      url: '/stock/taking/upload',
      method: 'POST',
      timeout:  1000 * 60,
      requestedBy: req.user
    }, req).pipe(res);
  }
);

//加载takingLines数据
router.get("/stock/taking/lines",
  auth.requirePermissionAjax('stockTaking:edit'),
  function (req, res, next) {
    var takingId = req.query.takingId;
    http_util.pipe('wms', {
      url: '/stock/taking/lines/'+takingId,
      method: 'GET',
      requestedBy: req.user
    }, res);
  }
);


module.exports = router;
