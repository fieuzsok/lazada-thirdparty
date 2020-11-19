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
    updated_at : String
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
  console.log(args)
  const { account, created_before, created_after, status, update_before, sort_direction, offset, limit, update_after, sort_by} = args;
    await orders.getOrders('testdeco02@mailinator.com', { created_after, update_after }).then((value)=>{
      console.log(args)
        return orderMock;
    });
}
 
// The root provides a resolver function for each API endpoint
var root = {
  Date: GraphQLDateTime,
  orders: async(args) => await handleGetOrders(args),
  order: () => {return orderMock[0]},
};


module.exports = {schema, root}

