Ext.define('App.sys.system.workflow.View',{
	
	init: function(){
		var me = this;
		
		var processDefListClazz = App.getClass('App.sys.system.workflow.ProcessDefList');
		var designListClazz = App.getClass('App.sys.system.workflow.Design');

		var view = Ext.create('Ins.panel.Panel', {
		    layout: 'card',		   
		    views: [
		    	processDefListClazz.init(),
		    	designListClazz.init()
		    ],
		    onAfterRender: function(){		    	
		    	setTimeout(function(){		    		
			    	//原始标题
			    	me.viewTitle = App.getCom('sysCenter').getTitle();	
		    	}, 50);	
		    	me.setViewByIndex(0);		 
		    }		   
		});
		
		me.view=view;
		return view;
	},
	setViewByIndex: function(index){
		
		var me = this;				
		me.view.getLayout().setActiveItem(index);	
		if(index == 0){
			App.getClass('App.sys.system.workflow.ProcessDefList').view.load();
			setTimeout(function(){		    		
		    	//原始标题
		    	App.getCom('sysCenter').setTitle(me.viewTitle);
	    	}, 200);
		}
	}
});