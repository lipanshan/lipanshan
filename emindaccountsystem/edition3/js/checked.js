$(function (){
	function checkedFn(id){
		id.unbind("click").click(function (){
			var clickelem = id.parent().children();
			for(var i = 0; i< clickelem.size(); i++ ){
				if(clickelem.eq(i)[0].className == 'lcheckb'&&id[0].checked == true ){
					clickelem.eq(i).css('backgroundPosition','-26px 0');
				}else if(clickelem.eq(i)[0].className == 'lcheckb'&&id[0].checked == false ){
					clickelem.eq(i).css('backgroundPosition','0 0');
				}
			}
		})
	}
	function radioFn(id){
		id.unbind("click").click(function (){
			var radios = id.parent().parent().find('*');
			var showRadio;
			clearRadio();
			for(var i = 0; i<radios.size();i++){
				if(radios.eq(i).attr('type') == 'radio'){
					if(radios.eq(i).attr('checked') == 'checked'){
						showRadio = id.next().next();
						if(showRadio){
							showRadio[0].style.backgroundPosition = '-26px 0';
						}
					}
					
				}
			}
			
		});
		function clearRadio(){
			var elems = $('.lgenderlist').eq(0).find('*');
			for(var s = 0; s< elems.size(); s++){
				if(elems.eq(s)[0].className == 'lcheckb'){
					elems.eq(s)[0].style.backgroundPosition = '0 0';
				}
			}
		}
	}
	checkedFn($('#wr'));
	checkedFn($('#cg'));
	checkedFn($('#hp'));
	checkedFn($('#lc'));
	checkedFn($('#nx'));
	checkedFn($('#wx'));
	checkedFn($('#kl'));
	checkedFn($('#hs'));
	checkedFn($('#cm'));
	checkedFn($('#jz'));
	checkedFn($('#wz'));
	checkedFn($('#xx'));
	checkedFn($('#xz'));
	checkedFn($('#bj'));
	checkedFn($('#xgzt'));
	checkedFn($('#sc'));
	radioFn($('#man'));
	radioFn($('#woman'));
	radioFn($('#baomi'));
	// 当需要加载的时候某项需要被选中的时候,id为select的id
	function checkedFn2(idelem){
		idelem.attr('checked',true);
		idelem.trigger('click');
	}
	function selectFn(idelem){
		var returnval;
		var onoff = 0;
		idelem.hide(0);
		selectName = idelem.attr('name');
		idelem=idelem.parent();
		idelem.unbind("click").click(function (ev) {
			offAllList();
			var list = $(this).find('.lselectlist').eq(0);
			list.show(0);
			var elem = list.children();
			var elemHtml = $(this).find('.lselectshow');
			var inputVal = $(this).find('.linputval');
			if(selectName)inputVal.attr('name',selectName);
			addclick(elem,inputVal,elemHtml);
			if(onoff){
				list.hide(0);
				onoff = 0;
			}
			ev.originalEvent.cancelBubble = true;
		});
		function addclick(elem,inputVal,elemHtml){
			
			for(var i = 0; i < elem.size();i++){
				elem.unbind('click').click(function (ev){
					var _this = $(this);
					inputVal.val(_this.val());
					elemHtml.html(_this.html());
					onoff = 1;
					returnval = _this.val()+'&'+_this.html();
				});
			}
		}
		$(document).unbind('click').click(function (){
			offAllList();
		});
		function offAllList(){
			for(var i=0; i< $('.lselectlist').size(); i++){
				$('.lselectlist').eq(i).hide(0);
			}
		}
		return returnval;
	}
	selectFn($('#shape'));
	selectFn($('#loveMarriage')); 
	selectFn($('#personalhabits1'));
	selectFn($('#personalhabits2'));
	selectFn($('#personalhabits3'));
	selectFn($('#educationLevel'));
	selectFn($('#currentempm'));
	selectFn($('#year'));
	selectFn($('#month'));
	selectFn($('#bloodtype'));
	selectFn($('#birthadress1'));
	selectFn($('#birthadress2'));
	selectFn($('#liveaddress1'));
	selectFn($('#liveaddress2'));
	selectFn($('#normalmanager'));
	// 当需要加载的时候某项需要被选中的时候,id为select的id
	function selected(id,val,html){
		var inputVal = id.parent().find('.linputval');
		var elemHtml = id.parent().find('.lselectshow');
		inputVal.val(val);
		elemHtml.html(html);
	}
});