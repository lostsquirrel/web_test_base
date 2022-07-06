function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1, 2, 3];
    var ref = someRef;
    return function (x) {
        num += x;
        anArray.push(num);
        console.log(`num: ${num}; array: ${anArray.toString()}; var:  ${ref.someVar}`);
    }
}
closure1 = newClosure(40, { someVar: 'closure 1' });
closure2 = newClosure(1000, { someVar: 'closure 2' });

closure1(5); // num:45 anArray[1,2,3,45] ref:’someVar closure1′
closure2(-10);// num:990 anArray[1,2,3,990] ref:’someVar closure2’