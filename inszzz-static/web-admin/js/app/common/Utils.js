Ext.define('App.common.Utils',{	
	
	previewTitle_zh_CN:'图片预览',
	previewTitle_en_US:'Photo Preview',

	
	/*预览*/
	previewImg: function(filePath,imgWidth,imgHeight,winWidth,winHeight) {
		var me = this;
		if (me.window) {
			Ext.destroy(me.window);
		}
		
		var imgView = null;
		if(Utils.isEmpty(imgWidth) || Utils.isEmpty(imgWidth)){
			imgView = Ext.create('Ext.Component',{
				id : me.getId() + '_img_view',
				colspan : 2,				
				autoEl : {
					tag : 'img',
					src : FILE_PATH + filePath
				}
			});
		}else{
			imgView = Ext.create('Ext.Component',{
				id : me.getId() + '_img_view',
				colspan : 2,
				style : {
					width : imgWidth+'px',
					height : imgHeight+'px'					
				},
				autoEl : {
					tag : 'img',
					src : FILE_PATH + filePath
				}
			});
		}
		
		var window = Ext.create('Ins.window.Window', {
			title: App.getLocaleText(me,'previewTitle'),
			maximizable:true,
			modal: true,
			scrollable: true,
			views: [imgView],			
			closeAction: 'destroy',
			layout:  'center',
			width: Utils.isEmpty(winWidth)?750:winWidth,
			height: Utils.isEmpty(winHeight)?550:winWidth,
			modal: false
		});
		me.window = window;
		me.window.show();
	}

});