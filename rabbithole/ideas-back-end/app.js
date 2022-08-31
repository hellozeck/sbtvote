//引入node框架
const express = require("express");
//引入自定义路由中间件函数
const router = require("./router");
//创建服务对象
const app = express();
//使用路由中间件
app.use("/", router);

//开始服务对象的监听端口返回服务对象实例
const server = app.listen(6666, 'localhost', function () {
 //通过服务对象实例调用address()获得当前服务程序的IP地址和端口号
 const { address, port } = server.address();
 console.log("服务已启动请访问http://%s:%s", address, port);
});
