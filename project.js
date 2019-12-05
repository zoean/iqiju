module.exports = {
    // 站点相关，项目名
    name: 'iqiju-mobile',
    // 项目 cdn 根，对应 alloydist 发布系统的 public/cdn/
    cdn: '[A[Bhttp://s.url.cn/',
    // 项目 html 根，对应 alloydist 发布系统的 public/webserver/
    webServer: 'http://find.qq.com/',
    // 子模块名称
    subModule: 'iqiju/',
    // 是否开启 liveproxy
    liveproxy: 1,
    // 发布单号，用于命令行发布
    distId: '',
    // jb 发布映射设置建议，不需改动
    distHtmlDir: '/data/sites/find.qq.com/', // html映射
    distCdnDir: '/data/sites/cdn.qplus.com[A[Bhttp://s.url.cn/' // cdn映射
};
