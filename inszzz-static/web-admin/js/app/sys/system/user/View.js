Ext.define('App.sys.system.user.View', {
	
	//加载选择器
	requires: [
		//机构选择器
		'App.common.chooser.OrgTreeChooserField'
	],

	init: function(){
		
		var me = this;
	
		var view = Ext.create('Ins.grid.CrudGrid',{
			
			hideTitle: true,
			//权限
			permission : {
				add : App.checkOperateAuthz('SYSTEM_USER_ADD'),
				update : App.checkOperateAuthz('SYSTEM_USER_UPDATE'),
				remove : App.checkOperateAuthz('SYSTEM_USER_DELETE'),
				view: true
			},			
			urlConfig : {				
				loadAll: CTX_PATH + '/system/user/loadList',
				load: CTX_PATH + '/system/user/load',
				add: App.getOperate('SYSTEM_USER_ADD').resource,				
				update: App.getOperate('SYSTEM_USER_UPDATE').resource,
				remove: App.getOperate('SYSTEM_USER_DELETE').resource				
			},
			condition:['name','account',{
				name: 'enabled',
				text: '启用/禁用',
				xtype: 'ins_list',			
				list: [{
					text: '启用',
					value: '1'
				},{
					text: '禁用',
					value: '0'
				}]
			},{
				name: 'orgName',
				text: '所属机构'
			}],
			dataSet: [{
					name : 'id',
		    		text : '主键'
				},{
					name: 'name',
					text: '姓名'
				},{
					name: 'account',
					text: '账号'
				},{
					name: 'idCard',
					text: '身份证号'
				},{
					name: 'sex',
					text: '性别'
				},{
					name: 'birthday',
					text: '生日'
				},{
					name: 'phone',
					text: '联系电话'
				},{
					name: 'remark',
					text: '备注'
				},{
					name: 'enabled',
					text: '启用/禁用'
				},{
					name: 'companyName',
					text: '公司'
				},{
					name: 'departmentName',
					text: '部门'
				}],
				gridColumns: [{
					text: '基本信息', 
					columns: [{
						forData:'name',width:100
					},{
						forData:'account',width:135
					},{
						forData:'sex',width:50
					},{
						forData:'birthday',width:120
					},{
						forData:'idCard',width:175
					}]
				},{
					forData:'phone',width:125
				},{
					forData:'enabled',width:80
				},{
					forData: 'companyName',width:280
				},{
					forData: 'departmentName',width:280
				},{
					forData: 'remark',width:320
				}],
				columnSize: 3,
				formWindowWidth: 768,
				//formWindowHeight: 575,
				formWindowHeight: 480,
				formFields: [{
					forData: 'id',
					xtype: 'ins_hiddenfield'		
				},{
					name: 'departmentId',
					xtype: 'ins_hiddenfield'
				},{
					forData: 'name',				
					allowBlank: false
				},{
					forData: 'account',				
					allowBlank: false
				},{
					forData: 'idCard',
					regex: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
					regexText: '身份证号不合法'
				},{
					forData: 'sex',
					xtype: 'ins_list',
					list : [{
						text: '男',
						value: '1'
					},{
						text: '女',
						value: '2'
					}],
					value: '1',
					allowBlank: false
				},{
					forData: 'birthday',	
					xtype: 'ins_datefield'
				},{
					forData: 'phone'
				},{
					forData: 'enabled',
					xtype: 'ins_list',
					list : [{
						text: '启用',
						value: '1'
					},{
						text: '禁用',
						value: '0'
					}],
					value: '1',
					allowBlank: false				
				},{
					xtype: 'app_orgtreechooserfield',	
					chooserWidth: 350,
					text: '部门',
					name: 'departmentName',
					allowBlank: false,
					colspan: 2,
					onBeforeSelect: function(record){
						if(record.data.isCompany == '1' || record.childNodes.length > 0){
							TopMessage.warn('不能选择公司，只能选择部门！,并且只能选择叶子节点！');
							return false;
						}
						return true;
					},
					onSelect: function(record){
						view.getForm().getField('departmentId').setValue(record.data.id);
						view.getForm().getField('departmentName').setValue(record.data.text);
					}
				},{
					forData: 'remark',
					xtype: 'ins_textareafield',
					//width: 460,
					width: 590,
					height: 140,
					colspan: 3
				}],
				valueMapper: {					
					enabled: function(val, v, record, index) {		
						if(val == '1'){
							v.style = App.OK_STYLE;
							return '启用';
						}else{
							v.style = App.ERROR_STYLE;
							return '禁用';
						}
					}
//					,
//					sex: function(val, v, record, index) {	
//						if(val == '2'){
//							return '女';
//						}else{
//							return '男';
//						}
//					}
				},
				showSelCheck: function(record, index){
					if(record.data.account == 'admin' || record.data.account == CURRENT_USER.account){
						return false;
					}
					return true;
				},
				onBeforeSaveAdd: function(form){
					var account = form.getField('account').getValue();
					return me.checkAccount(account, null);
				},
				onBeforeSaveEdit: function(form){
					var account = form.getField('account').getValue();
					var id = form.getField('id').getValue();
					return me.checkAccount(account, id);
				},
				actionButtons:[{
					text: App.getOperate('SYSTEM_USER_RESET_PWD').name,
					hidden: !App.checkOperateAuthz('SYSTEM_USER_RESET_PWD'),
					iconCls: 'icon-key',
					handler: function(){
						var records = view.getSelectedView().records;
						
						if(records.length == 0){
							Message.msg("请选择需要重置密码的用户！", 'WARN');
							return;
						}
						
						Message.ask("确认要重置密码吗？", function(flag){
							if(flag){
								Messager.send({
									url: App.getOperate('SYSTEM_USER_RESET_PWD').resource,
									data: {
										SELECT_ITEMS: view.getSelectedView().idSer
									},
									onSuccess: function(){
										TopMessage.info("重置密码成功！");
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
	
	/**
	 * ajax
	 * @param {} account
	 * @param {} id
	 * @return {Boolean}
	 */
	checkAccount: function(account, id){		
		var has = false;
		Messager.send({
			url: CTX_PATH + '/system/user/checkHasAccount',
			data: {
				account: account,
				id: id
			},
			sync: true,
			onSuccess: function(data){
				has = data.has;							
			}
		});					
		if(has){
			TopMessage.warn("账号重复，请重新设置！");
			return false;
		}
		return true;
	}
	
});