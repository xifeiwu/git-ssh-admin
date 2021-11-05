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
   * means this repo can be access by members of group with permission read or(and) write
   */
  return config;
}

module.exports = {
  REPO_DIR: path.resolve(__dirname, '../repositories'),
  // GROUPS,
  repos: {
    test: props({
      desc: '一个非常小的git仓库，用于测试git指令'
    }),
    bash: {
      summary: props(),
      'linux-distro-build': props(),
      projects: {},
      vendor: {
        'acme.sh': props({
          desc: '实现https签名的开源项目，并有代码添加',
        })
      },
    },
    linux: {
      summary: props({
        desc: ''
      }),
      'ubuntu-rebuild': props({
        desc: 'iscas定制cdos的源码'
      }),
      ubuntu: {
        summary: props({
          desc: '基于linux发行版（linuxmint），重新定制iso镜像',
        }),
        'cdos-update': props({
          desc: '一个非常精简的纯shell脚本实现的linuxmin更新相关包的实现逻辑。主要价值在于了解deb打包方式。'
        }),
        'cdosupdate': props({
          desc: '基于linuxmint的mintupdate包，修改了部分逻辑。主要价值在了解linuxmint基于pygtk图形化界面的实现风格。'
        }),
      }
    },
    node: {
      start: {
        fe: props({
          desc: '前端代码总结'
        }),
        summary: props({
          desc: 'node代码总结'
        }),
        modules: props({
          desc: '展示常用node modules使用方式'
        }),
        ts: props({
          desc: '学习ts语法'
        }),
      },
      vendor: {
        'cnpmjs.org': props(),
        'angry-bird': props(),
        'shadowsocks-lite': props(),
        'forever-monitor': props(),
        ws: props(),
        socksv5: props(),
        forge: props(),
        snabbdom: props(),
        vue: props(),
        axios: props(),
        ssh2: props({
          desc: 'show the logic of ssh2'
        }),
      },
      projects: {
        'spa-server': props({
          desc: 'spa-server for paas fe'
        }),
        'paas-assist': props({
          desc: '高乐天创建的一个eggjs项目，可以参考typescript及模块分割部分，可以删除'
        }),
        'assist-server': props({
          desc: 'node server to assist some paas logic, such as cas login'
        }),
        piaofang: props({
          desc: '猫眼专业版'
        }),
      },
      webpack: {
        start: props({
          desc: 'webpack基础展示，基于项目：https://github.com/ruanyf/webpack-demos'
        }),
      },
      toolbox: {
        'git-admin': props({
          desc: 'manage git repo by code written by node'
        }),
      },
      busybox: {
        'assist-work': props({
          desc: '辅助日常开发'
        }),
        busybox: props({
          groups: {
            company: ['read']
          }
        }),
        'proxy-server': props({
          desc: '定制的代理服务，用于辅助完美邮箱前端vue项目开发，使用ts开发'
        }),
      },
      'node-server': props(),
      'assist-server-paas': props({
        desc: 'a ssr project with both server and fe'
      }),
      assets: props({
        desc: 'assets used for both node, vue and fe'
      }),
      modules: {
        'koa-md-parser': props(),
        'nirvana-logger': props(),
        formidable: props(),
        'dom-align': props(),
        'impress.js': props(),
        'aws4': props(),
        'markdown-it': props(),
      },
      vue: {
        'vue_abc': props({
          desc: '学习vue'
        }),
        'fe-paas': props({
          desc: '量化空间paas前端项目'
        }),
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
        components: {
          'element-ui': props(),
          custom: props()
        }
      },
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
    },
    android: {
      HybridApp: props(),
      StudyAndroid: props(),
      StudyJava: props(),
      DevJava: props(),
      solitaire: props(),
      photopuzzle: props(),
      'demo-puzzle': props({
        desc: '教学用的android拼图游戏'
      }),
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
    php: {
      'exam-parser': props()
    },
    huffie: {
      huffie: props(),
      blog: props({
        desc: '基于jekyll的blog，将会被blogs代替'
      }),
      /** 博客相关 */
      blogs: {
        content: props({
          desc: '博客内容，使用markdown语法写的，分门别类的技术总结'
        }),
        backend: props({
          desc: '博客服务，markdown解析归类，提供访问服务。将从容和服务拆开，是为了减少内容部分的体积。'
        }),
      },
      blog_site: props(),
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
      assist: props({
        desc: '辅助接口调用，实现特定逻辑'
      }),
      nginx: {
       d1: props({
         desc: 'd1服务器10.12.6.10上nginx的配置'
       }),
       desktop: props({
        desc: '台式机10.46.0.73上nginx的配置'
       })
      },
    },
    finup: {
      benew: props(),
      'quant-api': props(),
      'spring-boot-demo': props(),
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
