Ext.define('App.sys.system.dataauthz.View',{
	
	init: function(){
		var me = this;
		
		var levelList = [{
							text: '自己',
							value: '1'
						},{
							text: '部门',
							value: '2'
						},{
							text: '公司',
							value: '3'
						},{
							text: '所有',
							value: '4'
						}];
						
		var plugin = new Ext.grid.plugin.CellEditing({
	                clicksToEdit: 1,
	                listeners: {
	                	beforeedit: function( editor, context, eOpts ){
	                		if(context.record.data.isEdit == '0'){
	                			return false;
	                		}	                		
	                	},
	                	edit: function( editor, context, eOpts ){
	                		if(context.record.data.isEdit == '1'){
	                			Messager.send({
		                			url: CTX_PATH + '/system/dataauthz/updateLevel',
		                			data: {
		                				id: context.record.data.id,
		                				level: context.record.data.defaultLevel
		                			},
		                			onSuccess: function(){
		                				TopMessage.info('更新默认级别成功！');
		                				me.view.load();
		                			}
		                		});
	                		}	                		
	                	}
	                }
	            });				
		
		var view = Ext.create('Ins.grid.CrudGrid',{
			plugins: plugin,
			hideTitle: true,
			hidePagingBar: true,
			checkable: App.checkOperateAuthz('SYSTEM_DATA_AUTHZ_MGT_CHECKABLE'),
			showActionColumn: App.checkOperateAuthz('SYSTEM_DATA_AUTHZ_MGT_ACTIONCOLUMN'),
			urlConfig: {
				loadAll: CTX_PATH +'/system/dataauthz/loadList',
				add: App.getOperate('SYSTEM_DATA_AUTHZ_MGT_ADD').resource,
				update: App.getOperate('SYSTEM_DATA_AUTHZ_MGT_UPDATE').resource,
				remove: App.getOperate('SYSTEM_DATA_AUTHZ_MGT_DELETE').resource,
				load: CTX_PATH + '/system/dataauthz/load'
			},	
			//权限
			permission : {
				add : App.checkOperateAuthz('SYSTEM_DATA_AUTHZ_MGT_ADD'),
				update : App.checkOperateAuthz('SYSTEM_DATA_AUTHZ_MGT_UPDATE'),
				remove : App.checkOperateAuthz('SYSTEM_DATA_AUTHZ_MGT_DELETE'),
				view: true
			},	
			dataSet: [{
					name : 'id',
					text : ''
				},{
					name : 'name',
					text : '权限名称'
				},{
					name : 'code',
					text : '唯一编码'
				},{
					name : 'defaultLevel',
					text : '默认级别'
				},{
					name: 'isEdit',
					text: '可修改级别'
				},{
					name : 'orderIndex',
					text : '排序号'
				},{
					name: 'remark',
					text: '备注'
				}],
			gridColumns: [{
					forData: 'name',
					width: 150					
				},{
					forData: 'code',
					width: 300
				},
				/*{
					forData: 'isEdit',
					width: 120
				},*/
				{
					forData: 'defaultLevel',
					width: 110,
					editor: {
						xtype : 'ins_list',
						allowBlank: false,
						list: levelList
					}
				},{
					forData: 'orderIndex',
					width: 100
				},{
					forData: 'remark',
					flex: 1
				}],
//				onRowClick: function(record, index, e){
//					console.log(record);
//				},
			formFields: [{
					forData : 'id',
					xtype : 'ins_hiddenfield',
					allowBlank: false
				},{
					forData: 'name',
					xtype: 'ins_textfield',
					allowBlank: false
				},{
					forData : 'code',
					xtype : 'ins_textfield',
					allowBlank: false
				},{
					forData : 'defaultLevel',
					xtype : 'ins_list',
					allowBlank: false,
					list: levelList
					
				},{
					forData: 'isEdit',
					xtype : 'ins_list',
					allowBlank: false,
					list: [{
						text: '是',
						value:　'1'
					},{
						text: '否',
						value: '0'
					}]
				},{
					forData : 'orderIndex',
					xtype : 'ins_numberfield',
					allowBlank: false,
					value: 100,
					colspan: 2
				},{
					forData: 'remark',
					xtype: 'ins_textareafield',
					width: 465,					
					colspan: 2					
				}],
				valueMapper: {					
					defaultLevel: function(val, v, record, index){						
						if(record.data.isEdit == '0'){
							v.style = App.ERROR_STYLE;
						}
						if(val == '1'){
							return '自己';
						}
						if(val == '2'){
							return '部门';
						}
						if(val == '3'){
							return '公司';
						}
						if(val == '4'){
							return '全部';
						}
						return val;
					}
				},
				actionButtons: [{
					xtype: 'component',
					html: '&nbsp;&nbsp;<span style="color:red;text-decoration:underline;">提示：此模块功能仅供系统管理员及开发人员使用！</span>'
				}]				
		});
		me.view=view;
		return view;
	}
});