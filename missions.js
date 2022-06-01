const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const fetch = require("node-fetch");
const {readFileToString} = require("./utils");

const port = 4002;
const apiUrl = process.env.API_URL;

readFileToString("schemas/mission.graphql").then(missionsSchema => {

  const typeDefs = gql(missionsSchema);

  const resolvers = {
    Astronaut: {
      async missions(astronaut) {
        const res = await fetch(`${apiUrl}/missions`);
        const missions = await res.json();

        return missions.filter(({ crew }) =>
          crew.includes(parseInt(astronaut.id))
        );
      }
    },
    Mission: {
      crew(mission) {
        return mission.crew.map(id => ({ __typename: "Astronaut", id }));
      }
    },
    Query: {
      mission(_, { id }) {
        return fetch(`${apiUrl}/missions/${id}`).then(res => res.json());
      },
      missions() {
        return fetch(`${apiUrl}/missions`).then(res => res.json());
      }
    }
  };

  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers, introspection: false }])
  });

  server.listen({ port }).then(({ url }) => {
    console.log(`Missions service ready at ${url}`);
  });
});
