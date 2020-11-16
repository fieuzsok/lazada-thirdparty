
const moment = require('moment');
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var AccessToken = new Schema({
    expiresDate: Date,
}, {
  strict: false
})


// Biên dịch mô hình từ schema (collectionName, objectData,  )


const saveAccessToken = (obj) => {
  var AccessTokenModel = mongoose.model('UserToken', AccessToken );
  const expiresIn = obj.expires_in;

  var m = moment(new Date()); // the day before DST in the US
  m.add(expiresIn*1, 'milliseconds')
  obj.date_expires = m.format("YYYY-MM-DD[T]HH:mm:ss")
  var token_instance = new AccessTokenModel(obj);

  // Lưu phần tử vừa thêm mới lại, thông qua việc truyền vào một hàm callback
  token_instance.save(function (err) {
      if (err) return handleError(err);
      // saved!
      console.log('Saved')
  });
}


const getAccessTokenByAccount = (account) => {
  var AccessTokenModel = mongoose.model('UserToken', AccessToken );
  var query = AccessTokenModel.findOne({account}).sort({created_at: -1});

  return query.exec().then((value)=>{
    return value.get('access_token');
  })
  .catch((e)=>{
    console.log(e)
  });
}


module.exports = { saveAccessToken, getAccessTokenByAccount };