Ext.define('App.common.chooser.OrgTreeChooserField',{
	extend: 'Ins.chooser.ChooserTreeField',
	xtype: 'app_orgtreechooserfield',
	
	config: {
		
		defaultUrl: CTX_PATH + '/system/organization/loadTree',
		
		chooserWidth: 250
		
	},
	
	initComponent: function(){
	
		var me = this;
		
		if(me.url == undefined || me.url == null){
			me.url = me.defaultUrl;
		}		
		
		me.callParent(arguments);
				
	}
	
});