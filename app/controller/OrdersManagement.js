//Thê mới mô hình SomeModel thông qua lệnh require
var AccessTokenModel = require('../models/AccessTokenModel')
const LazadaAPI = require('lazada-open-platform-sdk');
const configApp = require('../../config/default');
const { config } = configApp;

const getOrders = async (userAccount, { created_after, update_after }) => {
  
  const { appKey, appSecret, countryCode } = config;
  let accessToken = await AccessTokenModel.getAccessTokenByAccount(userAccount).then(accessToken => accessToken);
  const payload = {
    ...prepareMandatoryParams({created_after, update_after}),
    created_before: '2018-02-10T16:00:00+08:00',
    update_before: '2018-02-10T16:00:00+08:00',
    status: 'shipped',
    sort_by: "created_at",
    sort_direction: "ASC",
    offset: 0,
    limit: 10,
  }
  console.log(payload)
    const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, countryCode)
    console.log(accessToken)
    aLazadaAPIWithToken.accessToken=accessToken
    //get token and save
    return aLazadaAPIWithToken
    .getOrders(payload).then((res)=>{console.log(res); return res})
}

const prepareMandatoryParams = ({ created_after, update_after }) => {
   var createdAfter = new Date(created_after).toISOString();
   var updateAfter = new Date(update_after).toISOString();;
  return {
    created_after: '2018-02-10T16:00:00+08:00',
    update_after: '2018-02-10T16:00:00+08:00',
  }
}

module.exports = { getOrders };