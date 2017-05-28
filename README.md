# tagged-git-commit

Get the commit hash and refs/tag of tagged commits, remote and local

[![Build Status](https://travis-ci.org/aichbauer/node-tagged-git-commit.svg?branch=master)](https://travis-ci.org/aichbauer/node-tagged-git-commit)
[![Build status](https://ci.appveyor.com/api/projects/status/4kqxk117y906tekg/branch/master?svg=true)](https://ci.appveyor.com/project/rudolfsonjunior/node-tagged-git-commit-xnpik/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/aichbauer/node-tagged-git-commit/badge.svg?branch=master)](https://coveralls.io/github/aichbauer/node-tagged-git-commit?branch=master)

## Installation

```sh
$ npm i tagged-git-commit --save
```
or
```sh
$ yarn add tagged-git-commit
```

## Usage

Returns an array of the commit hashes.

```js
const taggedCommits = require('tagged-git-commit');

// the latest local tagged commit hash from process.cwd()
taggedCommits();

// the latest local tagged commit hash from the repo './path/to/repo'
taggedCommits({
  path: '.path/to/repo',
});

// the latest 5 local tagged commit hashes from process.cwd()
taggedCommits({
  lookBehind: 5,
});

// the latest tagged commit from process.cwd() from remote origin
taggedCommits({
  local: false,
});

// the latest tagged commit from process.cwd() from remote anotherOrigin
taggedCommits({
  local: false,
  remote: 'anotherOrigin'
});

// the latest 3 tagged commit hashes from the repo './path/to/repo' from the remote origin
taggedCommits({
  path: './path/to/repo',
  lookBehind: 3,
  local: false,
  remote: 'origin',
});
```

## LICENSE

MIT © Lukas Aichbauer
