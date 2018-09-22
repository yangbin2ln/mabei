/**
 * 待办任务列表
 * */
Ext.define('App.sys.system.workflow.RunTaskList',{
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
					loadAll: CTX_PATH +'/test/loadRunTaskList',
				},
				condition: { 
					fields: []
				},
				actionColumnMenu: [{
					iconCls: 'icon-edit',
					text: '处理任务',
					handler: function() { 
						var id = view.getCurrentRecord().data.id;
						var taskId = view.getCurrentRecord().data.id_;
						var taskDefKey = view.getCurrentRecord().data.taskDefKey_;//环节key
						var sysFormPath = view.getCurrentRecord().data.sysFormPath;
						Ext.create('App.sys.system.workflow.Util').getTaskForm(taskId,sysFormPath, {formReadOnly: true});
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
						name : 'money',
						text : '申请金额'
					},{
						name : 'phone',
						text : '联系电话'
					},{
						name : 'name_',
						text : '当前环节'
					},{
						name : 'createTime_',
						text : '流入时间'
					},{
						name : 'id_',
						text : '流程任务id'
					},{
						name : 'type_',
						text: '处理人类型'
					}],
				gridColumns: [{
						forData: 'id',
						width: 120,
						xtype : 'ins_hiddenfield'
					},{
						forData: 'id_',
						width: 120,
						xtype : 'ins_hiddenfield'
					},{
						forData: 'procInstName',
						width: 300
					},{
						forData: 'name_',
						width: 120
					},{
						forData: 'createTime_',
						width: 160
					}],
				valueMapper: {					
					name_: function(val, v, record, index){
						v.style = "background-color: #d8d8fd";
						return val;
					},
					procInstName: function(val, v, record, index){
						var me = this;
						var taskId = record.data.id_;
						var sysFormPath = record.data.sysFormPath;
						
						return '<a style="color:blue;display:block;"'+
					 	   'href = "javascript:Ext.create(\'App.sys.system.workflow.RunTaskList\').dealTask(\''+taskId+'\')">'+val+'</a>';
					}
				},
				formFields: []
			});
			me.view = view;
			return view;
		},
	dealTask: function(taskId,sysFormPath){
		Ext.create('App.sys.system.workflow.Util').getTaskForm(taskId, null,{formReadOnly: true});
	}
});