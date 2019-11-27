#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const commander = require('busybox/node_modules/commander');
const bytes = require('busybox/node_modules/bytes');
const utils = require('../lib/utils');

commander.addImplicitHelpCommand();

commander.command('addUser <pathOfPubicKey>').action(async (pathOfPubicKey) => {
  if (!fs.existsSync(pathOfPubicKey)) {
    console.log(`${pathOfPubicKey} not exist!`);
    return;
  }
  const [type, key, name] = fs.readFileSync(pathOfPubicKey).toString().replace('\n', '').split(' ');
  utils.addCommand(type, key, name);
});

commander.command('checkSync').action(async() => {
  try {
    utils.check();
  } catch (err) {
    console.log(err);
  }
});

commander.command('repoSize').action(async() => {
  try {
    const results = utils.repoSize();
    results.forEach(it => {
      console.log(`${bytes(it.size)}\t\t${it.dir}`);
    })
  } catch (err) {
    console.log(err);
  }
});

commander.parse(process.argv);