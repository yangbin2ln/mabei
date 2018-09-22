/**
 * 组织机构树
 */
Ext.define('App.sys.system.organization.OrgTree',{
	
	
	
	init: function(){
				
		var me = this;		
		var view = Ext.create('Ins.tree.CrudTree',{
			width : 360,
			minWidth : 250,	
			searchFiled: true,
			title: '组织机构',	
			permission : {
				add : App.checkOperateAuthz('SYSTEM_ORGANIZATION_ADD'),
				update : App.checkOperateAuthz('SYSTEM_ORGANIZATION_UPDATE'),
				remove : App.checkOperateAuthz('SYSTEM_ORGANIZATION_DELETE'),
				view: true
			},		
			urlConfig : {				
				loadAll: CTX_PATH + '/system/organization/loadTree',
				load: CTX_PATH + '/system/organization/load',
				add: App.getOperate('SYSTEM_ORGANIZATION_ADD').resource,				
				update: App.getOperate('SYSTEM_ORGANIZATION_UPDATE').resource,
				remove: App.getOperate('SYSTEM_ORGANIZATION_DELETE').resource				
			},
			dataSet : [{
				name: 'id',
				text: '主键'
			},{
				name: 'name',
				text: '机构名称'
			},{
				name: 'parentId',
				text: '上级机构'
			},{
				name: 'orderIndex',
				text: '排序号'
			},{
				name: 'isCompany',
				text: '机构性质'				
			},{
				name: 'companyAdmin',
				text: '机构管理员账号'
			},{
				name: 'remark',
				text: '备注'
			}],
			formFields: [{
				forData: 'id',
				xtype: 'ins_hiddenfield'
			},{
				forData: 'parentId',				
				xtype: 'ins_hiddenfield'
			},{
				forData: 'name',
				allowBlank: false,
				maxLength: 64,
				width: 465,	
				colspan: 2
			},{
				forData: 'orderIndex',
				xtype: 'ins_numberfield',
				allowBlank: false,
				colspan: 2,
				value: 100
			},{
				forData: 'isCompany',
				allowBlank: false,
				xtype: 'ins_list',				
				list: [{
					text: '公司',
					value: '1'
				},{
					text: '部门',
					value: '0'
				}],
				onFieldChange: function(obj){
					if(obj.getValue() == 1){						
						obj.nextSibling().setDisabled(false);
					}else{
						obj.nextSibling().setDisabled(true);
					}					
				}
			},{
				forData: 'companyAdmin'	,				
				allowBlank: false,
				disabled: true
			},{
				forData: 'remark',
				xtype: 'ins_textareafield',
				width: 465,					
				colspan: 2					
			}],	
			onBeforeSaveAdd: function(form){
				//检查机构管理员账号是否重复
				var isCompany = form.getValue('isCompany');
				var account = form.getValue('companyAdmin');
				if(isCompany == '1' && account != ''){
					var has = me.checkHasOrgAdmin(account, null);
					if(has){
						TopMessage.warn('系统中已存在该机构管理员账号，请重新设置！');
						return false;					
					}
				}				
				return true;
			},	
			onBeforeSaveEdit: function(form){
				//检查机构管理员账号是否重复
				var isCompany = form.getValue('isCompany');
				var account = form.getValue('companyAdmin');
				var id = form.getValue('id');
				if(isCompany == '1' && account != ''){
					var has = me.checkHasOrgAdmin(account, id);
					if(has){
						TopMessage.warn('系统中已存在该机构管理员账号，请重新设置！');
						return false;					
					}
				}				
				return true;
			},
			onBeforeDelete: function(form){				
				var userGrid = App.getClass('App.sys.system.organization.UserGrid').view;
				userGrid.setDisabled(true);	
				return true;
			},
			onAfterShowAddForm: function(form){				
				form.setValue("parentId", view.getCurrentNode().data.id);				
			},
			onAfterShowEditForm: function(form){
				var isCompany = form.getValue('isCompany');
				var id = form.getValue('id');				
				if(isCompany == '1'){
					Messager.send({
						sync: true,
						url: CTX_PATH + '/system/organization/loadOrgAdmin',
						data: {
							id: id
						},
						onSuccess: function(data){
							if(data.orgAdmin != null){
								form.setValue('companyAdmin', data.orgAdmin.account);
							}							
						}
					});					
					form.getField('companyAdmin').setDisabled(false);
				}else{
					form.getField('companyAdmin').setDisabled(true);
				}	
				form.getField('isCompany').setReadOnly(true);
			},
			onAfterShowViewForm: function(form){
				view.onAfterShowEditForm(form);
			},
			onClick: function(record){
				//console.log(record.getPath());
				var flag = me.isRootNode();	
				var userGrid = App.getClass('App.sys.system.organization.UserGrid').view;
				if(!flag){
					//只有不是公司并且为叶子节点，才能点
					if(record.data.isCompany == '0' && record.childNodes.length == 0){
						userGrid.setTitle('机构用户  ( '+view.getCurrentNode().data.text+' )');
						userGrid.setDisabled(false);
						userGrid.load({
							orgId: view.getCurrentNode().data.id
						});
						//只有在单击时才设置当前操作的节点
						me.currentOperNode = view.getCurrentNode();		
					}else{
						userGrid.setDisabled(true);
					}				
				}else{
					userGrid.setDisabled(true);
				}
										
					
			},
			onBeforeShowCxtMenu: function(){
				var userGrid = App.getClass('App.sys.system.organization.UserGrid').view;
				userGrid.setDisabled(true);	
				
				//顶级机构和自身机构不允许删除和修改
				var org_eidt_btn = App.getCom(me.view.getId() + '_edit_btn');
				var org_delete_btn = App.getCom(me.view.getId() + '_delete_btn');
				if(me.isRootNode()){					
					me.setBtnHidden(org_eidt_btn, true);
					me.setBtnHidden(org_delete_btn, true);					
				}else{	
					//自身机构不允许删除
					if(CURRENT_USER.departmentId == me.view.getCurrentNode().data.id){
						console.log(org_eidt_btn);
						console.log(org_delete_btn);
						me.setBtnHidden(org_eidt_btn, false);
						me.setBtnHidden(org_delete_btn, true);		
					}else{
						me.setBtnHidden(org_eidt_btn, false);
						me.setBtnHidden(org_delete_btn, false);	
					}					
				}
				
				
				
				//类型为部门的节点和没有权限的节点不允许添加
				var children = [];
				Messager.send({
					sync: true,
					url: CTX_PATH + '/system/organization/loadAuthzOrg',
					data:{
						deptId: CURRENT_USER.departmentId
					},
					onSuccess: function(data){
						children = data.children;
					}
				});
				var inChildren = false;
				for(var i=0; i<children.length; i++){
					if(children[i].id == me.view.getCurrentNode().data.id){
						inChildren = true;
					}
				}				
				
				var isCompany = me.view.getCurrentNode().data.isCompany;	
				var org_add_btn = App.getCom(me.view.getId() + '_add_btn');
				if(isCompany != '1' || !inChildren){
					me.setBtnHidden(org_add_btn, true);
				}else{
					me.setBtnHidden(org_add_btn, false);
				}
				
				return true;
			}		
			
		});		
		
		me.view = view;
		
		return view;
		
	},
	
	/**
	 * 检查当前节点是否是最上级节点
	 * @return {Boolean}
	 */
	isRootNode: function(){
		var me = this;
		var record = me.view.getCurrentNode();
		if(record.data.pid==null || record.data.pid=='' ){
			return true;
		}
		return false;
	},
	
	/**
	 * 检查账号是否重复
	 * @param {} form
	*/
	checkHasOrgAdmin: function(account, id){
		var me = this;		
		var has = false;
		Messager.send({
			url: CTX_PATH +　'/system/organization/checkHasOrgAdmin',
			sync: true,
			data: {				
				account: account,
				id: id
			},
			onSuccess: function(data){
				has = data.has;
			}
		});
		return has;
	} ,
	
	setBtnHidden: function(btn, flag){
		if(btn){
			btn.setHidden(flag);
		}
	}
	
	
});