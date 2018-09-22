Ext.define('App.test.DemoStartForm',{
	init: function(idConfig){
		var me = this;
		
		var form = Ext.create('Ins.form.Form',{
			fields: [
				{name:'startTime',text:'请假开始时间',xtype: 'ins_datetimefield'},
				{name:'days',text:'请假天数',xtype: 'ins_numberfield'},
				{name:'sex',text:'性別',value:'男',xtype: 'ins_hiddenfield'}
			]
		});
		return form;
	},
	//用于初始化工作流的一些属性
	wfConfig: {
		//流程发起url 必输项
		startProcessUrl: CTX_PATH + '/test/startProcessInst',
		//打开方式 弹框用window ，嵌入用panel
		openWay: 'panel'
		  
		/*
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
        //表单提交前
        beforeSubmit: function(form){
        	alert('before');
        	return true;
        },
        //表单提交成功后
        onSuccess: function(data){
        	alert('success')
        }*/
	}
	
})