FROM node:16-alpine AS builder
WORKDIR /app

COPY package*.json yarn.lock* ./

# Todo, after checking in either package-lock.json or yarn.lock
# enable this line and remove npm install
# RUN if [[ -f ./yarn.lock ]] ; then yarn install --frozen-lockfile ; else npm ci --unsafe-perm ; fi
RUN npm install

COPY tsconfig*.json esbuild*.js ./
COPY src src

RUN npm run build:dist

FROM node:16-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /app
RUN chown node:node .
USER node

COPY --from=builder /app/.build/ .

# Luckily, this is not necessary with esbuild
# COPY --from=builder /app/node_modules/ node_modules/

EXPOSE 3000

ENTRYPOINT [ "/sbin/tini","--", "node", "index.js" ]
