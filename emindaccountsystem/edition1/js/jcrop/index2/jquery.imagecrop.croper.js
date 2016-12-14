
if(typeof(jquery) == "undefined"){
	jquery = {};
}
if(typeof(jquery.imagecrop) == "undefined"){
	jquery.imagecrop = {};
}
/**
 * 截图工具
 * @param opts 配置
 */
jquery.imagecrop.croper = function(opts){
	
	var configs = opts;
	
	var me = this;
	
	var jcrop;
	var select;
	var bounds;
	
	this.getCrop = function(){
		return jcrop;
	}
	
	this.tellSelect = function(){
		return select;
	}
	
	this.getBounds = function(){
		return bounds;
	}
	
	/**
	 * 执行选区预览
	 * @param select
	 * @param bounds
	 */
	this.doPreview = function(select,bounds){
		var realWidth = bounds[0];
		var realHeight =  bounds[1];
		var previewContainerWidth = configs.previewContainer.width();
		var previewImgWidth = (configs.previewContainer.width() * realWidth) / select.w;

		configs.previewImg.attr("src", configs.orgImg.attr("src"));
		configs.previewImg.width(previewImgWidth);
		
		var marginLeft = (-1) * select.x * configs.previewImg.width() / realWidth;
		var marginTop = (-1) * select.y *  configs.previewImg.height() / realHeight;
		
		configs.previewImg.css("marginLeft", marginLeft);
		configs.previewImg.css("marginTop", marginTop);
		configs.previewImg.show();
	};
	/**
	 * 执行选取
	 * @param settings jcrop配置参数
	 */
	this.crop = function(settings){
		var cropSettings = {
			aspectRatio : configs.previewContainer.width() / configs.previewContainer.height(),
			onChange : function(){
				select = this.tellSelect();
				bounds = this.getBounds();
				me.doPreview(select,bounds);
			}
		};
		if(settings){
			$.extend(cropSettings,settings);
		}
		//jcrop = configs.orgImg.Jcrop(cropSettings);
		jcrop = $.Jcrop("#" + configs.orgImg.attr("id"), cropSettings);
	}
	/**
	 * 销毁
	 */
	this.desdroy = function(){
		if(jcrop && jcrop.destroy){
			jcrop.destroy();
		}
	}
}