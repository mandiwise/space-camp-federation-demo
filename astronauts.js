import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import fetch  from 'node-fetch';
import { readFileToString }  from './utils.js';

const port = 4001;
const apiUrl = process.env.API_URL;

readFileToString('schemas/astronauts.graphql').then(astronautsSchema => {

  const typeDefs = gql(astronautsSchema);

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
    schema: buildSubgraphSchema([{ typeDefs, resolvers, introspection: false }])
  });

  server.listen({ port }).then(({ url }) => {
    console.log(`Astronauts service ready at ${url}`);
  });

});


