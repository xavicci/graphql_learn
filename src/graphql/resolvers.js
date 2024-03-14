const {getProduct,getListProduct,addProduct,updateProduct,deleteProduct} = require ('./product.resolvers');
const {login} = require ('./auth.resolvers');
const {addCategory} = require ('./category.resolvers');
const {RegularExpression} = require ('graphql-scalars');

const CategoryNameType = new RegularExpression('CategoryNameType',/^[a-zA-Z0-9]{3,8}$/);

const resolvers = {
  Query: {
    hello: () => 'hola mundo',
    getPerson: (_,args)=>`Hello, my name is ${args.name}, I'm ${args.age} year old.`,
    getInt:()=>1,
    getFloat:()=>1.1,
    getString:()=>'palabra',
    getBoolean:()=>true,
    getID: ()=>'32132321',
    getNumbers:(_,args)=> args.numbers,
    product:getProduct,
    allProducts:getListProduct
  },
  Mutation:{
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory
  },
  CategoryNameTypeExcel
}

module.exports = resolvers;
