# HTL Parser for Javascript

## Build

```bash
$ yarn install
```

## run

currently not very cool. just passes the given file into the HTML parser and outputs the tree again.

```bash
$ node test/main.js test/simple.html
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
$ brew install antlr4
```
