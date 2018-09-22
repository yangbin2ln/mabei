/**
 * 行业类别维护
 * */
Ext.define('App.sys.module.tradeClassify.View',{
	requires: [
		'App.common.MultiImgs'
	],
	
	init: function(){
		var me = this;
		var view = Ext.create('Ins.grid.CrudGrid',{
			hideTitle: true,
			//权限
			permission : {
//				add: App.checkCurrentUserOperate('PX_TRADECLASSIFY_ADD'),
//				update: App.checkCurrentUserOperate('PX_TRADECLASSIFY_UPDATE'),
//				remove: App.checkCurrentUserOperate('PX_TRADECLASSIFY_DELETE'),
//				view: App.checkCurrentUserOperate('PX_TRADECLASSIFY_VIEW')
				add: true,
				update: true,
				remove: true,
				view: true
			},
			urlConfig: {
				loadAll: CTX_PATH +'/project/tradeclassify/loadAllGrid',
				add: CTX_PATH + '/project/tradeclassify/add',
				update: CTX_PATH + '/project/tradeclassify/update',
				remove: CTX_PATH + '/project/tradeclassify/delete',
				load: CTX_PATH + '/project/tradeclassify/load'
//				add: App.getOperateResource("PX_TRADECLASSIFY_ADD"),
//				update: App.getOperateResource("PX_TRADECLASSIFY_UPDATE"),
//				remove: App.getOperateResource("PX_TRADECLASSIFY_DELETE"),
//				load: App.getOperateResource("PX_TRADECLASSIFY_VIEW")
			},
			condition: { 
				fields: [{
					text: '行业描述',
					name: 'name'
				}]},
			dataSet: [{
					name : 'id',
					text : ''
				},{
					name : 'name',
					text : '行业描述'
				},{
					name : 'imgPath',
					text : '行业背景图片'
				},{
					name : 'iconPath',
					text : '行业图标图片'
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
					name : 'orderIndex',
					text : '排序号'
				}],
			gridColumns: [{
					forData: 'orderIndex',
					width: 60
				},{
					forData: 'name',
					width: 200
				},{
					forData: 'createUserName',
					width: 120
				},{
					forData: 'createTime',
					width: 160
				},{
					forData: 'updateTime',
					width: 160
				},{
					forData: 'iconPath',
					width: 120
				},{
					forData: 'imgPath',
					minWidth: 120,
					flex: 1
				}],
			formFields: [{
					forData : 'id',
					xtype : 'ins_hiddenfield',
					width: '98%'
				},{
					forData : 'name',
					xtype : 'ins_textfield',
					allowBlank: false,
					colspan:2,
					width: '98%'
				},{
					forData : 'orderIndex',
					xtype : 'ins_numberfield',
					allowBlank: false,
					colspan:2,
					width: '98%'
				},{
					forData : 'imgPath',
					buttonText: '上传图片',
					xtype : 'ins_multiimgsfield',
					colspan:2,
					width: '98%',
					multi: false,
					fileTypeExts:'*.png;*.jpeg;*.jpg',
					rtype: 'img',
					allowBlank: false,
					width: '98%'
				},{
					forData : 'iconPath',
					xtype : 'ins_multiimgsfield',
					colspan:2,
					width: '98%',
					multi: false,
					fileTypeExts:'*.png;*.jpeg;*.jpg',
					rtype: 'img',
					allowBlank: false,
					width: '98%'
				}],
			valueMapper:{
				imgPath: function(val, v, record, index){
					var src = FILE_PATH + val;
					var html = '';
					html += "<img onclick=\"App.getClass('App.common.Utils').previewImg('"+val+"')\" style='cursor:pointer;height:50px;' src = "+src+">"
					return html;
				},
				iconPath: function(val, v, record, index){ 
					var src = FILE_PATH + val;
					var html = '';
					html += "<img onclick=\"App.getClass('App.common.Utils').previewImg('"+val+"')\" style='cursor:pointer;height:50px;' src = "+src+">"
					return html;
				},
			}
		});
		return view;
	}
});