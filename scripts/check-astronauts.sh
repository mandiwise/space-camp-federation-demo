
rover graph introspect ${ASTRONAUTS_URL} | rover graph check ${APOLLO_GRAPH_REF} --schema -
rover graph introspect ${ASTRONAUTS_URL} | rover subgraph check ${APOLLO_GRAPH_REF} --name astronauts --schema -

rover graph introspect ${MISSION_URL} | rover graph check ${APOLLO_GRAPH_REF} --schema -
rover graph introspect ${MISSION_URL} | rover subgraph check ${APOLLO_GRAPH_REF} --name mission --schema -

