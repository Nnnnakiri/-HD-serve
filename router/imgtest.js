


const { pool, router, Result } = require('../connect')

router.post('/imgtest', (req, res) => {
    console.log(req.query);
    pool.getConnection((err, conn) => {
        conn.query("SELECT url FROM img ", (e, r) => {
            if(e) throw error
            console.log(JSON.stringify(r));
            res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})

module.exports = router;