function main() {}

main.initCache = function() {
	$.createCache = function(requestFunction) {
		var cache = {};
		return function(key, callback) {
			console.log('has key', !!cache[key]);
			if(!cache[key]) {
				console.log(key);
				cache[key] = $.Deferred(function(defer) {					
					requestFunction(defer, key);
				}).promise();
			}
			return cache[key].done(callback);
		};
	}

	myAPICache = $.createCache(function(defer, key) {
		$.get('/wait', {name:key,	wait:Math.floor(Math.random() * 3001)}).then(defer.resolve, defer.reject);
	});
}

main.initExample1 = function() {
	console.log('test');
	var container = $('.flowers');
	//container.empty();

	$('.flowers').on('click', '.flower', function(e) {
		console.log('click');
		$(this).trigger('animate');
	});


	$('button:first').click(function(e){
	//	debugger;
		var count = $("#countInput").val();
		var f, d;
		var allDeferreds = [];

		for(var i=0; i < count; ++i) {
			f = $('<div class="flower" style="left:'+(i * 20)+'px"></div>');
			container.append(f);
//			d = $.Deferred();

//			f.data('myDef', d);
			d = f.animate({height:"+=30"}, Math.floor(Math.random() * 3001), function(a) {
				$(this).css({background:"red"});

			}).promise();

			allDeferreds.push(d);
		}

		$.when.apply(null, allDeferreds).done(function(){
			alert("complete");
		});

//		$(".flower").animate(
	});

}

main.initDelete = function(){
	// var $deferred = $.Deferred();
	// var allDeferreds = [];

	// $("#exContainer").on('click', '.exItem a', function(e) {
	// 	var name = $(this).attr('data-remove');
	// 	$(this).parent().remove();
		
	// 	$('#click-order').append($('<div>'+name+'</div>'));

	// 	var d = $.get('/wait', {
	// 		name:name,
	// 		wait:Math.floor(Math.random() * 3001)
	// 	}).done(function(result) {
	// 		console.log('result', result);
	// 		$("#response").empty();
	// 		$("#response").append(result);
	// 	});

	// 	//$.when(d);
	// 	allDeferreds.push(d);
	// });

	var $deferred = $.Deferred();
	var $when;
	// var $when = $.when($deferred).done(function(){
	// 	console.log("finished");
	// });


	var requests = [];
	var allDeferreds = [];

	function myResolve(args) {
		var last = requests[requests.length-1];

		console.log(args, last);
		$("#response").empty();
		$("#response").append(last.responseText);
	}

	$("#exContainer").on('click', '.exItem a', function(e) {
		var name = $(this).attr('data-remove');
		$(this).parent().remove();
		
		$('#click-order').append($('<div>'+name+'</div>'));

		var d = $.get('/wait', {
			name:name,
			wait:Math.floor(Math.random() * 3001)
		});
		
		requests.push(d);

		if(!$when || $when.state() == 'resolved') {
			$when = $.when(d.promise()).done(myResolve);

		} else if($when.state() != 'resolved') {
			$when = $.when(d, $when.promise());
		} 

		//allDeferreds.push(d.promise());

		//$.when(d.promise());
		
	});
}
// 	$deferred.done(function() {
// 		console.log('when', arguments);
// 		requests = [];
// 	});
// }
