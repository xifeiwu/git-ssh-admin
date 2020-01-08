const path = require('path');
const loggerFactory = require('logger-factory');
// const logger = loggerFactory('auth');

loggerFactory.getState().setConfigs({
  debug: '*',
  useColors: false,       // false
  toFile: path.resolve(__dirname, '../logs/logger'),
  maxSize: 1024 * 1024 * 16,
  maxCount: 20,
});

module.exports = loggerFactory;