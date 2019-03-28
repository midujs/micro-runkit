# syntax = docker/dockerfile:experimental
FROM node:10.13-alpine AS runner
WORKDIR /app/

### /app/.env ONLY EXIST AT BUILD-TIME
### Good to use in case of "yarn build" with .env in client code
### Client code (react, vue), inject .env into javascript production-code
RUN --mount=type=secret,id=client_env,target=/app/.env cat .env
ADD index.js ./

CMD ["node", "index.js"]