Ext.define('App.sys.system.role.DataAuthzGrid', {
	
	init: function(){
	
		var me = this;
		
		var grid = Ext.create('Ins.grid.Grid',{
			url: CTX_PATH + '/system/dataauthz/loadList',
			title: '数据权限',
			loadOnShow: false,		
			fields: ['id','name','code','defaultLevel','roleLevel'],
			gridColumns: [{
				text: '名称',
				dataIndex: 'name',
				width: 150					
			},{
				text: '编码',
				dataIndex: 'code',
				width: 280
			},{
				text: '默认级别',
				dataIndex: 'defaultLevel',
				width: 110					
			},{
				text: '角色级别',
				dataIndex: 'roleLevel',
				flex: 1
			}],
			valueMapper: {
				defaultLevel: function(val){
					if(val == '1'){
						return '自己';
					}else if(val == '2'){
						return '部门';
					}else if(val == '3'){
						return '公司';
					}else if(val == '4'){
						return '全部'
					}else{
						return val;
					}
				},
				roleLevel: function(val){
					if(val == null || val == ''){
						return '未设置'
					}else{
						if(val == '1'){
						return '自己';
						}else if(val == '2'){
							return '部门';
						}else if(val == '3'){
							return '公司';
						}else if(val == '4'){
							return '全部'
						}else{
							return val;
						}
					}
				}
			},
			actionButtons: [{
				text: '默认',
				icon: STATIC_PATH + '/common/image/icon/bluestyle.png',
				handler: function(){
					me.setRoleLevel(0);
				}
			},{
				text: '自己',
				icon: STATIC_PATH + '/common/image/icon/user.png',
				handler: function(){
					me.setRoleLevel(1);
				}
			},{
				text: '部门',
				icon: STATIC_PATH + '/common/image/icon/dept1.png',
				handler: function(){
					me.setRoleLevel(2);
				}
			},{
				text: '公司',
				icon: STATIC_PATH + '/common/image/icon/company1.png',
				handler: function(){
					me.setRoleLevel(3);
				}
			},{
				text: '全部',
				icon: STATIC_PATH + '/common/image/icon/application_view_tile.png',
				handler: function(){
					me.setRoleLevel(4);
				}
			}]
		});

		me.grid = grid;
		
		return grid;
	},
	
	getGrid: function(){
		return this.grid;
	},
	
	setRoleLevel: function(level){
		var grid = this.grid;
		var records = grid.getSelectedView().records;
		if(records.length == 0){
			Message.msg('请选择要设置的数据权限！', 'WARN');
			return;
		}
		var roleClass = App.getClass('App.sys.system.role.RoleList');
		Messager.send({
			url: App.getOperate('SYSTEM_ROLE_UPDATE_DATA_AUTHZ').resource,
			data: {
				id: roleClass.currentOperNode.data.id,
				level: level,
				SELECT_ITEMS: grid.getSelectedView().idSer
			},
			onSuccess: function(){
				TopMessage.info('设置成功');
				grid.load();
			}
		});
	}
	
	
	
});