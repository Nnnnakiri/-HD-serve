const { pool, router, Result, app } = require('../connect')

router.post('/getreply', (req, res) => {

    // console.log(req.body);
    pool.getConnection((err, conn) => {
       
        const query = 'SELECT * FROM reply WHERE comment_id = ?'
        if(!query){
            return
        }
        conn.query(query, req.body.commentId,(e, r) => {
            if (e) console.log(e);
            // console.log(r);
            res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn)
    })

})

module.exports = router;