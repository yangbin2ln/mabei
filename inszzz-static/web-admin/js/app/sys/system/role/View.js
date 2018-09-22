/**
 * 角色管理
 */
Ext.define('App.sys.system.role.View', {

	init: function(){
	
		
		var me = this;
		
		var tabpanel = Ext.create('Ins.layout.tab.TabLayout',{
			disabled: true,
			xtype: 'ins_tablayout',			
			views: [
				App.getView('App.sys.system.role.UserGrid'),
				App.getView('App.sys.system.role.AuthzGrid'),
				App.getView('App.sys.system.role.DataAuthzGrid')
			],
			direction: 'top'
		});
		me.tabpanel = tabpanel;
		
		
		
		var view = Ext.create('Ins.layout.BorderLayout',{			
			useAppBg: true,
			bodyPadding: '6 6 6 6',
			location: ['left','center'],			
			views: [
				App.getView('App.sys.system.role.RoleList'),
				tabpanel
				
			],
			fold: [true, false]
		});
		
		
		return view;
	
	}
	
});