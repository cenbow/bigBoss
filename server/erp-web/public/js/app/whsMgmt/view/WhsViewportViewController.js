Ext.define('WhsMgmt.view.WhsViewportViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.whsviewport',

    treeInit: function(component, eOpts) {
        var viewCtr = this;
        Ext.defer(function() {
            var vm = viewCtr.getViewModel();
            var view = viewCtr.getView();
            var treeStore = component.getStore();
            var rootNode = treeStore.getNodeById('root');
            rootNode.expand(false, function() {
                component.getSelectionModel().select(1);
            });
        }, 1);

        //whsTree.getStore().load({
        //    callback: function(records, operation, success){
        //        //component.getSelectionModel().selectRange(1,1,true);
        //        console.info(records)
        //        component.getSelectionModel().select(0);
        //    }
        //})
       //component.getSelectionModel().selectRange(1,1,true);

    },
    treeAdd: function(button, e, eOpts){
        var modeldata = this.getViewModel().getData();
        var rootSelected = modeldata.rootSelected;
        if(rootSelected){
            this._addWhs(button, e, eOpts);
        }else{
            this._addWhsArea(button, e, eOpts);
        }
    },
    _addWhs: function(button, e, eOpts) {
        var winCmp = Ext.create('WhsMgmt.view.WhsWindow');
        var vm = winCmp.getViewModel();
        vm.getStore('provincestore').load();
        vm.set('formData.pickAreaId',1);
        vm.set('formData.returnAreaId',6);
        winCmp.show();


    },
    _addWhsArea: function(button, e, eOpts) {
        var treeNode = this.lookupReference("whsTree").getSelectionModel().getSelection()[0];
        var treeNodeId = treeNode.get('dbId');
        var pid = treeNode.get('pid');
        var type = treeNode.get('type');
        var windowCop = Ext.create('WhsMgmt.view.WhsAreaWindow').show();
        var form = windowCop.lookupReference('areaform').getForm();
        var whsId = form.findField('whsId');
        if('stock' == type){
            whsId.setValue(treeNodeId);
        }else{
            whsId.setValue(pid);
        }
    },
    treeUpdate: function(button, e, eOpts){
        var modeldata = this.getViewModel().getData();
        var stockSelected = modeldata.stockSelected;
        if(stockSelected){
            this._updateWhs(button, e, eOpts);
        }else{
            this._updateWhsArea(button, e, eOpts);
        }
    },
    _updateWhs: function(button, e, eOpts) {
        var _this = this;
        var treeNode = this.lookupReference("whsTree").getSelectionModel().getSelection()[0];
        if(!treeNode){
            TipsUtil.showTips('提示', "请选择要编辑的仓库" , 'info');
            return;
        }
        var treeNodeId = treeNode.data.dbId;
        if(treeNode.data.type === "area") {
            treeNodeId = treeNode.parentNode.data.dbId;
        }
        if(treeNodeId) {
            var windowCop = Ext.create('WhsMgmt.view.WhsWindow');
            var windowViewModel = windowCop.getViewModel();
            windowViewModel.set("formData", {'id':treeNodeId});

            var form = windowCop.lookupReference('form').getForm();
            form.load({
                url: '/api/inventory/warehouse/view/' + treeNodeId,
                method: 'post',
                success: function (form,action) {
                    _this._initWhs(windowCop,action.result.data);
                    windowViewModel.set('formData',action.result.data);
                    windowCop.show();
                }
            });
        }

    },
    _updateWhsArea: function(button, e, eOpts) {
        var treeNode = this.lookupReference("whsTree").getSelectionModel().getSelection()[0];
        if(!treeNode){
            TipsUtil.showTips('提示', "请选择要编辑的库区" , 'info');
            return;
        }
        var treeNodeId = treeNode.data.dbId;
        if(treeNodeId) {
            var windowComp = Ext.create('WhsMgmt.view.WhsAreaWindow');
            var windwoViewModel = windowComp.getViewModel();
            windwoViewModel.set("formData", {'id':treeNodeId});

            var form = windowComp.down('form').getForm();
            form.load({
                url: '/api/inventory/warehouse/area/view/' + treeNodeId,
                method: 'post',
                success: function (form,json) {
                    windwoViewModel.set('formData',json.result.data);
                    windowComp.show();
                }
            });
        }

    },
    treeDelete: function(button, e, eOpts){
        var modeldata = this.getViewModel().getData();
        var stockSelected = modeldata.stockSelected;
        if(stockSelected){
            this._deleteWhs(button, e, eOpts);
        }else{
            this._deleteWhsArea(button, e, eOpts);
        }
    },
    _initWhs: function(windowCop,data){
        var whsId =data.id;
        var cityId = data.cityId;
        var provinceId = data.provinceId;
        var districtId = data.districtId;
        var pickAreaId = data.pickAreaId;
        var returnAreaId = data.returnAreaId;
        var whsType = data.type;
        var deliverType = data.deliverType;

        var vm = windowCop.getViewModel();
        vm.getStore('provincestore').load();
        this._loadStore(vm,'gaingoodsareasstore',{
            id: whsId,isDeleted:'N'
        });
        this._loadStore(vm,'citystore',{
            parentId:provinceId
        });
        this._loadStore(vm,'countystore',{
            parentId:cityId
        })
        vm.set('whsType',whsType);
    },
    _loadStore: function(vm,storeName,extraParmas,cb){
        var store = vm.getStore(storeName);
        store.getProxy().setExtraParams(extraParmas);
        if(typeof cb === 'function'){
            store.load(cb);
        }else{
            store.load();
        }

    },
    selectNode: function(rowmoel, record, index, eOpts){
        var type = record.get('type');
        var nodeId = record.get('dbId');
        var viewmodel = this.getViewModel();
        switch (type){
            case 'root':
                viewmodel.set('rootSelected', true);
                viewmodel.set('stockSelected', false);
                viewmodel.set('areaSelected',false);
                break;
            case 'stock':
                viewmodel.set('rootSelected',false);
                viewmodel.set('stockSelected',true);
                viewmodel.set('areaSelected', false);
                break;
            case 'area':
                viewmodel.set('rootSelected',false);
                viewmodel.set('stockSelected',false);
                viewmodel.set('areaSelected',true);
                break;
        }
        var whsId = '';
        if(type == 'root'){
            whsId = this._getWhsTreeStockNode(record);
        }else{
            whsId = nodeId;
        }
        viewmodel.set('searchOpts.whsId',whsId);
        viewmodel.set('searchOpts.whsType',type);
        this.search();
    },
    _getWhsTreeStockNode: function(record){
        var childNodes = record.childNodes;
        var whsId = [];
        Ext.each(childNodes, function(childNode){
            whsId.push(childNode.get('dbId'));
        });
        return whsId;
    },
    _deleteWhs: function(button, e, eOpts) {
        var whsTreeCmp = this.lookupReference("whsTree");
        var treeNode = whsTreeCmp.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm('提示', '确认删除【'+treeNode.data.text+'】吗？',function(option){
            if(option === 'yes'){
                Ext.Ajax.request({
                    url:'/api/inventory/warehouse/delete/'+treeNode.data.dbId,
                    method: 'POST',
                    success: function (response, options) {
                        var resopnseText = response.responseText;
                        var responseObj = JSON.parse(resopnseText);
                        if(responseObj.error){
                            TipsUtil.showTips('提示',responseObj.error.message);
                        }else{
                            Ext.getStore("treeStore").load();
                            whsTreeCmp.getSelectionModel().selectRange(1,1,true);
                        }

                    }
                })
            }
        })
    },
    _deleteWhsArea: function(button, e, eOpts) {
        var whsTreeCmp = this.lookupReference("whsTree");
        var treeNode = whsTreeCmp.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm('提示', '确认删除【'+treeNode.data.text+'】吗？',function(option){
            if(option === 'yes'){
                Ext.Ajax.request({
                    url:'/api/inventory/warehouse/area/delete/'+treeNode.data.dbId,
                    method: 'POST',
                    success: function (response, options) {
                        var resopnseText = response.responseText;
                        var responseObj = JSON.parse(resopnseText);
                        if(responseObj.error){
                            TipsUtil.showTips('提示',responseObj.error.message);
                        }else{
                            Ext.getStore("treeStore").load();
                            whsTreeCmp.getSelectionModel().selectRange(1,1,true);
                        }
                    }
                })
            }
        });
    },
    rigthKeyMenu: function(dataview, record, item, index, e, eOpts) {
        e.preventDefault();
        e.stopEvent();

        var whsType = record.data.type;
        if(whsType === "stock") {
            var nodemenu = new Ext.menu.Menu({
                floating:true,
                items:[{
                    text:'增加库区',
                    bind:{
                        disabled:'{editPermission}'
                    },
                    handler:function(){
                        var treeNode = Ext.getCmp("whsTree").getSelectionModel().getSelection()[0];
                        var treeNodeId = treeNode.data.dbId;
                        var windowCop = Ext.create('WhsMgmt.view.WhsAreaWindow').show();
                        var form = windowCop.lookupReference('areaform').getForm();
                        var whsId = form.findField('whsId');
                        whsId.setValue(treeNodeId);
                    }
                }]

            });
            nodemenu.showAt(e.getXY());
        }
    },

    reCycle: function(button, e, eOpts) {
        Ext.create('WhsMgmt.view.RecycleWindow').show();
    },

    exportExcel: function(button, e, eOpts) {
       var vm = this.getViewModel();
       var treePanel =  this.getView().down('treepanel');
       var selectionModel = treePanel.getSelectionModel();
       var selectedNode = selectionModel.getSelection()[0];
       var nodeId =selectedNode .get('dbId');
       var type =  selectedNode.get('type');
       var name =  selectedNode.get('text');
       var url = '/api/inventory/warehouse/stock/export/csv-.html?';
       var params = [];
       switch(type){
           case  'root':
               var rootNode = treePanel.getRootNode();
               var whsId = this._getWhsTreeStockNode(rootNode);
               params = [];
               for(i=0;i<whsId.length;i++){
                   params.push( 'whsId[' +i+ ']='+ whsId[i]);
               }
               params.push('whsName=所有')
               break;
           case  'stock':
               params = []
               params.push('whsId=' + nodeId);
               params.push('whsName=' + name);
               break;
           case  'area':
               var parentNode = selectedNode.parentNode;
               var whsId = parentNode.get('dbId');
               var whsName = parentNode.get('text');
               params = []
               params.push('whsId=' + whsId);
               params.push('whsName=' + whsName);
               params.push('areaId=' + nodeId);
               params.push('whsAreaName=' + name);
               url = '/api/inventory/warehouse/area/stock/export/csv-.html?';
               break;
       }
        var searchOpts = vm.get('searchOpts');
        for(pro in  searchOpts){
            if('whsId' !== pro && 'whsAreaId' !== pro ){
                params.push(pro + '=' + searchOpts[pro]);
            }
        }
       url = url + params.join('&');
       window.location.href = url;
    },

    //node会超时
    exportExcelAll: function(button, e, eOpts) {
        var _this = this;
        var treePanel =  this.getView().down('treepanel');
        var rootNode = treePanel.getRootNode();
        var childNodes = rootNode.childNodes;

        Ext.each(childNodes, function(node,index){
            var url = '/api/inventory/warehouse/stock/export/csv-.html?';
            var params = [];
            params.push('whsId=' + node.get('dbId'));
            params.push('whsName=' + node.get('text'));
            url = url + params.join('&');
            var view = _this.getView();
            var viewEl = view.getEl();
            var downloadIframe = viewEl.getById('download_'+index);
            if(!downloadIframe){
                var downloadIframeHtml = "<iframe id='download_"+index+"' style='display:none' />"
                Ext.DomHelper.append(viewEl,downloadIframeHtml)
                downloadIframe =viewEl.getById('download_'+index);
            }
            downloadIframe.dom.src = url;
            Ext.defer('',1);
        })

    },
    enterSearch:  function(field, e, options){
        var viewCtr = this;
        if (e.getKey() === e.ENTER) {
            viewCtr.search();
        }
    },
    reset: function(button, e) {
        var view = this.getView();
        var form = view.down('form').getForm();
        var treeCombobox = view.queryById('category');
        treeCombobox.setValue('');
        form.reset();
        this.search();
    },
    search: function() {
        var vm = this.getViewModel();
        var searchOpts = vm.get('searchOpts');
        var gridStore = vm.getStore('gridstore');

        var whsType = searchOpts.whsType;
        var url ='';
        var extraParams = {};
        var rootProperty = '';
        var totalProperty = '';
        if(whsType !== 'area'){
            url =  '/api/inventory/warehouse/stock/filter';
            rootProperty = 'data.whsStockPage.result';
            totalProperty = 'data.whsStockPage.totalCount';
        }else{
            url =  '/api/inventory/warehouse/area/stock/filter';
            rootProperty = 'data.whsAreaStockPage.result';
            totalProperty = 'data.whsAreaStockPage.totalCount';
        }
        var proxy = {
            type: 'ajax',
                url:  url,
                extraParams: searchOpts,
                reader: {
                type: 'json',
                    rootProperty: rootProperty,
                    totalProperty: totalProperty
            }
        }
        gridStore.setProxy(proxy);
        gridStore.load({
            callback: function(records, operation, success){
                if(!success) return;
                var response = operation.getResponse();
                var responseData = JSON.parse(response.responseText);
                vm.set('totalQuantity',responseData.data.totalQuantity?responseData.data.totalQuantity:0);
                vm.set('totalSaleStock',responseData.data.totalSaleStock?responseData.data.totalSaleStock:0);
                vm.set('totalAvailable',responseData.data.totalAvailable?responseData.data.totalAvailable:0);
                vm.set('totalStockValue',responseData.data.totalStockValue?responseData.data.totalStockValue:0);

        }});
    }

});
