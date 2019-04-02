# HTL Engine for Javascript

This engine can parse [HTL](https://github.com/Adobe-Marketing-Cloud/htl-spec) scripts and builds a command stream. The command stream can either be intepreted or used to generate code. This project provides a Javascript (ES6) generator and runtime which allows to execute the scripts and use-classes.

## Status

[![codecov](https://img.shields.io/codecov/c/github/adobe/htlengine.svg)](https://codecov.io/gh/adobe/htlengine)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/htlengine.svg)](https://circleci.com/gh/adobe/htlengine)
[![GitHub license](https://img.shields.io/github/license/adobe/htlengine.svg)](https://github.com/adobe/htlengine/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/htlengine.svg)](https://github.com/adobe/htlengine/issues)
[![Greenkeeper badge](https://badges.greenkeeper.io/adobe/htlengine.svg)](https://greenkeeper.io/)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/htlengine.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/htlengine)

## Install

```bash
npm add @adobe/htlengine
```

## Build

```bash
yarn install
```

## run

currently not very cool. just passes the given file into the HTML parser and outputs the tree again.

```bash
node src/cli.js test/simple2.html
```

## API

You can also use the API directly:

```javascript
const { Compiler } = require('@adobe/htlengine');

const compiler = new Compiler()
      .withOutputDirectory('')
      .includeRuntime(true)
      .withRuntimeGlobalName('it');

const js = await compiler.compileToString(code);
// the result can be saved as a file or eval'd
```

## test

The tests are more comprehensive. They validate if the the HTL expressions are parsed and re-created using the generated parse tree.

```bash
yarn test
```

## rebuild antlr4 generated source

```bash
yarn build
```

### prerequisites

```bash
brew install antlr
```

