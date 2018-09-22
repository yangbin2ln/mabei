/**
 * 数据字典管理
 */
Ext.define('App.sys.system.dict.DictGrid', {

	init: function(){
	
		var me = this;
		
		var classifyClass = App.getClass('App.sys.system.dict.Classify');
		
		var view = Ext.create('Ins.grid.CrudGrid', {
			title: '数据字典管理',
			disabled: true,
			loadOnShow: false,			
			//权限
			permission : {
				add : App.checkOperateAuthz('SYSTEM_DICT_ADD'),
				update : App.checkOperateAuthz('SYSTEM_DICT_UPDATE'),
				remove : App.checkOperateAuthz('SYSTEM_DICT_DELETE'),
				view: true
			},			
			urlConfig : {				
				loadAll: CTX_PATH + '/system/dict/loadList',
				load: CTX_PATH + '/system/dict/load',
				add: App.getOperate('SYSTEM_DICT_ADD').resource,
				update: App.getOperate('SYSTEM_DICT_UPDATE').resource,
				remove: App.getOperate('SYSTEM_DICT_DELETE').resource
				
			},
			condition: ["name"],
			dataSet: [{
				name: 'id'
			},{
				name: 'name',
				text: '名称'
			},{
				name: 'remark',
				text: '备注'
			},{
				name: 'orderIndex',
				text: '排序号'
			},{
				name: 'classifyId'
			}],
			gridColumns: [{forData: 'name', width: 200},'orderIndex',{forData: 'remark', flex:1}],
			formFields: [{
				forData: 'id',
				xtype: 'ins_hiddenfield'
			},{
				forData: 'classifyId',
				xtype: 'ins_hiddenfield'
			},{
				forData: 'name',
				allowBlank: false
			},{
				forData: 'orderIndex',
				xtype: 'ins_numberfield',
				value: 100,
				allowBlank: false
			},{
				forData: 'remark',
				xtype: 'ins_textareafield',
				width: 465,					
				colspan: 2	
			}],
			//在新增表单展示之前触发的函数
			onBeforeShowAddForm : function(form){
				form.setValue('classifyId', classifyClass.currentOperNode.data.id);
				return true;
			}
			
		});
		me.view = view;
		
		return view;
		
	}
	
});