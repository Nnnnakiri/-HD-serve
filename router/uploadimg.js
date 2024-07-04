

const { pool, router, Result, app } = require('../connect')
const {uploadImage}  =require('../router_handler/uploadimg')


router.post('/uploadImage',uploadImage.single('file'), (req, res) => {
    // 上传完毕之后 需要修改对应的数据库的值
    // 根据用户id 查询删除之前用户存储在数据库中的图片 然后将数据库中对应的图片地址修改为新的地址
    const imgPath = 'http://127.0.0.1:8088/user_images/'+ req.file.filename;
    // 转为字符串
    let user =  JSON.parse(JSON.stringify(req.body.user))
    // 转为对象
    user = (new Function("return"+user)())
    let para = [imgPath,user.user_id]
    // console.log(para);
    pool.getConnection((err, conn) => {
        // 更新imageurl
        const query = 'update all_user set user_imgurl=? where user_id=?'
        conn.query(query,para, (e, r) => {
            if (e) console.log(e);
            // console.log(r);
            // res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn)
    })

    res.json(new Result({ msg:'上传了' }))
})

module.exports = router;