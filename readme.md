# Nimbus Backend Typescript

Welcome to the Nimbus Backend TS! This project implements a backend for [Nimbus](todo) in Typescript. To run the
backend you'll need NodeJS. Although not tested, this should also work for any backend technology for Javascript (but
without the facilities provided by the express-client sub-project).

This repository is a mono-repo with 4 projects:

- core: the core implementation for the Nimbus backend, this should work with anything that runs JS.
- express: a more user-friendly interface of the core lib, it brings a lot of benefits that makes the lib easier to
use and safer (better typing). The drawback is that it only works with node-express servers.

This documentation will assume you have all three modules installed in your node application. For more information
on how to use the Nimbus Backend TS without Express, check [this topic](todo).

## Documentation

The documentation for this lib is in our [wiki](todo).

## Getting Started

### 1. Before Installation

This project uses Yarn as node packages manager, so be sure that you have installed.
If you do not have it installed, you can follow the installation instructions [here](https://classic.yarnpkg.com/lang/en/docs/install).
Or simply run:
> npm install --global yarn

### 2. Installation

Once you have yarn installed you can run the following command, at the root of the project, to install the packages on all projects at once:
> yarn

Then run the following command, at the root of the project, to generate the libs locally:
> yarn build

### 3. Running the Sample Application

The sample store application is a `node` project that is served using an `express` server.
To run the application, you can run the following command, at the root of the project:
> yarn sample start

or you can run from the sample folder, with:
> cd sample
> yarn start

The application will start running at: `http://localhost:3000`

### 4. Testing

To run the tests, you can run the following command, at the root of the project, to run the tests of all projects:
> yarn test

or you can run from the project folder, i.e.:
> cd core
> yarn test
