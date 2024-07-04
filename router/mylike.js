const { pool, router, Result } = require('../connect')

router.post('/getmylike', (req, res) => {
    console.log(req.body.user_id);
    pool.getConnection((err, conn) => {
        const query = 'SELECT * FROM all_user WHERE user_id IN(SELECT like_user_id FROM `like` WHERE user_id = ?)'
        conn.query(query,req.body.user_id, (e, r) => {
            if (e) console.log(e);
            console.log(r);
            res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn)
    })

})
module.exports = router;