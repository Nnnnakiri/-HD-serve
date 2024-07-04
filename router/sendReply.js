

const { pool, router, Result, app } = require('../connect')

router.post('/sendreply', (req, res) => {
    // console.log(req.body);
    let comment =  []
    for (const key in req.body.comment) {
        // console.log( req.body.comment[key]);
        comment.push(req.body.comment[key])
    }
    console.log(comment);
    pool.getConnection((err, conn) => {
        const query = 'INSERT INTO reply(user_id,user_name,user_imgurl,video_id,comment_id,reply_content) VALUES(?,?,?,?,?,?)'
        conn.query(query,comment, (e, r) => {
            if (e) console.log(e);
            // console.log(r);
            res.json(new Result({ data: JSON.stringify(r) }))
        })
        pool.releaseConnection(conn)
    })

})

module.exports = router;