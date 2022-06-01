const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const { bootstrap: bootstrapGlobalAgent } = require('global-agent');

const port = 4000;

const gateway = new ApolloGateway();
bootstrapGlobalAgent();

const server = new ApolloServer({
  gateway,
  introspection: true,
  cors: {
    origin: process.env.APOLLO_STUDIO_URL,
    credentials: true,
  },
  plugins: [
    ApolloServerPluginSchemaReporting({
      endpointUrl: process.env.APOLLO_REGISTRY_URL
    }),
  ],
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
