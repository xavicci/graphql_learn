const {ApolloServer} = require("@apollo/server")
const {expressMiddleware} = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const {loadFiles} = require('@graphql-tools/load-files');
const http= require('http');


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
    getProduct: ()=>{
      return {
        id:'123',
        name:'product1',
        price: 100.12,
        description: 'hellooo',
        image: 'http://image.sas',
        createAt: new  Date().toString()

      }
    }
  }
}
async function useGraphql(app) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start();

  app.use(expressMiddleware(server, {
      context: async ({req}) => ({
        token: req.headers.token
      }),
    }),
  );
}

module.exports = useGraphql;
