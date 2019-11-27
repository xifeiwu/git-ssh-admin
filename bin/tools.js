#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const commander = require('busybox/node_modules/commander');
const utils = require('../lib/utils');

commander.addImplicitHelpCommand();

commander.command('addPubKey <pathOfPubicKey>').action(async (pathOfPubicKey) => {
  if (!fs.existsSync(pathOfPubicKey)) {
    console.log(`${pathOfPubicKey} not exist!`);
    return;
  }
  const [type, key, name] = fs.readFileSync(pathOfPubicKey).toString().replace('\n', '').split(' ');
  utils.addCommand(type, key, name);
});

commander.command('kill <pid>').action(async (pid) => {
  try {
    // process.kill(pid, 'SIGTERM');
    // console.log(pid);
    const pidKilled = await nodeUtils.killByPid(pid);
    console.log(`killed: ${pidKilled}`);
  } catch (err) {
    console.log(err);
  }
  // const cmdPS = nodeUtils.spawnCmdPS();
  // cmdPS.stdout.pipe(process.stdout);
  // cmdPS.stderr.pipe(process.stderr);
});

commander.parse(process.argv);