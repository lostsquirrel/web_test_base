function setupSomeGlobals() {
    // Local variable that ends up within closure
    var num = 666;
    // Store some references to functions as global variables
    gAlertNumber = function () { console.log(num); }
    gIncreaseNumber = function () { num++; }
    gSetNumber = function (x) { num = x; }
}
setupSomeGlobals(); // 为三个全局变量赋值
gAlertNumber(); //666
gIncreaseNumber();
gAlertNumber(); // 667
gSetNumber(12);//
gAlertNumber();//12