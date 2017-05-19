import execa from 'execa';
import isGit from 'is-git-repository';
import { platform } from 'os';
import makepath from 'path';
import pathIsAbsolute from 'path-is-absolute';

const cwd = process.cwd();

const taggedGitCommits = ({ path, lookBehind, local, remote } = {}) => {
  let taggedCommits = [];
  let getCommits;

  let thisPath = path || cwd;
  thisPath = pathIsAbsolute(thisPath) ? thisPath : makepath.join(cwd, thisPath);
  const thisLookBehind = lookBehind || 1;
  const thisLocal = local === undefined ? true : local;
  const thisRemote = remote || 'origin';

  if (!isGit(thisPath)) {
    return [];
  }

  try {
    let getTaggedCommitsExec;
    let getCommitsExec;

    if (thisLocal) {
      if (platform() === 'win32') {
        getCommitsExec = `pushd ${thisPath} & git show-ref`;
        getTaggedCommitsExec = `pushd ${thisPath} & git show-ref --tags`;
      } else {
        getCommitsExec = `(cd ${thisPath} ; git show-ref)`;
        getTaggedCommitsExec = `(cd ${thisPath} ; git show-ref --tags)`;
      }

      getCommits = execa.shellSync(getCommitsExec).stdout;
    } else {
      if (platform() === 'win32') {
        getCommitsExec = `pushd ${thisPath} & git ls-remote ${thisRemote}`;
        getTaggedCommitsExec = `pushd ${thisPath} & git ls-remote --tags ${thisRemote}`;
      } else {
        getCommitsExec = `(cd ${thisPath} ; git ls-remote)`;
        getTaggedCommitsExec = `(cd ${thisPath} ; git ls-remote --tags ${thisRemote})`;
      }

      getCommits = execa.shellSync(getCommitsExec).stdout;
    }

    if (getCommits.includes('refs/tags')) {
      const getTaggedCommits = execa.shellSync(getTaggedCommitsExec).stdout;

      taggedCommits = getTaggedCommits.split('\n');
      taggedCommits = taggedCommits.slice(-Math.abs(thisLookBehind));
    }
    return taggedCommits;
  } catch (e) {
    return [];
  }
};

export default taggedGitCommits;
