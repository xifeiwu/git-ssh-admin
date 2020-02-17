const path = require('path');

const GROUPS = {
  admin: ['huffie@re-confirm', 'sduwxf@qq.com'],
  finup: ['xifei.wu@finupgroup.com']
};

function props({allowedGroup, props}) {
  if (!Array.isArray(allowedGroup)) {
    allowedGroup = [allowedGroup];
  }
  if (!props) {
    props = {};
  }
  const groups = {};
  allowedGroup.forEach(it => {
    if (GROUPS.hasOwnProperty(it)) {
      groups[it] = GROUPS[it];
    } else {
      throw new Error(`group ${it} not exist!`);
    }
  })
  return Object.assign(props, {
    IS_CONFIG: true,
    groups
  });
}

module.exports = {
  REPO_DIR: path.resolve(__dirname, '../repositories'),
  GROUPS,
  repos: {
    test: props('admin'),
    'gitosis-admin': props('admin'),
    node: {
      busybox: {
        'git-admin': props(['admin'], {
          desc: 'manage git repo by code written by node'
        }),
        busybox: props(['admin', 'finup']),
        'assist-work': props(['admin', 'finup']),
      },
      summary: {
        fe: props('admin'),
        node: props('admin'),
        modules: props('admin'),
        ts: props('admin'),
      },
      'webpack-demo': props('admin'),
      'node-server': props('admin'),
      'assist-server-paas': props('admin', {
        desc: 'a ssr project with both server and fe'
      }),
      modules: {
        'koa-md-parser': props('admin'),
        'nirvana-logger': props('admin'),
        formidable: props('admin')
      },
      vue: {
        'fe-paas': props(['admin', 'finup']),
        'robot': props('admin', {
          desc: '结构比较成熟，使用typescript，基于nuxt的一个项目，使用到了pont（好用但不好控）'
        }),
        'assets': props('admin'),
        'show-case': props('admin'),
        'nuxt-ts-el-template': props('admin'),
        'vue-mdEditor': props('admin'),
        'vue-awesome': props('admin'),
        components: {
          'element-ui': props('admin'),
          custom: props('admin')
        }
      },
      server: {
        'spa-server': props('admin', {
          desc: 'spa-server for paas fe'
        }),
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
        socksv5: props('admin'),
        forge: props('admin'),
        ssh2: props('admin', {
          desc: 'show the logic of ssh2'
        }),
      }
    },
    fe: {
      website: props('admin'),
      assets: props('admin'),
      calendar: props('admin'),
      sage: props('admin'),
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
      assist: props('admin'),
      'use-case': props('admin'),
    },
    java: {
      summary: props('admin'),
      'com-server': props('admin'),
      springbootdemo: props('admin'),
      SpringMVCDemo: props('admin'),
      projects: {
        galaxy: props(['admin'], {
          desc: '凡普paas云平台后端'
        })
      }
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
        if (obj[key].IS_CONFIG) {
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
        if (obj[key].IS_CONFIG) {
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
