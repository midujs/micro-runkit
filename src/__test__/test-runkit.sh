# !/bin/bash
### Build image
./runkit.sh build:client \
  --image-name client:latest \
  --dockerfile Dockerfile.new \
  --client-env /Users/jenkins/secret/vts-env/dev/.env.client

./runkit.sh build:server \
  --image-name server:latest \
  --dockerfile Dockerfile.new


### Generate compose-file
./runkit.sh compose:server \
  --image server:latest \
  --domain vts-dev.traefik.tinypos.org \
  --server-env vts_dev_server_env \
  --ignore-services src/services/csv/cron.service.js \
  --ignore-services src/services/ais/cron.service.js \
  --ignore-services src/services/vessel/cron.service.js \
  --file-path build/docker-compose.server.yml

./runkit.sh compose:server \
  --run-in-group \
  --image server:latest \
  --server-env vts_dev_server_env \
  --domain vts-dev.traefik.tinypos.org \
  --ignore-services src/services/csv/cron.service.js \
  --ignore-services src/services/ais/cron.service.js \
  --ignore-services src/services/vessel/cron.service.js \
  --file-path build/docker-compose.server.yml

./runkit.sh compose:client \
  --image client:latest \
  --domain vts-dev.traefik.tinypos.org \
  --file-path build/docker-compose.client.yml