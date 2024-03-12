const {ApolloServer} = require("@apollo/server")
const {expressMiddleware} = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http= require('http');

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hola mundo'
  }
}

async function useGraphql(app) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
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
