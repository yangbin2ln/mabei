/**
 * 流程定义列表
 */
Ext.define('App.sys.system.workflow.ProcessDefList',{
	init: function(){
		var me = this;
		var viewClazz = App.getClass('App.sys.system.workflow.View');
		me.viewClazz = viewClazz;
		var view = Ext.create('Ins.grid.CrudGrid',{
			hideTitle: true,
			urlConfig: {
				loadAll: CTX_PATH +'/workflow/process/def/loadList'
			},
			permission : {
				add : false,
				update : false,
				remove : false,
				view: false
			},
			actionButtons: [
				{
					iconCls: 'icon-add',
					text: '新建流程',
					handler: function() { 
//						window.open(CTX_PATH + '/workflow/edit/getDesign/modeler.html')
						me.createDesign();
					}	
				},
				{
					iconCls: 'icon-export',
					text: '上传流程',
					handler: function() { 
						me.upload();
					}	
				},
				{
					iconCls: 'icon-delete',
					text: '删除',
					handler: function() {
						var selection = me.view.getSelectedView();		
						if(selection.count == 0){						
							Message.msg('请至少选择一条需要删除记录！', 'WARN');
							return;
						}
						var deployIds = [];
						for(var i=0;i<selection.records.length;i++){
							deployIds[i] = selection.records[i].data.deploymentId_;
						}
						
						Messager.send({
						  confirm: "确认要删除选定的这 <span style='font-size:25px;color:red'>" + selection.count + "</span> 条记录吗？",
						  url: CTX_PATH + '/workflow/process/def/delete',
						  data: {
							  SELECT_ITEMS : JSON.stringify(deployIds)
						  },
						  onSuccess:function(data){							  	 
							  me.view.load();
							  TopMessage.info("操作成功！");
						  }
						});
					}	
				}
			],
			condition: { 
			fields: [{
				text: '流程名称',
				name: 'name_'
			},{
				text: '流程key',
				name: 'key_'
			},{
				text: '流程版本',
				name: 'version_'
			}]},
			dataSet: [{
					name : 'id_',
					text : ''
				},{
					name : 'rev_',
					text : ''
				},{
					name : 'category_',
					text : ''
				},{
					text: '流程名称',
					name: 'name_'
				},{
					text: '流程标示',
					name: 'key_'
				},{
					text: '流程版本',
					name: 'version_'
				},{
					text: '流程id',
					name: 'deploymentId_'
				},{
					text: '流程xml名称',
					name: 'resourceName_'
				},{
					text: '流程图片',
					name: 'dgrmResourceName_'
				},{
					text: '描述',
					name: 'description_'
				},{
					text: '是否有启动form表单值',
					name: 'hasStartFormKey_'
				},{
					text: '是否暂停',
					name: 'suspensionState_'
				},{
					name : 'tenantId_',
					text : ''
				},{
					text: '操作',
					name: 'editFlow'
				},{
					text: '启动流程',
					name: 'start'
				}],
			gridColumns: [{
					forData: 'key_',
					width: 180
				},{
					forData: 'version_',
					width: 120
				},{
					forData: 'name_',
					width: 180
				},{
					forData: 'description_',
					width: 200
				},{
					forData: 'resourceName_',
					width: 200
				},{
					forData: 'dgrmResourceName_',
					width: 200
				},{
					forData: 'editFlow',
					width: 200
				},{
					forData: 'start',
					width: 200
				}],
			valueMapper:{
				dgrmResourceName_: function(val, v, record, index){
					return '<a style="text-decoration:underline;color:blue;display:block;"'+
					 	   'href = "javascript:App.getClass(\'App.sys.system.workflow.ProcessDefList\').previewImg(\''+record.data.id_+'\',\'' + val + '\')">查看流程图</a>';
				},
				editFlow: function(val, v, record, index){
					return '<a style="text-decoration:underline;color:blue;display:block;"'+
				 	   'href = "javascript:App.getClass(\'App.sys.system.workflow.ProcessDefList\').editFlow(\''+record.data.id_+'\',\'' + record.data.resourceName_ + '\')">编辑流程</a>';
				},
				resourceName_: function(val, v, record, index){
					return '<a style="text-decoration:underline;color:blue;display:block;"'+
				 	   'href = "javascript:App.getClass(\'App.sys.system.workflow.ProcessDefList\').getXML(\''+record.data.id_+'\',\'' + val + '\')">查看XML</a>';
				},
				start: function(val, v, record, index){
					return '<a style="text-decoration:underline;color:blue;display:block;"'+
					'href = "javascript:App.getClass(\'App.sys.system.workflow.ProcessDefList\').start(\''+record.data.key_+'\')">启动流程</a>';
				}
			}
		});
		me.view = view;
		return view;
	},
	//启动流程（通过流程标示）
	start: function(key){
		App.getClass('App.sys.system.workflow.Util').getStartForm({processDefinitionKey:key});
	},
	/*预览*/
	previewImg: function(pdid,resourceName,imgWidth,imgHeight,winWidth,winHeight) {
		var me = this;
		
		
		if (me.window) {
			Ext.destroy(me.window);
		}
		
		var src = CTX_PATH + '/workflow/process/def/read-resource?pdid=' + pdid + "&resourceName=" + resourceName;
		var window = Ext.create('Ins.window.Window', {
			title: '流程图',
			maximizable:true,
			modal: true,
			scrollable: true,
//			views: [imgView],			
			html:'<img style="margin:0 auto;display:block;" src="'+src+'">',
			closeAction: 'destroy',
			layout:  'center',
			width: Utils.isEmpty(winWidth)?750:winWidth,
			height: Utils.isEmpty(winHeight)?550:winWidth
		});
		me.window = window;
		me.window.show();
	},
	getXML: function(pdid,resourceName,imgWidth,imgHeight,winWidth,winHeight){
		var src = CTX_PATH + '/workflow/process/def/read-resource?pdid=' + pdid + "&resourceName=" + resourceName;
		window.open(src);
	},
	/**编辑当前流程*/
	editFlow: function(procDefId,resourceName){
//		window.open(CTX_PATH + '/workflow/edit/getDesign/modeler.html?procDefId=' + procDefId);
		var me = this;
		me.createDesign(procDefId);
	},
	upload: function(){
		var form = Ext.create('Ins.form.Form', {
			columnSize : 1,
			fields : [{
				name: 'file',
				text: '文件',
				allowBlank: false,
				regex: /\.(xml|bpmn)$/i,
				xtype: "ins_filefield",
				width: 450,
				width: '100%',
				colspan: 2,
				onFieldChange: function() {
				}
			}],
			actionButtons : [{
				text : '上传',
				iconCls : 'icon-ok',
				handler : function() { 
					form.submit({
						url: CTX_PATH + '/workflow/process/def/upload',
						success: function() { 
							win.close();
							App.getClass('App.sys.system.workflow.ProcessDefList').view.load();
							}
						});
				}
			}]
		});
		
		var win = Ext.create('Ins.window.Window',{
            title: '上传流程文件',
            closeAction:"destroy",
            views : [form],
            width: 390,
        	height: 190
        });
        win.show();
	},
	createDesign: function(procDefId){
		App.getClass('App.sys.system.workflow.View').view.getLayout().setActiveItem(App.getClass('App.sys.system.workflow.Design').init(procDefId))
		App.getClass('App.sys.system.workflow.View').view.getLayout().owner.items.items.splice(2);
		setTimeout(function(){		
			App.getCom('sysCenter').setTitle("流程设计");
		},100);	
	}
})