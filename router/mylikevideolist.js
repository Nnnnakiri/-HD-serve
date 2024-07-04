


const { pool, router, Result, app } = require('../connect')

router.post('/getmylikevideo', (req, res) => {


    pool.getConnection((err, conn) => {
        const query = 'SELECT * FROM all_video where user_id = ?'
        conn.query(query,req.body.user_id, (e, r) => {
            if (e) console.log(e);
            console.log('请求了');
            res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})

module.exports = router;