const path = require('path');
const loggerFactory = require('./logger-factory.js');
const logger = loggerFactory('authorize');
const config = require('../config.js');

class Authorize {
  constructor() {}

  async check(authObj, cb) {
    var {repo} = authObj;
    // remove single quotation between repo: 'fe/siri.git'
    const reg = /^[ ']*(.*?)[ ']*$/;
    if (reg.test(repo)) {
      repo = reg.exec(repo)[1];
    }
    const key = repo.endsWith('.git') ? repo.slice(0, -4) : repo;
    if (!config.repoMap.hasOwnProperty(key)) {
      logger(`key not exists in repoList: ${key}`);
      throw new Error(`key not exists in repoList: ${key}`);
    }

    const group = config.repoMap[key];
    if (!group.members.includes(authObj.user.name)) {
      logger(`has no permission: ${authObj.user.name} to ${repo}`);
      throw new Error(`has no permission: ${authObj.user.name} to ${repo}`);
    }
    const targetRepo = path.resolve(config.REPO_DIR, `${repo}`);
    return targetRepo;
  }
}

module.exports = new Authorize();
