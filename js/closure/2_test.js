function say667() {
    // Local variable that ends up within closure
    var num = 666;
    var sayAlert = function () { console.log(num); }
    num++;
    return sayAlert;
}

var sayAlert = say667();
sayAlert()