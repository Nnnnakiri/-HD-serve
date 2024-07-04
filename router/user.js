

const { app,pool, router, Result } = require('../connect')



router.post('/getuserlist', (req, res) => {
    if(req.body.videoArr){
        pool.getConnection((err, conn) => {
            const query = 'SELECT * FROM all_user where user_id in (?)' 
            conn.query(query,[req.body.videoArr]||[1], (e, r) => {
                // if(e) console.log(e);

                res.json(new Result({ data: JSON.stringify(r) }))
            })
            pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
        })
    }
    
})

module.exports = router;