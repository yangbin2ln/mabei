/**
 * 操作表单窗体
 */
Ext.define('App.sys.system.menu.OperFormWindow', {
	
	init: function(){
		
		var me = this;
		
		var formWindow = Ext.create('Ins.form.OprFormWindow',{
			fields : [{
				name: 'id',
				xtype: 'ins_hiddenfield'
			},{
				name: 'menuId',
				xtype: 'ins_hiddenfield'
			},{
				name: 'name',
				text: '操作名称',
				allowBlank: false
			},{
				name: 'code',
				text: '编码',
				allowBlank: false,
				maxLength: 64
			},{
				name: 'enabled',
				text: '是否启用',
				allowBlank: false,
				xtype: 'ins_list',
				value: 1,
				list: [{
					text: '启用',
					value: 1
				},{
					text: '禁用',
					value: 0
				}]
			},{
				name: 'allowAuthz',
				text: '允许授权',
				allowBlank: false,
				xtype: 'ins_list',
				value: 1,
				list: [{
					text: '允许',
					value: 1
				},{
					text: '不允许',
					value: 0
				}]
			},{
				name: 'isLog',
				text: '记录日志',
				allowBlank: false,
				xtype: 'ins_list',
				value: 1,
				list: [{
					text: '是',
					value: 1
				},{
					text: '否',
					value: 0
				}]
			},{
				name: 'orderIndex',
				text: '排序号',
				xtype: 'ins_numberfield',
				value: 100,
				allowBlank: false				
			},{
				name: 'resourcePath',
				maxLength: 256,
				text: '资源'	,
				allowBlank: false,
				width: 465,
				colspan: 2
			},{
				text: '备注',
				name: 'remark',
				xtype: 'ins_textareafield',
				width: 465,					
				colspan: 2					
			}],			
			onBeforeHide: function(obj){
				obj.getForm().setValue('id','');
				obj.getForm().reset();
			}
		});
		me.formWindow = formWindow; 
		
		return me.formWindow;
		
	},
	
	checkHasCode: function(code, id){
		
		var has = false;
		
		Messager.send({
			sync: true,
			url: CTX_PATH + '/system/operate/checkHasCode',
			data: {
				code: code,
				id: id
			},
			onSuccess: function(data){
				has = data.has;
			}
		});
		
		return has;
		
	}
	
});