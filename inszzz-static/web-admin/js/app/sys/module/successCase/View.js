/**
 * 成功案例
 * */
Ext.define('App.sys.module.successCase.View',{
	
	requires: [
		'App.common.MultiImgs'
	],
	
	init: function(){
		var me = this;
		var view = Ext.create('Ins.grid.CrudGrid',{
			hideTitle: true,
			formWindowWidth: 750,
			//权限
			permission : {
//				add: App.checkCurrentUserOperate('PX_SUCCESSCASE_ADD'),
//				update: App.checkCurrentUserOperate('PX_SUCCESSCASE_UPDATE'),
//				remove: App.checkCurrentUserOperate('PX_SUCCESSCASE_DELETE'),
//				view: App.checkCurrentUserOperate('PX_SUCCESSCASE_VIEW')
				add: true,
				update: true,
				remove: true,
				view: true
			},
			urlConfig: {
				loadAll: CTX_PATH +'/project/successcase/loadAllGrid',
				add: CTX_PATH + '/project/successcase/add',
				update: CTX_PATH + '/project/successcase/update',
				remove: CTX_PATH + '/project/successcase/delete',
				load: CTX_PATH + '/project/successcase/load'
//				add: App.getOperateResource("PX_SUCCESSCASE_ADD"),
//				update: App.getOperateResource("PX_SUCCESSCASE_UPDATE"),
//				remove: App.getOperateResource("PX_SUCCESSCASE_DELETE"),
//				load: App.getOperateResource("PX_SUCCESSCASE_VIEW")
			},
			actionButtons:[{
				text: '发布',
				hidden: false,
				iconCls: 'icon-export',
				handler: function(){
					var records = view.getSelectedView().records;

					if(records.length == 0){
						Message.msg("请至少选择一条数据", 'WARN');
						return;
					}
					Message.ask('确定要发布吗？', function(flag){
						if(flag){
							Messager.send({
								url: CTX_PATH + '/project/successcase/publish/1',
								data: {
									'SELECT_ITEMS': view.getSelectedView().idSer
								},
								onSuccess: function(res){
									view.load();
									TopMessage.info('发布成功');
								}
							})
						}
					});
					 					
				}
			},{
				text: '撤销发布',
				hidden: false,
				iconCls: 'icon-back',
				handler: function(){
					var records = view.getSelectedView().records;

					if(records.length == 0){
						Message.msg("请至少选择一条数据", 'WARN');
						return;
					}
					Message.ask('确定要撤销发布吗？', function(flag){
						if(flag){
							Messager.send({
								url: CTX_PATH + '/project/successcase/publish/0',
								data: {
									'SELECT_ITEMS': view.getSelectedView().idSer
								},
								onSuccess: function(res){
									view.load();
									TopMessage.info('撤销成功');
								}
							})
						}
					});
					 					
				}
			}],
			condition: { 
				fields: [{
					text: '标题',
					name: 'title'
				},{
					text: '行业类别',
					name: 'tradeClassifyId',
					xtype: 'ins_dynamiclist',
					url: CTX_PATH + '/project/tradeclassify/loadAllList'
				},{
					text: '发布状态',
					name: 'state',
					xtype: 'ins_list',
					list: [{text: '已发布', value: 1},{text: '未发布', value: 0}]
				}]},
			dataSet: [{
					name : 'id',
					text : ''
				},{
					name : 'title',
					text : '标题'
				},{
					name : 'imgPath',
					text : '背景图'
				},{
					name : 'content',
					text : '案例详情'
				},{
					name : 'createUserName',
					text : '创建人'
				},{
					name : 'createTime',
					text : '创建时间'
				},{
					name : 'updateTime',
					text : '更新时间'
				},{
					name: 'tradeClassifyId',
					text: '行业类别'
				},{
					name: 'tradeClassifyName',
					text: '行业类别'
				},{
					name: 'state',
					text: '发布状态'
				}],
			gridColumns: [{
					forData: 'title',
					width: 120
				},{
					forData: 'state',
					width: 120
				},{
					forData: 'tradeClassifyName',
					width: 150
				},{
					forData: 'imgPath',
					width: 120
				},{
					forData: 'createUserName',
					width: 120
				},{
					forData: 'content',
					minWidth: 120,
					flex: 1
				},{
					forData: 'createTime',
					width: 160
				},{
					forData: 'updateTime',
					width: 160
				}],
			formFields: [{
					forData : 'id',
					xtype : 'ins_hiddenfield',
					width: '98%'
				},{
					forData : 'tradeClassifyId',
					xtype: 'ins_dynamiclist',
					url: CTX_PATH + '/project/tradeclassify/loadAllList',
					allowBlank: false,
					width: '98%'
				},{
					forData : 'title',
					xtype : 'ins_textfield',
					allowBlank: false,
					width: '98%'
				},{
					name : 'imgPath',
					text : '背景图片',
					buttonText: '上传图片',
					xtype : 'ins_multiimgsfield',
					colspan:2,
					width: '98%',
					multi: true,
					fileTypeExts:'*.png;*.jpeg;*.jpg',
					rtype: 'img',
					allowBlank: false
				},{
					forData : 'content',
					xtype : 'ins_htmleditor',
					colspan:2,
					height: 380,
					ueheight: 490,
//					allowBlank: false,
					width: '99%'
				}],
			valueMapper:{
				content: function(val, v, record, index){ 
					return val.replace(/<.*?>/g,'');	 
				},
				state: function(val, v, record, index){ 
					if(val == '1'){
						v.style = App.OK_STYLE;
						return '已发布';
					}else{
						v.style = App.ERROR_STYLE;
						return '未发布';
					}
				},
				imgPath: function(val, v, record, index){
					var src = FILE_PATH + val;
					var html = '';
					html += "<img onclick=\"App.getClass('App.common.Utils').previewImg('"+val+"')\" style='cursor:pointer;height:20px;' src = "+src+">"
					return html;
				},
			}
		});
		return view;
	}
});