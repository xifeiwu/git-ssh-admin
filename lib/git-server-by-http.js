// You Can Use The Commands Below To Generate A Self Signed Certificate For Use With This Tutorial
// These Commands Require That You have 'openssl' installed on your system
// openssl genrsa -out privatekey.pem 1024
// openssl req -new -key privatekey.pem -out certrequest.csr
// openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem

const fs = require('fs');
const path = require('path');
const utils  = require('../lib/utils.js');
const config = require('../config');
const Server = require('node-git-server');

class GitServer {
  constructor() {
  }

  async start(REPO_DIR, auth) {
    const port = await utils.getAFreePort(3000);
    // format of repoList is ['/test.git'];
    var repoList = [];

    const gitServer = new Server(path.normalize(path.resolve(REPO_DIR)), {
      autoCreate: true,
      authenticate: ({ type, repo, user, headers }, next) => {
        /**
         * check if repo exist in config.repositories
         * format of repo: test, node/summary...
         */
        if (!repoList.includes(`/${repo}.git`)) {
          return next(new Error(`repo ${repo} does not exist`));
        }
        console.log(`for repo: ${repo}`);
        // check username and password
        user((username, password) => {
          if (auth.username === '' && auth.password === '') {
            next();
          } else {
            if (username === auth.username && password === auth.password) {
              next();
            } else {
              next(new Error('auth fail!'));
            }
          }
        });
      }
    });

    gitServer.on('push', (push) => {
      console.log(`push ${push.repo} / ${push.commit} ( ${push.branch} )`);
      push.accept();
    });

    gitServer.on('fetch', (fetch) => {
      console.log(`username ${fetch.username} fetch ${fetch.repo}/${fetch.commit}`);
      fetch.accept();
    });

    const type = 'http';
    gitServer.listen(port, {
      type,
    }, (error) => {
      if (error) {
        return console.error(`failed to start git-server because of error ${error}`);
      }
      console.log(`node-git-server running at ${type}://${utils.getLocalIP()}:${port}`);
      gitServer.list((err, result) => {
        if (!result) {
          console.log("No repositories available...");
        } else {
          repoList = result;
          console.log(result);
          console.log(`format of git address: http://elif.site:${port}/test.git`);
        }
      });
    });
  }
}

module.exports = GitServer;
