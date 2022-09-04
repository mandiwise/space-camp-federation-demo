This GitHub repo is a fork of Mandi Wise's Space Camp Federation Demo that has been modified to use Apollo GraphQL Managed Federation and, optionally to run in Kubernetes via Helm.

# Apollo Space Camp Demo Code

**Installation:**

```sh
npm i && npm run server
```

**Code Along:**

[Watch the recording of the talk here](https://www.youtube.com/watch?v=zZnHA3yyPJY&t=1987s) 👩‍💻

## Fork notes

This fork changes these things:

* Adds Apollo Managed Federation
* Moves schemas from code and into separate .graphql files
* Adds GitHub action to run schema checks and publish to Apollo Studio
* Adds a Dockerfile for each of the four services
* Adds a Helm chart for deploying services to Kubernetes

## How to run Space Camp locally

* Make sure you have Node and NPM installed
* Clone this repo and run `npm install` in it
* Create a graph in Apollo Studio and make note of your Graph Ref
* Create a Graph Admin API key for your new graph and make note of its value
* Set the Apollo  Studio environment variables using those values:
  * APOLLO_KEY
  * APOLLO_GRAPH_REF
* Run Space Camp as usual via `npm run start`

## How to run Space Camp on Kubernetes

It's also possible to run Space Camp, with some additional work described below.

### Kubernetes prerequisites

* Kubernetes cluster with Nginx Ingress Controller and a Load Balancer
* DNS domain that points at that Load Balancer
* DNS sub-domains for four services: rest, astronauts, mission and graphql
* TLS certificate for the top level DNS domain name
* Helm v3

### How to deploy to Kubernetes

1. Save your TLS Certificate in a Kubernetes secret
2. Create namespace `space-camp` via `kubectl apply -f space-camp-chart/namespace.json`
3. If you're snoopdave and you've made code changes, login to docker and run `./build-docker.sh` to build and push docker images for the four servers.
4. Create a file `space-camp-chart/values.yaml` and fill in all values, e.g. `example-values.yaml`
5. Install via Helm: `helm install chart space-camp-chart`
6. Check to see if pods are running `kubectl get pods -n space-camp` 
