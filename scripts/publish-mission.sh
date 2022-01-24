
rover subgraph introspect ${MISSION_URL} | \
    rover subgraph publish ${APOLLO_GRAPH_REF} --name spacemission --schema - --routing-url ${MISSION_URL}
