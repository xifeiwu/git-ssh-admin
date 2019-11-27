const authorize = require('../lib/authorize.js');


authorize.check({
  repo: 'fe/siri'
}, (err, targetPath) => {
  console.log(`targetPath: ${targetPath}`);
});