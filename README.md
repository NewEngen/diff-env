diff-env
========
Compare env files against eachother for missing or unset params

[![Version](https://img.shields.io/npm/v/diff-env.svg)](https://npmjs.org/package/diff-env)
[![Downloads/week](https://img.shields.io/npm/dw/diff-env.svg)](https://npmjs.org/package/diff-env)
[![License](https://img.shields.io/npm/l/diff-env.svg)](https://github.com/newengen/diff-env/blob/master/package.json)


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

### Install and setup

#### Single use
`npx diff-env -a ./some/config/path.env`

Team workflow
====================
On large teams where multiple people are contributing to a base env file or times when uat / staging environments must use their own config file. Things can get out of sync. Save time by setting up `diff-env` to run automatically

`npm i -D diff-env husky`

`package.json`
```
"husky": {
  "hooks": {
    "post-pull": "diff-env -a ./some/config/path.env"
  }
},
```