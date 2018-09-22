/**
 * 机构用户
 */
Ext.define('App.sys.system.organization.UserGrid', {
	

	init: function(){
		
		var me = this;
		
		var userChooserButton = Ext.create('Ins.chooser.ChooserGridButton', {
			loadOnShow: false,
			text: App.getOperate('SYSTEM_ORGANIZATION_USER_ADD').name,
			iconCls: 'icon-add',
			hidden: !App.checkOperateAuthz('SYSTEM_ORGANIZATION_USER_ADD'),
			gridUrl: CTX_PATH + '/system/user/loadList',
			fields: ['id','name','account','sex','idCard','phone'],
			condition: {
				fields : [{
					text: '姓名',
					name: 'name'				
				},{
					text: '账号',
					name: 'account'
				}]				
			},
			gridColumns: [{
					text: '姓名',
					dataIndex: 'name',
					width: 120,
					locked: true
				},{
					text: '账号',
					dataIndex: 'account',
					width: 135
				},{
					text: '性别',
					dataIndex: 'sex',
					width: 60
				},{
					text: '身份证号',
					dataIndex: 'idCard',
					minWidth: 175
				},{
					text: '电话',
					dataIndex: 'phone',
					minWidth: 120
				}	
			],			
			onBeforeShowChooser: function(){				
				this.getGrid().load({
					notOrg: 'Y'
				});
				return true;
			},
			onSelect: function(selection){
				var treeClass = App.getClass('App.sys.system.organization.OrgTree');
				Messager.send({
					url: App.getOperate('SYSTEM_ORGANIZATION_USER_ADD').resource,
					data: {
						id: treeClass.currentOperNode.data.id,
						SELECT_ITEMS: selection.idSer
					},
					onSuccess: function(){
						TopMessage.info('添加成功');
						view.load();
					}
				});	
			}
			
		});
		
		var view = Ext.create('Ins.grid.Grid', {
			url: CTX_PATH + '/system/user/loadList',
			title: '机构用户',
			loadOnShow: false,
			disabled: true,
			fields: ['id','name','account','sex','idCard','phone'],
			condition:{
				fields: [{
					text: '姓名',
					name: 'name'
				},{
					text: '账号',
					name: 'account'
				}]
			},
			gridColumns:[{
				text: '姓名',
				dataIndex: 'name',
				width: 120,
				locked: true
			},{
				text: '账号',
				dataIndex: 'account',
				width: 135
			},{
				text: '性别',
				dataIndex: 'sex',
				width: 60
			},{
				text: '身份证号',
				dataIndex: 'idCard',
				width: 175
			},{			
				text: '电话',
				dataIndex: 'phone',				
				minWidth: 120,
				flex: 1
			}],
			actionButtonsSort: [App.getOperate('SYSTEM_ORGANIZATION_USER_ADD').name, App.getOperate('SYSTEM_ORGANIZATION_USER_DELETE').name,'查询'],
			actionButtons: [userChooserButton,{
				text: App.getOperate('SYSTEM_ORGANIZATION_USER_DELETE').name,
				hidden: !App.checkOperateAuthz('SYSTEM_ORGANIZATION_USER_DELETE'),
				iconCls: 'icon-delete',
				handler: function(){					
					var records = view.getSelectedView().records;
					if(records.length == 0){
						Message.msg('请选择要删除的用户！', 'WARN');
						return;
					}
					Message.ask("确认要删除组织机构下的用户吗？", function(select){
						if(select){
							var treeClass = App.getClass('App.sys.system.organization.OrgTree');
							Messager.send({
								url: App.getOperate('SYSTEM_ORGANIZATION_USER_DELETE').resource,
								data: {
									id: treeClass.currentOperNode.data.id,
									SELECT_ITEMS: view.getSelectedView().idSer
								},
								onSuccess: function(){
									TopMessage.info('删除成功');
									view.load();
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