import { ApolloServer } from 'apollo-server';
import { ApolloGateway }  from '@apollo/gateway';
import { ApolloServerPluginUsageReporting }  from 'apollo-server-core';

const port = 4000;

const gateway = new ApolloGateway();

const server = new ApolloServer({
  gateway,
  introspection: true,
  cors: {
    origin: process.env.APOLLO_STUDIO_URL,
    credentials: true,
  },
  plugins: [
    ApolloServerPluginUsageReporting({
      endpointUrl: process.env.APOLLO_USAGE_REPORTING_URL,
    }),
  ],
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
