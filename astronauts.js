const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const port = 4001;
//const apiUrl = "http://localhost:3000";
//const apiUrl = "https://glacial-caverns-69189.herokuapp.com:3000"
const apiUrl = process.env.API_URL;

const typeDefs = gql`
  type Astronaut @key(fields: "id") {
    id: ID!
    name: String
    favoriteColor: String
  }

  extend type Query {
    astronaut(id: ID!): Astronaut
    astronauts: [Astronaut]
  }
`;

const resolvers = {
  Astronaut: {
    __resolveReference(ref) {
      return fetch(`${apiUrl}/astronauts/${ref.id}`).then(res => res.json());
    }
  },
  Query: {
    astronaut(_, { id }) {
      return fetch(`${apiUrl}/astronauts/${id}`).then(res => res.json());
    },
    astronauts() {
      return fetch(`${apiUrl}/astronauts`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers, introspection: true }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`Astronauts service ready at ${url}`);
});
