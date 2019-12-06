diff-env
========
Compare env files against eachother for missing or unset params

[![Version](https://img.shields.io/npm/v/@newengen/diff-env)](https://www.npmjs.com/package/@newengen/diff-env)
[![Downloads/week](https://img.shields.io/npm/dm/@newengen/diff-env)](https://www.npmjs.com/package/@newengen/diff-env)
[![License](https://img.shields.io/github/license/NewEngen/diff-env)](https://github.com/NewEngen/diff-env/blob/master/package.json)


## Quick Overview
```
USAGE
  diff-env

OPTIONS
  -a, --against=against  (required) path of the config you want to compare against.
  -c, --check=check      [default: .env] path to the config you want to compare. defaults to .env
  -h, --help             show CLI help
  -v, --version          show CLI version
```

#### Install and setup

##### Single use
`npx diff-env -a ./some/config/path.env`

#### Team workflow
On large teams where multiple people are contributing to a base env file or times when uat / staging environments must use their own config file At NewEngen we use [Husky](https://github.com/typicode/husky) to make sure diff-env runs after every pull as well as before deploying to our UAT instances to save time and frustration with having to fix a missing env parameter.

##### Yarn
`yarn add -D diff-env husky`

##### NPM
`npm i -D diff-env husky`

`package.json`
```
"husky": {
  "hooks": {
    "post-pull": "diff-env -a ./some/config/path.env"
  }
},
```
