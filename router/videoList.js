


const { pool, router, Result,app } = require('../connect')

router.post('/getvideolist', (req, res) => {

    let page = req.query.page
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM all_video limit "+page*12+",12", (e, r) => {
            // if(e) console.log(e);
            
            res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})

module.exports = router;