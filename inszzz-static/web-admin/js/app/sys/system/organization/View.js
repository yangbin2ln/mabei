Ext.define('App.sys.system.organization.View',{

	init: function(){
		
		var view = Ext.create('Ins.layout.BorderLayout',{
			useAppBg: true,
			bodyPadding: '6 6 6 6',
			location: ['left','center'],			
			views: [
				App.getView('App.sys.system.organization.OrgTree'),
				App.getView('App.sys.system.organization.UserGrid')
			],
			fold: [true, false]
		});		
		
	    return view;
		
	}
	
});