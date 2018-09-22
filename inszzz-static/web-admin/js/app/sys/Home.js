Ext.define('App.sys.Home', {
	
	title_zh_CN: '门户',
	title_en_US: 'Portal',
	
	init: function(){
	
		var me = this;
		
		var view = {
			title: App.getLocaleText(me, 'title'),
	        xtype: 'dashboard',
	        //bodyStyle: 'background-image:url('+App.LAYOUT_BG+')',
	        stateful: false,	
	        columnWidths: [
	            0.35,
	            0.40,
	            0.25
	        ],
	        parts: {  
	            portal1: {
	                viewTemplate: {
	                    title: 'portal1',
	                    closable: false,
	                    items: [{
	                        html: 'portal1'
	                    }]
	                }
	            },	
	            portal2: {
	                viewTemplate: {
	                    title: 'portal2',
	                    closable: false,
	                    items: [{
	                        html: 'portal2'
	                    }]
	                }
	            },
	            portal3: {
	                viewTemplate: {
	                    title: 'portal3',
	                    closable: false,
	                    items: [{
	                        html: 'portal3'
	                    }]
	                }
	            },
	            portal4: {
	                viewTemplate: {
	                    title: 'portal4',
	                    closable: false,
	                    items: [{
	                        html: 'portal4'
	                    }]
	                }
	            }
	        },
	
	        defaultContent: [{
	            type: 'portal1',
	            columnIndex: 0,
	            height: 500
	        }, {
	            type: 'portal2',
	            columnIndex: 1,
	            height: 300
	        }, {
	            type: 'portal3',
	            columnIndex: 1,
	            height: 300
	        }, {
	            type: 'portal4',
	            columnIndex: 2,
	            height: 350
	        }]
	    }
	    
	    return view;
		
	}
	
});