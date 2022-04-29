
rover subgraph introspect ${ASTRONAUTS_URL} | rover graph check ${APOLLO_GRAPH_REF} --schema -
rover subgraph introspect ${ASTRONAUTS_URL} | rover subgraph check ${APOLLO_GRAPH_REF} --name spaceastronauts --schema -
