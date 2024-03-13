const {getProduct,getListProduct,addProduct} = require ('./product.resolvers')

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
    allProducts:getListProduct,
  },
  Mutation:{
    addProduct
  }
}

module.exports = resolvers;
