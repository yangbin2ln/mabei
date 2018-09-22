/**
 * 菜单表单窗体
 */
Ext.define('App.sys.system.menu.MenuFormWindow', {
	
	init: function(){
		
		var me = this;
		
		var formWindow = Ext.create('Ins.form.OprFormWindow',{
			fields : [{
				name: 'id',
				xtype: 'ins_hiddenfield'
			},{
				name: 'parentId',
				xtype: 'ins_hiddenfield'
			},{
				name: 'name',
				text: '菜单名称',
				allowBlank: false
			},{
				name: 'type',
				text: '类型',
				allowBlank: false,
				xtype: 'ins_list',
				list: [{
					text: '组',
					value: 1
				},{
					text: '模块',
					value: 2
				}]
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
				name: 'orderIndex',
				text: '排序号',
				xtype: 'ins_numberfield',
				value: 100,
				allowBlank: false,
				colspan: 2
			},{
				name: 'resourcePath',
				maxLength: 256,
				text: '资源'	,
				width: 465,
				colspan: 2
			},{
				name: 'icon',
				text: '图标地址',
				maxLength: 256,
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
		
	}
	
});