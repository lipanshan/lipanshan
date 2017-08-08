
// =====================================
// 文本题目录入生成预览 编写：李盼山
// =====================================

$(function (){
	var allQuestion = [];
	function checkitems(arr){ //判断每个选项都是[A-Z]+XXXXX格式
		for(var j = 0; j<arr.length; j++){
			if(!/^\s*[A-Z].*$/g.test(arr[j])){
				return false;
			}
		}
		return true;
	}
	$('#cont').bind('blur',function (){  //将信息生成数组
		allQuestion.length = 0;
		var allInfo = $('#cont').val().split(/\n+/g);
		allInfo.forEach(function (value,i){
			value = value.trim();
			if(value){
				if (/^\s*\d.+$/g.test(value)) {
					allQuestion.push({
						'titleQuestion':value,
						'items':[],
						'answer':[],
						'answerContent':[],
						'type':''
					});
				} else if (/^\s*答案.*$/g.test(value)&&allQuestion.length&&allQuestion[allQuestion.length-1].titleQuestion){
					allQuestion[allQuestion.length-1].answer.push(value);
				} else if (allQuestion.length&&allQuestion[allQuestion.length-1].titleQuestion){
					if (!allQuestion[allQuestion.length-1].answer.length){
						allQuestion[allQuestion.length-1].items.push(value);
					} else {
						allQuestion[allQuestion.length-1].answerContent.push(value);
					}
				}
			}
		});	
		var valStr = '';
		allQuestion.forEach(function (v,i){ //根据规则分配类型（单选、简答题）
			if(v.items.length == 4 && checkitems(v.items)){ 
				v.type = 'radio';
				v.items[0] = v.items[0].replace(/^\s*[A-Z]/,'A');
				v.items[1] = v.items[1].replace(/^\s*[A-Z]/,'B');
				v.items[2] = v.items[2].replace(/^\s*[A-Z]/,'C');
				v.items[3] = v.items[3].replace(/^\s*[A-Z]/,'D');
			} else {
				v.type = 'answer';
			}
			v.titleQuestion = v.titleQuestion.replace(/^\s*\d/,i+1);
			valStr+=v.titleQuestion+'\n';
			valStr+=v.items.join('\n')+'\n';
			valStr+=v.answer+'\n';
			valStr+=v.answerContent.join('\n')+'\n';
		});
		$(this).val(valStr);
		console.log(allQuestion);
	});
	$('#cont').trigger('blur');
	
	$('#previewBtn').click(function (){ //根据类型（type）生成题目
		var str = '';
		allQuestion.forEach(function (elem,i){
			if(elem.type == 'radio'){
				str+='<dl class="titlehead"><dt>'+elem.titleQuestion+'</dt>';
				$.each(elem.items,function (index,ele){
					str+='<dd>'+ele+'</dd>';
				});
				str+='</dl>';
				if(elem.answer.length>=1){
					str+='<div>'+elem.answer.join(',')+'<div>';
				}
			}
			if(elem.type == 'answer'){
				str+='<dl class="titlehead"><dt>'+elem.titleQuestion+'</dt>';
				$.each(elem.items,function (index,ele){
					str+='<dd>'+ele+'</dd>';
				});
				str+='</dl>';
				if(elem.answer.length>=1){
					str+='<div>'+elem.answer.concat(elem.answerContent.join()).join()+'<div>';
				}
			}
		});
		$('#textareaview').html(str);
	});
});