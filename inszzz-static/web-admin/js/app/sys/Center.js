/**
 * 系统标签页容器视图
 */
Ext.define('App.sys.Center',{
	
	init: function(){
		
		var me = this;			
		
		var view = Ext.create('Ins.panel.Panel',{
			userAppBg: true,
			border: EXT_STYLE == 'classic' ? '1 1 1 1' : false,
			id: 'sysCenter',			
			views: [App.getView('App.sys.Home')]	
		});
		
		me.view = view;
			
		return view;
		
	}	
	
});

