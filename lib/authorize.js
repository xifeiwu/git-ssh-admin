const path = require('path');
const loggerFactory = require('./logger-factory.js');
// const logger = loggerFactory('authorize');
const config = require('../config.js');

const ERRORS = {
  REPO_NOT_EXISTS: 'repo not exists in config.repoList',
  ACCESS_NOT_PERMITTED: 'permission if not permitted',
  ACTION_NOT_PERMITTED: 'action is not permitted',
};

class Authorize {
  constructor() {}

  _permissionCheck(repoConfigGroups, {userName, action, repo}) {
    var find = false;
    var groupConfig = null;
    for (let groupName in repoConfigGroups) {
      const groupInfo = repoConfigGroups[groupName];
      if (groupInfo.members.includes(userName)) {
        groupConfig = groupInfo;
        break;
      }
    }
    if (!groupConfig) {
      throw new Error(`${ERRORS.ACCESS_NOT_PERMITTED}: from ${userName} to repo ${repo}`);
    }
    if (!groupConfig.permissions.includes(action)) {
      throw new Error(`${ERRORS.ACTION_NOT_PERMITTED}: ${action} by user ${userName} to repo ${repo}`);
    }
    return groupConfig
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
      throw new Error(`${ERRORS.REPO_NOT_EXISTS}: ${key}`);
    }
    const requestDetail = `'${authObj.user.name}' to '${repo}'`;

    // get user info by userName
    const groupConfig = this._permissionCheck(config.repoMap[key].groups, {
      userName: authObj.user.name,
      action: authObj.action,
      repo
    });

    const targetRepo = path.resolve(config.REPO_DIR, `${repo}`);
    return targetRepo;
  }
}

module.exports = new Authorize();
