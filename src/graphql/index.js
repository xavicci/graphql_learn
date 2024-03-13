const {ApolloServer} = require("@apollo/server")
const {expressMiddleware} = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const {loadFiles} = require('@graphql-tools/load-files');
const http= require('http');
const {buildContext} = require ('graphql-passport')
const resolvers = require ('./resolvers');


async function useGraphql(app) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
    context: ({req,res})=> buildContext({req,res}),
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
