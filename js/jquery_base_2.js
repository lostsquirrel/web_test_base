// (function(){ /* code */ }());

(function(yourcode) {

	// The global jQuery object is passed as a parameter
	yourcode(jQuery);

}(function($) {

	// The $ is now locally scoped
	var xx = function() {
		this.oo = "ooooooooooooo";
		this.num = 0;
	}
	
	xx.prototype.getOo = function() {
		return this.oo;
	};

	xx.prototype.print = function(content) {
		console.log(content);
	};

	xx.prototype.incr = function() {
		this.num++;
	};

	xx.prototype.getNum = function() {
		return this.num;
	};

	var Person = function() {
		this.name = null;
		this.age = null;
	}
	// Listen for the jQuery ready event on the document
	$(function() {
		var x = new xx();
		console.log(xx)
		console.log(x)
		console.log(x.getOo())
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