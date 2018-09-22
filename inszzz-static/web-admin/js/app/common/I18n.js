Ext.define('App.common.I18n',{
	
	field_city_zh_CN: '城市',
	field_city_en_US: 'City',
	field_area_zh_CN: '区域',
	field_area_en_US: 'Area',	
	
	field_name_zh_CN: '名称',
	field_name_en_US: 'Name',
	
	field_state_zh_CN: '状态',
	field_state_en_US: 'State',
	
	field_userName_zh_CN: '姓名',
	field_userName_en_US: 'User Name',
	
	field_createUserName_zh_CN: '创建人',
	field_createUserName_en_US: 'Create User',
	
	field_createTime_zh_CN: '创建时间',
	field_createTime_en_US: 'Create Time',
	
	field_updateUserName_zh_CN: '更新人',
	field_updateUserName_en_US: 'Update User',
	
	field_updateTime_zh_CN: '更新时间',
	field_updateTime_en_US: 'Update Time',
	
	field_remark_zh_CN:　'备注',
	field_remark_en_US: 'Remark',
	
	field_image_zh_CN: '图片',
	field_image_en_US: 'Image',
	
	field_photo_zh_CN: '照片',
	field_photo_en_US: 'Photo',
	
	field_sortNumber_zh_CN: '排序号',
	field_sortNumber_en_US: 'Sort Number',
	
	field_taxName_zh_CN: '税名',
	field_taxName_en_US: 'Taxation Name',
	
	field_taxRate_zh_CN: '税率(%)',
	field_taxRate_en_US: 'Taxation Rate(%)',
	
	field_inventory_zh_CN: '库存',
	field_inventory_en_US: 'Inventory',	
	
	field_taxation_zh_CN: '征税',
	field_taxation_en_US: 'Taxation',
	
	field_price_zh_CN: '价格',
	field_price_en_US: 'Price', 
	
	field_enabled_zh_CN: '是否启用',
	field_enabled_en_US: 'Enabled',
	
	field_shop_zh_CN: '商铺',
	field_shop_en_US: 'Shop',
		
	field_goods_zh_CN: '商品',
	field_goods_en_US: 'Goods',
	
		
	btn_add_zh_CN: '添加',
	btn_add_en_US: 'Add',
	btn_edit_zh_CN: '编辑',
	btn_edit_en_US: 'Edit',
	btn_view_zh_CN: '查看明细',
	btn_view_en_US: 'View',
	btn_delete_zh_CN: '删除',
	btn_delete_en_US: 'Delete',
	btn_search_zh_CN: '查询',
	btn_search_en_US: 'Search',
	btn_ok_zh_CN: '确认选择',
	btn_ok_en_US: 'OK',
	btn_list_zh_CN: '列表',
	btn_list_en_US: 'List',	
	btn_back_zh_CN: '返回',
	btn_back_en_US: 'Go Back',
	btn_save_zh_CN: '保存',
	btn_save_en_US: 'Save',
	btn_reset_zh_CN: '重置',
	btn_reset_en_US: 'Reset',
	btn_cancel_zh_CN: '取消',
	btn_cancel_en_US: 'Cancel',
	btn_clearCelection_zh_CN: '清空选择',
	btn_clearCelection_en_US: 'Clear Celection',
	btn_refresh_zh_CN:'刷新',
	btn_refresh_en_US:'Refresh',
	
	msg_gridDelete_zh_CN: '请至少选择一条记录',
	msg_gridDelete_en_US: 'Please select at least one record',
	msg_gridDeleteAsk_zh_CN: '确定要删除吗？',
	msg_gridDeleteAsk_en_US: 'Are you sure you want to delete it?',
	
	msg_oper_zh_CN:'操作成功',
	msg_oper_en_US:'Successful operation',
	
	msg_upload_zh_CN: '正在上传，请稍后...',
	msg_upload_en_US: 'Uploading, please wait...',
	
	msg_upload_allowBlank_zh_CN: '上传文件不能为空',
	msg_upload_allowBlank_en_US: 'The upload file is required',
		
	msg_adtype_allowBlank_zh_CN: '请选择商铺/商品',
	msg_adtype_allowBlank_en_US: 'Please Choose Shop/Goods',
		
	common_list_boolean_zh_CN: [{
		text: '是',
		value: '1'
	},{
		text: '否',
		value: '0'
	}],	
	common_list_boolean_en_US: [{
		text: 'Yes',
		value: '1'
	},{
		text: 'No',
		value: '0'
	}],
	
	getImageRemind: function(width, height){		
		if(LOCALE == 'zh_CN'){
			return "<span style='color:blue;'>推荐图片大小为，宽度："+width+" 像素；高度："+height+" 像素<span>"			
		}else{
			return "<span style='color:blue;'>Recommended Image size is, WIDTH: "+width+"px; HEIGHT: "+height+"px<span>"			
		}		
	}
	
});