const path = require('path');

const groups = {
  admin: {
    isConfig: true,
    members: ['huffie@re-confirm', 'sduwxf@qq.com']
  }
}

function props(group, props) {
  if (!props) {
    props = {};
  }
  return Object.assign(props, groups[group]);
}

module.exports = {
  REPO_DIR: path.resolve(process.env.HOME, 'repositories'),
  repos: {
    test: props('admin'),
    'gitosis-admin': props('admin'),
    node: {
      busybox: {
        'git-ssh-admin': props('admin'),
        busybox: props('admin'),
        'assist-work': props('admin'),
      },
      summary: {
        fe: props('admin'),
        node: props('admin'),
        modules: props('admin'),
        ts: props('admin'),
      },
      'webpack-demo': props('admin'),
      'node-server': props('admin'),
      'assist-server-paas': props('admin'),
      modules: {
        'koa-md-parser': props('admin'),
        'nirvana-logger': props('admin'),
        'koa-static-cache': props('admin'),
        formidable: props('admin')
      },
      vue: {
        'fe-paas': props('admin'),
        'assets': props('admin'),
        'components-viewer': props('admin'),
        'nuxt-ts-el-template': props('admin'),
        'vue-mdEditor': props('admin'),
        'vue-awesome': props('admin'),
        components: {
          'element-ui': props('admin'),
          custom: props('admin')
        }
      },
      server: {
        'spa-server-paas': props('admin'),
        'paas-assist': props('admin', {
          desc: '高乐天创建的一个eggjs项目，可以参考typescript及模块分割部分，可以删除'
        }),
        'assist-server': props('admin', {
          desc: 'node server to assist some paas logic, such as cas login'
        }),
      },
      projects: {
        'cnpmjs.org': props('admin'),
        'angry-bird': props('admin'),
        piaofang: props('admin'),
        'shadowsocks-lite': props('admin'),
        'forever-monitor': props('admin'),
        ws: props('admin'),
        ssh2: props('admin'),
      }
    },
    fe: {
      assets: props('admin'),
      calendar: props('admin'),
      siri: props('admin'),
      'zhangxueli.site': props('admin'),
      'show-case': props('admin'),
      art: {
        'generate-iconfont': props('admin')
      }
    },
    chrome: {
      'show-qrcode': props('admin'),
      'content-scanner': props('admin'),
      busybox: props('admin'),
      'use-case': props('admin'),
    },
    java: {
      summary: props('admin'),
      'com-server': props('admin'),
      springbootdemo: props('admin'),
      SpringMVCDemo: props('admin'),
    },
    python: {
      summary: {
        prime: props('admin'),
        vendor: props('admin'),
      },
      'schedule-task': props('admin'),
      'benew-bi-server': props('admin'),
      'benew-bi-analyze': props('admin'),
      'news-task': props('admin'),
      'flask-server': props('admin'),
      'cdos-update': props('admin'),
    },
    android: {
      HybridApp: props('admin'),
      StudyAndroid: props('admin'),
      StudyJava: props('admin'),
      DevJava: props('admin'),
      solitaire: props('admin'),
      photopuzzle: props('admin'),
      'demo-puzzle': props('admin'),
      llk: props('admin'),
      eatdot: props('admin'),
    },
    apple: {
      from_start_to_app_store: props('admin'),
      grammar: props('admin'),
      'ios-demo': props('admin'),
    },
    cpp: {
      'app-store-client': props('admin')
    },
    bash: {
      'linux-distro-build': props('admin')
    },
    php: {
      'exam-parser': props('admin')
    },
    huffie: {
      huffie: props('admin'),
      blog: props('admin'),
      blog_site: props('admin'),
      bash: props('admin'),
      company: props('admin'),
      'xifeiwu.github.io': props('admin')
    },
    work: {
      workcode: props('admin'),
      workenv: props('admin'),
      worklog: props('admin'),
    },
    finup: {
      benew: props('admin'),
      'quant-api': props('admin'),
      'benew-server': props('admin'),
      'spring-boot-demo': props('admin'),
      'benew-android': props('admin'),
      'benew-quant': props('admin'),
    }
  },
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
    return traverse('', this.repos);
  },

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
    return traverse('', this.repos);
  }
}
