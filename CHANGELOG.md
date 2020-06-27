## [4.5.1](https://github.com/adobe/htlengine/compare/v4.5.0...v4.5.1) (2020-06-27)


### Bug Fixes

* allow to join strings ([#196](https://github.com/adobe/htlengine/issues/196)) ([#197](https://github.com/adobe/htlengine/issues/197)) ([b6b067f](https://github.com/adobe/htlengine/commit/b6b067f24c42c091d01d040bd4c999e27e71c73e))

# [4.5.0](https://github.com/adobe/htlengine/compare/v4.4.1...v4.5.0) (2020-06-05)


### Features

* **runtime:** pass expression options to resource loader ([92e9ae4](https://github.com/adobe/htlengine/commit/92e9ae47ceabfac0287a2a45f533d81381ee849b)), closes [#186](https://github.com/adobe/htlengine/issues/186) [#187](https://github.com/adobe/htlengine/issues/187)

## [4.4.1](https://github.com/adobe/htlengine/compare/v4.4.0...v4.4.1) (2020-05-19)


### Bug Fixes

* **html:** Attributes without value are treated as attributes with value = 'true' ([c50cf66](https://github.com/adobe/htlengine/commit/c50cf6669e6deafa674624d17cfe3302760a2879)), closes [#177](https://github.com/adobe/htlengine/issues/177)

# [4.4.0](https://github.com/adobe/htlengine/compare/v4.3.1...v4.4.0) (2020-05-07)


### Features

* **compiler:** add ability to specify template loader ([#173](https://github.com/adobe/htlengine/issues/173)) ([076ad15](https://github.com/adobe/htlengine/commit/076ad15a637009e9bdc3621aed814515fe666f6a)), closes [#172](https://github.com/adobe/htlengine/issues/172)

## [4.3.1](https://github.com/adobe/htlengine/compare/v4.3.0...v4.3.1) (2020-03-23)


### Bug Fixes

* **deps:** update dependency fs-extra to v9 ([a779c81](https://github.com/adobe/htlengine/commit/a779c81498887871b6e2dcef1618b8d34f674ea6))

# [4.3.0](https://github.com/adobe/htlengine/compare/v4.2.0...v4.3.0) (2020-02-26)


### Features

* **vdom:** add option to suppress automatic body generation ([dc127e6](https://github.com/adobe/htlengine/commit/dc127e6628febba5b56f4dd09ffce6069e24313e)), closes [#154](https://github.com/adobe/htlengine/issues/154)

# [4.2.0](https://github.com/adobe/htlengine/compare/v4.1.1...v4.2.0) (2020-02-26)


### Bug Fixes

* **htl:** add iteration control for data-sly-list ([656c99a](https://github.com/adobe/htlengine/commit/656c99a8b88ac79888031ccf0c95a2c6022f55a9))
* **htl:** allow negative numbers in htl expressions ([6b21df4](https://github.com/adobe/htlengine/commit/6b21df49151125529e1524059652b5356c5201fb))


### Features

* **htl:** implement data-sly-set ([e380939](https://github.com/adobe/htlengine/commit/e380939ee55332be916d9cf8e1773542a47e4752))

## [4.1.1](https://github.com/adobe/htlengine/compare/v4.1.0...v4.1.1) (2020-02-26)


### Bug Fixes

* **htl:** ensure that templates have access to global variables ([#152](https://github.com/adobe/htlengine/issues/152)) ([19d6910](https://github.com/adobe/htlengine/commit/19d6910796f21770b09ae1eec5dcd53bb27cb069)), closes [#133](https://github.com/adobe/htlengine/issues/133)

# [4.1.0](https://github.com/adobe/htlengine/compare/v4.0.3...v4.1.0) (2020-02-26)


### Features

* **htl:** implement 'in' operator ([#151](https://github.com/adobe/htlengine/issues/151)) ([4258898](https://github.com/adobe/htlengine/commit/4258898e8a5355ef9be503d45317b9597bbac53b)), closes [#136](https://github.com/adobe/htlengine/issues/136)

## [4.0.3](https://github.com/adobe/htlengine/compare/v4.0.2...v4.0.3) (2020-02-26)


### Bug Fixes

* **runtime:** support function as getters for use-classes ([#150](https://github.com/adobe/htlengine/issues/150)) ([dd53ffc](https://github.com/adobe/htlengine/commit/dd53ffc50fd7643d0821249e4248d37742aed607)), closes [#137](https://github.com/adobe/htlengine/issues/137)

## [4.0.2](https://github.com/adobe/htlengine/compare/v4.0.1...v4.0.2) (2020-02-26)


### Bug Fixes

* **repeat:** implement data-sly-repeat ([#149](https://github.com/adobe/htlengine/issues/149)) ([98da102](https://github.com/adobe/htlengine/commit/98da102aef8ae46ac6806489a965d28d9e3f3604)), closes [#138](https://github.com/adobe/htlengine/issues/138)

## [4.0.1](https://github.com/adobe/htlengine/compare/v4.0.0...v4.0.1) (2020-02-25)


### Bug Fixes

* **format:** use correct date format ([#148](https://github.com/adobe/htlengine/issues/148)) ([1ae13fe](https://github.com/adobe/htlengine/commit/1ae13fe2f4fe787b98c3bcb17e216ab1af04cccb)), closes [#146](https://github.com/adobe/htlengine/issues/146)

# [4.0.0](https://github.com/adobe/htlengine/compare/v3.4.0...v4.0.0) (2020-02-16)


### Bug Fixes

* **compiler:** use local and global path then resolving templates ([84c845e](https://github.com/adobe/htlengine/commit/84c845e3f7f31f24c1c9f915e66c530d15840db8)), closes [#135](https://github.com/adobe/htlengine/issues/135)


### Features

* **runtime:** make resource losder pluggable ([4f0088b](https://github.com/adobe/htlengine/commit/4f0088b7183d3587db2bcba779c980b626f15e66))


### BREAKING CHANGES

* **runtime:** Runtime API change

- the `Runtime.withResourceDir()` method was replaced by a
  pluggable `withResourceResolver()` method.
- `Runtime.withUseDir()` was removed

# [3.4.0](https://github.com/adobe/htlengine/compare/v3.3.1...v3.4.0) (2020-02-15)


### Features

* **compiler:** add support for custom import module statements ([7487d58](https://github.com/adobe/htlengine/commit/7487d58d3749027d27d75620763664e420f4425f)), closes [#134](https://github.com/adobe/htlengine/issues/134)

## [3.3.1](https://github.com/adobe/htlengine/compare/v3.3.0...v3.3.1) (2020-02-03)


### Bug Fixes

* **compiler:** allow to specify require when using compileToFunction() ([#117](https://github.com/adobe/htlengine/issues/117)) ([fb901fd](https://github.com/adobe/htlengine/commit/fb901fdeb88c09a7a18cab9a3b95059b9ecfec6a)), closes [#114](https://github.com/adobe/htlengine/issues/114)

# [3.3.0](https://github.com/adobe/htlengine/compare/v3.2.8...v3.3.0) (2020-01-14)


### Features

* **node:** require node 10.13.x ([#124](https://github.com/adobe/htlengine/issues/124)) ([0876049](https://github.com/adobe/htlengine/commit/0876049e5834f909b9b1e929ee3a913c7fea15fd))

## [3.2.8](https://github.com/adobe/htlengine/compare/v3.2.7...v3.2.8) (2019-11-11)


### Bug Fixes

* **compiler:** use node require semantics for importing use classes ([#110](https://github.com/adobe/htlengine/issues/110)) ([6d00698](https://github.com/adobe/htlengine/commit/6d0069874cb5fb14c8a39a109f19c9bbe90a829e)), closes [#105](https://github.com/adobe/htlengine/issues/105) [#106](https://github.com/adobe/htlengine/issues/106)

## [3.2.7](https://github.com/adobe/htlengine/compare/v3.2.6...v3.2.7) (2019-11-11)


### Bug Fixes

* **compiler:** avoid writing if(false) blocks ([#109](https://github.com/adobe/htlengine/issues/109)) ([8e83c52](https://github.com/adobe/htlengine/commit/8e83c52700ec65026c91ec6248d5ffa114c826f0))

## [3.2.6](https://github.com/adobe/htlengine/compare/v3.2.5...v3.2.6) (2019-11-07)


### Bug Fixes

* **template:** add support for external templates calling templates and produce correct sourcemap. ([#104](https://github.com/adobe/htlengine/issues/104)) ([c528991](https://github.com/adobe/htlengine/commit/c5289912bc376adbef5119fa7fe7f4ea04d42f4b)), closes [#86](https://github.com/adobe/htlengine/issues/86)

## [3.2.5](https://github.com/adobe/htlengine/compare/v3.2.4...v3.2.5) (2019-11-06)


### Bug Fixes

* **template:** ensure correct template function names ([#103](https://github.com/adobe/htlengine/issues/103)) ([8582132](https://github.com/adobe/htlengine/commit/858213250e2261a447425c33c8c0da94a5c6ed8e))

## [3.2.4](https://github.com/adobe/htlengine/compare/v3.2.3...v3.2.4) (2019-10-30)


### Bug Fixes

* **build:** remove snyk ([#101](https://github.com/adobe/htlengine/issues/101)) ([3d61054](https://github.com/adobe/htlengine/commit/3d610545f650bcb84904d1c79bfd80b6d418eacb))

## [3.2.3](https://github.com/adobe/htlengine/compare/v3.2.2...v3.2.3) (2019-10-07)


### Bug Fixes

* **deps:** update any ([#93](https://github.com/adobe/htlengine/issues/93)) ([552f174](https://github.com/adobe/htlengine/commit/552f174))

## [3.2.2](https://github.com/adobe/htlengine/compare/v3.2.1...v3.2.2) (2019-08-15)


### Bug Fixes

* **html:** attributes are double escaped ([#85](https://github.com/adobe/htlengine/issues/85)) ([0d68835](https://github.com/adobe/htlengine/commit/0d68835))

## [3.2.1](https://github.com/adobe/htlengine/compare/v3.2.0...v3.2.1) (2019-07-12)


### Bug Fixes

* **package:** update dependencies to address security issues ([#80](https://github.com/adobe/htlengine/issues/80)) ([acaa174](https://github.com/adobe/htlengine/commit/acaa174))

# [3.2.0](https://github.com/adobe/htlengine/compare/v3.1.1...v3.2.0) (2019-06-13)


### Features

* **dom:** add support for nodelist iteration ([#75](https://github.com/adobe/htlengine/issues/75)) ([c979d42](https://github.com/adobe/htlengine/commit/c979d42)), closes [#37](https://github.com/adobe/htlengine/issues/37)

## [3.1.1](https://github.com/adobe/htlengine/compare/v3.1.0...v3.1.1) (2019-06-13)


### Bug Fixes

* **dom:** be more lenient when adding arrays ([1a08518](https://github.com/adobe/htlengine/commit/1a08518)), closes [#73](https://github.com/adobe/htlengine/issues/73)

# [3.1.0](https://github.com/adobe/htlengine/compare/v3.0.0...v3.1.0) (2019-06-06)


### Features

* **dom:** allow injection of ${document.body} anywhere ([269aaf7](https://github.com/adobe/htlengine/commit/269aaf7)), closes [#71](https://github.com/adobe/htlengine/issues/71)

# [3.0.0](https://github.com/adobe/htlengine/compare/v2.3.2...v3.0.0) (2019-06-05)


### Features

* **compiler:** allow to set default context ([5c735d0](https://github.com/adobe/htlengine/commit/5c735d0)), closes [#69](https://github.com/adobe/htlengine/issues/69)
* **runtime:** Add support for DOM variables ([d4bab4c](https://github.com/adobe/htlengine/commit/d4bab4c)), closes [#62](https://github.com/adobe/htlengine/issues/62)


### BREAKING CHANGES

* **runtime:** the response from the runtime template is no longer an object, but the generated string or document.

## [2.3.2](https://github.com/adobe/htlengine/compare/v2.3.1...v2.3.2) (2019-06-05)


### Bug Fixes

* **xss:** Allow src/href attributes on images and links ([f99d0a5](https://github.com/adobe/htlengine/commit/f99d0a5)), closes [#66](https://github.com/adobe/htlengine/issues/66)

## [2.3.1](https://github.com/adobe/htlengine/compare/v2.3.0...v2.3.1) (2019-05-27)


### Bug Fixes

* **xss:** regression in uri sanitizer ([#65](https://github.com/adobe/htlengine/issues/65)) ([ca9ea37](https://github.com/adobe/htlengine/commit/ca9ea37)), closes [#64](https://github.com/adobe/htlengine/issues/64)

# [2.3.0](https://github.com/adobe/htlengine/compare/v2.2.2...v2.3.0) (2019-05-24)


### Features

* **xss:** URLs are not correctly sanitized ([9869f7c](https://github.com/adobe/htlengine/commit/9869f7c)), closes [#53](https://github.com/adobe/htlengine/issues/53)

## [2.2.2](https://github.com/adobe/htlengine/compare/v2.2.1...v2.2.2) (2019-05-13)


### Bug Fixes

* **compiler:** rename global object to `global` ([#61](https://github.com/adobe/htlengine/issues/61)) ([8a398f1](https://github.com/adobe/htlengine/commit/8a398f1)), closes [#60](https://github.com/adobe/htlengine/issues/60)

## [2.2.1](https://github.com/adobe/htlengine/compare/v2.2.0...v2.2.1) (2019-05-09)


### Bug Fixes

* **engine:** do not unwrap call element ([#59](https://github.com/adobe/htlengine/issues/59)) ([8963ead](https://github.com/adobe/htlengine/commit/8963ead)), closes [#58](https://github.com/adobe/htlengine/issues/58)

# [2.2.0](https://github.com/adobe/htlengine/compare/v2.1.7...v2.2.0) (2019-05-09)


### Features

* **engine:** Adding support for date formatting  ([d4301f8](https://github.com/adobe/htlengine/commit/d4301f8)), closes [#57](https://github.com/adobe/htlengine/issues/57)

## [2.1.7](https://github.com/adobe/htlengine/compare/v2.1.6...v2.1.7) (2019-05-07)


### Bug Fixes

* **engine:** implement support for data-sly-unwrap ([2956097](https://github.com/adobe/htlengine/commit/2956097)), closes [#55](https://github.com/adobe/htlengine/issues/55)

## [2.1.6](https://github.com/adobe/htlengine/compare/v2.1.5...v2.1.6) (2019-04-19)


### Bug Fixes

* package.json & package-lock.json to reduce vulnerabilities ([#51](https://github.com/adobe/htlengine/issues/51)) ([1cf9a6f](https://github.com/adobe/htlengine/commit/1cf9a6f))

## [2.1.5](https://github.com/adobe/htlengine/compare/v2.1.4...v2.1.5) (2019-04-11)


### Bug Fixes

* **compiler:** use statement cannot load external templates ([b8482a3](https://github.com/adobe/htlengine/commit/b8482a3)), closes [#47](https://github.com/adobe/htlengine/issues/47)

## [2.1.4](https://github.com/adobe/htlengine/compare/v2.1.3...v2.1.4) (2019-04-11)


### Bug Fixes

* **compiler:** Support for identifiers with colon character and isolate global variables from user d ([f13ed75](https://github.com/adobe/htlengine/commit/f13ed75)), closes [#15](https://github.com/adobe/htlengine/issues/15)

## [2.1.3](https://github.com/adobe/htlengine/compare/v2.1.2...v2.1.3) (2019-04-09)


### Bug Fixes

* package.json & package-lock.json to reduce vulnerabilities ([0fe94d5](https://github.com/adobe/htlengine/commit/0fe94d5))

## [2.1.2](https://github.com/adobe/htlengine/compare/v2.1.1...v2.1.2) (2019-04-02)


### Bug Fixes

* package.json & package-lock.json to reduce vulnerabilities ([41e7735](https://github.com/adobe/htlengine/commit/41e7735))
