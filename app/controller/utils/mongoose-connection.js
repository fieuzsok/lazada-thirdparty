newFunction();

function newFunction() {
  const dbconnect = () => {
    //Nhập mô-đun mongoose
    var mongoose = require('mongoose');

    //Thiết lập một kết nối mongoose mặc định
    var mongoDB = 'mongodb://localhost:27017/lazada';
    mongoose.connect(mongoDB);
    //Ép Mongoose sử dụng thư viện promise toàn cục
    mongoose.Promise = global.Promise;
    //Lấy kết nối mặc định
    var db = mongoose.connection;

    //Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    db.once("open", function() {
      console.log("Connection Successful!");
    });
  };
  module.exports = { dbconnect };
}
