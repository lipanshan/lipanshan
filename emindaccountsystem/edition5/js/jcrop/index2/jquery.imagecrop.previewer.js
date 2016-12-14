
if(typeof(jquery) == "undefined"){
	jquery = {};
}
if(typeof(jquery.imagecrop) == "undefined"){
	jquery.imagecrop = {};
}
/**
 * 预览器
 * @param file 用于测试是否支持html5
 */
jquery.imagecrop.previewer = function(file){
	var browserVersion = window.navigator.userAgent.toUpperCase();
	var jcroper;
	var me = this;
	var supportHTML5 = false;
	
	var html =  '<span class="image-crop-container">' +
					'<fieldset class="image-crop-fieldset">' +
						'<legend>原图</legend>' +
						'<div class="image-crop-org-container" id="image_crop_org_container">' +
							'<div id="image_crop_org_div" class="image-crop-org-div"></div>' +
							'<img id="image_crop_org_img" class="image-crop-org-img" src="images/touming.gif"/>' +
						'</div>' +
					'</fieldset>' +
					'<div class="image-crop-container">' +
						'<fieldset class="image-crop-fieldset simple-div">' +
							'<legend>缩略图</legend>' +
							'<div class="image-crop-preview-container" id="image_crop_preview_container">' +
								'<div id="image_crop_preview_div"></div>' +
								'<img id="image_crop_preview_img" src="images/touming.gif"/>' +
							'</div>' +
						'</fieldset>' +
					'</div>' +
				'</span>';
	/**
	 * 判断是否数组
	 * @param obj 参数对象
	 * @returns boolean
	 */
	var isArray = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
	/**
	 * 继承
	 * @param a 基础对象
	 * @param b 为object时，继承其所有属性，为array时，继承其所有成员的所有属性
	 * @return 组成对象
	 */
	var extend = function(a, b){
		if(a){
			if(isArray(b)){
				for(var i in b){
					var o = b[i];
					for(var p in o){
						a[p] = o[p];
					}
				}
			}else if(typeof(b) == "object"){
				for(var p in b){
					a[p] = b[p];
				}
			}
			return a;
		}
	}
	/**
	 * 默认配置
	 */
	var defaultConfig = {
		jcropBaseClass : "jcrop",
		fileChooser : file
	};
	
	/**
	 * 获取jcrop对象
	 * @returns jcrop
	 */
	this.getCrop = function(){
		if(!jcroper){
			return undefined;
		}else{
			return jcroper.getCrop();
		}
	}
	
	/**
	 * 获取选框的值（实际尺寸）
	 * @returns select{x,y,x2,y2,w,h}
	 */
	this.tellSelect = function(){
		if(!jcroper){
			return undefined;
		}else{
			return jcroper.tellSelect();
		}
	}
	
	/**
	 * 获取选框的值（界面尺寸）
	 * @returns select{x,y,x2,y2,w,h}
	 */
	this.tellScaled = function(){
		if(!jcroper){
			return undefined;
		}else{
			return jcroper.getCrop().tellScaled();
		}
	}
	
	/**
	 * 获取图片实际尺寸
	 * @returns [w, h]
	 */
	this.getBounds = function(){
		if(!jcroper){
			return undefined;
		}else{
			return jcroper.getBounds();
		}
	}
	
	/**
	 * 获取图片显示尺寸
	 * @returns [w, h]
	 */
	this.getWidgetSize = function(){
		if(!jcroper){
			return undefined;
		}else{
			return jcroper.getCrop().getWidgetSize();
		}
	}
	
	/**
	 * 获取图片缩放的比例
	 * @returns [w, h]
	 */
	this.getScaleFactor = function(){
		if(!jcroper){
			return undefined;
		}else{
			return jcroper.getCrop().getScaleFactor();
		}
	}
	
	
	/**
	 * 初始化
	 * @param container
	 * @param emptyImage
	 * @param file
	 */
	this.init = function(container, emptyImage){
		$(container).html(html);
		var c = {
			enterBtn : $("#image_crop_enter_btn"),
			cancelBtn : $("#image_crop_cancel_btn"),
			orgContainer : $("#image_crop_org_container"),
			orgDiv : $("#image_crop_org_div"),
			orgDivClass : "image-crop-org-div",
			orgImg : $("#image_crop_org_img"),
			orgImgClass : "image-crop-org-img",
			previewContainer : $("#image_crop_preview_container"),
			previewDiv : $("#image_crop_preview_div"),
			previewImg : $("#image_crop_preview_img"),
			emtpyImage : emptyImage
		};
		/**
		 * 继承配置
		 */
		this.configs = $.extend(defaultConfig , c);
		jcroper = new jquery.imagecrop.croper(this.configs);
	}
	
	/**
	 * 销毁，在预览前调用，清除上一次预览结果
	 */
	this.desdroy = function(){
		if(typeof(this.configs) == "undefined"){
			return;
		}
		var parent = this.configs.orgDiv.parent();
		//----------reset org div----------
		this.configs.orgDiv.remove();
		var divId = "image_crop_org_div_" + new Date().getTime();
		var divDom = document.createElement("div");
		divDom.id = divId;
		parent.append($(divDom));
		this.configs.orgDiv = $("#" + divId);
		this.configs.orgDiv.addClass(this.configs.orgDivClass);
		//----------reset org div----------
		//----------reset org img----------
		this.configs.orgImg.remove();
		var imgId = "image_crop_org_img_" + new Date().getTime();
		var imgDom = document.createElement("img");
		imgDom.id = imgId;
		parent.append($(imgDom));
		this.configs.orgImg = $("#" + imgId);
		this.configs.orgImg.addClass(this.configs.orgImgClass);
		//----------reset org img----------
		//----------reset preview div----------
		//通过滤镜实现缩略图预览
		this.configs.previewDiv.css(
			"filter",
			"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + this.configs.emptyImage + "')"
		);
		//----------reset preview div----------
		//----------reset preview img----------
		this.configs.previewImg.attr("src", this.configs.emtpyImage);
		//----------reset preview img----------
	}
	/**
	 * 预览图片
	 * @param file 选择文件的input对象
	 */
	this.preview = function(file){
		//设置预览
		this.configs.orgImg.height("auto");
		this.configs.orgImg.attr("src", file.value);
		//级联变动
		this.configs.orgDiv.hide();
		this.configs.previewDiv.hide();
		this.configs.orgImg.show();
		this.configs.previewImg.show();
		//初始化截图工具
		this.doCrop(file.value);
	}
	
	/**
	 * 对预览图片进行截图初始化
	 * @param src 图片源
	 * @param settings 可选参数，用于指定jcrop参数，但需在指定自定义doPreview时才其作用
	 * @param doPreview 可选参数，自定义doPreview，用于jcrop回调，方法入参：select,bounds。参见jcrop。
	 */
	this.doCrop = function(src, settings, doPreview){
		//如果当前已存在jcroper，则先销毁重建
		if(jcroper){
			jcroper.desdroy();
		}
		$("." + this.configs.jcropBaseClass + "-holder").remove();
		jcroper = new jquery.imagecrop.croper(this.configs);
		//DIV预览实现
		if(doPreview){
			jcroper.doPreview = doPreview;
			jcroper.crop(settings);
		//IMG预览实现
		}else{
			jcroper.crop();
		}
	}
	if(file.files){
		supportHTML5 = true;
	}else{
		supportHTML5 = false;
	}
	//进行浏览器判断，选择对应的实现方式
	if(supportHTML5){
		return extend(this, new jquery.imagecrop.previewer.impls("html5Preview"));
	} else if (browserVersion.indexOf("MSIE") > -1 && browserVersion.indexOf("MSIE 6") > -1) {
		return extend(this, new jquery.imagecrop.previewer.impls("ie6Preview"));
	} else if (browserVersion.indexOf("MSIE") > -1 && browserVersion.indexOf("MSIE 6") <= -1) {
		return extend(this, new jquery.imagecrop.previewer.impls("ie7to9Preview"));
	} else if (browserVersion.indexOf("FIREFOX") > -1) {
		return extend(this, new jquery.imagecrop.previewer.impls("firefoxPreview"));
	} else{
		return this;
	}
}
/**
 * 不同浏览器的实现方式
 * @param name 实现方式名称
 */
