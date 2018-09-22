/**
 * 角色权限
 */
Ext.define('App.sys.system.role.AuthzGrid', {
	
	init: function(){
	
		var me = this;

		//（菜单权限）
		var grid = Ext.create('Ins.tree.GridTree',{
			title: '菜单权限',			
			searchFiled : true,	
			url: CTX_PATH + '/system/menu/loadRoleTree',
			fields: ['id', 'text', 'pid', 'type', 'orderIndex', 'authzId', 'remark', 'resourcePath','enabled', 'code', 'isLog'],
			gridColumns: [{				
				text: '名称',
				dataIndex: 'text',
				width: 350
				
			},{
				text: '类型',
				dataIndex: 'type',
				width: 60,
				renderer : function(value){				       
			        if(value == 1){
			        	return '组';
			        }else if(value == 2){
			        	return '模块';
			        }else if(value == 3){
			        	return '功能'
			        }
			    }
			},{
				text: '启用/禁用',
				dataIndex: 'enabled',
				width: 80,
				renderer: function(value, v){					
					if(value == 1){
						v.style = App.OK_STYLE;		
						return '启用';
					}else{
						v.style = App.ERROR_STYLE;		
						return '禁用';
					}
					
				}
			},
			/*{
				text: '记录日志',
				dataIndex: 'isLog',
				width: 80,
				renderer: function(value, v, record){	
					if(record.data.type == 'OPERATE'){
						if(value == 'Y'){
							v.style = App.OK_STYLE;		
							return '是';
						}else{
							v.style = App.ERROR_STYLE;	
							return '否';
						}
					}
					
					return '';
				}
			},*/
			{
				text: '备注',
				dataIndex: 'remark',
				minWidth: 330,
				flex: 1
			}],
			actionButtons: [{
				text: App.getOperate('SYSTEM_ROLE_UPDATE_AUTHZ').name,
				hidden: !App.checkOperateAuthz('SYSTEM_ROLE_UPDATE_AUTHZ'),
				id: me.getId() + "_update_btn",
				iconCls: 'icon-ok',
				handler: function(){
					var selection = me.grid.getView().getChecked();		
					//拼接 authzid 序列
					var ids = "[";
					for (var i in selection) {			
						var id = selection[i].data['authzId'];		
						if(id != undefined && id != null){
							ids += "\"" + id + "\",";
						}						
					}
					ids = ids.substring(0, ids.length - 1);
					ids += "]";			
					//如果没有选择任何记录，则 ids 会为 "]"，因此这次需要特别处理
					if (ids == "]") {			
						ids = "[]";
					}
					
					Message.ask("确认要设置权限吗？", function(select){						
						if(select){
							var roleClass = App.getClass('App.sys.system.role.RoleList');
							Messager.send({
								url: App.getOperate('SYSTEM_ROLE_UPDATE_AUTHZ').resource,
								data: {
									id: roleClass.currentOperNode.data.id,
									SELECT_ITEMS: ids
								},
								onSuccess: function(){
									TopMessage.info('设置成功');
									grid.reloadExpand();
								}
							});
						}							
					});		
				}
			},'->',{
				text: '展开',
				glyph: 0xf07c,
				handler: function(){
					me.grid.expandAll();
				}
			},{
				text: '折叠',
				glyph: 0xf07b,
				iconCls: 'icon-arrowin',
				handler: function(){
					me.grid.collapseAll();
				}
			},{
				text: '刷新',
				glyph: 0xf021,
				handler: function(){
					me.grid.reloadExpand();
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