const express = require("express")
// 数据库配置,app等相关对象
const { app, pool, Result } = require('./connect')
// 上传multer 相关对象
const {uploadImage}  =require('./router_handler/uploadimg')
// 导入请求数据库
const login = require('./router/login')
const reg = require('./router/reg')
const imgtest = require("./router/imgtest")
const user = require("./router/user")
const videoList = require("./router/videoList")
const myLikeVideo = require("./router/mylikevideolist")
const myLike = require("./router/mylike")
const comments = require("./router/getComments")
const sendComment = require("./router/sendComment")
const reply = require("./router/getReply")
const sendReply = require("./router/sendReply")
const getVideo = require("./router/getVideo")
const saveImg = require("./router/uploadimg")

const cors = require('cors')
// app.use(cors())

// const multer =require("multer")
// let objMulter = multer({ dest: "./dataBase/video_cover" });
// //实例化multer，传递的参数对象，dest表示上传文件 的存储路径
// app.use(objMulter.any())//any表示任意类型的文件
app.use(express.static("../dataBase"));//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面

// const uploadimg=require('./router/uploadimg')
// app.use('/api',uploadimg)

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }))
app.all('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization'); 

    //这里处理全局拦截，一定要写在最上面
    next()
})
app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        res.json({ type: 'test' })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
// 使用请求数据库
app.use('/', login)
app.use('/', reg)
app.use('/', imgtest)
app.use('/', user)
app.use('/', videoList)
app.use('/', myLike)
app.use('/', myLikeVideo)
app.use('/', comments)
app.use('/', sendComment)
app.use('/', reply)
app.use('/', sendReply)
app.use('/', getVideo)
app.use('/', saveImg)




app.listen(8088, () => {
    console.log('服务启动')
})