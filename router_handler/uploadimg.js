
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/vscode/dataBase/user_images/'); //存储位置
  },
  filename: function (req, file, cb) {
    // 这里用于获取图片的后缀名
    let fileFormat = file.originalname.split('.')
    // console.log(fileFormat);
    // req可以获取到表单数据
    let user = JSON.parse(req.body.user)
    // console.log(user);
    cb(null, user.user_id + '.' + fileFormat[fileFormat.length - 1]) //文件名 头像使用用户ID命名  
  },
})
const uploadImage = multer({ storage: storage })
module.exports = { uploadImage }