Ext.define('App.common.chooser.UserGridChooserField',{
	extend: 'Ins.chooser.ChooserGirdField',
	xtype: 'app_usergridchooserfield',
	
	config: {		
		defaultUrl: CTX_PATH + '/system/user/loadList'
	},
	
	initComponent: function(){
	
		var me = this;
		
		if(me.url == undefined || me.url == null){
			me.url = me.defaultUrl;
		}		
		
		me.title = '人员选择器';
		
		me.fields = ['id','name','account','sex','idCard','phone','companyName', 'departmentName'];
		
		me.condition = {
			fields : [{
				text: '姓名',
				name: 'name'
			},{
				text: '账号',
				name: 'account'
			},{
				text: '所属机构',
				name: 'orgName'
			}]				
		};
		
		me.gridColumns = [{
				text: '姓名',
				dataIndex: 'name',
				width: 100,
				locked: true
			},{
				text: '账号',
				dataIndex: 'account',
				width: 135
			},{
				text: '性别',
				dataIndex: 'sex',
				width: 50
			},{
				text: '身份证号',
				dataIndex: 'idCard',
				width: 175
			},{
				text: '公司',
				dataIndex: 'companyName',				
				width: 280
			},{
				text: '部门',
				dataIndex: 'departmentName',				
				width: 280
			}	
		];
		
//		me.valueMapper = {
//			sex: function(val, v, record, index) {
//				if(val == '2'){
//					return '女';
//				}else{
//					return '男';
//				}
//			}			
//		};
		
		me.callParent(arguments);
				
	}
	
});