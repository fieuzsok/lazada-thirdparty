var { graphql, buildSchema } = require('graphql');
var { GraphQLDateTime } = require('graphql-iso-date');
const orders = require('../controller/OrdersManagement')
const productsManagement = require('../controller/ProductsManagement')

// Construct a schema, using GraphQL schema language
var ProductsSchema = buildSchema(`
  scalar Date

  type Products {
    skus: [Skus]
    item_id: Int
    primary_category: Int
    attributes: attributes
  }
  
  type Skus {
    Status: String
    quantity: Int
    _compatible_variation_: String
    Images: [String]
    Url: String,
    multiWarehouseInventories: [multiWarehouseInventories]
    package_width: String
    package_height: String
    special_price: Float
    price: Float
    color_text: String
    package_length: String
    package_weight: String
    SkuId: Int
  } 
  
  type multiWarehouseInventories {
    quantity: Int
    warehouseCode: String
  } 
  
  type attributes {
    name: String
    short_description: String
    description: String
    brand: String
    warranty_type: String
    delivery_option_sof: String
  } 

  type Query {
    product(id: Int): Products
    products(
      account: String!
      filter: String!
      created_before: Date
      created_after: Date
      status: String
      update_before: Date
      sort_direction: String
      offset: Int
      limit: Int
      update_after: Date
      sort_by: String ) : [Products]
  }  
`);

const handleGetProducts = async (args) => {
  const { account, created_before, created_after, status, update_before, sort_direction, offset, limit, update_after, sort_by, filter} = args;
    return await productsManagement.getProducts(account, { created_after, update_after, filter }).then((value)=>{
      return value;
    });
}
 
// The root provides a resolver function for each API endpoint
var productsRoot = {
  Date: GraphQLDateTime,
  products: async(args) => await handleGetProducts(args),
  product: () => {return null},
};


module.exports = {ProductsSchema, productsRoot}

