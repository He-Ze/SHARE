# sendtrends
利用小程序云开发实现发布动态、查看动态

使用了云函数，使用时需要将cloud文件夹中的所有云函数的index.js中的：

```javascript
cloud.init({
  env: "xxxxxxxxx"
})
```

填上自己的环境ID