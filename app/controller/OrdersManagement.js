//Thê mới mô hình SomeModel thông qua lệnh require
var AccessTokenModel = require('../models/AccessTokenModel')
const LazadaAPI = require('lazada-open-platform-sdk');
const configApp = require('../../config/default');
const { config } = configApp;

const getOrders = (userAccount, { created_after, update_after }) => {
  let accessToken;
  const { appKey, appSecret, countryCode } = config;
  AccessTokenModel.getAccessTokenByAccount('testdeco02@mailinator.com').then(accessToken => accessToken = accessToken);
  const payload = {
    ...this.prepareMandatoryParams({created_after, update_after}),

  }
    const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, countryCode, accessToken, payload)
    //get token and save
    aLazadaAPIWithToken
    .getOrders().then((res=> console.log(res)))
}

const prepareMandatoryParams = ({ created_after, update_after }) => {
   var createdAfter = new Date(created_after).toISOString(); '2015-02-10T10:12:50.500Z' ;
   var updateAfter = new Date(update_after).toISOString();;
  return {
    createdAfter,
    updateAfter
  }
}

module.exports = { getOrders };