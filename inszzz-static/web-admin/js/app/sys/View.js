Ext.define('App.sys.View',{

	init: function(){		
		
		var view = Ext.create('Ins.layout.BorderLayout',{
			location: ['left','center'],			
			views: [
				App.getView('App.sys.Left'),
				App.getView('App.sys.Center')				
			],
			fold: [true, false]
		});
		
		this.view = view;
		
		return view;		
	
	}
	
});