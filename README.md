# Typescript Node project template

This template contains a full project configuration for Typescript and Node 14 based projects.

Features:

- `build` script that builds a single, minified, tree shaked .build/index.js bundle file that does not depend on external packages from node_modules. It comes with a Typescript sourcemap and is built with esbuild
- `serve` script for development mode, this auto rebuilds and restarts the app on changes with nodemon and esbuild
- `lint` script for linting the app with eslint and prettier
- Husky configuration for validating commit messages, lint issues and running tests
- tsconfig project configuration for Node 14 projects based on [best practices for Node 14](https://github.com/tsconfig/bases/blob/main/bases/node14.json)
- jest configuration for unit tests
- multi-staged docker build
- github actions configuration for build and test
- both npm and yarn are supported

The build performance in development mode increases significantly when using esbuild instead of the Typescript compiler tsc:

![](https://user-images.githubusercontent.com/994409/130596241-cedf9860-f4ca-4cb3-8bc6-e4a59aad20c2.png)

## Getting started

### With npm  
Run `npm install` and `npm run serve` to run the application in development mode.

Run `npm run test:watch` to run unit tests in watch mode.

### With yarn
Run `yarn install` and `yarn serve` to run the application in development mode.

Run `yarn test:watch` to run unit tests in watch mode.

### Docker build

Build the docker image with `docker build . -t ts-package-template` and run it with command `docker run ts-package-template`.
