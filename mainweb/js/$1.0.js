function $(name,parent){//如果没有指定父级，那么parent走document否则走指定的父级。
		/*
			如果设置了 parent,parent就是有值的，否则为undefined
			相当于设置一个默认值为document
		*/
//		if(!parent){
//			parent = document;
//		}
		parent = parent || document;
		//alert(parent)
		
		var oTa = name.charAt(0);
		var aEle = parent.getElementsByTagName('*');
		var arr = [];
		//console.log(aEle)
		if(oTa === '#'){
			var Id = name.substring(1);
			return document.getElementById(Id);
		}else if(oTa === '.'){
			var sClass = name.substring(1);
			
			if(parent.getElementsByClassName){
				return parent.getElementsByClassName(sClass);
			}else{
				for(var i=0;i<aEle.length;i++){
					/*
						'active abc' == 'active' 
						
						将找到的className用空格切开，然后再一一匹配，如果匹配到就push数组中
					*/
					var aClass = aEle[i].className.split(' ');
					
					for(var j=0;j<aClass.length;j++){
						if(aClass[j] == sClass){
							arr.push(aEle[i]);
						}
					}
				}
				return arr;
			}
		}else{
				return parent.getElementsByTagName(name);
			}		
	}