# !/bin/bash

docker-machine ssh manager "docker service rm test-service-on-traefik || true"

docker-machine ssh manager "docker service create \
    --name test-service-on-traefik \
    --network traefik-net \
  hoanganh25991/test:service-on-traefik
"