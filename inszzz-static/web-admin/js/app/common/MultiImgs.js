Ext.define('App.common.MultiImgs',{
	extend: 'Ext.form.FieldContainer',
	//多重继承
	mixins: [        
        'Ext.form.field.Field'
    ], 
	alias : ["widget.ins_multiimgsfield"],
	config: {
		//label
		text : null,
		//获取焦点事件
		onFieldFocus : null,
		//失去焦点事件
		onFieldBlur : null,
		//改变内容事件
		onFieldChange : null,
		//验证提示消息显示在右边
		msgTarget: 'side',
		
		rtype:'img',//img,file
		multi: false,
		fileFieldName: 'uploadify',
		isTemp: true,
		module: '',	
		imgW:'100px',
		imgH:'100px',
		btnH:34,
		btnW:94,
		buttonText:'上传图片',
		
		uploadPath:CTX_PATH + '/fileupload',
		fileTypeExts:'*.jpg; *.png',
		fileSizeLimit:'40960KB',
		onSuccess: function(){
			
		},
		//图片上传区域只读
		_readOlny:false
	},
	//是否初始化
//    initialized: false,
	initComponent:function(){
		
		var me = this;
		
		console.log(me)
		
		var _value = me.value;
		
		//只有定义的时候才设置属性,否则会造成原始属性失效
		if(me.text != null){
			
			Ext.apply(me, {
				fieldLabel : me.text
			});
			
			//如果该项为必填项，则自动添加 *
			if(me.allowBlank!=undefined && !me.allowBlank){
				Ext.apply(me, {
					afterLabelTextTpl : FormToolkit.REQUIRED_TPL
				});
			}
		}
		
		var btn = Ext.create('Ext.Button', {
		    text: me.buttonText
		});
	    Ext.apply(me, {
			items : [btn]
		});
		
		var _id = me.getId();
		var fileFieldId = btn.getId();
		me.fileFieldId = fileFieldId;
		var imgViewDivId = _id+'_imgFileView';
		me.html = '<div id="'+_id+'_insdiv" style="width:100%;"><div class="upload-'+me.rtype+'-show" id="'+imgViewDivId+'"></div></div>';
		
		
		var cfg = {
			rtype:me.rtype,
			multi: me.multi,
			fileFieldName: me.fileFieldName,
			isTemp: me.isTemp,
			module: me.module,	
			imgW: me.imgW,
			imgH: me.imgH,
			btnH: me.btnH,
			btnW: me.btnW,
			buttonText: me.buttonText,
			
			uploadPath:me.uploadPath,
			fileTypeExts:me.fileTypeExts,
			fileSizeLimit:me.fileSizeLimit,
			
			imgViewDivId: imgViewDivId,
			fileFieldId: fileFieldId,
			fileFieldName: me.name,
			hiddenField: _id,
			currObj:me,
			onSuccess: me.onSuccess
		};
		
 		me.cfg = cfg;
		
		this.callParent(arguments);
		
		me.initField();
		
		me.on('render', function () {
			var value = me.value;
//			me.showFiles(value);
			/*if (value) {
				try {
				　　cfg.currentImgs=value.split(",");
				} catch(error) {
				　　　cfg.currentImgs=null;
				}
			}*/
			console.log('render')
			//判断是否只读
			cfg._readOlny=me._readOlny;
			me._initImage(cfg);
			me.setValue(value);
		});
	},
	
	_initImage: function(){
		var me = this;
		(function(cfg){
			var currObj = cfg.currObj;
			var image = function(){};
			var setting = getUploadSetting(cfg);
			initElement(cfg);
			//编辑时设置当前图片
			/*if(cfg.currentImgs!=undefined && cfg.currentImgs!=null && cfg.currentImgs.length>0){				
				for(var i=0; i<cfg.currentImgs.length; i++){
					onSuccess(cfg.currentImgs[i], cfg);
				}
			}*/
			$("#" + cfg.fileFieldId).uploadify(setting);
			function getUploadSetting(cfg){		
				var setting = {
					'fileSizeLimit': cfg.fileSizeLimit,
					'successTimeout': 7200,
				    'swf': STATIC_PATH + '/common/lib/uploadify/uploadify.swf',
				    'uploader': cfg.uploadPath,
				    'fileTypeExts': cfg.fileTypeExts,
				    'fileObjName': cfg.fileFieldName,
				    'formData': {
				    	'isTemp': cfg.isTemp, 
				    	'module': (cfg.module==undefined||cfg.module==null) ? "" : cfg.module, 
				    	'fileName': cfg.fileFieldName
				    },
				    'multi': cfg.multi,
				    'auto': true,
				    'height': cfg.btnH?cfg.btnH:34,
				    'width': cfg.btnW?cfg.btnW:94,
				    'buttonText': cfg.buttonText,
				    'overrideEvents': ['onDialogClose', 'onUploadSuccess', 'onUploadError', 'onSelectError'],
				    'onSelectError': currObj.uploadify_onSelectError,
				    'onUploadError': function (file, errorCode, errorMsg, errorString) {
				        TopMessage.error('上传失败');
				        return false;
				    },
				    'onUploadSuccess': function(file, data, response){
				    	var dataObject = JSON.parse(data);	
				    	var urlPath = dataObject.file.urlPath;
				    	var originalFilename = dataObject.originalFilename;
				    	onSuccess({filePath: urlPath,fileName: originalFilename}, cfg);
				    	if(cfg.onSuccess){
				    		cfg.onSuccess(file, data, response);
				    	}
				    }
				};
				return setting;
			};
			
			function initElement(cfg){
				var imgViewDiv = $("#" + cfg.imgViewDivId);		
				var imaViewUl = $("#" + cfg.imgViewDivId + "Ul");
				if(!(imaViewUl.length > 0)){
					imgViewDiv.append("<ul id=\""+cfg.imgViewDivId+"Ul\" class=\"list-inline\"></ul>");
					imaViewUl = $("#" + cfg.imgViewDivId + "Ul");
				}
			}
			
			function onSuccess(fileData, cfg){
				
				var imgViewDiv = $("#" + cfg.imgViewDivId);		
				var imaViewUl = $("#" + cfg.imgViewDivId + "Ul");
				
				var imgElement = createImgElement(fileData, cfg.imgViewDivId, cfg.hiddenField);
				
				if(cfg.multi == undefined || cfg.multi ==null){
					cfg.multi = false;
				}
				if(cfg.multi){
					imaViewUl.append(imgElement);
				}else{
					imaViewUl.html(imgElement);
				}		
				currObj.refreshHidden(cfg.imgViewDivId, cfg.hiddenField);		
			};
			
			function createImgElement(fileData, imgViewDivId, hiddenField){
				var imgElement = "<li urlPath=\""+fileData.filePath+"\" style=\"width:"+cfg.imgW+";height:"+cfg.imgH+"\"><img onclick=\"App.getClass('App.common.Utils').previewImg('"+fileData.filePath+"')\" style=\"width:"+cfg.imgW+";height:"+cfg.imgH+"\" src=\""+FILE_PATH + fileData.filePath+"\" alt=\"\" /><div class=\"delet-btn\" style=\"z-index: 999;position: absolute;width: 12px;height: 12px;display: block;left: 86px;top: 1px;\" onclick=\"App.getClass('App.common.MultiImgs').deleteImage(this,'"+imgViewDivId+"','"+hiddenField+"')\"></div></li>";
				if (cfg.rtype=='file') {
					imgElement = "<li urlPath=\""+fileData.filePath+"\"><a style='text-decoration: underline;color: blue;' class=\"filelist\" href=\""+FILE_PATH+fileData.filePath+"\" alt=\"\"  target=\"view_window\" >"+fileData.fileName+"</a><a class=\"delet-btn\" onclick=\"App.getClass('App.common.MultiImgs').deleteImage(this,'"+imgViewDivId+"','"+hiddenField+"')\">删除</a></li>";
				}
				return imgElement;
			}
			
			image.pushImgs = function(urlPaths, cfg){
				if(urlPaths!=undefined && urlPaths!=null && urlPaths.length>0){				
					for(var i=0; i<urlPaths.length; i++){
						onSuccess(urlPaths[i], cfg);
					}
				}
			};
			if (currObj._readOlny) {
				currObj.setReadOnly(true);
			}
		})(me.cfg);
		
	},
	setReadOnly: function(flag){
    	var me = this; 
    	var fileFieldId = me.fileFieldId;
    	var divId = me.id+'_insdiv';
    	if(flag){
    		me._readOlny=true;
	    	$("#"+fileFieldId).hide();
	    	$("#"+divId +" .delet-btn").hide();
    	}else{
    		me._readOlny=false;
    		$("#"+fileFieldId).show();
    		$("#"+divId +" .delet-btn").show();
    	}
    	
    },
	refreshHidden: function(imgViewDivId, hiddenField){
		var me = this;
		var imgs = $("#" + imgViewDivId).find("li");	
		if(imgs.length > 0){
			var hiddenValue = "";
			var urlPath,name;
			var arr = [];
			imgs.each(function(i,o){
				if (me.rtype=="file") {
					urlPath=$(this).attr("urlPath");
					name=$(this).find('a:eq(0)').text();
					if (urlPath) {
						arr.push({fileName:name,filePath:urlPath});
					}
				}else{
					urlPath=$(this).attr("urlPath");
					if (urlPath) {
						hiddenValue += urlPath + ",";
						arr.push(urlPath);
					}
				}
			});
			hiddenValue = JSON.stringify(arr);
			App.getCom(hiddenField).setValue(hiddenValue,true);
		}else{
			App.getCom(hiddenField).setValue('',true);
		}		
	},
	
	deleteImage: function(obj, imgViewDivId, hiddenField){
		var me = this;
		obj.parentNode.parentNode.removeChild(obj.parentNode);
		me.refreshHidden(imgViewDivId, hiddenField);
	},
	
	uploadify_onSelectError: function(file, errorCode, errorMsg) {  
        var msgText = "";  
        switch (errorCode) {  
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:  
                msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";  
                break;  
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:  
                msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";  
                break;  
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:  
                msgText += "文件大小为0";  
                break;  
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:  
                msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;  
                break;  
            default:  
                msgText += "错误代码：" + errorCode + "\n" + errorMsg;  
        }
        TopMessage.error(msgText);
    },
    setValue:function(val,flag){
    	var me = this;
    	if(!val) {
    		this.value = '';
    		var imaViewUl = $("#" + me.cfg.imgViewDivId + "Ul");
    		imaViewUl.html("");
    		return;
    	}
    	if(val instanceof Array){
			var fileDataList = val;
			val = JSON.stringify(val);
		}else{
			var fileDataList = JSON.parse(val);
		}
    	this.value = val;
    	var cfg = me.cfg;
    	if(!flag){
    		var imgViewDiv = $("#" + cfg.imgViewDivId);		
    		var imaViewUl = $("#" + cfg.imgViewDivId + "Ul");
    		imaViewUl.html('');
    		for(var i=0;i<fileDataList.length;i++){
    			var filePath = fileDataList[i];
    			
    			var imgElement = me.createImgElement({filePath:filePath}, cfg.imgViewDivId, cfg.hiddenField);
    			
    			if(cfg.multi == undefined || cfg.multi ==null){
    				cfg.multi = false;
    			}
    			if(cfg.multi){
    				imaViewUl.append(imgElement);
    			}else{
    				imaViewUl.html(imgElement);
    			}		
    		}
    		
        	var divId = me.id+'_insdiv';
        	if(me._readOlny){
    	    	$("#"+divId +" .delet-btn").hide();
        	}else{
        		$("#"+divId +" .delet-btn").show();
        	}
    		
    	}
    },
    
    createImgElement: function(fileData, imgViewDivId, hiddenField){
    	var cfg = this.cfg;
		var imgElement = "<li urlPath=\""+fileData.filePath+"\" style=\"width:"+cfg.imgW+";height:"+cfg.imgH+"\"><img onclick=\"App.getClass('App.common.Utils').previewImg('"+fileData.filePath+"')\" style=\"width:"+cfg.imgW+";height:"+cfg.imgH+"\" src=\""+FILE_PATH + fileData.filePath+"\" alt=\"\" /><div class=\"delet-btn\" style=\"z-index: 999;position: absolute;width: 12px;height: 12px;display: block;left: 86px;top: 1px;\" onclick=\"App.getClass('App.common.MultiImgs').deleteImage(this,'"+imgViewDivId+"','"+hiddenField+"')\"></div></li>";
		if (cfg.rtype=='file') {
			imgElement = "<li urlPath=\""+fileData.filePath+"\"><a style='text-decoration: underline;color: blue;' class=\"filelist\" href=\""+CTX_PATH+"/downloadFile?fileName="+fileData.fileName+"&filePath="+fileData.filePath+"\" alt=\"\" >"+fileData.fileName+"</a><a class=\"delet-btn\" onclick=\"App.getClass('App.common.MultiImgs').deleteImage(this,'"+imgViewDivId+"','"+hiddenField+"')\">删除</a></li>";
		}
		return imgElement;
	}
   
	
})