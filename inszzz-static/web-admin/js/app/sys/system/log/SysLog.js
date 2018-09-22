/**
 * 系统操作日志
 */
Ext.define('App.sys.system.log.SysLog', {	
	

	init : function () {
		
		var me = this;
		
		var view = Ext.create('Ins.grid.Grid',{
			hideTitle: true,
			url: CTX_PATH + '/system/log/loadAll?type=1',
			fields: ['id','createUserName','createTime','account','ip','menuName','operateName','execTimemillis','params','departmentName','companyName'],
			condition : {
				fields : [{
					text: '模块',
					name: 'menuName'
				},{
					text: '功能',
					name: 'operateName'
				},{
					text: '用户名',
					name: 'createUserName'
				},{
					text: '账号',
					name: 'account'
				},{
					text: '机构',
					name: 'orgName'
				}]				
			},	
			gridColumns: [{
				text: '时间',
				dataIndex: 'createTime',
				width: 160
			},{
				text: '模块',
				dataIndex: 'menuName',
				width: 160
			},{
				text: '功能',
				dataIndex: 'operateName',
				width: 160
			},{
				text: '耗时(毫秒)',
				dataIndex: 'execTimemillis',	
				width: 90
			},{
				text: 'IP地址',
				dataIndex: 'ip',
				width: 130
			},{
				text: '用户名',
				dataIndex: 'createUserName',
				width: 100
			},{
				text: '账号',
				dataIndex: 'account',
				width: 100
			},{
				text: '公司',
				dataIndex: 'companyName',
				width: 250
			},{
				text: '部门',
				dataIndex: 'departmentName',
				width: 250
			},{
				text: '参数',
				dataIndex: 'params',
				flex: 1
			}],
			valueMapper: {
				params: function(value, v, record, index){
					return "<a href='javascript:App.getClass(\"App.sys.system.log.SysLog\").viewParams(\""+record.data.id+"\")' style='color:blue'>[参数明细]</a>";	
				}
			},
			actionButtonsSort: ['删除日志','清空日志','查询'],
			actionButtons: [{
				text: App.getOperate('SYSTEM_LOG_DELETE').name,
				hidden: !App.checkOperateAuthz('SYSTEM_LOG_DELETE'),
				iconCls: 'icon-delete',
				handler: function(){
					if(view.getSelectedView().records.length == 0){
						Message.msg("请选择要删除的日志！", "WARN");
						return;
					}
					Message.ask("确认要删除所选的日志吗？", function(flag){
						if(flag){
							var idSer = view.getSelectedView().idSer;					
							Messager.send({
								url: App.getOperate('SYSTEM_LOG_DELETE').resource,
								data: {
									type: '1',
									SELECT_ITEMS: idSer
								},
								onSuccess: function(){
									view.load();
									TopMessage.info("删除成功！");
								}
							});
						}
					});					
				}
			},{
				text: App.getOperate('SYSTEM_LOG_CLEAR').name,
				hidden: !App.checkOperateAuthz('SYSTEM_LOG_CLEAR'),
				iconCls: 'icon-clear',
				handler: function(){
					Message.ask("该操作会清空所有的日志，确认要执行操作吗？", function(flag){	
						if(flag){
							
							var loadMask = new Ext.LoadMask({
								msg: "正在执行清空操作，请稍后...",
								target: view,
								border: false
							});
							
							loadMask.show();
							
							Messager.send({
								url: App.getOperate('SYSTEM_LOG_CLEAR').resource,
								data: {
									type: '1'
								},
								onSuccess: function(){									
									Ext.destroy(loadMask);
									view.load();
									TopMessage.info("清空日志成功！");
								}
							});
						}
					});
				}
			}]
			
		});
		
		me.view = view;
		
		return view;
		
	},
	
	viewParams: function(id){
		
		var me = this;
		
		var record = me.view.getStore().findRecord("id", id);
		
		Ext.create('Ins.window.Window',{
			title: '参数明细',
			width: 450,
			height: 500,
			closeAction : 'destroy',
			modal: true,
			maximizable: true,
			views:[{scrollable: true,html: record.data.params, bodyPadding: 10}]
		}).show();
		
	}
	
		
});