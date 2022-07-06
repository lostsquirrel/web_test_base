var singleton = function () {
    var privateVariable;
    function privateFunction(x) {
        privateVariable = x;
    }

    return {
        firstMethod: function (a, b) {
            console.log(`${a}, ${b}, ${privateVariable}`)
        },
        secondMethod: function (c) {
            privateFunction(c)
            console.log(privateVariable)
        }
    };
}();
singleton.secondMethod(123)
singleton.firstMethod(1, 2)