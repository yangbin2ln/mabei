/**
 * 菜单访问日志
 */
Ext.define('App.sys.system.log.MenuLog', {

	init : function () {
		
		var me = this;
		
		var view = Ext.create('Ins.grid.Grid',{
			hideTitle: true,
			url: CTX_PATH + '/system/log/loadAll?type=3',
			fields: ['id','createUserName','createTime','account','ip','menuName','departmentName','companyName'],
			condition : {
				fields : [{
					text: '用户名',
					name: 'createUserName'
				},{
					text: '账号',
					name: 'account'
				},{
					text: '菜单模块',
					name: 'menuName'
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
				text: '菜单模块',
				dataIndex: 'menuName',
				width: 160
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
				flex: 1
			}],			
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
									type: '3',
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
									type: '3'
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
		
	}
		
});