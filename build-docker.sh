
docker buildx build --platform linux/amd64 -f Dockerfile.rest -t snoopdave/space-rest .
docker buildx build --platform linux/amd64 -f Dockerfile.astronauts -t snoopdave/space-astronauts .
docker buildx build --platform linux/amd64 -f Dockerfile.mission -t snoopdave/space-mission .
docker buildx build --platform linux/amd64 -f Dockerfile.graphql -t snoopdave/space-graphql .

docker push snoopdave/space-rest
docker push snoopdave/space-astronauts
docker push snoopdave/space-mission
docker push snoopdave/space-graphql


