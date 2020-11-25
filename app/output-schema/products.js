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

  input Images {
    Image: [String]
  }

  input Sku {
    SellerSku: String
    color_family: String
    size: String
    quantity: String
    price: String
    package_length: String
    package_height: String
    package_weight: String
    package_width: String
    package_content: String
    Images: Images
  }

input SkusInput {
  Sku: Sku
}

input Attributes {
  name: String
  short_description: String
  brand: String
  model: String
  kid_years: String
  delivery_option_sof: String
}

input Product {
  PrimaryCategory: String
  Skus: SkusInput
  Attributes: Attributes
}

input Request {
  Product: Product
}

input ProductPayload {
  Request: Request
}

input Input {
  account: String
  productPayload: ProductPayload
}

type SkuList {
  shop_sku: String
  seller_sku: String
  sku_id: String
}

type ProductOutPut {
  item_id: Int
  sku_list: [SkuList]
}

type Mutation {
  createProduct(payload: Input): ProductOutPut
  updateProduct(id: ID!, input: Input): ProductOutPut
}
`);

class ProductOutPut {
  constructor({item_id, sku_list}) {
    this.item_id = item_id;
    this.sku_list = sku_list;
  }
}

const handleGetProducts = async (args) => {
  const { account, created_before, created_after, status, update_before, sort_direction, offset, limit, update_after, sort_by, filter} = args;
    return await productsManagement.getProducts(account, { created_after, update_after, filter }).then((value)=>{
      return value;
    });
}
 
 const handleCreatetProducts = async (input) => {
  console.log(input.account)
  console.log(input.productPayload)
  const data = JSON.parse(JSON.stringify(input.productPayload));
    return await productsManagement.createProducts(input.account, data).then((value)=>{
      return value;
    });
}

// The root provides a resolver function for each API endpoint
var productsRoot = {
  Date: GraphQLDateTime,
  products: async(args) => await handleGetProducts(args),
  product: () => {return null},
  createProduct: async ({payload}) => {
    const newData =  await handleCreatetProducts(payload);
    return new ProductOutPut(newData);
  },
};


module.exports = {ProductsSchema, productsRoot}

