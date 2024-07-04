

const Token = require('../utils/token')
const { pool, router, Result } = require('../connect')
// 用户登录 首先查看是否有token
// 有token 查询数据库并返回用户信息
// 没有使用密码登录
router.post('/login', (req, res) => {


    if (req.body.token) {
        // console.log('这里是token登录');

        //查询数据库返回用户信息
        let data = Token.decrypt(req.body.token);  //将请求头的token取出解密
        if (data.token) {
            // console.log('token有效');
            //有效token  通过解密出的用户账号查询用户信息并返回
            pool.getConnection((err, conn) => {
                // console.log(data);
                const query = 'SELECT * FROM all_user where user_account = ?'
                conn.query(query, data.id, (e, r) => {

                    if (e) console.log(e);

                    // 返还用户的个人信息
                    res.json(new Result({ data: JSON.stringify(r) }))
                })
                pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
            })

        } else {
            console.log('token无效');
            //无效token  删除这条token
            pool.getConnection((err, conn) => {
                // 找到这条token然后删除
                const query = 'update all_user set token = "" where token = ?'
                conn.query(query, req.body.token, (e, r) => {
                    if (e) console.log(e);
                    console.log(JSON.stringify(r));
                    // 返还code = 2  让用户删除过期token
                    res.json(new Result({ data: JSON.stringify(r),code:2 }))
                })
                pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
            })
        }

    } else {
        console.log('这里是密码登录');
        // 否则生成token存入数据库  并返回用户信息
        //    用户账号 用来加密
        let user_account = req.body.user.user_account
        // 将用户账号加密  可以设置时间
        const token = Token.encrypt({ id: user_account }, '1d');
        let user = req.body.user
        // console.log(user);
        pool.getConnection((err, conn) => {


            // 创建查询语句  当用户账号相等时插入生成的token
            const queryToken = 'update all_user set token = ? where user_account = ? and user_password = ?'
            conn.query(queryToken, [token, user.user_account, user.user_password], (e, r) => {
                if (e) console.log(e);
                // console.log(JSON.stringify(r));

                // 创建查询语句  当用户名和密码相同时  返还用户的信息   这时token已经添加到了用户的信息表中
                const query = 'SELECT * FROM all_user where user_account = ? and user_password = ?'
                conn.query(query, [user.user_account, user.user_password], (e, r) => {
                    if (e) console.log(e);
                    // console.log(JSON.stringify(r));
                    // 返还用户的个人信息
                    res.json(new Result({ data: JSON.stringify(r) }))
                })

                // 这里返还的是插入成功的信息
                // res.json(new Result({ data: JSON.stringify(r) }))
            })
            pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
        })
    }




})

module.exports = router;