/**
 * 参与过的任务列表
 * */
Ext.define('App.sys.system.workflow.HistoryTaskList',{
		init: function(){
			var me = this;
			var view = Ext.create('Ins.grid.CrudGrid',{
				hideTitle: true,
				//权限
				permission : {
					add: true,
					update: false,
					remove: false,
					view: false
				},
				urlConfig: {
					loadAll: CTX_PATH +'/test/loadHistoryTask',
				},
				condition: { 
					fields: []
				},
				actionColumnMenu: [{
					iconCls: 'icon-view',
					text: '查看详情',
					handler: function() { 
						var id = view.getCurrentRecord().data.id;
						var taskId = view.getCurrentRecord().data.id_;
						var taskDefKey = view.getCurrentRecord().data.taskDefKey_;//环节key
						var sysFormPath = view.getCurrentRecord().data.sysFormPath;
						Ext.create('App.sys.system.workflow.Util').getTaskForm(taskId,sysFormPath,{
							formReadOnly: true,
							permission:{
								agree:false,
								reject:false,
								stop:false,
							}
						});
					}	
				}],
				dataSet: [{
						name : 'id',
						text : ''
					},{
						name : 'procInstName',
						text : '主题'
					},{
						name : 'userName',
						text : '申请人'
					},{
						name : 'name_',
						text : '参与环节'
					},{
						name : 'taskState',
						text : '处理结果'
					},{
						name : 'procState',
						text : '流程当前状态'
					},{
						name : 'startTime_',
						text : '流入时间'
					},{
						name : 'endTime_',
						text : '处理时间'
					},{
						name : 'duration_',
						text : '处理时长'
					},{
						name : 'id_',
						text : '流程任务id'
					},{
						name : 'type_',
						text: '处理人类型'
					}],
				gridColumns: [{
						forData: 'procInstName',
						width: 300
					},{
						forData: 'name_',
						width: 120
					},{
						forData: 'userName',
						width: 120
					},{
						forData: 'taskState',
						width: 100
					},{
						forData: 'procState',
						width: 100
					},{
						forData: 'startTime_',
						width: 160
					},{
						forData: 'endTime_',
						width: 160
					},{
						forData: 'duration_',
						width: 120
					}],
				valueMapper: {					
					money: function(val, v, record, index) {		
						if(val != null && val != ''){
							return val + "万";
						}
					},
					procState: function(val, v, record, index) {		
						if(val == 'TERMINATION' || val == 'GO_BACK'){
							v.style = App.ERROR_STYLE;
							return "已终止";
						}
						if(val == null && record.data.procEndTime == null){
							v.style = App.OK_STYLE;
							return "流转中";
						}
						if(val == null && record.data.procEndTime != null){
							v.style = App.OK_STYLE;
							return "已完成";
						}
					},
					taskState: function(val, v, record, index) {		
						if(val == 'completed'){
							v.style = App.OK_STYLE;
							return "同意";
						}
						if(val == 'GO_BACK'){
							v.style = App.ERROR_STYLE;
							return "退回";
						}
						if(val == 'TERMINATION'){
							v.style = App.ERROR_STYLE;
							return "终止";
						}
					},
					name_: function(val, v, record, index){
						v.style = "background-color: #d8d8fd";
						return val;
					},
					duration_: function(val, v, record, index){
						return App.getClass('App.sys.system.workflow.TaskCommentHistoryList').getTimeFormat(val);
					},
					procInstName: function(val, v, record, index){
						var me = this;
						var taskId = record.data.id_;
						var sysFormPath = record.data.sysFormPath;
						
						return '<a style="color:blue;display:block;"'+
					 	   'href = "javascript:Ext.create(\'App.sys.system.workflow.HistoryTaskList\').taskView(\''+taskId+'\')">'+val+'</a>';
					}
				},
				formFields: []
			});
			return view;
		},
		taskView: function(taskId,sysFormPath){
			Ext.create('App.sys.system.workflow.Util').getTaskForm(taskId,null,{
				formReadOnly: true,
				showComment: true,
				permission:{
					agree:false,
					reject:false,
					stop:false,
				}
			});
		}
});