Ext.define('App.home.View',{

	init: function(){		
		
		var me = this;
		
		var view = Ext.create('Ins.panel.Panel',{
			title: '首页',
			layout: 'center',
			views: [Ext.create('Ext.Component',{
				id : me.getId() + '_img_view',
				colspan : 2,
				style : {
					width : 800+'px',
					height : 533+'px'					
				},
				autoEl : {
					tag : 'img',
					src : CURRENT_STATIC_PATH + '/image/home.jpg'
				}
			})]
		});
	    
	    return view;
	
	}
	
});