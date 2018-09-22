Ext.define('App.main.Bottom', {

	init : function() {

		var bottomBar = Ext.create("Ext.Component", {
			height : '16px',
			html : '<div style="font-size:10px;text-align:right;background:#444444;color:#cbcbcb">Copyright © 2017 Westerasoft Inc. All Rights Reserved.</div>'
		})

		return bottomBar;

	}

});

