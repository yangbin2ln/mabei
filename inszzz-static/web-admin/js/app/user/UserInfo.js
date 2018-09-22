Ext.define('App.user.UserInfo',{

	init: function(){
	
		var me = this;
		
		var view = Ext.create('Ins.form.Form',{
			title: '用户信息',
		    columnSize : 1,
		    defaultFormFieldWidth : 500,
		    textWidth: 500,
		    textAlign: 'top',
		    style : {
				margin : '30px 100px 0px 100px'
			},
		    fields : [{
				name : 'id',
				xtype : 'ins_hiddenfield'
			},{
				text: '姓名',
				xtype : 'ins_textfield',
				readOnly: true,
				name : "name",
				allowBlank: false
			},{
				text: '用户名',
				xtype : 'ins_textfield',
				readOnly: true,
				name : "account",
				allowBlank: false
			},{
				xtype : 'ins_passwordfield',
				name : 'oldPwd',
				text : '旧密码',
				allowBlank : false
			},{
				xtype : 'ins_passwordfield',
				name : 'newPwd',
				text : '新密码',
				allowBlank : false				
			}, {
				xtype : 'ins_passwordfield',
				name : 'newPwdConfirm',
				text : '确认新密码',
				allowBlank : false
			},{
				xtype : 'ins_fieldcontainer',
				style : {
					margin : '20px 0px 0px 5px'
				},
				items:[{
						xtype : 'button',
						text : '保存',
						width: 80,
						style : {
							margin : '15px 0px 0px 0px'
						},
						iconCls : 'icon-ok',
						handler : function() {
							me.submit();
						}
					}]
			}],
			listeners: {
				afterrender: function(obj){
					obj.setValue('name', CURRENT_USER.name);
					obj.getField("name").setFieldStyle({backgroundColor:"#EBEBEB"});
					obj.setValue('account', CURRENT_USER.account);
					obj.getField("account").setFieldStyle({backgroundColor:"#EBEBEB"});					
				}
			}
		});
		
		me.form = view;				
		
		
		return view;
		
		
	},
	
	submit: function(){
		
		var form = this.form;
		
		var flag = form.isValid();
		
		if (flag) {
			var oldPwd = form.getValue('oldPwd');// 通过名字拿值
			var newPwd = form.getValue('newPwd');
			var newPwdConfirm = form.getValue('newPwdConfirm');
			if (newPwd != newPwdConfirm) {
				Message.msg('两次输入的密码不一致', 'WARN');
				return;
			}
			Messager.send({
						url : CTX_PATH + '/system/user/checkOldPwd',
						data : {
							account : CURRENT_USER.account,
							password : oldPwd
						},
						sync: true,
						onSuccess : function(data) {
							if (!data.success) {
								Message.msg('旧密码不正确', 'WARN');
								return;
							}else{
								Messager.send({
									url: CTX_PATH + '/system/user/changePwd',
									confirm: '确认要修改密码吗',
									data: {
										account: CURRENT_USER.account,
										password: newPwd
									},
									onSuccess: function(data){
										if(data.success){
											TopMessage.info('操作成功');										
										}
									}
								});
							}
						}
					});
		}
		
		
	}
	
	
});