Ext.define('App.sys.system.role.RoleList',{
	
	init: function(){
		
		var me = this;
		
		var tabpanelClass = App.getClass('App.sys.system.role.View');				
		var userGridClass = App.getClass('App.sys.system.role.UserGrid');
		var authzGridClass = App.getClass('App.sys.system.role.AuthzGrid');
		var dataAuthzGridClass = App.getClass('App.sys.system.role.DataAuthzGrid');
		
		var user_add_btn = App.getCom(userGridClass.getId()+'_add_btn');
		var user_delete_btn = App.getCom(userGridClass.getId()+'_delete_btn');
		var authz_update_btn = App.getCom(authzGridClass.getId()+'_update_btn');
		
		var view = Ext.create('Ins.list.CrudList',{	
			title: '角色列表',
			width: 250,
			//权限
			permission : {
				add : App.checkOperateAuthz('SYSTEM_ROLE_ADD'),
				update : App.checkOperateAuthz('SYSTEM_ROLE_UPDATE'),
				remove : App.checkOperateAuthz('SYSTEM_ROLE_DELETE'),
				view: true
			},			
			urlConfig : {				
				loadAll: CTX_PATH + '/system/role/loadList',
				load: CTX_PATH + '/system/role/load',
				add: App.getOperate('SYSTEM_ROLE_ADD').resource,				
				update: App.getOperate('SYSTEM_ROLE_UPDATE').resource,
				remove: App.getOperate('SYSTEM_ROLE_DELETE').resource				
			},
			dataSet: [{
					name : 'id',
					text : 'id'
				},{
					name : 'name',
					text : '名称'
				},{
					name : 'code',
					text : '编码'
				},{
					name : 'remark',
					text : '备注'
				},{
					name: 'orderIndex',
					text: '排序号'
				},{
					name: 'allowAuthz',
					text: '非超级管理员可见'
				}],
			formFields: [{
					forData : 'id',
					xtype : 'ins_hiddenfield'
				},{
					forData : 'name',
					xtype : 'ins_textfield',
					allowBlank: false
				},{
					forData : 'code',
					xtype : 'ins_textfield',
					allowBlank: false
				},{
					forData: 'orderIndex',
					xtype: 'ins_numberfield',
					value: 100,
					allowBlank: false
				},{
					forData: 'allowAuthz',
					xtype: 'ins_list',	
					value: '1',
					list: [{
						text: '允许',
						value: '1'
					},{
						text: '不允许',
						value: '0'
					}]
				},{
					forData : 'remark',
					colspan :2,
					width:460,
					xtype : 'ins_textareafield'
				}],
			onRowClick: function(record){
				tabpanelClass.tabpanel.setDisabled(false);
					
				userGridClass.getGrid().setTitle('用户  ( '+record.data.name+' )');					
				userGridClass.getGrid().load({
					roleId: record.data.id
				});	
				
				authzGridClass.getGrid().setTitle('菜单权限 ( '+record.data.name+' )');
				authzGridClass.getGrid().load({
					roleId: record.data.id					
				});	
				authzGridClass.getGrid().clearSelect();
				
				dataAuthzGridClass.getGrid().setTitle('数据权限 ( '+record.data.name+' )');
				dataAuthzGridClass.getGrid().load({
					roleId: record.data.id					
				});	
				dataAuthzGridClass.getGrid().clearSelect();
			
				tabpanelClass.tabpanel.selectTabByIndex(1);
				tabpanelClass.tabpanel.selectTabByIndex(0);
				
				if(me.checkRoleTypeIsDefault(record) || me.checkRoleTypeIsOrgAdmin(record)){					
					me.setBtnHidden(user_add_btn, true);
					me.setBtnHidden(user_delete_btn, true);
					me.setBtnHidden(authz_update_btn, !App.checkOperateAuthz('SYSTEM_ROLE_UPDATE_AUTHZ'));	
				}else if(me.checkRoleTypeIsSysAdmin(record)){					
					me.setBtnHidden(user_add_btn, !App.checkOperateAuthz('SYSTEM_ROLE_ADD_USER'));
					me.setBtnHidden(user_delete_btn, !App.checkOperateAuthz('SYSTEM_ROLE_DELETE_USER'));
					me.setBtnHidden(authz_update_btn, true);
				}else{					
					me.setBtnHidden(user_add_btn, !App.checkOperateAuthz('SYSTEM_ROLE_ADD_USER'));
					me.setBtnHidden(user_delete_btn, !App.checkOperateAuthz('SYSTEM_ROLE_DELETE_USER'));
					me.setBtnHidden(authz_update_btn, !App.checkOperateAuthz('SYSTEM_ROLE_UPDATE_AUTHZ'));
				}
				
				//只有在单击时才设置当前操作的节点,供右侧表格使用
				me.currentOperNode = record;
			},
			onAfterShowCxtMenu: function(){
				//将右边设为不可用.........					
				tabpanelClass.tabpanel.setDisabled(true);
				//判断当前节点的是否为默认角色、超级管理员、机构管理员
				var flag = me.checkRoleTypeIsSys(me.view.currentRecord);
				var list_delete_btn = App.getCom(me.view.getId() + "_delete_btn");
				var list_edit_btn = App.getCom(me.view.getId() + "_edit_btn");
				if(flag){
					me.setBtnHidden(list_delete_btn, true);
					me.setBtnHidden(list_edit_btn, true);
				}else{
					me.setBtnHidden(list_delete_btn, false);
					me.setBtnHidden(list_edit_btn, false);
				}				
			},
			onBeforeSaveAdd: function(form){
				return me.checkNameAndCode(form, 'add');
			},
			onBeforeSaveEdit: function(form){
				return me.checkNameAndCode(form, 'update');
			}

		});
		
		me.view = view;
		return view;
	},
	
	
	/**
	 * 检查名称或编码是否重复
	 * @param {} form
	 */
	checkNameAndCode: function(form, type){
		var me = this;
		var name = form.getValue('name');
		var code = form.getValue('code');
		var id = '';		
		if(type === 'update'){			
			id = me.view.getCurrentRecord().data.id;
		}
		var has = false;
		Messager.send({
			url: CTX_PATH +　'/system/role/checkNameAndCode',
			sync: true,
			data: {
				name:　name,
				code: code,
				id: id
			},
			onSuccess: function(data){
				has = data.has;
			}
		});
		if(has){
			TopMessage.warn("名称或编码重复，请重新设置！");
			return false;
		}
		return true;
	},
	
	/**
	 * 检查是否为默认角色或超级管理管或机构管理员
	*/
	checkRoleTypeIsSys: function(record){
		if(this.checkRoleTypeIsDefault(record)){
			return true;
		}
		if(this.checkRoleTypeIsSysAdmin(record)){
			return true;
		}
		if(this.checkRoleTypeIsOrgAdmin(record)){
			return true;
		}
		return false;
	},
	
	checkRoleTypeIsDefault: function(record){
		if(record.data.id == 'def'){
			return true;
		}
		return false;
	},
	checkRoleTypeIsSysAdmin: function(record){
		if(record.data.id == 'sysadmin'){
			return true;
		}
		return false;
	},
	checkRoleTypeIsOrgAdmin: function(record){
		if(record.data.id == 'orgadmin'){
			return true;
		}
		return false;
	},
	
	setBtnHidden: function(btn, flag){
		if(btn){
			btn.setHidden(flag);
		}
	}
	
});