
    //Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var AccessToken = new Schema({
    name: String,
}, {
  strict: false
})


// Biên dịch mô hình từ schema (collectionName, objectData,  )
var AccessTokenModel = mongoose.model('UserToken', AccessToken );

const saveAccessToken = (obj) => {
     var token_instance = new AccessTokenModel(obj);

    // Lưu phần tử vừa thêm mới lại, thông qua việc truyền vào một hàm callback
    token_instance.save(function (err) {
        if (err) return handleError(err);
        // saved!
        console.log('Saved')
    });
}

module.exports = { saveAccessToken };