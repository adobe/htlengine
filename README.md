# HTL Parser for Javascript

## Build

```bash
$ yarn install
$ yarn build
```

## run

currently not very cool. just passes the given file into the HTML parser and outputs the tree.

```bash
$ node src/main.js test/simple.html
```


## test

runs some tests. currently the HTL expressions are parsed and re-created using the generated parse tree.

```bash
$ yarn test
```