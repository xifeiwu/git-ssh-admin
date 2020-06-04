const path = require('path');
const commonUtils = new (require('./lib/utils-common.js'));

// {allowedGroup, props}
function props(config) {
  const GROUPS = {
    admin: ['huffie@re-confirm', 'sduwxf@qq.com'],
    company: ['xifei.wu@finupgroup.com']
  };
  const defaultConfig = {
    IS_CONFIG: true,
    groups: {
      admin: ['read', 'write']
    },
    desc: ''
  }
  config = config ? commonUtils.deepMerge(defaultConfig, config) : defaultConfig;
  for (let group in config.groups) {
    if (GROUPS.hasOwnProperty(group)) {
      config.groups[group] = {
        members: GROUPS[group],
        permissions: config.groups[group]
      }
    } else {
      throw new Error(`group ${group} not exist in GROUPS`);
    }
  }
  /**
   * format of config:
   {
     IS_CONFIG: boolean,
     groups: {
       group: {
          members: [],
          permissions: []
       }
     },
     desc: ''
   }
   */
  return config;
}

module.exports = {
  REPO_DIR: path.resolve(__dirname, '../repositories'),
  // GROUPS,
  repos: {
    test: props(),
    'gitosis-admin': props(),
    node: {
      assets: props({
        desc: 'assets used for both node, vue and fe'
      }),
      busybox: {
        'git-admin': props({
          desc: 'manage git repo by code written by node'
        }),
        'proxy-server': props({
          desc: 'server with custom proxy'
        }),
        busybox: props({
          groups: {
            company: ['read']
          }
        }),
        'assist-work': props(),
      },
      summary: {
        fe: props(),
        node: props(),
        modules: props(),
        ts: props(),
      },
      'webpack-demo': props(),
      'node-server': props(),
      'assist-server-paas': props({
        desc: 'a ssr project with both server and fe'
      }),
      modules: {
        'koa-md-parser': props(),
        'nirvana-logger': props(),
        formidable: props()
      },
      vue: {
        'fe-paas': props(),
        'robot': props({
          desc: '结构比较成熟，使用typescript，基于nuxt的一个项目，使用到了pont（好用但不好控）'
        }),
        'assets': props({
          desc: 'vue项目使用的assets，TODO: delete, instead by node/assets'
        }),
        'vue-projects': props({
          desc: '多个vue项目，包括show-case, assist-fe等，放到同一个项目主要是为了共用仓库和webpack配置，减少冗余项目。'
        }),
        'nuxt-ts-el-template': props(),
        'vue-mdEditor': props(),
        'vue-awesome': props(),
        components: {
          'element-ui': props(),
          custom: props()
        }
      },
      server: {
        'spa-server': props({
          desc: 'spa-server for paas fe'
        }),
        'paas-assist': props({
          desc: '高乐天创建的一个eggjs项目，可以参考typescript及模块分割部分，可以删除'
        }),
        'assist-server': props({
          desc: 'node server to assist some paas logic, such as cas login'
        }),
      },
      projects: {
        'cnpmjs.org': props(),
        'angry-bird': props(),
        piaofang: props(),
        'shadowsocks-lite': props(),
        'forever-monitor': props(),
        ws: props(),
        socksv5: props(),
        forge: props(),
        ssh2: props({
          desc: 'show the logic of ssh2'
        }),
      }
    },
    fe: {
      website: props(),
      calendar: props(),
      sage: props(),
      'zhangxueli.site': props(),
      'show-case': props(),
      art: {
        'generate-iconfont': props()
      }
    },
    chrome: {
      'show-qrcode': props(),
      'content-scanner': props(),
      busybox: props(),
      assist: props(),
      'use-case': props(),
    },
    java: {
      summary: props(),
      'com-server': props(),
      springbootdemo: props(),
      SpringMVCDemo: props(),
      projects: {
        galaxy: props({
          desc: '凡普paas云平台后端'
        })
      }
    },
    python: {
      summary: {
        prime: props(),
        vendor: props(),
      },
      'schedule-task': props(),
      'benew-bi-server': props(),
      'benew-bi-analyze': props(),
      'news-task': props(),
      'flask-server': props(),
      'cdos-update': props(),
    },
    android: {
      HybridApp: props(),
      StudyAndroid: props(),
      StudyJava: props(),
      DevJava: props(),
      solitaire: props(),
      photopuzzle: props(),
      'demo-puzzle': props(),
      llk: props(),
      eatdot: props(),
    },
    apple: {
      from_start_to_app_store: props(),
      grammar: props(),
      'ios-demo': props(),
    },
    cpp: {
      'app-store-client': props()
    },
    bash: {
      'linux-distro-build': props()
    },
    php: {
      'exam-parser': props()
    },
    huffie: {
      huffie: props(),
      blog: props(),
      blog_site: props(),
      bash: props(),
      company: props(),
      'xifeiwu.github.io': props()
    },
    work: {
      workcode: props(),
    },
    pwrd: {
      docs: props({
        desc: 'api接口相关：接口描述；接口数据moack，接口调用等；mail项目总结文档，代码片段等'
      }),
      mail: props({
        desc: '完美邮箱项目'
      }),
    },
    finup: {
      benew: props(),
      'quant-api': props(),
      'benew-server': props(),
      'spring-boot-demo': props(),
      'benew-android': props(),
      'benew-quant': props(),
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
