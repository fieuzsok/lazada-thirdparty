var { graphql, buildSchema } = require('graphql');
var { GraphQLDateTime } = require('graphql-iso-date');
const orders = require('../controller/OrdersManagement')


var orderMock = [
  {
      updated_at: "2020-11-19 15:52:14 +0700",
  },
  {
    updated_at: "2020-11-19 15:52:14 +0700",
  },      
];


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  scalar Date

  type Orders {
    voucher_platform: Int
    warehouse_code: String
    voucher: Int
    order_number: String
    voucher_seller: String
    created_at: Date
    voucher_code: String
    shipping_fee_discount_platform: String
    customer_last_name: String
    updated_at: String
    promised_shipping_times: String
    price: String
    national_registration_number: String
    shipping_fee_original: Int
    payment_method: String
    customer_first_name: String
    shipping_fee_discount_seller: Int
    shipping_fee: Int
    items_count: Int
    delivery_info: String
    statuses: [String]
  }

  type Query {
    order(id: Int): Orders
    orders(
      account: String!
      created_before: Date
      created_after: Date!
      status: String
      update_before: Date
      sort_direction: String
      offset: Int
      limit: Int
      update_after: Date!
      sort_by: String ) : [Orders]
  }  
`);

const handleGetOrders = async (args) => {
  const { account, created_before, created_after, status, update_before, sort_direction, offset, limit, update_after, sort_by} = args;
    return await orders.getOrders(account, { created_after, update_after }).then((value)=>{
      return value;
    });
}
 
// The root provides a resolver function for each API endpoint
var root = {
  Date: GraphQLDateTime,
  orders: async(args) => await handleGetOrders(args),
  order: () => {return orderMock[0]},
};


module.exports = {schema, root}

