/**
 * 数据字典管理
 */
Ext.define('App.sys.system.dict.View', {

	init: function(){
		
		var me = this;
	
		var view = Ext.create('Ins.layout.BorderLayout',{
			useAppBg: true,
			bodyPadding: '6 6 6 6',
			location: ['left','center'],			
			views: [
				App.getView('App.sys.system.dict.Classify'),
				App.getView('App.sys.system.dict.DictGrid')				
			],
			fold: [true, false]
		});
		
		me.view = view;
		
		
		return view;
		
	}
	
});