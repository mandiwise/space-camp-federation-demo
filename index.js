const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
//const { ApolloGateway } = require("./gateway/package");
//const { createHash } = require("crypto")
const { bootstrap: bootstrapGlobalAgent } = require('global-agent');

const port = 4000;

// without Studio, Uplink, etc.
// const gateway = new ApolloGateway({
//   serviceList: [
//     { name: "astronauts", url: "http://localhost:4001" },
//     { name: "missions", url: "http://localhost:4002" }
//   ]
// });
//let keyHash = createHash('sha512').update(process.env.APOLLO_KEY).digest('hex');

const gateway = new ApolloGateway();
bootstrapGlobalAgent();

const server = new ApolloServer({
  gateway,
  introspection: true,
  cors: {
    // access-control-allow-origin: https://studio.apollographql.com
    origin: "https://studio.apollographql.com",
    // access-control-allow-credentials: true
    credentials: true,
  }
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
