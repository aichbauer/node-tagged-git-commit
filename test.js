import fs from 'fs-extra';
import { homedir } from 'os';
import test from 'ava';
import path from 'path';

import taggedCommit from './index';

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

test.before('rename git folders', () => {
  fs.renameSync(path.join(fixtures, 'local-tagged-3', 'git'), path.join(fixtures, 'local-tagged-3', '.git'));
  fs.renameSync(path.join(fixtures, 'local-tagged-0', 'git'), path.join(fixtures, 'local-tagged-0', '.git'));
  fs.renameSync(path.join(fixtures, 'remote-tagged-1', 'git'), path.join(fixtures, 'remote-tagged-1', '.git'));
});

test.after.always('rename .git folders', () => {
  fs.renameSync(path.join(fixtures, 'local-tagged-3', '.git'), path.join(fixtures, 'local-tagged-3', 'git'));
  fs.renameSync(path.join(fixtures, 'local-tagged-0', '.git'), path.join(fixtures, 'local-tagged-0', 'git'));
  fs.renameSync(path.join(fixtures, 'remote-tagged-1', '.git'), path.join(fixtures, 'remote-tagged-1', 'git'));
});

test('get the latest local tag', (t) => {
  t.deepEqual(taggedCommit({
    path: 'test/fixtures/local-tagged-3',
    lookBehind: 1,
  }),
    ['818550f71f04abed8d8999791a725864f6c85d56 refs/tags/v0.0.3'],
  );
});

test('get the latest local tag without passing the lookBehind', (t) => {
  t.deepEqual(taggedCommit({
    path: 'test/fixtures/local-tagged-3',
  }),
    ['818550f71f04abed8d8999791a725864f6c85d56 refs/tags/v0.0.3'],
  );
});

test('get the latest two local tags', (t) => {
  t.deepEqual(taggedCommit({
    path: 'test/fixtures/local-tagged-3',
    lookBehind: 2,
  }),
    [
      '7b88e084f1d1f8d5b1ddc2e970961f14f52613d5 refs/tags/v0.0.2',
      '818550f71f04abed8d8999791a725864f6c85d56 refs/tags/v0.0.3',
    ],
  );
});

test('get the latest three local tags', (t) => {
  t.deepEqual(taggedCommit({
    path: 'test/fixtures/local-tagged-3',
    lookBehind: 3,
  }),
    [
      'e8b102c6dbd8ff1af041b367892340e6fefd8f59 refs/tags/v0.0.1',
      '7b88e084f1d1f8d5b1ddc2e970961f14f52613d5 refs/tags/v0.0.2',
      '818550f71f04abed8d8999791a725864f6c85d56 refs/tags/v0.0.3',
    ],
  );
});

test('get an emty array if local repo has no tags', (t) => {
  t.deepEqual(taggedCommit({
    path: 'test/fixtures/local-tagged-0',
    lookBehind: 3,
  }), []);
});

test('get an emty array if the directory is not a repo', (t) => {
  t.deepEqual(taggedCommit({
    path: homedir(),
    lookBehind: 3,
  }), []);
});

test('the tags for this repo is more than 0', (t) => {
  t.deepEqual(taggedCommit(), []);
});

test('get tags from remote repository', (t) => {
  t.deepEqual(taggedCommit({
    path: 'test/fixtures/remote-tagged-1',
    local: false,
    remote: 'origin',
  }),
    ['31107b9051efe17e57c583937e027993860b11a9\trefs/tags/v0.0.0^{}'],
  );
});


