/**
 * 开启类加载器
 */
Ext.Loader.setConfig({
	enabled: true,
	disableCaching: IS_DEV_MODEL == 'Y'
});

//为解决Ext.create 方法加载模块js时添加自定义版本号。-----------开始
var _extBootFetch=Ext.Boot.fetch;//另存原有方法
Ext.apply(Ext.Boot,{fetch: function(url, complete, scope, async) {
	if (IS_DEV_MODEL != 'Y') {
		if (url.lastIndexOf("?")===-1) {
			url=url+"?_ins="+STATIC_VERSION;
		}else{
			url=url+"&_ins="+STATIC_VERSION;
		}
	}
	//回调原有方法
	_extBootFetch(url, complete, scope, async);
}});
//为解决Ext.create 方法加载模块js时添加自定义版本号。-----------结束

Ext.Loader.setPath({	
	'Ext.ux': STATIC_PATH + '/common/lib/extjs/5.1.1/ux',
	'App': CURRENT_STATIC_PATH + '/js/app'
});
Ext.Loader.scriptCharset = 'utf-8';

Ext.application({
	
	name: 'MyApp',	
	
	extend: 'App.Application',	
	
	main: function(){
		
		var mainView = Ext.create('App.main.View');
		
		mainView.redirectHomeView();
		
	}
	
});