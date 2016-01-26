// (function(){ /* code */ }());

(function(yourcode) {

	// The global jQuery object is passed as a parameter
	yourcode(jQuery);

}(function($) {

	// The $ is now locally scoped
	var xx = function() {
		this.oo = "ooooooooooooo";
		this.num = 0;

		return {
			oo : function() {
				return oo;
			},

			print : function(content) {
				console.log(content);
			},

			incr : function() {
				num++;
			},

			getNum : function() {
				return num;
			}

		}
	}
	// Listen for the jQuery ready event on the document
	$(function() {
		var x = xx();
		console.log(xx)
		console.log(x.oo())
		x.print('xxxxxxxxxxxxxxxxxx')
		// The DOM is ready!
		console.log('hello jQuery....');
		// console.log(window)
		// console.log(document)
		x.incr();
		x.incr();
		x.incr();
		console.log(x.getNum())
	});
})

);