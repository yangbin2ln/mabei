Ext.define('App.main.Center',{	
	
	init: function(){
		var view = 
			Ext.create('Ins.panel.Panel', {
				userAppBg: true,
				id: 'mainCenter',
				border: false
			});
		return view;	
	}
	
});