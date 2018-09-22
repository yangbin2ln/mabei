/**
 * 角色用户
 */
Ext.define('App.sys.system.role.UserGrid', {	
	
	//加载选择器
	requires: [
		//用户选择器
		'App.common.chooser.UserGridChooserButton'
	],


	init: function(){
		
		var me = this;
			
		var grid = Ext.create('Ins.grid.Grid', {
			url: CTX_PATH + '/system/user/loadList',
			title: '用户',
			loadOnShow: false,			
			fields: ['id','name','account','sex','idCard','phone','companyName','departmentName'],
			condition:{
				fields: [{
					text: '姓名',
					name: 'name'
				},{
					text: '账号',
					name: 'account'
				},{
					name: 'orgName',
					text: '所属机构'
				}]
			},
			gridColumns:[{
				text: '姓名',
				dataIndex: 'name',
				width: 100,
				locked: true
			},{
				text: '账号',
				dataIndex: 'account',
				width: 135
			},{
				text: '性别',
				dataIndex: 'sex',
				width: 50
			},{
				text: '身份证号',
				dataIndex: 'idCard',
				width: 175
			},{
				text: '公司',
				dataIndex: 'companyName',				
				width: 280
			},{
				text: '部门',
				dataIndex: 'departmentName',				
				minWidth: 280,
				flex: 1
			}],			
			actionButtonsSort: [App.getOperate('SYSTEM_ROLE_ADD_USER').name, App.getOperate('SYSTEM_ROLE_DELETE_USER').name,'查询'],
			actionButtons: [{
				text: App.getOperate('SYSTEM_ROLE_ADD_USER').name,
				hidden: !App.checkOperateAuthz('SYSTEM_ROLE_ADD_USER'),
				id: me.getId() + "_add_btn",
				xtype: 'app_usergridchooserbutton',
				loadOnShow: false,				
				onBeforeShowChooser: function(){
					this.getGrid().load({
						notRoleId: App.getClass('App.sys.system.role.RoleList').currentOperNode.data.id
					});
				},
				onSelect: function(selection){
					var roleClass = App.getClass('App.sys.system.role.RoleList');
					Messager.send({
						url: App.getOperate('SYSTEM_ROLE_ADD_USER').resource,
						data: {
							id: roleClass.currentOperNode.data.id,
							SELECT_ITEMS: selection.idSer
						},
						onSuccess: function(){
							TopMessage.info('添加成功');
							grid.load();
						}
					});	
				}
			},{
				text: App.getOperate('SYSTEM_ROLE_DELETE_USER').name,
				hidden: !App.checkOperateAuthz('SYSTEM_ROLE_DELETE_USER'),
				id: me.getId() + "_delete_btn",
				iconCls: 'icon-delete',
				handler: function(){					
					var records = grid.getSelectedView().records;
					if(records.length == 0){
						Message.msg('请选择要删除的用户！', 'WARN');
						return;
					}
					Message.ask("确认要删除角色下的用户吗？", function(select){
						if(select){
							var roleClass = App.getClass('App.sys.system.role.RoleList');
							Messager.send({
								url: App.getOperate('SYSTEM_ROLE_DELETE_USER').resource,
								data: {
									id: roleClass.currentOperNode.data.id,
									SELECT_ITEMS: grid.getSelectedView().idSer
								},
								onSuccess: function(){
									TopMessage.info('删除成功');
									grid.load();
								}
							});
						}							
					});								
				}
			}]
		});
		
		me.grid = grid;
		
		return grid;
		
	},
	
	getGrid: function(){
		return this.grid;
	}
	
});