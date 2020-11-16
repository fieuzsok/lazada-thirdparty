//Thê mới mô hình SomeModel thông qua lệnh require
var AccessTokenModel = require('../models/AccessTokenModel')
const LazadaAPI = require('lazada-open-platform-sdk');
const configApp = require('../../config/default');
const { config } = configApp;
const aLazadaAPI = new LazadaAPI(config.appKey, config.appSecret, config.countryCode);


const getAccessToken = (code) => {
    /**
    * LazadaAPI class constructor
    * @param {string} appKey 
    * @param {string} appSecret 
    * @param {Venture} countryCode @ref: 'src/LazadaClient/constants.js'
    * countryCode should be one of the following
    * | 'SINGAPORE'
    * | 'THAILAND'
    * | 'MALAYSIA'
    * | 'VIETNAM'
    * | 'PHILIPPINES'
    * | 'INDONESIA'
    * @param {string?} accessToken require for some API
    */
    const aLazadaAPI = new LazadaAPI(config.appKey, config.appSecret, config.countryCode);    

    //get token and save
    aLazadaAPI
    .generateAccessToken({ code })
    .then(response => {
        const { access_token } = response; // JSON data from Lazada's API
        AccessTokenModel.saveAccessToken(response)

    }).catch((e)=>{
        console.log(e);
    })
}

const getAccessTokenByAccount = (account) => {
  return AccessTokenModel.getAccessTokenByAccount(account);
}

module.exports = { getAccessToken, getAccessTokenByAccount };