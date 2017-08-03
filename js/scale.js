window.onload = function (){
	var Portfolioa1 = $('#Portfolioa1');
	var imgS1 = Portfolioa1.children[0];
	imgScale(Portfolioa1,imgS1);
	var Portfolioa2 = $('#Portfolioa2');
	var imgS2 = Portfolioa2.children[0];
	imgScale(Portfolioa2,imgS2);
	var Portfolioa3 = $('#Portfolioa3');
	var imgS3 = Portfolioa3.children[0];
	imgScale(Portfolioa3,imgS3);
	var Portfolioa4 = $('#Portfolioa4');
	var imgS4 = Portfolioa4.children[0];
	imgScale(Portfolioa4,imgS4);
	var Portfolioa5 = $('#Portfolioa5');
	var imgS5 = Portfolioa5.children[0];
	imgScale(Portfolioa5,imgS5);
	var Portfolioa6 = $('#Portfolioa6');
	var imgS6 = Portfolioa6.children[0];
	imgScale(Portfolioa6,imgS6);
	function imgScale(index,index2){
		var maskbox = $('#maskbox');
		var divMask = $('#divMask');
		index.addEventListener('click', clickFn);
		window.addEventListener('resize', scrollFn);
		function clickFn(ev){
			var docW = document.documentElement.offsetWidth;
			var docH = document.documentElement.offsetHeight;
			maskbox.style.display = 'block';
			divMask.style.width = docW +'px';
			divMask.style.height = docH +'px';
			divMask.style.display = 'block';
			if(docW >= docH){
				maskbox.style.top = window.pageYOffset +docH*.2 +'px';
				maskbox.style.left = (docW - docH*.6/4*7)/2 + 'px'; 
				maskbox.style.height = docH*.6 + 'px';
				maskbox.style.width = docH*.6/4*7 + 'px';
				
			}else {
				maskbox.style.width = docW*.8 + 'px';
				maskbox.style.height = docW*.8/7*4 + 'px';
				maskbox.style.top = window.pageYOffset +(docH - docW*.8/7*4)/2 +'px';
				maskbox.style.left = docW*.1 + 'px'; 
			}
			divMask.style.top = window.pageYOffset +'px';
			var srcM = index2.getAttribute('src');
			var spans = maskbox.getElementsByTagName('span');
			var img = maskbox.getElementsByTagName('img')[0];
			img.src = srcM.split('-').join('big');
			spans[0].addEventListener('click', clickFnx);
			function clickFnx(){
				divMask.style.display = 'none';
				maskbox.style.display = 'none';
			}
		}
		document.addEventListener('scroll', scrollFn);
		function scrollFn(){
			if(divMask.style.display == 'block'){
				clickFn();
			}else {
				return; 
			}
		}
	}
	menu();
	function menu(){
		var menuMain = $('#menumain');
		var menuNav = $('#menuNav');
		var header = $('#header');
		var headerH = header.offsetHeight;
		var menuH = menuNav.scrollHeight;
		var menuBtnW = menuNav.clientWidth;
		var offOn = false;
		menuMain.addEventListener('click', menuFn);
		window.addEventListener('resize', menuFn2);
		menuNav.addEventListener('mouseover', moveoFn);
		function menuFn(){
			var dWidth = document.documentElement.clientWidth;
			if(!offOn&&dWidth < 996){
				offOn = true;
				menuNav.style.height = menuH + 'px';
				header.style.height = headerH + menuH +'px';
			}else {
				offOn = false;
				menuNav.style.height = 0;
				header.style.height = headerH + 'px';
			}
		}
		function menuFn2(){
			var dWidth = document.documentElement.clientWidth;
			if(offOn&&dWidth < 996){
				menuNav.style.height = menuH +'px';
				header.style.height = headerH + menuH +'px';
			}else {
				menuNav.style.height = 0;
				header.style.height = headerH + 'px';
			}
		}
		function moveoFn(ev){
			if(ev.target.tagName == 'A'){
				for(var i = 0; i < menuNav.children.length; i++){
					menuNav.children[i].children[1].style.width = 0 +'px';
				}
				ev.target.children[1].style.width = menuBtnW +'px';
			}
		}
	}

};