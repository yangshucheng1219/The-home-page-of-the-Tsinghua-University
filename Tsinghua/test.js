/*



function a(b) {
    var b = 0;
    return function () {
        console.log(b++)
    }
}

var c = a()

var d = a()

c()
d()
{

}


/!*for(var i = 0; i<5; i++){
    (function (j){

            setTimeout(function () {
                console.log(j)
            }, j*1000)

    })(i)
}*!/

for(var i = 0;i<5;i++){
/!*    setTimeout(function () {
        console.log(i)
    }, 1000)*!/
var aaa = 333
}

console.log(aaa)




function g(expodrt,require) {


var ccc = 999

}


console.log(ccc)*/

主线程
工作线程
消息队列
while
事件轮询
tick 轮训周期
单线程异步

var fs = require('fs')

fs.readFile('./bg.css', function (err, data) {
    console.log(err)
    console.log(data)
})

....