//引入express框架
const express = require("express");
//引入boom依赖快速生成浏览器错误信息
const boom = require("boom");
//导入二级路由
const userRouter = require("./map/user.js");
// 通过express框架创建路由实例来处理路由监听
const router = express.Router();

//监听get请求
router.get("/", (req, res) => {
  res.send("中研在线");
});
//监听到一级路由是/user是使用自定义二级路由userRouter中间件
router.use("/user", userRouter);

//路由匹配是从上到下的,所以当前面所有的路由地址都不匹配时加载请求404错误中间件
router.use((req, res, next) => {
  next(boom.notFound("接口不存在"));
});
//定义一个错误处理中间件 向客户端响应json格式的错误数据
router.use((err, req, res, next) => {
  //获取错误信息
  const msg = (err && err.message) || "系统错误";
  //获取错误状态码
  const statusCode = (err.output && err.output.statusCode) || 500;
  //获取errorMsg
  const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
  //返回状态码，并返回json格式错误异常信息
  res.status(statusCode).json({
    code: -1,
    msg,
    error: statusCode,
    errorMsg,
  });
});

module.exports = router;