jquery.imagecrop.previewer.impls = function(name){
	var impls = {
		/**
		 * ie6实现
		 */
		ie6Preview : function(){
			var me = this;
			this.preview = function(file){
				//设置预览
				this.configs.orgImg.height("auto");
				this.configs.orgImg.attr("src", file.value);
				//级联变动
				this.configs.orgDiv.hide();
				this.configs.previewDiv.hide();
				this.configs.orgImg.show();
				this.configs.previewImg.show();
				//初始化截图工具
				this.doCrop(file.value);
			}
			return this;
		},
		/**
		 * ie7+实现
		 */
		ie7to9Preview : function(){
			var me = this;
			/**
			 * 获取图片的实际大小
			 * @param tmpSrc 图片源
			 * @return {w,h} 宽和高
			 */
			this.getImageBounds = function(tmpSrc){
				var imgObj = new Image();
				imgObj.src = tmpSrc;
				var width = imgObj.width;
				var height = imgObj.height;
				if((typeof width=="undefined" || width==0) && (typeof height=="undefined" || height==0)){
					var picpreview=document.getElementById("image_crop_org_container");
				    var tempDiv=document.createElement("div");
				    picpreview.appendChild(tempDiv);
				    tempDiv.style.width="10px";
				    tempDiv.style.height="10px";
				    tempDiv.style.diplay="none";
				    tempDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src='" + tmpSrc + "');";
				    tempDiv.ID="previewTemp" + new Date().getTime();
				    width=tempDiv.offsetWidth;
				    height=tempDiv.offsetHeight;
				    picpreview.removeChild(tempDiv);
				}
				var w = me.configs.orgContainer.width();
				var h = height * w / width;
				return {w:w,h:h};
			};
			/**
			 * ie7+为div预览，需要实现自定义doPreview
			 * @param select 选区
			 * @param bounds 实际内容
			 */
			this.doPreview = function(select,bounds){
				var realWidth = bounds[0];
				var realHeight =  bounds[1];
				//计算预览大小
				var previewContainerWidth = me.configs.previewContainer.width();
				var previewDivWidth = (me.configs.previewContainer.width() * realWidth) / select.w;
				var previewDivHeight = (me.configs.previewContainer.height() * realHeight) / select.h;
				//通过滤镜实现缩略图预览
				me.configs.previewDiv.css(
					"filter",
					"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + me.configs.orgImg.attr("realSrc") + "')"
				);
				//设定预览大小
				me.configs.previewDiv.height(previewDivHeight);
				me.configs.previewDiv.width(previewDivWidth);
				//计算偏移
				var marginLeft = (-1) * select.x * me.configs.previewDiv.width() / realWidth;
				var marginTop = (-1) * select.y *  me.configs.previewDiv.height() / realHeight;
				//设置偏移实现剪切
				me.configs.previewDiv.css("marginLeft", marginLeft);
				me.configs.previewDiv.css("marginTop", marginTop);
				me.configs.previewDiv.show();
				me.configs.orgImg.show();
			}
			
			this.preview = function(file){
				me = this;
				file.select();
				var browserVersion = window.navigator.userAgent.toUpperCase();
				//如果是ie9需要触发blur事件，避免被安全规则阻拦
				if (browserVersion.indexOf("MSIE 9") > -1){
					file.blur();// 不加上document.selection.createRange().text在ie9会拒绝访问
				}
				var tmpSrc = document.selection.createRange().text;
				//设置原图预览滤镜
				this.configs.orgDiv.css(
					"filter",
					"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + tmpSrc + "')"
				);
				//获取图片实际大小（由于使用缩放滤镜scale必须指定div宽高，无法做到自适应，因此先通过image滤镜获取实际大小）
				var bounds = this.getImageBounds(tmpSrc);
				//级联变动
				this.configs.orgDiv.width(bounds.w);
				this.configs.orgDiv.height(bounds.h);
				this.configs.orgDiv.show();
				//需要对透明的img使用绝对定位并设置offset为预览div的offset，避免jcrop无法覆盖在预览div上面
				this.configs.orgImg.css("position","absolute");
				this.configs.orgImg.css("display","inline-block");
				this.configs.orgImg.offset(this.configs.orgDiv.offset());
				this.configs.orgImg.width(bounds.w);
				this.configs.orgImg.height(bounds.h);
				this.configs.orgImg.attr("src", this.configs.emtpyImage);
				this.configs.orgImg.attr("realSrc", tmpSrc);
				this.configs.orgImg.show();
				this.configs.previewDiv.show();
				this.configs.previewImg.hide();
				//初始化截图工具
				this.doCrop(
					this.configs.emtpyImage,{
						bgColor : "#00000000" //DIV预览需要遮盖物透明
					},this.doPreview
				);
			}
			return this;
		},
		/**
		 * 火狐浏览器实现
		 */
		firefoxPreview : function(){
			this.preview = function(file){
				var browserVersion = window.navigator.userAgent.toUpperCase();
				var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
				var src;
				// firefox7以下版本
				if (firefoxVersion < 7) {
					src = file.files[0].getAsDataURL();
				// firefox7.0+
				} else {
					src = window.URL.createObjectURL(file.files[0]);
				}
				//设置预览
				this.configs.orgImg.height("auto");
				this.configs.orgImg.attr("src", src);
				//级联变动
				this.configs.orgDiv.hide();
				this.configs.previewDiv.hide();
				this.configs.orgImg.show();
				this.configs.previewImg.show();
				//初始化截图工具
				this.doCrop(src);
			}
			return this;
		},
		/**
		 * html5实现
		 */
		html5Preview : function(){
			this.preview = function(file){
				var me = this;
				var browserVersion = window.navigator.userAgent.toUpperCase();
				if (window.FileReader) {
					var reader = new FileReader();
					reader.onload = function(e) {
						me.configs.orgImg.height("auto");
						me.configs.orgImg.width(me.configs.orgContainer.width());
						me.configs.orgImg.attr("src", e.target.result);
						me.configs.orgImg.show();
						//设置预览
						//级联变动
						me.configs.orgDiv.hide();
						me.configs.previewDiv.hide();
						me.configs.orgImg.show();
						me.configs.previewImg.show();
						//初始化截图工具
						me.doCrop(e.target.result);
					}
					reader.readAsDataURL(file.files[0]);
				} else if (browserVersion.indexOf("SAFARI") > -1) {
					alert("不支持Safari6.0以下浏览器的图片预览!");
				}
			}
			return this;
		},
		/**
		 * 默认实现
		 */
		defaultPreview : function(){
			this.preview = function(file){
				//设置预览
				this.configs.orgImg.height("auto");
				this.configs.orgImg.attr("src", file.value);
				//级联变动
				this.configs.orgDiv.hide();
				this.configs.previewDiv.hide();
				this.configs.orgImg.show();
				this.configs.previewImg.show();
				//初始化截图工具
				this.doCrop(file.value);
			}
			return this;
		}
	}
	return impls[name]();
}