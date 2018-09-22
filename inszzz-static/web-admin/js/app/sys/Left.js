Ext.define('App.sys.Left',{
	
	navText_zh_CN: '导航菜单',
	navText_en_US: 'Navigation Bar',
	
	init: function(){
		
		var me = this;
		
		var view = Ext.create('Ins.tree.Tree',{			
			title: App.getLocaleText(me, 'navText'),			
			fields: ['resourcePath'],
			url: CTX_PATH + '/system/menu/loadSysTree',
			//iconCls: 'icon-list',	
			searchFiled: true,
			loadOnShow:true,			
			width : 290,
			minWidth : 175,
			maxWidth : 400,	
			onClick: function(record){
				//如果当前项没有子项,并且当前项为模块时
				if(record.childNodes.length == 0){					
					var resourcePath = record.data.resourcePath;
					//如果没有绑定视图类,直接抛异常
					if(resourcePath==undefined || resourcePath==null || resourcePath==''){
						throw new Error("未指定视图类");						
					}else{					
						me.redirectToView(record.id)
					}					
				}
				
			}			
		});
		
		me.tree=view;		
		return view;
	},
	
	redirectToView: function(id){
		location.href = "#sys/" + id;
	}

	
	
});