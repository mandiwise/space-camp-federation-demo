const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");

const port = 4000;
const apiUrl = "http://localhost:3000";

const typeDefs = gql`
  type Astronaut {
    id: ID!
    name: String
  }

  type Query {
    astronaut(id: ID!): Astronaut
    astronauts: [Astronaut]
  }
`;

const resolvers = {
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
  typeDefs,
  resolvers
});

server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
