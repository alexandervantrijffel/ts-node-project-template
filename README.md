# Typescript Node project template

This template contains a full project configuration for Typescript and Node 16 based projects.

Features:

- `build` script that builds a single, minified, tree shaked .build/index.js bundle file that does not depend on external packages from node_modules. It comes with a Typescript sourcemap and is built with esbuild
- `serve` script for development mode, this auto rebuilds and restarts the app on changes with node-vite
- extensive lint configuration for standardized, consistent code
- Husky configuration for validating commit messages, lint validation and running tests
- tsconfig project configuration for Node 16 projects based on [best practices for Node 16](https://github.com/tsconfig/bases/blob/main/bases/node16.json)
- jest configuration for unit tests, vitest for test execution [vitest features](https://vitest.dev/guide/features.html)
- multi-staged Docker build with minimal Docker image size
- Github Actions workflow for build, test and Docker build
- both npm and yarn are supported

The build performance in **development build mode** increases significantly when using esbuild instead of the Typescript compiler tsc:

![](https://user-images.githubusercontent.com/994409/130596241-cedf9860-f4ca-4cb3-8bc6-e4a59aad20c2.png)

## Getting started

### With npm

Run `npm install` and `npm run serve` to run the application in development mode.

Run `npm run test:watch` to run unit tests in watch mode.

### With yarn

Run `yarn install` and `yarn serve` to run the application in development mode.

Run `yarn test:watch` to run unit tests in watch mode.

## Docker build

Build the Docker image with `docker build . -t ts-node-project-template` and run it with command `docker run ts-node-project-template`.

The resulting Docker image is only 30MB. This achieved by making use of a multi-stage Docker build and using m03geek/alpine-node:pico-14 as the base image for the production build. This doesn't include npm which saves 33MB and node is packed with upx. This leads to a Docker image that is around 88MB smaller compared to the official node:alpine-14 image.

## Github actions

A Github Actions workflow is included that builds the package and runs the tests. When that succeeds a Docker image is built. Because node_modules are cached, both the build-test and build-docker jobs finish within a minute when the package dependencies can be retrieved from the cache.

Modify the workflow file at `.github/workflows/main.yml` for setting up pushing the Docker image to a registry.

## Danger JS

With Danger JS checks are executed on PR's to validate the quality of the PR. The following checks are implemented in dangerfile.ts:

- Do all tests succeed?
- Does the PR title follow the !(conventional commits)[https://www.conventionalcommits.org/en/v1.0.0] standard?
- Does the PR has a decription?

This is reported on the pull request by Danger JS as comments:

![jHRgpCs](https://user-images.githubusercontent.com/994409/131375208-09be3852-938d-4e08-958d-8d49e22f9e61.png)

To allow Danger JS to add comments to the PR, take the following steps:

- Create a Github Personal Access Token at https://github.com/settings/tokens/new with permission `public_repo`.
- Add a secret to the repository with name `DANGER_TOKEN` and set the Personal Access Token as the value.

To extend dangerfile.ts with additional rules, make sure you add the `danger` package to the project as dev dependency and run danger locally on a pull request with the following command:

```
DANGER_GITHUB_API_TOKEN=<github_personal_access_token> yarn danger pr https://github.com/<username>/<repository>/pull/<pull request number>
```

### Renovate

This template contain a starter configuration for !(Renovate)[https://github.com/renovatebot/renovate]. Renovate automates dependency updates by creating pull requests. Install the Renovate app for Github from !(here)[https://github.com/apps/renovate].
