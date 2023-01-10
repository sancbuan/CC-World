//File Name：mastershang.js
//Auther: CCP
//Path: fluid/layout/layout.ejs

//Stop Right Click
function stop () { return false; }
document.oncontextmenu = stop;


// 或者直接返回整个事件
document.oncontextmenu = function () { return false; }

document.onselectstart = function () { return false; }

// 或者直接返回整个事件
document.oncopy = function () { return false; }

