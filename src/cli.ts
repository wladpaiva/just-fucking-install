#!/usr/bin/env node
import {cac} from 'cac'
import config from '../package.json'
import {install} from './install.js'
import {uninstall} from './uninstall'

const cli = cac()

// Default command
cli.command('', 'Show this help').action(cli.outputHelp)

// Install
cli
  .command(
    'install [...packages]',
    'Use options as you normally would with npm install',
  )
  .alias('i')
  .option('-D, --save-dev', 'Save it as dev dependency')
  .action(install)

// Uninstall
cli
  .command(
    'uninstall [...packages]',
    'Use options as you normally would with npm uninstall',
  )
  .alias('un')
  .alias('remove')
  .alias('rm')
  .option('-D, --save-dev', 'Save it as dev dependency')
  .action(uninstall)

// Listen to unknown commands
cli.on('command:*', () => {
  console.error('Invalid command: %s', cli.args.join(' '))
  process.exit(1)
})

// Display help message when `-h` or `--help` appears
cli.help()
// Display version number when `-v` or `--version` appears
// It's also used in help message
cli.version(config.version)

cli.parse()
