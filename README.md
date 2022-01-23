# Apollo Space Camp Demo Code

**Installation:**

```sh
npm i && npm run server
```

**Code Along:**

[Watch the recording of the talk here](https://www.youtube.com/watch?v=zZnHA3yyPJY&t=1987s) 👩‍💻

## Fork notes

This GitHub repo is a fork of Mandi Wise's Space Camp Federation Demo.

This fork is different in these ways:
* Uses Apollo's Studio services for Supergraph Schema Composition, Uplink, etc.
* Includes script to build and push Docker images to DockerHub
* Includes Helm Chart for deploying to Kubernetes

## Prerequisites for running on Kubernetes

* Kubernetes cluster with Nginx Ingress Controller and a Load Balancer
* DNS domain that points at that Load Balancer
* DNS sub-domains for four services: rest, astronauts, mission and graphql
* TLS certificate for the top level DNS domain name
* Helm v3

## How to deploy to Kubernetes

1. Save your TLS Certficate in a Kubernetes secret
2. Create namespace `space-camp` via `kubectl apply -f space-camp-chart/namespace.json`
3. Create a file `space-camp-chart/values.yaml` and fill in all values
4. `helm install chart space-camp-chart`
5. Check to see if pods are running `kubectl get pods -n space-camp` 
