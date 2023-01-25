FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json yarn.lock* ./

RUN npm install

COPY tsconfig*.json esbuild*.js ./
COPY src src

RUN npm run build

FROM node:18-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /app
RUN chown node:node .
USER node

COPY --from=builder /app/.build/ .

EXPOSE 3000

ENTRYPOINT [ "/sbin/tini","--", "node", "index.js" ]
