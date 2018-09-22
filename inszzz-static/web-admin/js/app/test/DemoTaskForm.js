Ext.define('App.test.DemoTaskForm',{
	init: function(data){
		/**
		 * {
			businessKey: businessKey, //业务id	
			taskDefinitionKey: taskDefinitionKey, //任务环节id
			taskId: taskId //任务id
			}
		 * */
		console.log(data);
		var me = this;
		
		var form = Ext.create('Ins.form.Form',{
			fields: [
				{name:'userName',text:'申请人'},
				{name:'createTime',text:'申请时间',xtype: 'ins_datetimefield'},
				{name:'startTime',text:'请假开始时间',xtype: 'ins_datetimefield'},
				{name:'days',text:'请假天数',xtype: 'ins_numberfield'},
				 
			]
		});
		
		//查询业务数据
		var businessKey = data.businessKey;
		
		Messager.send({
			  url: CTX_PATH + '/test/loadLeave',
			  data: {
				 id: businessKey
			  },
			  onSuccess:function(res){							  	 
				 var data = res.data;
			     for(key in data){
			    	 if(form.getField(key)){
			    		 form.setValue(key,data[key]);
			    	 }
			     }
				 
			  }
			});
		
		return form;
	},
	//用于初始化外部window的一些属性
	wfConfig: {
		//同意url 必输项
		completeUrl: CTX_PATH + '/test/dealByDeptManager',
		//回退url 
		backUrl: CTX_PATH + '/test/goBack',
		openWay: 'panel',
//		width:500,
//		height:400,
		title: '张三丰的请假申请',
		/*//打开方式 弹框用window ，嵌入用panel
		//弹出 window 宽度
		width:600,
		//弹出 window 高度
		height:400,
		//弹出 window title
		title: '一个申请',
		//自定义按钮
		actionButtons: [{ 
            text: '暂存',
            iconCls: 'icon-ok',
            handler: function(){ 
            	alert('暂存')
            }
        }],
        //同意表单提交前
        beforeCompleteSubmit: function(form){
        	alert('before');
        	return true;
        },
        //退回同意表单提交前
        beforeBackSubmit： function(form){
        
        },
        //同意表单提交成功后
        onCompleteSuccess: function(data){
        	alert('success')
        },
        //退回表单提交成功后
        onBackSuccess: function(data){
      
        }
        */
	}
	
})