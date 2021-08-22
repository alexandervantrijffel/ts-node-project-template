FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY esbuild*.js ./
RUN yarn install --frozen-lockfile
COPY tsconfig*.json ./
COPY src src
RUN yarn build

FROM node:14-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /app
RUN chown node:node .
USER node

COPY --from=builder /app/node_modules/ node_modules/
COPY --from=builder /app/.build/ .

EXPOSE 3000

ENTRYPOINT [ "/sbin/tini","--", "node", "index.js" ]
