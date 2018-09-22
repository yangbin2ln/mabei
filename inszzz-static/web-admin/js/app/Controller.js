/**
 * 应用程序主控制器
 */
Ext.define('App.Controller', {
	extend : 'Ext.app.ViewController',
	
	//定义别名，在住视图中使用
	alias: 'controller.appController',	
	
	//路由
	routes : {
		'home': 'onHome',	
		'sys': 'onSys',
		'sys/:id': 'onSys',
		'user': 'onUser'

	},	
	
	config: {
         listen: {
             controller: {
                 '#': {
                    unmatchedroute : 'onUnmatchedRoute'
                 }
             }            
         }
     },
     
	onUnmatchedRoute: function(){		
		location.href = "#home";			
	},
		
	onHome: function(){			
		var me = this;
		me.setCenter('App.home.View');
		
	},
	
	onUser: function(){			
		var me = this;
		me.setCenter('App.user.UserInfo');
		
	},
	
	/**
	 * 向center布局中插入元素
	 * @param {} packagePath
	 */
	setCenter: function(resourcePath, params){			
		if(resourcePath == undefined || resourcePath == null){
			throw new Error('视图类不能为空！！');
		}	
		//删除现有布局中的数据
		var center = App.getCom('mainCenter');
		center.removeAll(true);			
		//获取视图类
		var viewClass = App.getClass(resourcePath);		
		//初始化视图
		var view = viewClass.init(params);			
		//向布局中添加视图
		center.add(view);		
		//记录当前视图类
		App.CURRENT_VIEW_CLASS.name = resourcePath;
		App.CURRENT_VIEW_CLASS.initParams = params;
	},
	
	
	onSys: function(id){
		var me = this;
		var sysCenter = App.getCom('sysCenter');
		if(sysCenter == undefined || sysCenter == null){
			me.setCenter('App.sys.View');
			sysCenter = App.getCom('sysCenter');
		}
		
		if(id != undefined && id != null){	
			
			var resourcePath = null;
			var name = null;
			Messager.send({
				sync: true,
				url: CTX_PATH + '/system/menu/load?log=y',
				data: {
					id: id
				},
				onSuccess: function(resourceData){	
					
					//出错处理
					if(resourceData.data == null){
						location.href = "#home";
						return;
					}
					
					resourcePath = resourceData.data.resourcePath;
					name = resourceData.data.name;
				}
			});	
			
						
			sysCenter.removeAll(true);	
			//初始化视图
			var view = App.getView(resourcePath);		
			//向布局中添加视图
			sysCenter.add(view);
			//更改标题
			sysCenter.setTitle(name);
			//设置当前视图id
			App.getClass('App.sys.View').currentViewId = id;
			App.getClass('App.sys.View').currentTreePath = resourcePath;
		}else{
			//设置当前视图id为null
			App.getClass('App.sys.View').currentViewId = null;
			App.getClass('App.sys.View').currentTreePath = null;
		}
		
		//展开树
		setTimeout(function(){
			var sysTree = App.getClass('App.sys.Left').tree;			
			sysTree.getRootNode().cascadeBy(function(child) {			
				if(App.getClass('App.sys.View').currentTreePath != null && child.data.resourcePath != null){
					if(App.getClass('App.sys.View').currentTreePath == child.data.resourcePath){
						sysTree.expandPath(child.getPath());
					}
				}
			});
		}, 300);
		
	}
	
		
});	
	
