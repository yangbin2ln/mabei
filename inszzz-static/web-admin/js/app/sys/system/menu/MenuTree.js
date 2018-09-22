/**
 * 树
 */
Ext.define('App.sys.system.menu.MenuTree',{
	
	init: function(){
		
		var me = this;

		var menuFormWindow = App.getView('App.sys.system.menu.MenuFormWindow');
		me.menuFormWindow = menuFormWindow;
		
		var operFormWindow = App.getView('App.sys.system.menu.OperFormWindow');
		me.operFormWindow = operFormWindow;
		
		//（菜单）
		var view = Ext.create('Ins.tree.GridTree',{
			hideTitle : true,
			searchFiled : true,
			url: CTX_PATH + '/system/menu/loadMgtTree',
			//fields: ['id', 'text', 'pid', 'type', 'viewIcon', 'orderIndex', 'authzId', 'remark', 'resourcePath','enabled','code', 'isLog'],
			gridColumns: [{				
				text: '名称',
				dataIndex: 'text',
				width: 360,
				locked: true
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
				text: '图标',
				dataIndex: 'viewIcon',
				width: 60,
				renderer : function(value, v, record){						
			        if(record.data.type == 1 || 
			        	record.data.type == 2){
			        	if(value != null && value != ''){
			        		var imgPath = STATIC_PATH + value;
			        		return "<img src=\""+imgPath+"\" width=\"12\" height=\"12\"/>";
			        	}			        	
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
			},{
				text: '允许授权',
				dataIndex: 'allowAuthz',
				width: 80,
				renderer: function(value, v){					
					if(value == 1){
						v.style = App.OK_STYLE;		
						return '允许';
					}else{
						v.style = App.ERROR_STYLE;	
						return '不允许';
					}
					
				}
			},{
				text: '记录日志',
				dataIndex: 'isLog',
				width: 80,
				renderer: function(value, v, record){	
					if(record.data.type == 3){
						if(value == 1){
							v.style = App.OK_STYLE;		
							return '是';
						}else{
							v.style = App.ERROR_STYLE;	
							return '否';
						}
					}					
					return '';
				}
			},{
				text: '排序号',
				dataIndex: 'orderIndex',
				width: 70
			},{
				text: '编码',
				dataIndex: 'code',
				width: 290
			},{
				text: '资源',
				dataIndex: 'resourcePath',
				width: 300
			},{
				text: '备注',
				dataIndex: 'remark',
				width: 310
			}],
			actionButtons: [{
				xtype: 'component',
				html: '&nbsp;&nbsp;<span style="color:red;text-decoration:underline;">提示：此模块功能仅供系统管理员及开发人员使用！</span>'
			},'->',{
				text: '展开',
				glyph: 0xf07c,
				handler: function(){
					me.view.expandAll();
				}
			},{
				text: '折叠',
				glyph: 0xf07b,
				iconCls: 'icon-arrowin',
				handler: function(){
					me.view.collapseAll();
				}
			},{
				text: '刷新',
				glyph: 0xf021,
				handler: function(){
					me.view.reloadExpand();
				}
			}],
			onContextMenuClick: function(record, e){				
				//取消浏览器默认事件
				App.utils.preventDefault(e);	
				if(me.menu.items.length > 0){
					me.setMenuVisible();
					me.menu.showAt(e.getXY());
				}
			},
			onClick: function(record){
				console.log(record);
			}
			
		});		
		me.view = view;	
		
		
		var menu = Ext.create('Ins.menu.Menu',{
			items : me.getMenu()
		});
		me.menu = menu;
		
	
		
		return view;
		
	},
	
	/**
	 * 销毁事件
	 */
	beforeDestroy: function(){
		
		var me = this;		
		
		Ext.destroy(me.menu);
		Ext.destroy(me.menuFormWindow);
		Ext.destroy(me.operFormWindow);
	},
	
	/**
	 * 获取右键菜单
	 * @return {}
	 */
	getMenu: function(){
		
		var me = this;
		
		
		//组建右键菜单
		var _menu = [];	
		
		if(App.checkOperateAuthz('SYSTEM_MENU_ADD')){
			_menu.push({
				text: App.getOperate('SYSTEM_MENU_ADD').name,
				id: me.getId() + '_add_group',
				iconCls: 'icon-add',
				handler: function(){
					me.menuFormWindow.showAsAddMode({
						title: App.getOperate('SYSTEM_MENU_ADD').name + ' ('+me.view.getCurrentNode().data.text+')',
						url: App.getOperate('SYSTEM_MENU_ADD').resource,		
						onBeforeShow: function(form){							
							form.setValue('parentId', me.view.getCurrentNode().data.id);
						},
						onBeforeSave: function(form){
							return true;
						},	
						success: function(data){
							me.view.reloadExpand();
						}
					});
				}
			});
		}			
		if(App.checkOperateAuthz('SYSTEM_OPERATE_ADD')){
			_menu.push({				
				text: App.getOperate('SYSTEM_OPERATE_ADD').name,
				id: me.getId() + '_add_operate',
				iconCls: 'icon-add',
				handler: function(){
					me.operFormWindow.showAsAddMode({
						title: App.getOperate('SYSTEM_OPERATE_ADD').name + ' ('+me.view.getCurrentNode().data.text+')',
						url: App.getOperate('SYSTEM_OPERATE_ADD').resource,		
						onBeforeShow: function(form){							
							form.setValue('menuId', me.view.getCurrentNode().data.id);
						},
						onBeforeSave: function(form){
							var has = me.operFormWindow.currentClass.checkHasCode(form.getValue('code'));
							if(has){
								TopMessage.warn('编码重复！');
								return false;
							}
							return true;
						},	
						success: function(data){
							me.view.reloadExpand();
						}
					});
				}
			});
		}		
		if(App.checkOperateAuthz('SYSTEM_MENU_OPERATE_UPDATE')){
			_menu.push({				
				text: App.getOperate('SYSTEM_MENU_OPERATE_UPDATE').name,
				id: me.getId() + '_edit_operate',
				iconCls: 'icon-edit',
				handler: function(){
					if(me.view.getCurrentNode().data.type != 3){						
						me.menuFormWindow.showAsEditMode({
							title: App.getOperate('SYSTEM_MENU_OPERATE_UPDATE').name + ' ('+me.view.getCurrentNode().data.text+')',
							loadUrl: CTX_PATH + '/system/menu/load',
							updateUrl: App.getOperate('SYSTEM_MENU_OPERATE_UPDATE').resource[0],
							onBeforeSave: function(form){
								return true;
							},	
							//设为空
							onBeforeShow: null,
							params: {
								id: me.view.getCurrentNode().data.id
							},
							success: function(data){
								me.view.reloadExpand();
							}
						});
					}else{
						me.operFormWindow.showAsEditMode({
							title: App.getOperate('SYSTEM_MENU_OPERATE_UPDATE').name + ' ('+me.view.getCurrentNode().data.text+')',
							loadUrl: CTX_PATH + '/system/operate/load',
							updateUrl: App.getOperate('SYSTEM_MENU_OPERATE_UPDATE').resource[1],
							onBeforeSave: function(form){
								var has = me.operFormWindow.currentClass.checkHasCode(form.getValue('code'), form.getValue('id'));
								if(has){
									TopMessage.warn('编码重复！');
									return false;
								}
								return true;
							},	
							//设为空
							onBeforeShow: null,
							params: {
								id: me.view.getCurrentNode().data.id
							},
							success: function(data){
								me.view.reloadExpand();
							}
						});
					}
					
				}
			});
		}		
		if(App.checkOperateAuthz('SYSTEM_MENU_OPERATE_DELETE')){
			_menu.push({
				text: App.getOperate('SYSTEM_MENU_OPERATE_DELETE').name,
				id: me.getId() + '_delete_operate',
				iconCls: 'icon-delete',
				handler: function(){
					var url = null;
					if(me.view.getCurrentNode().data.type != 3){
						url = App.getOperate('SYSTEM_MENU_OPERATE_DELETE').resource[0];
					}else{
						url = App.getOperate('SYSTEM_MENU_OPERATE_DELETE').resource[1];
					}
					Messager.send({
					  confirm: "确认要删除该节点吗？",					  
					  url: url,
					  data: {
						  id : me.view.getCurrentNode().data.id
					  },
					  onSuccess:function(data){							  	 
						  me.view.reloadExpand();
						  TopMessage.info("操作成功！");
					  }
					});
				}
			});
		}		
		
		return _menu;
		
	},
	
	setMenuVisible: function(){
		
		var me = this;
		
		var type = me.view.getCurrentNode().data.type;
		var id = me.view.getCurrentNode().data.id;
	
		
		//组
		if(type == 1){
			if(id == 'root' || id == 'other_operate_group'){
				me.setBtn(false, false, true, true);
			}else{
				me.setBtn(false, false, false, false);
			}			
		}
		//模块
		else if(type == 2){
			me.setBtn(true, false, false, false);
		}
		//功能操作
		else if(type == 3){
			me.setBtn(true, true, false, false);
		}
		
	},
	
	setBtn: function(flag1, flag2, flag3, flag4){
		var me = this;
		
		var add_group_btn = App.getCom(me.getId() + '_add_group');
		var add_operate_btn = App.getCom(me.getId() + '_add_operate');
		var edit_operate_btn = App.getCom(me.getId() + '_edit_operate');
		var delete_operate_btn = App.getCom(me.getId() + '_delete_operate');
		
		if(add_group_btn){
			add_group_btn.setDisabled(flag1);
		}
		if(add_operate_btn){
			add_operate_btn.setDisabled(flag2);
		}
		if(edit_operate_btn){
			edit_operate_btn.setDisabled(flag3);
		}
		if(delete_operate_btn){
			delete_operate_btn.setDisabled(flag4);
		}		
		
	}
	
});