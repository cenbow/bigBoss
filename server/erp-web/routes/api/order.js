var express = require('express'),
  auth = require('../../auth'),
  logger = require('../../logger'),
  common_data = require('../../common_data'),
  common_util = require('../../util/common_util'),
  http_util = require('../../util/http_util');

// ------------------------------------------------------------------------
// 订单管理
// ------------------------------------------------------------------------

var router = express.Router();

/*模拟数据：加载收货信息formModel数据*/
router.get('/loadDatas/:id',
  //auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    res.json({
      "tabproductinfogridstore": [{A01:'est',A02:'magnam',A03:'sunt',A04:'officiis',A05:'praesentium',A06:498.76,A07:489.16,A08:451.35,A09:885.56,A10:553.78,A11:774.13,A12:484.35,A13:590.4,A14:492.48,A15:'quia',A16:900,A17:485,A18:'molestiae',A19:'ipsum',A20:'mollitia'},{A01:'recusandae',A02:'et',A03:'debitis',A04:'suscipit',A05:'dolores',A06:60.94,A07:892.47,A08:349.13,A09:69.77,A10:144.86,A11:289.04,A12:356.46,A13:234.2,A14:822.13,A15:'id',A16:170,A17:217,A18:'explicabo',A19:'est',A20:'consequuntur'},{A01:'enim',A02:'porro',A03:'id',A04:'dolorem',A05:'eos',A06:983.81,A07:590.36,A08:80.19,A09:390.37,A10:309.64,A11:380.83,A12:150.4,A13:241.84,A14:598.71,A15:'commodi',A16:777,A17:525,A18:'rem',A19:'esse',A20:'sint'},{A01:'eius',A02:'voluptatibus',A03:'consequatur',A04:'sed',A05:'eos',A06:415.28,A07:865.11,A08:338.43,A09:205.8,A10:276.68,A11:254.3,A12:403.42,A13:856.31,A14:593.01,A15:'rerum',A16:322,A17:717,A18:'nemo',A19:'sequi',A20:'omnis'},{A01:'quasi',A02:'fuga',A03:'quibusdam',A04:'qui',A05:'in',A06:370.32,A07:619.92,A08:360.82,A09:283.56,A10:649,A11:258.3,A12:861,A13:289.06,A14:104.16,A15:'temporibus',A16:101,A17:206,A18:'omnis',A19:'odio',A20:'maxime'}],
      "tabaftersalesgridstore": [{A01:'illum',A02:'ex',A03:'natus',A04:'et',A05:'est',A06:'temporibus',A07:'enim',A08:'ut',A09:'sit',A10:'11/15/2010',A11:'12/15/2004',A12:'quo'},{A01:'qui',A02:'natus',A03:'qui',A04:'atque',A05:'laboriosam',A06:'velit',A07:'ipsa',A08:'mollitia',A09:'ducimus',A10:'3/3/2008',A11:'9/6/2005',A12:'quam'},{A01:'facilis',A02:'rerum',A03:'sit',A04:'vel',A05:'aut',A06:'aut',A07:'nemo',A08:'aliquam',A09:'neque',A10:'1/9/2009',A11:'9/8/2012',A12:'voluptate'},{A01:'facere',A02:'sunt',A03:'necessitatibus',A04:'quae',A05:'voluptatibus',A06:'id',A07:'fugiat',A08:'maiores',A09:'cupiditate',A10:'12/24/2008',A11:'2/27/2001',A12:'officiis'},{A01:'unde',A02:'illum',A03:'enim',A04:'dolor',A05:'cupiditate',A06:'tempora',A07:'minus',A08:'neque',A09:'id',A10:'10/12/2006',A11:'2/9/2006',A12:'eius'},{A01:'consequuntur',A02:'architecto',A03:'sint',A04:'alias',A05:'ea',A06:'quas',A07:'quod',A08:'corporis',A09:'qui',A10:'3/9/2002',A11:'9/7/2006',A12:'voluptate'}],
      "taborderloggridstore": [{A01:'suscipit',A02:'ipsum',A03:'7/27/2004',A04:'saepe',A05:'in'},{A01:'odit',A02:'non',A03:'9/18/2013',A04:'eos',A05:'consequuntur'},{A01:'veniam',A02:'quisquam',A03:'12/17/2008',A04:'temporibus',A05:'dolorem'}],
      "tabreceivegoodsinfoformmodel": {"id":1,"A01":"A011","A02":"A021","A03":"A031","A04":"330000","A05":"331000","A06":"331081","A07":"A071","A08":"A081","A09":"A091","A10":"A101","A11":"A111","A12":"A121"},
      "taborderremarkinfoformmodel": {"id":2,"A01":"A012","A02":"A022","A03":"A032","A04":"A042","A05":"A052","A06":"A062","A07":"A072","A08":"A082","A09":"A092","A10":"A102","A11":"A112","A12":"A122"},
      "tabbasicinfoformmodel": {"id":3,"A01":"A013","A02":"A023","A03":"A033","A04":"A043","A05":"A053","A06":"A063","A07":"A073","A08":"A083","A09":"A093","A10":"A103","A11":"A113","A12":"A123","A13":"A133","A14":"A143","A15":"A153","A16":"A163","A17":"A173","A18":"A183","A19":"A193","A20":"A203","A21":"A213","A22":"A223","A23":"A233","A24":"A243","A25":"A253","A26":"A263","A27":"A273"},
      "tabpaymentinfoformmodel": {"id":4,"A01":"A014","A02":"A024","A03":"A034","A04":1469529069000,"A05":"A054","A06":"A064","A07":"A074","A08":"A084","A09":"A094","A10":"A104","A11":"A114","A12":"A124"}
    });
  });

/**
 * 收货信息保存
 */
router.post('/reveive/goods/save',
  //auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    res.json({
      success: true,
      data: "收货信息保存成功",
      submitInfo: JSON.stringify(req.body)
    });
  });

/**
 * 订单备注信息保存
 */
router.post('/remark/save',
  //auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    res.json({
      success: true,
      data: "订单备注保存成功",
      submitInfo: JSON.stringify(req.body)
    });
  });

/**
 * 支付信息保存
 */
router.post('/payment/save',
  //auth.requirePermissionAjax('productMgmt:view'),
  function (req, res, next) {
    res.json({
      success: true,
      data: "支付信息保存成功",
      submitInfo: JSON.stringify(req.body)
    });
  });

module.exports = router;
