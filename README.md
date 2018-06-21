# [HTL](https://github.com/Adobe-Marketing-Cloud/htl-spec) Engine for Javascript

This engine can parse HTL scripts and builds a command stream. The command stream can either be intepreted or used to generate code. This project provides a Javascript (ES6) generator and runtime which allows to execute the scripts and use-classes.

## Install

```bash
$ npm i --save @adobe/htlengine
```

## Build

```bash
$ yarn install
```

## run

currently not very cool. just passes the given file into the HTML parser and outputs the tree again.

```bash
$ node src/cli.js test/simple2.html
```

## API

You can also use the API directly:

```javascript
const Compiler = require("@adobe/htlengine/src/compiler/Compiler");

const compiler = new Compiler()
      .withOutputDirectory("")
      .includeRuntime(true)
      .withRuntimeGlobalName("it");

compiler.compileToString(code);
// the result can be saved as a file or eval'd
```

## test

The tests are more comprehensive. They validate if the the HTL expressions are parsed and re-created using the generated parse tree.

```bash
$ yarn test
```

## rebuild antlr4 generated source

```bash
$ yarn build
```

### prerequisites

```bash
$ brew install antlr
```
