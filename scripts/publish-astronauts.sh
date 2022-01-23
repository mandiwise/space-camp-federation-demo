
rover subgraph introspect ${ASTRONAUTS_URL} | \
  rover subgraph publish ${APOLLO_GRAPH_REF} --name spaceastronauts --schema - --routing-url ${ASTRONAUTS_URL}
