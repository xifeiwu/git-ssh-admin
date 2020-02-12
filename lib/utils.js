const fs = require('fs');
const os = require('os');
const path = require('path');
const net = require('net');
const crypto = require('crypto');
const config = require('../config.js');
const fileSize = require('fs-readdir-recursive/file-size');

class Utils {
  constructor() {}
  addCommand(type, key, name) {
    if (!key || !key || !name) {
      console.error(`type, key or name is not found in public key!`);
      return;
    }
    const fingerprint = crypto.createHash('md5').update(Buffer.from(key, 'base64')).digest('hex');
    const fileCommand = path.resolve(__dirname, '../bin/git-server-by-ssh.js');
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

  async repoSize() {
    const results = config.repoList.map(it => {
      const dir = path.resolve(config.REPO_DIR, `${it}.git`)
      return {
        dir,
        size: fs.existsSync(dir) ? fileSize(dir)['size'] : 0
      }
    });
    return results;
  }

  // get local ip
  getLocalIP() {
    var localIP = null;
    var ifaces = os.networkInterfaces();
    var keys = ['en0', 'en1', 'en2', 'en3', 'en4', 'en5', 'em0', 'em1', 'em2', 'em3', 'em4', 'em5', 'eth0'];
    let iface = [];
    keys.forEach(function(key) {
      if ((key in ifaces) && (Array.isArray(ifaces[key]))) {
        iface = ifaces[key];
      }
    });
    iface.forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }
      localIP = iface.address;
    });
    return localIP;
  }

  // check if the port of host is opened or not
  async isPortOpen(host, port) {
    return new Promise((resolve, reject) => {
      try {
        const socket = net.createConnection({host, port})
        socket.setTimeout(3000);
        socket.on('connect', () => {
          socket.destroy();
          resolve(true);
        });
        socket.on('timeout', () => {
          // console.log('timeout');
          socket.destroy();
          resolve(false);
        });
        socket.on('error', err => {
          // console.log(`${port} error`);
          resolve(false);
        });
      } catch (err) {
        resolve(false);
      }
    });
  }

  // 获取一个未被使用的端口（默认从3000端口开始）
  async getAFreePort(startPort = 3000) {
    const host = '127.0.0.1';
    const endPort = 10000;
    var port = startPort;
    while (port < endPort) {
      const isOpen = await this.isPortOpen(host, port);
      if (!isOpen) {
        return port;
      }
      port++;
    }
    throw new Error('not free port found');
  }
}

module.exports = new Utils();
