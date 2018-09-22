Ext.define('App.sys.system.workflow.Util', {
	
	/**
	 * 发起流程 
	 * @param wfData 流程参数（可以通过processDefinitionId，processDefinitionKey或者是processDefinitionVersion开启流程，详情见com.insplatform.workflow.common.vo.WorkFlowStartVo）
	 * @param config 配置参数 具体属性参加cfg
	 * @param businessData 其他参数
	 * @param formKey 若流程中未配置表单编号，此处需要传递
	 * */
	getStartForm: function(wfData,config,businessData,formKey) {
		var me = this;
		me.prevResourcePath = App.SYS_CURRENT_TREE_RESOURCEPATH;
		me.prevTitle = App.getCom('sysCenter').title;
		Messager.send({
			url: CTX_PATH + '/workflow/common/getStartFormKey/',
			data: wfData,
			onSuccess: function(data) {
				if(!formKey){
					var formKey = data.data;
				}
				var custView = App.getView(formKey, {
					wfData: wfData,
					businessData: businessData
				});
				var wfConfig = App.getClass(formKey).wfConfig;//获取表单配置项
				//默认配置
				var cfg = {
					//开启流程 url
					startProcessUrl: '',
					//打开方式 window为弹出window，panel为嵌入式panel
					openWay: 'window',
					getForm: function(){
						return custView;
					},
					//按钮权限
					permission: {
						back: true,//返回按钮
						submit: true//提交申请按钮
					},
					//window title
					title: '发起流程',
					//window 高度
					height: 300,
					//window 宽度
					width: 500,
					//表单 提交前
					beforeSubmit: function() {
						return true;
					},
					//表单提交成功后
					onSuccess: null,
					//默认按钮 
					actionButtons: []
				}
				me.merge(cfg, wfConfig);
				me.merge(cfg, config);
				
				initButtons();
				
				if(cfg.openWay == 'window') { //弹出
					var win = Ext.create('Ins.window.Window', {
						title: cfg.title,
						views: [cfg.getForm()],
						width: cfg.width,
						height: cfg.height,
						actionButtons: cfg.actionButtons
					});
					win.show();
				} else if(cfg.openWay == 'panel') { //嵌入
					var prevResourcePath = App.SYS_CURRENT_TREE_RESOURCEPATH;

					var sysCenter = App.getCom('sysCenter');
					sysCenter.removeAll(true);
					var panel = Ext.create('Ins.panel.Panel', {
						views: [cfg.getForm()],
						actionButtons: cfg.actionButtons
					});
					sysCenter.add(panel)
				}

				
				//内部方法
				function initButtons(){
					var actionButtonsTemp = [];
					if(cfg.permission.back){
						actionButtonsTemp.push({
							text: '返回',
							iconCls: 'icon-back',
							handler: function() {
								if(cfg.openWay == 'window') {
									win.close();
								} else if(cfg.openWay == 'panel') {
									var sysCenter = App.getCom('sysCenter');
									sysCenter.removeAll(true);
									sysCenter.add(App.getView(me.prevResourcePath));
									sysCenter.setTitle(me.prevTitle);
								}
							}
						});
					}
					if(cfg.permission.submit){
						actionButtonsTemp.push({
							text: '发起申请',
							iconCls: 'icon-ok',
							handler: function() {
								if(!cfg.beforeSubmit(cfg.getForm())) {
									return;
								}
								Message.ask('确认要提交吗', function(flag) {
									if(flag) {
										cfg.getForm().submit({
											url: cfg.startProcessUrl,
											waitMsg: '正在执行，请稍后...',
											params: wfData,
											success: function(form, action) {
												if(cfg.onSuccess != null) {
													cfg.onSuccess(action.result);
												}
												if(cfg.openWay == 'window') {
													win.close();
												} else if(cfg.openWay == 'panel') {
													TopMessage.info("操作成功");
													var sysCenter = App.getCom('sysCenter');
													sysCenter.removeAll(true);
													sysCenter.add(App.getView(me.prevResourcePath));
												}
											},
											failure: function(form, action) {
												try {
													return App.errorHandler(action.response);
												} catch(exception) {
													var msg = '操作失败或系统错误';
													TopMessage.error(msg);
													return false;
												}
											}
										});
									}
								})
							}
						});
					}
					
					cfg.actionButtons = actionButtonsTemp;
				}
				
				
			}
		});
		
	},
	
	
	/**
	 * 查看代办任务
	 * @param taskId 任务ID
	 * @param formKey ext表单(若流程中未配置表单编号时，则需要传递此参数)
	 * @param config 配置参数
	 * 	(说明：此参数非必输项，以下情况需要配置此参数
	 *       1、当表单中未配置wfConfig
	 *       2、同一个表单被不同业务场景通用时，需要改变表单默认配置的wfConfig
	 * */
	getTaskForm: function(taskId,formKey,config) {
		var me = this;
		me.id = 'id_'+new Date().getTime()+App.utils.Math.random(0,100000);
		me.taskId = taskId;
		me.formKey = formKey;
		me.prevResourcePath = App.SYS_CURRENT_TREE_RESOURCEPATH;
		me.prevTitle = App.getCom('sysCenter').title;
		Messager.send({
			url: CTX_PATH + '/workflow/common/getBusinessKeyByTaskId/' + taskId,
			onSuccess: function(res) {
				me.wfData = res;
				if(!formKey){
					formKey = res.taskFormKey;
				}
				me.processDefinitionId = res.processDefinitionId;
				me.processInstanceId = res.processInstanceId;
				if(!!formKey){
					var custView = App.getView(formKey, res);
				}else{
					var custView = null;
				}
				
				if(!!formKey){
					var wfConfig = App.getClass(formKey).wfConfig;
				}else{
					var wfConfig = null;
				}
				
				//默认配置
				var cfg = {
					getForm: function(){
						return custView;
					},
					//同意 url
					completeUrl: '',
					//退回 url
					backUrl: '',
					//终止url
					deleteUrl: CTX_PATH + '/workflow/deleteProcessInstance',
					//打开方式 window为弹出window，panel为嵌入式panel
					openWay: 'window',
					//按钮权限
					permission:{
						back:true,//返回按钮
						agree:true,//同意按钮
						reject:true,//拒绝按钮
						stop:true,//终止按钮
						flowChart:true,//查看流程图按钮
						history:true//查看历史任务按钮
					},
					showComment: false,
					formReadOnly: false,
					//window title
					title: '待办任务',
					//window 高度
					height: 300,
					//window 宽度
					width: 500,
					//表单 提交前
					beforeCompleteSubmit: function() {
						return true;
					},
					beforeBackSubmit: function() {
						return true;
					},
					//同意 表单提交成功后
					onCompleteSuccess: null,
					//退回 表单提交成功后
					onBackSuccess: null,
					//默认按钮 
					actionButtons: []
				}
				
				me.merge(cfg, wfConfig);
				me.merge(cfg, config);

				me.cfg = cfg;

				me.initActionButtons(cfg);
				
				if(cfg.openWay == 'window') {
					me.createTaskWindow(custView);
				} else if(cfg.openWay == 'panel') { //嵌入
					var sysCenter = App.getCom('sysCenter');
					me.createTaskPanel(custView);
				}else if(cfg.openWay == 'bigPanel'){
					me.createTaskBigPanel(custView);
				}
				
			}
		});
		return this;
	},
	
	getTaskFormByProcInstId: function(procInstId,formKey,config) {
		var me = this;
		me.id = 'id_'+new Date().getTime()+App.utils.Math.random(0,100000);
		me.formKey = formKey;
		Messager.send({
			url: CTX_PATH + '/workflow/common/getBusinessKeyByProcInstId/' + procInstId,
			onSuccess: function(res) {
				me.wfData = res;
				me.processDefinitionId = res.processDefinitionId;
				me.processInstanceId = res.processInstanceId;
				
				var custView = App.getView(formKey, res);
				this.custView = custView;
				
				var wfConfig = App.getClass(formKey).wfConfig;
				
				//默认配置
				var cfg = {
					getForm: function(){
						return custView;
					},
					//同意 url
					completeUrl: '',
					//退回 url
					backUrl: '',
					//终止url
					deleteUrl: CTX_PATH + '/workflow/deleteProcessInstance',
					//打开方式 window为弹出window，panel为嵌入式panel
					openWay: 'window',
					permission:{
						back:true,//返回按钮
						agree:false,//同意按钮
						reject:false,//拒绝按钮
						stop:false,//终止按钮
						flowChart:true,//查看流程图按钮
						history:true//查看历史任务按钮
					},
					showComment: false,
					formReadOnly: true,
					//window title
					title: '待办任务',
					//window 高度
					height: 300,
					//window 宽度
					width: 500,
					//表单 提交前
					beforeCompleteSubmit: function() {
						return true;
					},
					beforeBackSubmit: function() {
						return true;
					},
					//同意 表单提交成功后
					onCompleteSuccess: null,
					//退回 表单提交成功后
					onBackSuccess: null,
					//默认按钮 
					actionButtons: []
				}
				
				me.merge(cfg, wfConfig);
				me.merge(cfg, config);

				me.cfg = cfg;

				me.initActionButtons(cfg);
				
				if(cfg.openWay == 'window') {
					me.createTaskWindow(custView);
				} else if(cfg.openWay == 'panel') { //嵌入
					var sysCenter = App.getCom('sysCenter');
					me.createTaskPanel(custView);
				}else if(cfg.openWay == 'bigPanel'){
					me.createTaskBigPanel(custView);
				}
				if(!cfg.getForm()){
					if(cfg.formReadOnly){
						setTimeout(function(){
							$('.template-common input,.template-common textarea,.template-common select,.template-common option').attr({'readonly':true,disabled:'disabled'});
						},500);
					}
				}
				
			}
		});
		return this;
	},
	
	initActionButtons: function(){
		var me = this;
		var cfg = me.cfg;
		var buts = [];
		if(cfg.permission.back){
			buts.push({
				text: '返回',
				iconCls: 'icon-back',
				handler: function() {
					me.closeWinOrPanel();
				}
			});
		}
		if(cfg.permission.agree){
			var agreeForm = me.getCommentForm('同意',me.agree,me.id + '_commentForm_menu_agree');
			me.agreeForm = agreeForm;
			buts.push({
				text: '同意',
				iconCls: 'icon-ok',
				menu: new Ins.menu.Menu({
					id: me.id + '_commentForm_menu_agree',
			        items: [
			        	agreeForm
			        ]
				})
			});
		}
		
		if(cfg.permission.reject){
			var rejectForm = me.getCommentForm('',me.reject,me.id + '_commentForm_menu_regect');
			me.rejectForm = rejectForm;
			buts.push({
				text: '退回',
				iconCls: 'icon-cross',
				menu: new Ins.menu.Menu({
					id: me.id + '_commentForm_menu_regect',
			        items: [
			        	rejectForm
			        ]
				})
			});
		}
		if(cfg.permission.stop){
			var stopForm = me.getCommentForm('',me.stop,me.id + '_commentForm_menu_stop');
			me.stopForm = stopForm;
			buts.push({
				text: '终止',
				iconCls: 'icon-stop',
				menu: new Ins.menu.Menu({
					id: me.id + '_commentForm_menu_stop',
			        items: [
			        	stopForm
			        ]
				})
			});
		}
		buts.push("->");
		if(cfg.permission.flowChart){
			buts.push({
				text: '查看流程图',
				iconCls: 'icon-search',
				handler: function(){
					me.previewImg(me.processDefinitionId,me.processInstanceId);
				}
			});
		}
		if(cfg.permission.history){
			buts.push({
				text: '历史审批意见',
				iconCls: 'icon-search2',
				handler: function(){
					me.viewsHistoryTask(me.processInstanceId);
				}
			});
		}
		cfg.actionButtons = buts;
	},
	
	getCommentForm: function(commentVal, submitFun,menuId){
		var me = this;
		var comment = {
				name:'comment',
				xtype: 'ins_textareafield',
				value: commentVal,
				maxLength: 2000,
				height: 90,
				width: 550,
				allowBlank: false
			};
		 
		var commentForm = Ext.create('Ins.form.Form',{    			
			xtype: 'ins_form',
			title: '意见',
			columnSize : 1,
			textAlign: 'top',
			textStyle: 'font-weight:bold',
			width: 580,
			fields: comment,
			tools : [
			    {
			    	type : "close",
			    	tooltip : "单击关闭查询条件。",
			    	handler : function(){
			    		App.getCom(menuId).hide();
			    	}
			    }
			],
			actionButtons: [{
				text: '确定',
				iconCls : "icon-ok",
				handler: function() { 
					submitFun.call(me);
				}
			}]
			
		}); 
		return commentForm;
	},
	
	agree: function(){
		var me = this;
		if(!me.cfg.beforeCompleteSubmit()){
			return;
		}
		var form = me.cfg.getForm();
		if(!!form){
			
			if(!form.isValid()) return;
			
			Message.ask('确定此操作吗？', function(flag) {
				if(flag) {
					form.submit({
						url: me.cfg.completeUrl,
						params: { taskId: me.taskId, comment: me.agreeForm.getValue('comment')},
						waitMsg: '正在执行，请稍后...',
						success: function(form, action) {
							if(me.cfg.onCompleteSuccess != null) {
								me.cfg.onCompleteSuccess(action.result);
							}
							me.closeWinOrPanel();
						}
						
					});
				}
			});
		}else{
			Message.ask('确定此操作吗？', function(flag) {
				if(flag){
					Messager.send({
						url: me.cfg.completeUrl,
						data: {
							processInstanceId: me.processInstanceId,
							comment: me.agreeForm.getValue('comment'),
							taskId: me.taskId
						},
						onSuccess: function(res) {
							if(res.success){
								TopMessage.info("操作成功");
								me.closeWinOrPanel();
							}else{
								TopMessage.error("操作失败");
							}
						}
					});
				}
			});
		}
	
	},
	
	reject: function(){
		var me = this;
		if(!me.cfg.beforeBackSubmit()){
			return;
		}
		if(me.rejectForm.getValue('comment') == ''){
			TopMessage.warn("意见不能为空");
			return;
		}
		var form = me.cfg.getForm();
		if(!!form){
			if(!form.isValid())return;
			Message.ask('确定要退回吗？', function(flag) {
				if(flag) {
					form.submit({
						url: me.cfg.backUrl,
						params: { taskId: me.taskId,comment: me.rejectForm.getValue('comment')},
						waitMsg: '正在执行，请稍后...',
						success: function(form, action) {
							if(me.cfg.onBackSuccess != null) {
								me.cfg.onBackSuccess(action.result);
							}
							me.closeWinOrPanel();
						}
						
					});
				}
				});
		}else{
			Message.ask('确定要退回吗？', function(flag) {
				if(flag){
					Messager.send({
						url: me.cfg.backUrl,
						data: {
							processInstanceId: me.processInstanceId,
							comment: me.rejectForm.getValue('comment'),
							taskId: me.taskId
						},
						onSuccess: function(res) {
							if(res.success){
								TopMessage.info("操作成功");
								me.closeWinOrPanel();
							}else{
								TopMessage.error("操作失败");
							}
						}
					});
				}
			});
		}
	
	},
	
	stop: function(){
		var me = this;
		if(me.stopForm.getValue('comment') == ''){
			TopMessage.warn("意见不能为空");
			return;
		}
		
		Message.ask('确定要终止此流程吗？', function(flag) {
			if(flag) {
				Messager.send({
					url: me.cfg.deleteUrl,
					data: {
						processInstanceId: me.processInstanceId,
						comment: me.stopForm.getValue('comment')
					},
					onSuccess: function(res) {
						if(res.success){
							TopMessage.info("操作成功");
							me.closeWinOrPanel();
						}else{
							TopMessage.error("操作失败");
						}
					}
				});
			}
		});
	},
	
	createTaskPanel: function(custView){
		var me = this;
		var cfg = me.cfg;
		var sysCenter = App.getCom('sysCenter');
		sysCenter.removeAll(true);
		var panel = Ext.create('Ins.panel.Panel', {
			views: [me.createContent(custView)],
			actionButtons: cfg.actionButtons			
		});
		sysCenter.add(panel);
		sysCenter.setTitle(cfg.title);
	},
	
	createTaskWindow: function(custView){
		var me = this;
		var cfg = me.cfg;
		
		var win = Ext.create('Ins.window.Window', {
			maximizable: true,
			title: cfg.title,
			views: [me.createContent(custView)],
			width: cfg.width,
			actionButtonsAlign: 'top',
			actionButtonsStyle: 'default',
			height: 700,
			actionButtons: cfg.actionButtons
		});
		me.taskWindow = win;
		win.show();
	},

	createTaskBigPanel: function(custView){
		var me = this;
		var cfg = me.cfg;
		var panel = Ext.create('Ins.panel.Panel', {
			views: [me.createContent(custView)],
			actionButtons: cfg.actionButtons			
		});
		
		var center = App.getCom('mainCenter');
		center.removeAll(true);			
		//向布局中添加视图
		center.add(panel);		
	},
	
	createContent: function(custView){
		var me = this;
		var cfg = me.cfg;
		
		if(!!cfg.getForm()){
			/*cfg.getForm().add(comment);
			cfg.getForm().updateLayout();*/
			if(cfg.formReadOnly){
				FormToolkit.setFormFieldsReadonly(cfg.getForm(), true);
			}
			
		}
		 //弹出
		/*var boxLayoutView = Ext.create('Ins.layout.BoxLayout',{
            id: me.getId() + '_boxlayout',
			//布局标题
			hideTitle: true,
            //view排列方向 '-','|'（分为水平和竖直两种方向）
            direction:'|',
            //存放区域视图
            views: [
            	custView,
            	//commentForm,
            	App.getView('App.sys.system.workflow.TaskHistory',{
            		processInstanceId: me.processInstanceId
            	}), 
            ],
            //对应view所占比例。Number类型数组。
            comSize:[{flex:2},  {flex:1}],
            useAppBg:false,
        });*/
		
		/*var historyTaskView = App.getView('App.sys.system.workflow.TaskHistory',{
    		processInstanceId: me.processInstanceId
    	})*/
		if(cfg.showComment){
			var commentVal = me.wfData.commentList.length>0?me.wfData.commentList[0].comment:'';
			var comment = {
					name:'comment',
					text:'<span style="color:#157fcc">意见</span>',
					xtype: 'ins_textareafield',
					value: commentVal,
					maxLength: 2000,
					width: '98%',
					height: 90,
//					colspan: 99,
					allowBlank: false
				};
			
			var commentForm = Ext.create('Ins.form.Form',{
				height: 110
			});
			commentForm.add(comment);
			me.commentForm = commentForm;
			
			FormToolkit.setFormFieldsReadonly(commentForm, true);
			var borderLayOutView = Ext.create('Ins.layout.BorderLayout',{
	            //定义组件位置
	            location: ['top','center'],
	            //存放区域视图
	            views: [
	            	commentForm,
	            	custView
	            	//commentForm,
//	            	historyTaskView
	            ],
	            //定义组件是否可折叠
	            fold: [false,false]
	        });
			
//			historyTaskView.collapse();
			return borderLayOutView;
		}else{
			var borderLayOutView = Ext.create('Ins.layout.BorderLayout',{
	            //定义组件位置
	            location: ['center'],
	            //存放区域视图
	            views: [
//	            	commentForm,
	            	custView
	            	//commentForm,
//	            	historyTaskView
	            ],
	            //定义组件是否可折叠
	            fold: [false,false]
	        });
			
//			historyTaskView.collapse();
			return borderLayOutView;
		}
		
	},
	viewsHistoryTask: function(processInstanceId,actionColumnMenu){
		var me = this;
		var view = App.getClass('App.sys.system.workflow.TaskCommentHistoryList').init(processInstanceId,actionColumnMenu);
		var window = Ext.create('Ins.window.Window', {
			title: '历史任务',
			views: [view],
			width: 1100,
			height: 500
		});
		window.show();
	},
	/*预览*/
	previewImg: function(processDefinitionId,processInstanceId,winWidth,winHeight) {
		var me = this;
		if (me.window) {
			Ext.destroy(me.window);
		}
		
		var src = encodeURI(CTX_PATH + '/workflow/edit/getDesign/diagram-viewer/index.html?processDefinitionId='+processDefinitionId+'&processInstanceId='+processInstanceId);
		var htm = '<iframe style="height:100vh;width:100%;" src="'+src+'">';
		
		var window = Ext.create('Ins.window.Window', {
			title: '流程跟踪',
			maximizable:true,
			modal: true,
			scrollable: true,
			html: htm,			
			closeAction: 'destroy',
			layout:  'center',
			width: Utils.isEmpty(winWidth)?900:winWidth,
			height: Utils.isEmpty(winHeight)?600:winWidth,
			modal: false
		});
		me.window = window;
		me.window.show();
	},
	closeWinOrPanel: function(){
		var me = this;
		if(me.cfg.openWay == 'window') {
			me.taskWindow.close();
			Ext.destroy(me.custView);
			Ext.destroy(me.taskWindow);
		} else if(me.cfg.openWay == 'panel') {
			var sysCenter = App.getCom('sysCenter');
			sysCenter.removeAll(true);
			sysCenter.add(App.getView(me.prevResourcePath));
			sysCenter.setTitle(me.prevTitle);
		}else if(me.cfg.openWay == 'bigPanel'){
			window.history.go(-1);
		}
	},
	/**
	 * 将一个对象深层次拷贝到另一个对象
	 * @param src 被合并的对象
	 * @param desc 目标对象
	 * */
	merge: function(src, desc) {
		if(!desc)return;
		var me = this;
		for(key in desc) {
			if(!src[key]) {
				src[key] = desc[key];
			} else {
				if(desc[key] instanceof Array) {
					for(var i = 0; i < desc[key].length; i++) {
						src[key].push(desc[key][i]);
					}
				} else if(desc[key] instanceof Object && !(desc[key] instanceof Function)) {
					me.merge(src[key], desc[key])
				} else {
					src[key] = desc[key];
				}
			}
		}
	}
	
});