Ext.define('App.sys.system.dict.Classify',{
	
	init: function(){
		
		var me = this;
		
		var view = Ext.create('Ins.list.CrudList',{	
			title: '数据字典分类列表',
			width: 250,
			tplImgUrl: STATIC_PATH + '/common/image/icon/dict.png',
			tplField: 'name',
			//权限
			permission : {
				add : App.checkOperateAuthz('SYSTEM_DICT_CLASSIFY_ADD'),
				update : App.checkOperateAuthz('SYSTEM_DICT_CLASSIFY_UPDATE'),
				remove : App.checkOperateAuthz('SYSTEM_DICT_CLASSIFY_DELETE'),
				view: true
			},			
			urlConfig : {				
				loadAll: CTX_PATH + '/system/dict/classify/loadList',
				load: CTX_PATH + '/system/dict/classify/load',
				add: App.getOperate('SYSTEM_DICT_CLASSIFY_ADD').resource,				
				update: App.getOperate('SYSTEM_DICT_CLASSIFY_UPDATE').resource,
				remove: App.getOperate('SYSTEM_DICT_CLASSIFY_DELETE').resource				
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
					forData : 'remark',
					colspan :2,
					width:460,
					xtype : 'ins_textareafield'
				}],
			onRowClick: function(record){
				var dictGridClass = App.getClass('App.sys.system.dict.DictGrid');
				dictGridClass.view.setDisabled(false);
				dictGridClass.view.setTitle('数据字典管理  ( '+record.data.name+' )');					
				dictGridClass.view.load({
					classifyId: record.data.id
				});
				
				//只有在单击时才设置当前操作的节点,供右侧表格使用
				me.currentOperNode = record;
			},
			onAfterShowCxtMenu: function(){
				var dictGridClass = App.getClass('App.sys.system.dict.DictGrid');
				dictGridClass.view.setDisabled(true);
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
			url: CTX_PATH +　'/system/dict/classify/checkNameAndCode',
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
	}
	
});