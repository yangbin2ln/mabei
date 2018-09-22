/**
 * 流程实例的历史任务列表
 * */
Ext.define('App.sys.system.workflow.TaskCommentHistoryList',{
	init: function(processInstanceId){
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
				loadAll: CTX_PATH +'/workflow/getHistoryTaskComment/' + processInstanceId,
			},
			condition: { 
				fields: []
			},
			dataSet: [{
					name : 'id',
					text : ''
				},{
					name : 'name_',
					text : '环节名称'
				},{
					name : 'userName',
					text : '处理人'
				},{
					name : 'deleteReason_',
					text : '处理状态'
				},{
					name : 'comment',
					text : '意见'
				},{
					name : 'startTime_',
					text : '流入时间'
				},{
					name : 'endTime_',
					text : '处理时间'
				},{
					name : 'type_',
					text: '处理人类型'
				},{
					name: 'deleteReason_',
					text: '流转原因'
				},{
					name: 'duration_',
					text: '处理时长'
				}],
				gridColumns: [{				
					forData: 'name_',
					width: 150
				},{				
					forData: 'userName',
					width: 120
				},{				
					forData: 'deleteReason_',
					width: 100
				},{				
					forData: 'comment',
					flex: 180
				},{				
					forData: 'startTime_',
					width: 165
				},{				
					forData: 'endTime_',
					width: 165
				},{				
					forData: 'duration_',
					width: 130
				}],
				valueMapper:{
					deleteReason_: function(val, v, record, index){
						if(val == null){
							v.style = "background: #d8d8fd";
							return "待处理";
						}
						if(val == 'completed'){
							v.style = App.OK_STYLE;
							return "已流转";
						}
						if(val == 'GO_BACK'){
							v.style = App.ERROR_STYLE;
							return '被退回';
						}
						if(val == 'TERMINATION'){
							v.style = App.ERROR_STYLE;
							return '被终止';
						}
					},
					duration_: function(val, v, record, index){ 
						var me = App.getClass('App.sys.system.workflow.TaskCommentHistoryList');
						return me.getTimeFormat(val);
					}
				}
		});
		return view;
	},
	getTimeFormat: function(millSeconds){ 
		var seconds = Math.ceil(millSeconds/1000)%60;
		var minutes = parseInt(millSeconds/1000/60)%60;
		var hours = parseInt(millSeconds/1000/60/60)%24;
		var days = parseInt(millSeconds/1000/60/60/24);
		var dateStr = "";
		var arrTime = [days,hours,minutes,seconds];
		var arrName = ['天','时','分','秒'];
		for(var i=0;i<arrTime.length;i++){
			if(arrTime[i] != 0){
				for(var j=i;j<arrTime.length;j++){
					dateStr += arrTime[j] + arrName[j];
				}
				break;
			}
		}
		return dateStr;
	}
});