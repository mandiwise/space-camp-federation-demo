This GitHub repo is a fork of Mandi Wise's Space Camp Federation Demo.

# Apollo Space Camp Demo Code

**Installation:**

```sh
npm i && npm run server
```

**Code Along:**

[Watch the recording of the talk here](https://www.youtube.com/watch?v=zZnHA3yyPJY&t=1987s) 👩‍💻

## Fork notes

This GitHub repo is a fork of Mandi Wise's Space Camp Federation Demo.

Just like the original codebase there are four services:
* REST service that provides JSON data
* Astronauts GraphQL subgraph service 
* Missions GraphQL subgraph service
* Space-camp Federated GraphQL supergraph service

This fork is different in these ways:
* Includes Gtihub action that checks and publishes subgraph schemas and composes a supergraph using Apollo Rover
* Each of the four services is now packaged via Docker
* Includes Helm Chart for deploying the four services to Kubernetes

## Prerequisites for running on Kubernetes

* Kubernetes cluster with Nginx Ingress Controller and a Load Balancer
* DNS domain that points at that Load Balancer
* DNS sub-domains for four services: rest, astronauts, mission and graphql
* TLS certificate for the top level DNS domain name
* Helm v3

## How to deploy to Kubernetes

1. Save your TLS Certficate in a Kubernetes secret
2. Create namespace `space-camp` via `kubectl apply -f space-camp-chart/namespace.json`
3. If you're snoopdave and you've made code changes, login to docker and run `./build-docker.sh` to build and push docker images for the four servers.
4. Create a file `space-camp-chart/values.yaml` and fill in all values, e.g. `example-values.yaml`
5. `helm install chart space-camp-chart`
6. Check to see if pods are running `kubectl get pods -n space-camp` 
