/**
 * 应用程序主视图
 */
Ext.define('App.main.View', {
	extend: 'Ext.container.Viewport',
	
	//加载控制器
	requires: [
		'App.Controller'
	],
	
	border: false,
	
	layout: 'fit',
	
	controller: 'appController',
	
	items: [App.getView('App.main.Layout')],
	
	/**
	 * 跳转到首页
	 */
	redirectHomeView: function(){		
		
		//每次刷新会重新加载用户详细信息		
		if(CURRENT_USER.id != ''){
			Messager.send({
				sync: true,
				url: CTX_PATH + '/login/loadCurrentUserInfo',
				onSuccess: function(responseData){
					CURRENT_USER = responseData.data;					
				}
			});	
		}	
		
		//跳转
		var _locationHash = location.hash;		
		if(App.utils.isEmpty(_locationHash)){
			_locationHash = '#home';
		}
		var _locationHash_f = _locationHash.substring(1);
		//第一次访问不加hash值时Controller中的onHome方法将被执行两次，有问题
		Ext.app.route.Router.onStateChange(_locationHash_f);		
		Ext.util.History.add(_locationHash_f);			
	}
	
});