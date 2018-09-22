/**
 * 流程设计图
 */
Ext.define('App.sys.system.workflow.Design',{
	init: function(procDefId){
		var me = this;
		 
		var src = CTX_PATH + '/workflow/edit/getDesign/modeler.html?_v='+new Date().getTime();
		if(procDefId && procDefId != ''){
			src += '&procDefId=' + procDefId;
		}
		src = encodeURI(src);
		var view = Ext.create('Ins.panel.Panel',{
			html: '<iframe width="100%" height="100%" src="'+src+'">'
		});
		
		return view;	
	}
})