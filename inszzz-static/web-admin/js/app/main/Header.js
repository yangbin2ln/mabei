Ext.define('App.main.Header.Button', {
			extend : 'Ext.button.Button',
			alias : ["widget.headerbutton"],

			style : {
				backgroundColor : 'transparent',
				height : '40px',
				padding : '8px 8px',
				borderRadius : 0,
				borderWidth : 0,
				borderStyle : 'solid'				
			},
			scale : "medium",
			arrowVisible : false,
			listeners : {
				mouseover : function(btn) {
					btn.setStyle("background", "#1c8145");
				},
				mouseout : function(btn) {
					btn.setStyle("background", "#000");
				},
				afterrender : function(btn){
					btn.setStyle("background", "#000");
				}
			}
		});

Ext.define('App.main.Header', {

	homeTip_zh_CN : '首页',
	homeTip_en_US : 'Home',

	sysTip_zh_CN : '系统',
	sysTip_en_US : 'System',

	refreshTip_zh_CN : '刷新',
	refreshTip_en_US : 'Refresh',

	refreshMsg_zh_CN : '刷新成功',
	refreshMsg_en_US : 'Refresh Success',

	helpTip_zh_CN : '帮助',
	helpTip_en_US : 'Help',

	about_zh_CN : '关于',
	about_en_US : 'About',

	currentuserTip_zh_CN : '当前用户信息',
	currentuserTip_en_US : 'Current User Info',

	signoutTip_zh_CN : '退出登录',
	signoutTip_en_US : 'Sign Out',	
	

	init : function() {

		var me = this;

		var view = Ext.create('Ext.toolbar.Toolbar', {
			xtype : 'toolbar',
			height : 40,
			padding : '0 10 0 10',			
			listeners : {				
				afterrender : function(btn){
					btn.setStyle("background", "#000");
					btn.setStyle("border", "0");
				}
			},
			items : [{
						xtype : 'component',
						autoEl : {
							tag : 'img',
							src : CURRENT_STATIC_PATH
									+ '/image/header/paas.png'
						},
						style : {
							height : '40px',							
							width : '40px',
							marginRight: '15px'
						}

					}, {
						xtype : 'container',
						style : {
							color : '#fff'
						},
						items : [/*{
									xtype : 'component',
									autoEl : {
										tag : 'span',
										html : App.getLocaleText(me, 'logo1')
									},
									style : {
										display : 'block',
										fontSize : '15px',
										marginBottom: '1px'
									}
								}, {
									xtype : 'component',
									autoEl : {
										tag : 'span',
										html : App.getLocaleText(me, 'logo2')
									},
									style : {
										display : 'block',
										fontSize : '13px'
									}
								}*/{
									xtype : 'component',
									autoEl : {
										tag : 'span',
										html : 'INSROJECT'
									},
									style : {
										display : 'block',
										fontSize : '16px',
										marginTop: '3px',
										fontWeight: '400'
									}
								}]
					}, {
						xtype : 'headerbutton',
						icon : CURRENT_STATIC_PATH + '/image/header/home.png',
						tooltip : App.getLocaleText(me, 'homeTip'),
						handler : function() {
							location.href = '#home';
						}
					}, {
						xtype : 'headerbutton',
						icon : CURRENT_STATIC_PATH
								+ '/image/header/setting.png',
						tooltip : App.getLocaleText(me, 'sysTip'),
						handler : function() {
							location.href = '#sys';
						}
					}, '->', {
						xtype : 'headerbutton',
						icon : CURRENT_STATIC_PATH
								+ '/image/header/refresh.png',
						tooltip : App.getLocaleText(me, 'refreshTip'),
						handler : function() {
							var controller = App.getClass('App.Controller');
							if ('App.sys.View' == App.CURRENT_VIEW_CLASS.name) {
								controller
										.onSys(App.getClass('App.sys.View').currentViewId);
							} else {
								controller.setCenter(
										App.CURRENT_VIEW_CLASS.name,
										App.CURRENT_VIEW_CLASS.initParams);
							}
							TopMessage
									.info(App.getLocaleText(me, 'refreshMsg'));
						}

					}, {
						xtype : 'headerbutton',
						icon : CURRENT_STATIC_PATH + '/image/header/help.png',
						tooltip : App.getLocaleText(me, 'helpTip'),
						menu : [
							    /*
							    {
									iconCls : 'icon-text',
									text : '简体中文',
									handler : function() {
										me.changeLocale('zh_CN');
									}
								}, {
									iconCls : 'icon-text',
									text : 'English',
									handler : function() {
										me.changeLocale('en_US');
									}
								}, 
								*/
								{				
					                text: '改变主题',
					                iconCls: 'icon-theme',
					                menu: {
					                	items: [{
						                	text: '默认',
						                	iconCls: 'icon-defaultstyle',
						                	handler: function(){						                		
						                		me.changeStyle('crisp');
						                	}
						                },{
						                	text: '深蓝',
						                	iconCls: 'icon-bluestyle',
						                	handler: function(){						                	
						                		me.changeStyle('neptune');
						                	}
						                },{
						                	text: '经典蓝',
						                	iconCls: 'icon-bluestyle',
						                	handler: function(){						                	
						                		me.changeStyle('classic');
						                	}
						                }]                
					                }
					                
					            },'-',{
									iconCls : 'icon-help',
									text : App.getLocaleText(me, 'about'),
									handler : function() {
										Ext.MessageBox.alert('关于',
											"<div style='height:90px;width:280px;text-align:center;'><img src='" + STATIC_PATH + "/common/image/westerasoft.jpg'/><br/><br/><span style='font-weight:bold;color:#04468C;'>系统建设与维护：西软软件股份有限公司</span><div>");
									}
								}]
					}, {
						xtype : 'headerbutton',
						icon : CURRENT_STATIC_PATH + '/image/header/user.png',
						tooltip : App.getLocaleText(me, 'currentuserTip'),
						text: '<span style="color:#f5f5f5;font-size:14px;">'+CURRENT_USER.name+'</span>',
						handler: function(){
							location.href = "#user";
						}
					}, {
						xtype : 'headerbutton',
						icon : CURRENT_STATIC_PATH + '/image/header/out.png',
						tooltip : App.getLocaleText(me, 'signoutTip'),
						handler: function(){
//							Message.ask('确认要退出系统吗？',function(flag){
//		                		if(flag){                			
//		                			location.href = CTX_PATH + '/login/out';
//		                		}
//		                	});
							location.href = CTX_PATH + '/login/out';
						}
					}]
		});

		me.view = view;

		return view;
	},
	
	/**
	 * 改变主题
	 * @param {} type
	 */
	changeStyle: function(type){
		Messager.send({
			url: CTX_PATH + '/main/changeStyle?style='+type,
			onSuccess: function(){
				location.reload();
			}
		});
	}

	/**
	 * 改变语言
	 * 
	 * @param {}
	 *            type
	 
	changeLocale : function(type) {
		Messager.send({
					url : CTX_PATH + '/locale/change/' + type,
					onSuccess : function() {
						location.reload();
					}
				});
	}
	*/
});

