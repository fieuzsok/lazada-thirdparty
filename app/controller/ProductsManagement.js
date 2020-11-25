//Thê mới mô hình SomeModel thông qua lệnh require
var AccessTokenModel = require('../models/AccessTokenModel')
const LazadaAPI = require('lazada-open-platform-sdk');
const configApp = require('../../config/default');
const { config } = configApp;
var convert = require('xml-js');

const getProducts = async (userAccount, { created_after, update_after, filter }) => { 
  var dbconnect = require('./utils/mongoose-connection')
  await dbconnect.dbconnect();
  const { appKey, appSecret, countryCode } = config;
  let accessToken = await AccessTokenModel.getAccessTokenByAccount(userAccount).then(accessToken => accessToken);
  const payload = {
    filter
    //...prepareMandatoryParams({created_after, update_after}),
    // created_before: '2018-02-10T16:00:00+08:00',
    // update_before: '2018-02-10T16:00:00+08:00',
    // status: 'shipped',
    // sort_by: "created_at",
    // sort_direction: "ASC",
    // offset: 0,
    // limit: 10,
  }
  console.log(payload)
    const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, countryCode)
    console.log(accessToken)
    aLazadaAPIWithToken.accessToken=accessToken
    //get token and save
    return aLazadaAPIWithToken
    .getProducts(payload)
    .then((res)=>{
      if(res.data.products)
      return res.data.products;
    })
    .catch((e) => {
      console.log('error',e)
    })
}

const createProducts = async (userAccount, product) => { 
  const payloadParse =  parseJson(product);
  console.log(product)
  console.log(payloadParse)
  const payload = {
    payload: payloadParse
  }
  var dbconnect = require('./utils/mongoose-connection')
  await dbconnect.dbconnect();
  const { appKey, appSecret, countryCode } = config;
  let accessToken = await AccessTokenModel.getAccessTokenByAccount(userAccount).then(accessToken => accessToken);
  
    const aLazadaAPIWithToken = new LazadaAPI(appKey, appSecret, countryCode)
    console.log(accessToken)
    aLazadaAPIWithToken.accessToken=accessToken
    //get token and save
    return aLazadaAPIWithToken
    .createProduct(payload)
    .then((res)=>{
      console.log('res', res)
      if(res.data)
      return res.data;
    })
    .catch((e) => {
      console.log('error',e)
    })
}

const parseJson = (product) => {
  // const jsonStr = {
  // Request: {
  //   Product: {
  //     "PrimaryCategory": "10100183",
  //   Attributes: {
  //       name: "Disposable Drinkware",
  //       short_description: "This is a nice product",
  //       brand: "Remark",
  //       model: "asdf",
  //       kid_years: "Kids (6-10yrs)",
  //       delivery_option_sof: "N"
  //     },
  //     Skus: {
  //       Sku: {
  //         SellerSku: "api-create-test-6",
  //         color_family: "Green",
  //         size: "40",
  //         quantity: "1",
  //         price: "388000",
  //         package_length: "11",
  //         package_height: "22",
  //         package_weight: "33",
  //         package_width: "44",
  //         package_content: "this is what's in the box",
  //         Images: {
  //           Image: [
  //             "http://sg.s.alibaba.lzd.co/original/59046bec4d53e74f8ad38d19399205e6.jpg",
  //             "http://sg.s.alibaba.lzd.co/original/179715d3de39a1918b19eec3279dd482.jpg"
  //           ]
  //         }
  //       }
  //     }
  //   }
  // }
  // }

  const data = convert.js2xml(product, {compact: true});  
  const xml = `<?xml version="1.0" encoding="UTF-8" ?> ${data}`;
  console.log(xml)
  return xml;
}

const prepareMandatoryParams = ({ created_after, update_after }) => {
  console.log('rest param',created_after)
   var createdAfter = created_after ? new Date(created_after).toISOString() : undefined;
   var updateAfter = update_after ? new Date(update_after).toISOString() : undefined;
  return {
    created_after: createdAfter,
    update_after: updateAfter,
  }
}

module.exports = { getProducts, createProducts };