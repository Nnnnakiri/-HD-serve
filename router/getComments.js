

const { pool, router, Result, app } = require('../connect')

router.post('/getcomments', (req, res) => {

    // console.log(req.body.video_id);
    pool.getConnection((err, conn) => {
        const query = 'SELECT * FROM comments WHERE video_id = ?'
        conn.query(query,req.body.video_id, (e, r) => {
            if (e) console.log(e);
            // console.log(r);
            res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn)
    })

})

module.exports = router;