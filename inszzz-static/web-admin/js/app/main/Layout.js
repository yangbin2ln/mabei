Ext.define('App.main.Layout',{
	
	init: function(){
		
		var view = Ext.create('Ins.layout.BorderLayout',{
			location: ['top','center', 'bottom'],			
			views: [
				App.getView('App.main.Header'),				
				App.getView('App.main.Center'),
				App.getView('App.main.Bottom')
			],
			fold: [false, false, false]
		});
		
		return view;		
		
	}	
	
});
