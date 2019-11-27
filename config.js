const path = require('path');

const groups = {
  admin: {
    isConfig: true,
    members: ['sduwxf@qq.com']
  }
}

module.exports = {
  REPO_DIR: path.resolve(process.env.HOME, 'repositories'),
  repos: {
    test: groups['admin'],
    'gitosis-admin': groups['admin'],
    'git-ssh-admin': groups['admin'],
    node: {
      summary: {
        fe: groups['admin'],
        node: groups['admin'],
        busybox: groups['admin'],
        'assist-work': groups['admin'],
        modules: groups['admin'],
        ts: groups['admin'],
      },
      'webpack-demo': groups['admin'],
      'spa-server-paas': groups['admin'],
      'assist-server-paas': groups['admin'],
      modules: {
        'koa-md-parser': groups['admin'],
        'nirvana-logger': groups['admin'],
        'koa-static-cache': groups['admin'],
        formidable: groups['admin']
      },
      vue: {
        'fe-paas': groups['admin'],
        'assets': groups['admin'],
        'components-viewer': groups['admin'],
        'nuxt-ts-el-template': groups['admin'],
        'vue-mdEditor': groups['admin'],
        'vue-awesome': groups['admin'],
        components: {
          'element-ui': groups['admin'],
          custom: groups['admin']
        }
      },
      server: {
        'paas-assist': groups['admin']
      },
      projects: {
        'cnpmjs.org': groups['admin'],
        'angry-bird': groups['admin'],
        piaofang: groups['admin'],
        'shadowsocks-lite': groups['admin'],
        'forever-monitor': groups['admin'],
        ws: groups['admin'],
      },
      'node-server': groups['admin']
    },
    fe: {
      assets: groups['admin'],
      calendar: groups['admin'],
      siri: groups['admin'],
      'zhangxueli.site': groups['admin'],
      'show-case': groups['admin'],
      art: {
        'generate-iconfont': groups['admin']
      }
    },
    chrome: {
      'show-qrcode': groups['admin'],
      'content-scanner': groups['admin'],
      busybox: groups['admin'],
      'use-case': groups['admin'],
    },
    java: {
      summary: groups['admin'],
      'com-server': groups['admin'],
      springbootdemo: groups['admin'],
      SpringMVCDemo: groups['admin'],
    },
    python: {
      summary: {
        prime: groups['admin'],
        vendor: groups['admin'],
      },
      'schedule-task': groups['admin'],
      'benew-bi-server': groups['admin'],
      'benew-bi-analyze': groups['admin'],
      'news-task': groups['admin'],
      'flask-server': groups['admin'],
      'cdos-update': groups['admin'],
    },
    android: {
      HybridApp: groups['admin'],
      jmdns: groups['admin'],
      StudyAndroid: groups['admin'],
      StudyJava: groups['admin'],
      DevJava: groups['admin'],
      solitaire: groups['admin'],
      photopuzzle: groups['admin'],
      'demo-puzzle': groups['admin'],
      llk: groups['admin'],
      eatdot: groups['admin'],
    },
    apple: {
      from_start_to_app_store: groups['admin'],
      grammar: groups['admin'],
      'ios-demo': groups['admin'],
    },
    cpp: {
      'app-store-client': groups['admin']
    },
    bash: {
      'linux-distro-build': groups['admin']
    },
    php: {
      'exam-parser': groups['admin']
    },
    huffie: {
      huffie: groups['admin'],
      blog: groups['admin'],
      blog_site: groups['admin'],
      bash: groups['admin'],
      company: groups['admin'],
      'xifeiwu.github.io': groups['admin']
    },
    work: {
      workcode: groups['admin'],
      workenv: groups['admin'],
      worklog: groups['admin'],
    },
    finup: {
      benew: groups['admin'],
      'quant-api': groups['admin'],
      'benew-server': groups['admin'],
      'spring-boot-demo': groups['admin'],
      'benew-android': groups['admin'],
      'benew-quant': groups['admin'],
    }
  }
}
