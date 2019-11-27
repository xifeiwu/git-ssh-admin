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
    if (!this.repoMap.hasOwnProperty(authObj.repo)) {
      throw new Error(`does not exists in repoList: ${authObj.repo} `);
    }
    const config = this.repoMap[authObj.repo];
    if (!config.members.includes(authObj.user.name)) {
      throw new Error(`has no permission to operate ${authObj.repo}`);
    }
    const targetRepo = path.resolve(process.env.HOME, `repositories/${authObj.repo}`);
    return targetRepo;
  }
}

module.exports = new Authorize();