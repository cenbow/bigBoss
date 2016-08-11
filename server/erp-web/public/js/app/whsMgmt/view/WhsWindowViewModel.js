/*
 * File: app/view/WhsWindowViewModel.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('WhsMgmt.view.WhsWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.whswindow',
    requires: [
        'WhsMgmt.store.whsTypeStore',
        'WhsMgmt.store.customsStore',
        'WhsMgmt.store.customsTypeStore',
        'WhsMgmt.store.deliverTypeStore',
        'WhsMgmt.store.extenalPlatformStore',
        'WhsMgmt.store.gainGoodsAreasStore',
        'WhsMgmt.store.provinceStore',
        'WhsMgmt.store.cityStore',
        'WhsMgmt.store.countyStore'
    ],
    data:{
        formData:{},
        whsType: ''
    },
    formulas:{
        isBondedArea : function(get){
            var whsType = get('whsType');
            if('BONDED_AREA' == whsType){
                return true;
            }
            return false;
        },
        isDomestic: function(get){
            var whsType = get('whsType');
            if('DOMESTIC' == whsType){
                return true;
            }
            return false;
        },
        isVistualDist: function(get){
            var whsType = get('whsType');
            if('VIRTUAL_DIST' == whsType){
                return true;
            }
            return false;
        },
        windowHeight: function(get){
            var whsType = get('whsType');
            var height = 290;
            if('BONDED_AREA' == whsType){
               height = 480;
            }else if('DOMESTIC' == whsType || 'VIRTUAL_DIST' == whsType){
                var height = 320;
            }
            return height;
        }
    },
    stores:{
        whstypestore:{
            type: 'whstypestore'
        },
        customsstore:{
            type: 'customsstore'
        },
        customstypestore:{
            type: 'customstypestore'
        },
        delivertypestore: {
            type: 'delivertypestore'
        },
        extenalplatformstore: {
            type: 'extenalplatformstore'
        },
        gaingoodsareasstore:{
            type: 'gaingoodsareasstore'
        },
        provincestore: {
            type: 'provincestore'
        },
        citystore:{
            type: 'citystore'
        } ,
        countystore:{
          type: 'countystore'
        }
}

});