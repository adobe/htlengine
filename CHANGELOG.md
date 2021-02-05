## [6.3.5](https://github.com/adobe/htlengine/compare/v6.3.4...v6.3.5) (2021-02-05)


### Bug Fixes

* **compiler:** don't use javascript Proxy ([2253231](https://github.com/adobe/htlengine/commit/2253231960cb5e47c6a04c32973ad07622157164)), closes [#303](https://github.com/adobe/htlengine/issues/303) [#304](https://github.com/adobe/htlengine/issues/304)

## [6.3.4](https://github.com/adobe/htlengine/compare/v6.3.3...v6.3.4) (2021-02-03)


### Bug Fixes

* **compiler:** regession with camelcased template names ([#300](https://github.com/adobe/htlengine/issues/300)) ([9493719](https://github.com/adobe/htlengine/commit/94937194b3cc88e7e2992fce963e5354dd4100b2)), closes [#299](https://github.com/adobe/htlengine/issues/299)

## [6.3.3](https://github.com/adobe/htlengine/compare/v6.3.2...v6.3.3) (2021-02-02)


### Bug Fixes

* **compiler:** ensure template variables are case insensitive ([#298](https://github.com/adobe/htlengine/issues/298)) ([d4f1ced](https://github.com/adobe/htlengine/commit/d4f1ced78c5b04becf8fe2c302a4678f14da0bcd)), closes [#297](https://github.com/adobe/htlengine/issues/297)

## [6.3.2](https://github.com/adobe/htlengine/compare/v6.3.1...v6.3.2) (2021-01-29)


### Bug Fixes

* **use:** data-sly-use with same variable gives error ([#296](https://github.com/adobe/htlengine/issues/296)) ([bf17da3](https://github.com/adobe/htlengine/commit/bf17da35a87b978c0caf398915d8b4c6276d1773)), closes [#295](https://github.com/adobe/htlengine/issues/295)

## [6.3.1](https://github.com/adobe/htlengine/compare/v6.3.0...v6.3.1) (2021-01-25)


### Bug Fixes

* **deps:** update external fixes ([#294](https://github.com/adobe/htlengine/issues/294)) ([bcef35a](https://github.com/adobe/htlengine/commit/bcef35a2feb9a6a6af824d175c72df069710ec97))

# [6.3.0](https://github.com/adobe/htlengine/compare/v6.2.15...v6.3.0) (2021-01-14)


### Features

* **parser:** replace antrl with nearly/moo ([2295d3a](https://github.com/adobe/htlengine/commit/2295d3af062b375064ac37d9d49362b5f714f44f)), closes [#268](https://github.com/adobe/htlengine/issues/268)

## [6.2.15](https://github.com/adobe/htlengine/compare/v6.2.14...v6.2.15) (2021-01-13)


### Bug Fixes

* **runtime:** fix type error with lists ([9ad3740](https://github.com/adobe/htlengine/commit/9ad3740922c5563a3a13dda82c62a0fba3b52ae2)), closes [#290](https://github.com/adobe/htlengine/issues/290)

## [6.2.14](https://github.com/adobe/htlengine/compare/v6.2.13...v6.2.14) (2021-01-12)


### Bug Fixes

* **compiler:** fix regression in data-sly-test ([4606712](https://github.com/adobe/htlengine/commit/46067128b5d40664431fddfa7acc5e583d36b2dc)), closes [#287](https://github.com/adobe/htlengine/issues/287)
* **compiler:** fix variable redefinition inside templates ([43a8b14](https://github.com/adobe/htlengine/commit/43a8b149e8f921cd86f4218b0f22fd9da5e63dd8)), closes [#286](https://github.com/adobe/htlengine/issues/286)

## [6.2.13](https://github.com/adobe/htlengine/compare/v6.2.12...v6.2.13) (2021-01-09)


### Bug Fixes

* **compiler:** escape all dashes in SymbolGenerator ([11f0f5c](https://github.com/adobe/htlengine/commit/11f0f5cf04c3d54b328d136d2bb4146a75a8152d)), closes [#284](https://github.com/adobe/htlengine/issues/284)

## [6.2.12](https://github.com/adobe/htlengine/compare/v6.2.11...v6.2.12) (2021-01-08)


### Bug Fixes

* **compiler:** ensure data-sly-set variable is defined before test ([fb81e68](https://github.com/adobe/htlengine/commit/fb81e68eacd27c780d203d19a54fc920d5c3df26)), closes [#282](https://github.com/adobe/htlengine/issues/282)
* **compiler:** ensure that all test variables are set before element ([727ca5a](https://github.com/adobe/htlengine/commit/727ca5a006df7ff1d6780472c54fd23c22315d10)), closes [#231](https://github.com/adobe/htlengine/issues/231)

## [6.2.11](https://github.com/adobe/htlengine/compare/v6.2.10...v6.2.11) (2020-12-27)


### Bug Fixes

* **deps:** update dependency urijs to v1.19.4 ([#280](https://github.com/adobe/htlengine/issues/280)) ([4e2696c](https://github.com/adobe/htlengine/commit/4e2696c81cbce791fe11e552cd790d1020fcfe8d))

## [6.2.10](https://github.com/adobe/htlengine/compare/v6.2.9...v6.2.10) (2020-12-25)


### Bug Fixes

* **compiler:** fix upper-/lowercase problems in repeat plugin ([385bd55](https://github.com/adobe/htlengine/commit/385bd55bd2e4dc654caa18b1c63e75e1d52bfaee)), closes [#272](https://github.com/adobe/htlengine/issues/272)
* **compiler:** ignore call arguments with no assignments ([1a22529](https://github.com/adobe/htlengine/commit/1a2252912a2d541a80a0d16bf33e4fa72c7f13e4)), closes [#275](https://github.com/adobe/htlengine/issues/275)

## [6.2.9](https://github.com/adobe/htlengine/compare/v6.2.8...v6.2.9) (2020-12-21)


### Bug Fixes

* **deps:** update external fixes ([#276](https://github.com/adobe/htlengine/issues/276)) ([342a027](https://github.com/adobe/htlengine/commit/342a02767f0d2b4cd017109e2a71b37cc19e83d1))

## [6.2.8](https://github.com/adobe/htlengine/compare/v6.2.7...v6.2.8) (2020-12-17)


### Bug Fixes

* **htl:** data-sly-test problem with upper case characters ([#274](https://github.com/adobe/htlengine/issues/274)) ([c5a1f19](https://github.com/adobe/htlengine/commit/c5a1f199c08d6383dd332081b96d594d4164fb34)), closes [#273](https://github.com/adobe/htlengine/issues/273)

## [6.2.7](https://github.com/adobe/htlengine/compare/v6.2.6...v6.2.7) (2020-12-14)


### Bug Fixes

* **deps:** update external fixes ([#271](https://github.com/adobe/htlengine/issues/271)) ([3cd2a81](https://github.com/adobe/htlengine/commit/3cd2a811f9b4b42605843c00b8ba6150f39ed4e8))

## [6.2.6](https://github.com/adobe/htlengine/compare/v6.2.5...v6.2.6) (2020-12-06)


### Bug Fixes

* **deps:** update external fixes ([#269](https://github.com/adobe/htlengine/issues/269)) ([426409d](https://github.com/adobe/htlengine/commit/426409df8a223c7a4fe82d14118f1ce0cd7e0d42))

## [6.2.5](https://github.com/adobe/htlengine/compare/v6.2.4...v6.2.5) (2020-11-30)


### Bug Fixes

* **deps:** revert back to antlr 4.7.2 ([698bf8b](https://github.com/adobe/htlengine/commit/698bf8b53564089e83784d755536e5e161c02e78)), closes [#266](https://github.com/adobe/htlengine/issues/266)

## [6.2.4](https://github.com/adobe/htlengine/compare/v6.2.3...v6.2.4) (2020-11-26)


### Bug Fixes

* **dep:** temp fix for antlr4 issue ([#265](https://github.com/adobe/htlengine/issues/265)) ([3855f5f](https://github.com/adobe/htlengine/commit/3855f5f48fd78321d39481f0b56e2a699d6bc1ed))

## [6.2.3](https://github.com/adobe/htlengine/compare/v6.2.2...v6.2.3) (2020-11-17)


### Bug Fixes

* **win:** fix 'require' problems on windows ([#260](https://github.com/adobe/htlengine/issues/260)) ([177c892](https://github.com/adobe/htlengine/commit/177c8926bf6255332f33b006789f452e4fe993c3)), closes [#259](https://github.com/adobe/htlengine/issues/259)

## [6.2.2](https://github.com/adobe/htlengine/compare/v6.2.1...v6.2.2) (2020-11-13)


### Bug Fixes

* **deps:** remove lodash ([#257](https://github.com/adobe/htlengine/issues/257)) ([c9e07d4](https://github.com/adobe/htlengine/commit/c9e07d4360b9d31dc113c0f9bb55104ddef68968))

## [6.2.1](https://github.com/adobe/htlengine/compare/v6.2.0...v6.2.1) (2020-11-01)


### Bug Fixes

* **htl:** toplevel properties are case insensitive ([#255](https://github.com/adobe/htlengine/issues/255)) ([09d31f1](https://github.com/adobe/htlengine/commit/09d31f100a1cf1251877ed59bbda9893ed0eae23)), closes [#254](https://github.com/adobe/htlengine/issues/254)

# [6.2.0](https://github.com/adobe/htlengine/compare/v6.1.0...v6.2.0) (2020-08-24)


### Features

* **compiler:** add support for data-sly-include ([11aaccc](https://github.com/adobe/htlengine/commit/11aacccffd3b7be8aa7b8eedf65f6c1fe875a519))

# [6.1.0](https://github.com/adobe/htlengine/compare/v6.0.0...v6.1.0) (2020-08-12)


### Features

* **index:** export script resolver ([#236](https://github.com/adobe/htlengine/issues/236)) ([30b4622](https://github.com/adobe/htlengine/commit/30b46221f2d20679e173c0f2fc55aac5f15ddac2))

# [6.0.0](https://github.com/adobe/htlengine/compare/v5.1.0...v6.0.0) (2020-08-11)


### Features

* **code:** simplify code ([#235](https://github.com/adobe/htlengine/issues/235)) ([631f18d](https://github.com/adobe/htlengine/commit/631f18dcaf4faef45ea8fe6f18be40690ba90676)), closes [#234](https://github.com/adobe/htlengine/issues/234)


### BREAKING CHANGES

* **code:** $.slyResource was renamed to $.resource

# [5.1.0](https://github.com/adobe/htlengine/compare/v5.0.0...v5.1.0) (2020-08-02)


### Features

* **compiler:** add support for external templates ([#219](https://github.com/adobe/htlengine/issues/219)) ([90e20de](https://github.com/adobe/htlengine/commit/90e20de71c62353ba58fcab136700bc4f51543dd))

# [5.0.0](https://github.com/adobe/htlengine/compare/v4.6.2...v5.0.0) (2020-07-29)


### Bug Fixes

* **compiler:** refactor template resolution ([#220](https://github.com/adobe/htlengine/issues/220)) ([b64729b](https://github.com/adobe/htlengine/commit/b64729b0229521400f065576e938eabcbd600971)), closes [#216](https://github.com/adobe/htlengine/issues/216)
* **element:** data-sly-element should default to existing tag if not allowed ([#228](https://github.com/adobe/htlengine/issues/228)) ([3f457ba](https://github.com/adobe/htlengine/commit/3f457bac07cfdeb5d6d7892d5b78ec34cee8f85c)), closes [#223](https://github.com/adobe/htlengine/issues/223)
* **uri:** undefined uri ([#229](https://github.com/adobe/htlengine/issues/229)) ([3dc23b7](https://github.com/adobe/htlengine/commit/3dc23b7cf8d6da70e73b29a691bf4d372bad3483)), closes [#221](https://github.com/adobe/htlengine/issues/221) [#222](https://github.com/adobe/htlengine/issues/222)


### BREAKING CHANGES

* **compiler:** - The templateLoader and scriptResolver are now 2
                   separate functions that can be set on the compiler

                 - The Runtime.template() has an extra argument 'id'
                   that specifies the group (script) the template is
                   defined.

## [4.6.2](https://github.com/adobe/htlengine/compare/v4.6.1...v4.6.2) (2020-07-22)


### Bug Fixes

* **runtime:** runtime cannot be executed twice ([#218](https://github.com/adobe/htlengine/issues/218)) ([5a5e6ef](https://github.com/adobe/htlengine/commit/5a5e6ef31e642e8547fdeeaf1b08a95dc9951dba)), closes [#211](https://github.com/adobe/htlengine/issues/211)

## [4.6.1](https://github.com/adobe/htlengine/compare/v4.6.0...v4.6.1) (2020-07-16)


### Bug Fixes

* **deps:** update dependency lodash to v4.17.19 [security] ([#212](https://github.com/adobe/htlengine/issues/212)) ([46a032d](https://github.com/adobe/htlengine/commit/46a032d35548276db017fda338fac3843b046cfa))

# [4.6.0](https://github.com/adobe/htlengine/compare/v4.5.2...v4.6.0) (2020-07-07)


### Features

* **runtime:** Add support for Internet Explorer 11 ([1619c8e](https://github.com/adobe/htlengine/commit/1619c8edd282f9b9a250f9330ce6461d0706d4b4)), closes [#205](https://github.com/adobe/htlengine/issues/205)

## [4.5.2](https://github.com/adobe/htlengine/compare/v4.5.1...v4.5.2) (2020-06-30)


### Bug Fixes

* **xss:** test xss against original form ([#200](https://github.com/adobe/htlengine/issues/200)) ([56f6733](https://github.com/adobe/htlengine/commit/56f6733d3b9f1b1535d2ad738e520200ed5f9e90)), closes [#183](https://github.com/adobe/htlengine/issues/183)

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
