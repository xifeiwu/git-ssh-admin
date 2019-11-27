const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('../config.js');

class Utils {
  constructor() {}
  addCommand(type, key, name) {
    if (!key || !key || !name) {
      console.error(`type, key or name is not found in public key!`);
      return;
    }
    const fingerprint = crypto.createHash('md5').update(Buffer.from(key, 'base64')).digest('hex');
    const fileCommand = path.resolve(__dirname, '../bin/git-ssh-server-auth.js');
    const command = `command="${fileCommand} ${name} ${fingerprint}",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ${[type, key, name].join(' ')}`;

    try {
      if (!fs.existsSync(path.resolve(process.env.HOME, '.ssh'))) {
        fs.mkdirSync(path.resolve(process.env.HOME, '.ssh'), {
          mode: 0o700
        });
      }
      const fileAuthorizedKeys = path.resolve(process.env.HOME, '.ssh/authorized_keys');
      if (!fs.existsSync(fileAuthorizedKeys)) {
        fs.writeFileSync(fileAuthorizedKeys, '', {
          mode: 0o644
        });
      }
      if (!fs.readFileSync(fileAuthorizedKeys).toString().split('\n').includes(command)) {
        fs.appendFileSync(fileAuthorizedKeys, `\n${command}`);
        console.log('done');
      } else {
        console.log('already exists');
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * returns when process has fully exited
   * @method onExit
   * @param  {EventEmitter}   ps - event emitter to listen to
   * @param  {Function} callback - function(code, signature)
   */
  async onExit(ps, callback) {
    return new Promise((reslove, reject) => {
      let code;
      let sig;
      let pending = 3;

      const onend = () => {
        if (--pending === 0) {
          reslove({code, sig});
        }
      };

      ps.on('exit', (c, s) => {
        code = c;
        sig = s;
      });

      ps.on('exit', onend);
      ps.stdout.on('end', onend);
      ps.stderr.on('end', onend);
      setTimeout(() => {
        reject(new Error('timeout'));
      }, 10 * 1000);
    });
  }

  // repo feather: dir ends with .git
  readRepo(root, filter, files, prefix) {
    prefix = prefix || ''
    files = files || []
    filter = filter || (x => x[0] !== '.')

    var dir = path.join(root, prefix)
    if (!fs.existsSync(dir)) return files
    if (!dir.endsWith('.git') && fs.statSync(dir).isDirectory())
      fs.readdirSync(dir)
      .filter((name, index) => {
        return filter(name, index, dir)
      })
      .forEach((name) => {
        this.readRepo(root, filter, files, path.join(prefix, name))
      })
    else
      files.push(prefix)

    return files
  }
  // 检测配置与REPO_DIR目录下的git项目是否同步
  async checkSync() {
    const dirRepoList = this.readRepo(config.REPO_DIR);
    console.log('not eixst in REPO_DIR:');
    console.log(config.repoList.filter(it => !dirRepoList.map(it => it.replace(/\.git$/, '')).includes(it)));
    console.log('not exit in config:');
    console.log(dirRepoList.filter(it => !config.repoList.map(it => `${it}.git`).includes(it)));
  }
}

module.exports = new Utils();
