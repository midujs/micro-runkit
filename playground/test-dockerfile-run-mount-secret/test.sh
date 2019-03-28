# !/bin/bash

### Secret file defined at BUILD-TIME
### Secret in "docker secret create" defined at RUN-TIME
docker build --secret id=client_env,src=$(pwd)/.env.dev --file Dockerfile.new --tag client:latest .