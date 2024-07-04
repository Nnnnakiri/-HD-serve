


const { pool, router, Result } = require('../connect')
const {v4:uuidv4} = require('uuid')

router.post('/reg', (req, res) => {
    let id = uuidv4();
    pool.getConnection((err, conn) => {

        // console.log(req.body);
        const user = [uuidToNumber(id),req.body.user.user_account,req.body.user.user_password]
        // console.log(user);
        // 首先要查询是否有这个账户 有的话退出
        const userQuery = 'select user_account from all_user where user_account = ?'
        conn.query(userQuery,req.body.user.user_account, (e, r) => {
            if (e) console.log(e);
            if(r.length>0){
                console.log('存在了');
                res.json(new Result({ data: r ,code:2 }))

                return
            }
            // 没有这个账户就继续注册
            const query = 'INSERT INTO all_user(user_id,user_account,user_password,user_name,user_imgurl) VALUES(?,?,?,"插入","http://127.0.0.1:8088/user_images/user.jpg")'
            conn.query(query,user, (e, r) => {
                if (e) console.log(e);
                // console.log(r);
                console.log('注册了');
                res.json(new Result({ data: r }))
            })

        })

        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })

})
function uuidToNumber(uuid) {
    const numberString = uuid.replace(/[^0-9]/g,'');
    const str = String(numberString).substring(0,9)
    const numberValue = parseInt(str,10)

    return numberValue
}

module.exports = router;