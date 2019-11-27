#!/usr/bin/env node
"use strict";
var fs  = require('fs');
var spawn = require('child_process').spawn;
var utils  = require('../lib/utils.js');
const authorize = require('../lib/authorize.js');
const loggerFactory = require('../lib/logger-factory.js');
const logger = loggerFactory('git-ssh-server-auth');

var user        = process.argv[2];
var fingerprint = process.argv[3];
// parse command and repo
var cmd;
try {
  cmd = process.env.SSH_ORIGINAL_COMMAND.split(' ');
} catch (e) {
  console.error("Unsupported command: " + process.env.SSH_ORIGINAL_COMMAND);
  process.exit(1);
}
var command     = cmd[0];
var repo        = cmd[1];

if (!/^git-(upload|receive)-(pack|archive)$/.test(command)) {
  console.error("Unsupported command: " + process.env.SSH_ORIGINAL_COMMAND);
  process.exit(1);
}

async function run(user, fingerprint, command, repo) {
  var authObj = { action : /upload/.test(command) ? "read" : "write"
                , repo   : repo
                , user   : { name : user, key: fingerprint } };

  logger(authObj);
  try {
    const repoPath = await authorize.check(authObj);
    if (!fs.existsSync(repoPath)) {
      const createIfNotExist = spawn('git', [ 'init', '--bare', repoPath]);
      logger('git', [ 'init', '--bare', repoPath]);
      await utils.onExit(createIfNotExist);
    }
    var child = spawn(command, [repoPath], {detached:true});
    logger(`${command} ${repoPath}`);
    child.on('exit', function(rc) {
      process.exit(rc);
    });
    process.stdin.pipe(child.stdin);
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);
    child.unref();
  } catch (err) {
    console.error(`error: ${err.toString()}`);
    process.exit(1);
  }
}

run(user, fingerprint, command, repo);
