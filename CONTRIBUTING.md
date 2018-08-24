<!--
 ~ Copyright 2018 Adobe. All rights reserved.
 ~ This file is licensed to you under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License. You may obtain a copy
 ~ of the License at http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software distributed under
 ~ the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 ~ OF ANY KIND, either express or implied. See the License for the specific language
 ~ governing permissions and limitations under the License.
-->
# Contributing to HTL Engine

This project is an Open Development/Inner Source project and welcomes contributions from everyone who finds it useful or lacking.

## Definition Of Terms

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in Helix document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

## Code Of Conduct

This project adheres to the Adobe [code of conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to cstaub at adobe dot com.

## Contributor License Agreement

All third-party contributions to this project must be accompanied by a signed contributor license. This gives Adobe permission to redistribute your contributions as part of the project. [Sign our CLA](http://opensource.adobe.com/cla.html)! You only need to submit an Adobe CLA one time, so if you have submitted one previously, you are good to go!

## Things to Keep in Mind

This project uses a **commit then review** process, which means that for approved maintainers, changes can be merged immediately, but will be reviewed by others.

For other contributors, a maintainer of the project has to approve the pull request.

# Before You Contribute

* Check that there is an existing issue in GitHub issues
* Check if there are other pull requests that might overlap or conflict with your intended contribution

# How to Contribute

1. Fork the repository
2. Make some changes on a branch on your fork
3. Create a pull request from your branch

In your pull request, outline:

* What the changes intend
* How they change the existing code
* If (and what) they breaks
* Start the pull request with the GitHub issue ID, e.g. #123

Lastly, please follow the [pull request template](PULL_REQUEST_TEMPLATE.md) when submitting a pull request!

Each commit message that is not part of a pull request:

* Should contain the issue ID like `#123`
* Can contain the tag `[trivial]` for trivial changes that don't relate to an issue

## Coding Styleguides

Javascript code style should follow the [Airbnb JavaScript Style Guide()](https://github.com/airbnb/javascript)

# How Contributions get Reviewed

One of the maintainers will look at the pull request within one week. If you haven't heard back from the maintainers within a week, it is not impolite to send a reminder to [Grp-XDM-API-WGs](mailto:Grp-XDM-API-WGs@adobe.com).

Feedback on the pull request will be given in writing, in GitHub.

# Releasing

## NPM Packages

The project's committers will release to the [Adobe organization on npmjs.org](https://www.npmjs.com/org/adobe).
Please contact the [Adobe Open Source Advisory Board](https://git.corp.adobe.com/OpenSourceAdvisoryBoard/discuss/issues) to get access to the npmjs organization.

Package version follow [semantic versioning](https://github.com/npm/node-semver). But since most of
our packages still are on 0.x, it is rather good practice to use minor / patch versions accordingly.

Our CI automatically creates a new [pre-release](https://semver.org/#spec-item-9) versions for every 
merged pull request.  The _pre-release_ versions have the form `x.y.z-pre.c` (where `c` is a counter). 
The subsequent release version `(x.y.z)` will take [precedence](https://semver.org/#spec-item-11)
over the _pre-release_ version. 

the _pre-release_ versions are attributed with the [dist-tag](https://docs.npmjs.com/cli/dist-tag) `@next`.

### How to cut a release

Based on the changes that follow up a release, we used [semantic versioning](https://github.com/npm/node-semver)
to define the next release type: `major`, `minor` or `patch`: 

> **Note:** The packages have a `postversion` script that will push the updated package.json along
> with the git-tag. so no need to do this manually
  
Creating a _patch_ release:
   
```bash
$ npm version patch
$ npm publish --tag latest --access public
```

Creating a _minor_ release:
   
```bash
$ npm version minor
$ npm publish --tag latest --access public
```

Creating a _major_ release:
   
```bash
$ npm version major
$ npm publish --tag latest --access public
```

### Adding release notes

It is good practice to write some release notes on git for the respective release.
For example: https://github.com/adobe/helix-cli/releases/tag/v0.3.1

In the future, the release notes can be generated automatically from the information from git issues
and commits.
