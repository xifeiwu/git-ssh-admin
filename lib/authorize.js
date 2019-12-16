const path = require('path');
const loggerFactory = require('./logger-factory.js');
const logger = loggerFactory('authorize');
const config = require('../config.js');

const ERRORS = {
  REPO_NOT_EXISTS: 'repo not exists in config.repoList',
  USER_CHECK_FAIL: 'user info not found',
  WRITE_NOT_PERMITTED: 'action write is not permitted',
};

class Authorize {
  constructor() {}

  async userCheck(repoConfig, userName) {
    for (let groupName in repoConfig.groups) {
      if (repoConfig.groups[groupName].includes(userName)) {
        return {
          groupName,
          userName
        }
      }
    }
    return null
  }

  async check(authObj, cb) {
    var {repo} = authObj;
    // remove single quotation between repo: 'fe/siri.git'
    const reg = /^[ ']*(.*?)[ ']*$/;
    if (reg.test(repo)) {
      repo = reg.exec(repo)[1];
    }
    const key = repo.endsWith('.git') ? repo.slice(0, -4) : repo;
    if (!config.repoMap.hasOwnProperty(key)) {
      logger(`${ERRORS.REPO_NOT_EXISTS}: ${key}`);
      throw new Error(`${ERRORS.REPO_NOT_EXISTS}: ${key}`);
    }

    const requestDetail = `${authObj.user.name} to ${repo}`;
    const userInfo = this.userCheck(config.repoMap[key], authObj.user.name);
    if (!userInfo) {
      logger(`${ERRORS.USER_CHECK_FAIL}: ${requestDetail}`);
      throw new Error(`${ERRORS.USER_CHECK_FAIL}: ${requestDetail}`);
    }
    if (userInfo.groupName === 'finup' && authObj.action === 'write') {
      logger(`${ERRORS.WRITE_NOT_PERMITTED}: ${requestDetail}`);
      throw new Error(`${ERRORS.WRITE_NOT_PERMITTED}: ${requestDetail}`);
    }

    const targetRepo = path.resolve(config.REPO_DIR, `${repo}`);
    return targetRepo;
  }
}

module.exports = new Authorize();
