$(function (){
	$.getJSON('scripts/json/json.js', {param1: 'programmers'}, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		
	});

	$.getJSON('scripts/json/data1.json', {}, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		//console.log(data,1);
	});
	$.getJSON('scripts/json/release-log.json', {}, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		//console.log(data,2);
	});
	$.getJSON('scripts/json/release-management-questions.json', {}, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		//console.log(data,3);
	});
	$.getJSON('scripts/json/release-management-titles.json', {}, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		//console.log(data,4);
	});
	$.getJSON('scripts/json/user-management-list.json', {}, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		//console.log(data,5);
	});
});