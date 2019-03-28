FROM node:10.13-alpine AS runner
WORKDIR /app/
ADD package.json ./
ADD yarn.lock ./
RUN NODE_ENV=production yarn install

ADD index.js ./
CMD ["node", "index.js"]