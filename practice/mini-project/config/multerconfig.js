const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      const fn = Date.now() + '-' + Math.round(Math.random() * 10000) + path.extname(file.originalname)
      cb(null, fn)

    }
})
  
const upload = multer({ storage: storage })

module.exports = upload;