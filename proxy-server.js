// // 定义
// //定义express
// //定义app
//
var express = require('express');

var app = express();




app.all('*', function (req, res) {
  //
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.sendFile(__dirname + req.url);
//	服务器主机地址
}).listen(8000, '127.0.0.1', function (err) {
    if (err) {
        //服务器错误
        console.log(err);
        return;
    }
    //打印服务器状态
    console.log("服务器启动成功");
});




