var box3= $('.progress-radial').eq(3);
function dongdong3(){
	var currentClass = box3.attr('class').split(' ')[1];
  var currentPercentage = currentClass.substring(9,12);
  var newPercentage = (parseInt(currentPercentage) + 1);
  if (newPercentage > 75) {
    newPercentage = 0;
    return false;
  }
  var newClass = 'progress-' + newPercentage;
  box3.removeClass(currentClass).addClass(newClass);
}
 function zhuan3(){
 	setInterval(dongdong3,30);
 }
 setTimeout(zhuan3, 6000,zhuan3);

var box2= $('.progress-radial').eq(2);
function dongdong2(){
	var currentClass = box2.attr('class').split(' ')[1];
  var currentPercentage = currentClass.substring(9,12);
  var newPercentage = (parseInt(currentPercentage) + 1);
  if (newPercentage > 80) {
    newPercentage = 0;
    return false;
  }
  var newClass = 'progress-' + newPercentage;
  box2.removeClass(currentClass).addClass(newClass);
}
 function zhuan2(){
 	setInterval(dongdong2,30);
 }
 setTimeout(zhuan2, 4000,zhuan2);

var box1= $('.progress-radial').eq(1);
function dongdong1(){
	var currentClass = box1.attr('class').split(' ')[1];
  var currentPercentage = currentClass.substring(9,12);
  var newPercentage = (parseInt(currentPercentage) + 1);
  if (newPercentage > 90) {
    newPercentage = 0;
    return false;
  }
  var newClass = 'progress-' + newPercentage;
  box1.removeClass(currentClass).addClass(newClass);
}
 function zhuan1(){
 	setInterval(dongdong1,30);
 }
 setTimeout(zhuan1, 2000,zhuan1);

 var box0= $('.progress-radial').eq(0);
function dongdong0(){
	var currentClass = box0.attr('class').split(' ')[1];
  var currentPercentage = currentClass.substring(9,12);
  var newPercentage = (parseInt(currentPercentage) + 1);
  if (newPercentage > 90) {
    newPercentage = 0;
    return false;
  }
  var newClass = 'progress-' + newPercentage;
  box0.removeClass(currentClass).addClass(newClass);
}
 function zhuan0(){
 	setInterval(dongdong0,30);
 }
 setTimeout(zhuan0, 100,zhuan0);