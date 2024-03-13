const {getProduct,getListProduct,addProduct,updateProduct,deleteProduct} = require ('./product.resolvers');
const {login} = require ('./auth.resolvers');

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
    deleteProduct
  }
}

module.exports = resolvers;
