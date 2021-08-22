# Typescript Node project template

This template contains a full project configuration for Typescript and Node 14 based projects.

Features:

- `yarn build` production build that builds a single, minified, tree shaked .build/index.js bundle file with a Typescript sourcemap, built with esbuild
- `yarn serve` script for development mode, this auto rebuilds and restarts the app on changes with nodemon
- `yarn lint` script for linting the app with eslint and prettier
- Husky configuration for validating commit messages, lint issues and running tests
- tsconfig project configuration for Node 14 projects
- jest configuration for unit tests
- multi-staged docker build
- github actions configuration for build and test

## Getting started

Run `yarn install` and `yarn serve` to run the application in development mode.

### Docker build

Build the docker image with `docker build . -t ts-package-template` and run it with command `docker run ts-package-template`.
