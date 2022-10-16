# WIP: Just Fucking Install

Is an attempt to reduce the amount of time wasted figuring out what is the
package manager you should type in the current repo you are working on.
Specially useful if you have few repos to maintain and you like to try them all.
NPM, Yarn, Pnpm... I don't care. I just want it installed.

The idea is to have a single command that will act as an interface for the
package manager used in the repo. So if you ever wanted to try a new package
manager, you just need to change the `packageManager` on your package.json and
remove your lock file and you are good to go. No need to change your scripts or
CLI anymore.

## Installation

```bash
npm install -g just-fucking-install
```

## Usage

```sh
# just fucking install
$ jf install
$ jf i
```

## TODOs

- [x] Install new packages
  - [x] Support `-D` or `--save-dev` flag
- [x] Uninstall packages
- [x] Run scripts
- [ ] If the package manager is not installed on your machine, it will be
      installed first.
- [ ] If the package manager is not defined in the repo, it will be installed
      using the default package manager.
- [ ] Create [Fig](https://fig.io) autocompletion for the CLI
