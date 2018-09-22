/**
 * 定义应用程序入口类
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',
   
    init: function(){  
    	
    	//加载字体图标
		Ext.setGlyphFontFamily('FontAwesome');
		
		//初始化 tooltip 上下文
		Ext.tip.QuickTipManager.init();
		
		//绑定公共属性方法
		Ext.apply(App,{	
			
			
			//类池
			CLASSES : [], 	
			
			//当前视图类
			CURRENT_VIEW_CLASS: {				
				name: null,
				initParams: null				
			},			
			
			//布局视图背景图片
			LAYOUT_BG : STATIC_PATH + '/common/image/bg/square.gif',	
			
			//布局视图背景色
			LAYOUT_BG_COLOR : '#e7e7e7',			
			
			//单元格样式
			OK_STYLE: 'background-color: #C7EDCC',	
			ERROR_STYLE: 'background-color: #F7B9B9',		
			WARN_STYLE: 'background-color: #FFF893',
					
			//获取组件
			getCom: function(id){	
				//根据id获取
				var component = Ext.getCmp(id);				
				return component;
			},
			
			//获取dom元素
			getDom: function(id){
				return document.getElementById(id);			
			},			
			
			//获取国际化信息
			getLocaleText: function(classInstance, textField){			
				if(classInstance == null || classInstance == undefined){
					classInstance = App.getClass('App.common.I18n');
				}
				var text = classInstance[textField + '_' + LOCALE];
				return text;
			},
			
			//全局中英文
			LANGUAGE_ZH: LOCALE == 'zh_CN' ? '(中文)' : '(ZH)',
			LANGUAGE_EN: LOCALE == 'zh_CN' ? '(英文)' : '(EN)',
			
			//获取视图
			getView: function(path, cfg){
				var _class = App.getClass(path);
				var view = _class.init(cfg);
				//如果类中有销毁方法，则注册，并且绑定作用域到当前类				
				if(_class.beforeDestroy!=undefined && _class.beforeDestroy!=null){						
					view.addListener("beforedestroy", _class.beforeDestroy, _class);		
				}
				//给视图绑定当前类
				view.currentClass = _class;
				return view;
			},
			
			//获取类(如果类池中已存在，则直接返回)
			getClass: function(path){
				var _path = path;				
				//如果类池中存在当前类，直接返回
				var instance = null;
				for(var i=0;i<App.CLASSES.length;i++){
					var _class = App.CLASSES[i];
					if(_class.path == _path){
						instance = _class.instance;
						break;
					}
				}
				//如果类池中不存在当前类，则新建一个放入类池，并返回
				if(instance == null){
					instance = Ext.create(_path);
					instance.id = 'id_'+new Date().getTime()+App.utils.Math.random(0,100000);
					instance.getId = function(){
						return instance.id;
					}
					App.CLASSES.push({
						path: _path,
						instance: instance
					});
				}
				return instance;
			},
						
			//使用artTemplate编译模板
			//  {
			// 	 html: 模板内容
			//   data: 数据对象
			//   isEscape: 是否编码输出 HTML字符 默认 false			
			//  }
			compileTemplate: function(cfg){
				var render = template.compile(cfg.html, {
					cache: false,
					escape: (cfg.isEscape==undefined||cfg.isEscape==null) ? false : cfg.isEscape
				});	
				var _content  = '';		
				if(cfg.data == null || cfg.data == undefined){				
					_content = render({App:App,STATIC_PATH:STATIC_PATH,CURRENT_STATIC_PATH:CURRENT_STATIC_PATH,CTX_PATH:CTX_PATH,FILE_PATH:FILE_PATH});			
				}else{
					cfg.data.App = App;	
					cfg.data.STATIC_PATH = STATIC_PATH;	
					cfg.data.CURRENT_STATIC_PATH = CURRENT_STATIC_PATH;	
					cfg.data.CTX_PATH = CTX_PATH;				
					cfg.data.FILE_PATH = FILE_PATH;
					_content = render(cfg.data);
				}
				return _content;
			},
			
			//工具类
			utils: Utils,
			
			/**
			 * 错误处理
			 */
			errorHandler: function(response){
				if(response.status != 404){
					var msg = LOCALE == 'zh_CN' ? '操作失败或系统错误' : 'The operation failed or system error';
					if(response.getResponseHeader != undefined){
						if(response.getResponseHeader("errorMsg") == 'ERROR_500'){
							//To Do
						}		
					}	
					TopMessage.error(msg);
					return false;
				}				
			},
			
			//检查当前用户是否拥有此资源的权限
			checkOperateAuthz: function(code){				
				var operate = CURRENT_USER.operateMap[code];
				if(operate == undefined || operate == null){
					return false;
				}
				return true;
			},
			
			//获取操作
			getOperate: function(code){				
				if(App.ALL_OPERATE_MAP == undefined || App.ALL_OPERATE_MAP == null){
					App.ALL_OPERATE_MAP = [];
					Messager.send({
						sync:true,
						url: CTX_PATH + '/system/operate/loadAllOperateMap',
						onSuccess: function(data){								
							App.ALL_OPERATE_MAP = data;
						}
					});
				}
				var operate = App.ALL_OPERATE_MAP[code];				
				var name = 'ERROR_CODE';
				var resource = 'ERROR_CODE';
				if(operate != undefined && operate != null){
					name = operate.name;
					if(operate.resourcePath.indexOf(',') != -1){
						resource = operate.resourcePath.split(',');
						resource[0] = CTX_PATH + resource[0];
						resource[1] = CTX_PATH + resource[1];
					}else{
						resource = CTX_PATH + operate.resourcePath;	
					}						
				}			
				return {
					name: name,
					resource: resource
				}
			}
					
		});			
		
    	//给AJAX添加执行完成监听
		Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts){
			//如果session过期，则跳入登录页面	 
			if(response.getResponseHeader != undefined){
				if(response.getResponseHeader("sessionstatus")=='timeout'){	
					Message.msg(LOCALE == 'zh_CN' ? '登录超时' : 'Login Timeout!', "ERROR", function(){
						window.location = CTX_PATH +  "/login"; //如重定向到登陆页面 
					});
					/*Message.ask("登录超时，请重新登陆！",function(flag){
						if(flag){
							window.location = CTX_PATH +  "/login"; //如重定向到登陆页面 
						}
					});	*/				
				}	
				//权限				
				if(response.getResponseHeader("authzStatus")=='no'){	
					TopMessage.warn('无权限操作！');	
					throw new Error('No Authz!');  
					return false;
				}		
			}			
			return false;			
		});	
		
		//给AJAX添加执行错误监听
		Ext.Ajax.on("requestexception",function(conn, response, options, eOpts){
			return App.errorHandler(response);			
		});
		
    },
    
    launch: function () {
    	var me = this;     	
    	var p = Ext.create('Ext.ProgressBar', {		  
		   width: 200		   
		});			
		var pw = Ext.create('Ins.window.Window',{
			modal: true,
			header: false,
			hideTitle: true,
			padding: '20 20 20 20',
			layout: 'vbox',
			views: [{html:'Loding...',margin:'0 0 10 0'}, p]
		}).show();
		p.wait({		  
		   text: LOCALE == 'zh_CN' ? '正在加载，请稍候...' : 'Loading...',
		   interval: 200
		});
		
        App.utils.require([  
       		//加载应用程序配置
			CURRENT_STATIC_PATH + '/js/config/application.cfg.js',			
			//加载其它全局样式			
			STATIC_PATH + '/common/css/icon.css',
			STATIC_PATH + '/common/css/ext-topmessage.css',
			//加载ueditor编辑器
			STATIC_PATH + '/common/lib/ueditor/themes/default/css/ueditor.ins.min.css',
			STATIC_PATH + '/common/lib/ueditor/ueditor.config.js',
			STATIC_PATH + '/common/lib/ueditor/ueditor.ins.js',
//			STATIC_PATH + '/common/lib/ueditor/lang/en/en.js'
			//加载模板处理组件
			//STATIC_PATH + '/common/lib/template/template.min.js',			
			//加载媒体播放器
			//STATIC_PATH + '/common/lib/jwplayer/6.12.5/bin-release/jwplayer.js',
			//STATIC_PATH + '/common/lib/jwplayer/6.12.5/bin-release/jwplayer.html5.js',
			//加载swfobject
			//STATIC_PATH + '/common/lib/swfobject/swfobject.js'
		 ], function(){			 	
		 	try{
		 		if(me.main){ 	 			
	 	 			me.main();
	 	 		}		 		
		 	}catch(exception){   
		 		
		 	}finally{
			 	setTimeout(function(){
	 	 			Ext.destroy(pw);
	 	 		},300);
		 	}
 	 		
		 });  		
    }
    
});
