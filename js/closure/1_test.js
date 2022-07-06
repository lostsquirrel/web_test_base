
function greeting(name) {
    var text = `Hello ${name}`;
    return function () { console.log(text); }
}
var sayHello = greeting("Closure");
sayHello()
