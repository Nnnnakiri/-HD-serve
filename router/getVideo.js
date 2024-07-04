

const { pool, router, Result, app } = require('../connect')

router.post('/getvideo', (req, res) => {
// console.log(req.body);

    pool.getConnection((err, conn) => {
        const query = 'select * from all_video where video_id = ?'
        conn.query(query,req.body.video_id, (e, r) => {
            if (e) console.log(e);
            let video = JSON.parse(JSON.stringify(r))
            // console.log(video);

            const query2 = 'select * from all_user where user_id = ?'
            conn.query(query2,video[0].user_id, (e, r) => {
                if (e) console.log(e);
                let user = JSON.parse(JSON.stringify(r))
                video.push(user[0])
               
                res.json(new Result({ data: JSON.stringify(video) }))
            })
            

        })
        // conn.end()
        pool.releaseConnection(conn)
    })

})

module.exports = router;