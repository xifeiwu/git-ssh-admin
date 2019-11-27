const path = require('path');
const loggerFactory = require('./logger-factory.js');
const logger = loggerFactory('authorize');
const repoConfig = require('../repos');

class Authorize {
  constructor() {}

  get repoList() {
    const traverse = (prefix = '', obj) => {
      var results = [];
      for (let key in obj) {
        if (obj[key].isConfig) {
          results.push(prefix.length > 0 ? `${prefix}/${key}` : `${key}`);
        } else {
          results = results.concat(traverse(prefix.length > 0 ? `${prefix}/${key}` : `${key}`, obj[key]));
        }
      }
      return results;
    }
    return traverse('', repoConfig);
  }

  get repoMap() {
    const traverse = (prefix = '', obj) => {
      var results = {};
      for (let key in obj) {
        if (obj[key].isConfig) {
          results[prefix.length > 0 ? `${prefix}/${key}` : `${key}`] = obj[key];
        } else {
          Object.assign(results, traverse(prefix.length > 0 ? `${prefix}/${key}` : `${key}`, obj[key]));
        }
      }
      return results;
    }
    return traverse('', repoConfig);
  }

  async check(authObj, cb) {
    var {repo} = authObj;
    // remove single quotation between repo: 'fe/siri.git'
    const reg = /^[ ']*(.*?)[ ']*$/;
    if (reg.test(repo)) {
      repo = reg.exec(repo)[1];
    }
    const key = repo.endsWith('.git') ? repo.slice(0, -4) : repo;
    if (!this.repoMap.hasOwnProperty(key)) {
      logger(`key not exists in repoList: ${key}`);
      throw new Error(`key not exists in repoList: ${key}`);
    }

    const config = this.repoMap[key];
    if (!config.members.includes(authObj.user.name)) {
      logger(`has no permission: ${authObj.user.name} to ${repo}`);
      throw new Error(`has no permission: ${authObj.user.name} to ${repo}`);
    }
    const targetRepo = path.resolve(process.env.HOME, `repositories/${repo}`);
    return targetRepo;
  }
}

module.exports = new Authorize();
