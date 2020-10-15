/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

/*
 *读取env环境变量
 */
const fs = require("fs");
const path = require("path");
// env 文件 判断打包环境指定对应的服务器id
const envfile =
  process.env.NODE_ENV === "production"
    ? "../.env.production"
    : "../.env.staging";
// env环境变量的路径
const envPath = path.resolve(__dirname, envfile);
// env对象
const envObj = parse(fs.readFileSync(envPath, "utf8"));
const SERVER_ID = parseInt(envObj["VUE_APP_SERVER_ID"]);

function parse(src) {
  // 解析KEY=VAL的文件
  const res = {};
  src.split("\n").forEach(line => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    // eslint-disable-next-line no-useless-escape
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      let value = keyValueArr[2] || "";

      // expand newlines in quoted values
      const len = value ? value.length : 0;
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, "\n");
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, "").trim();

      res[key] = value;
    }
  });
  return res;
}

/**
 * 定义多个服务器账号根据 SERVER_ID 导出当前环境服务器账号
 * id   服务器ID
 * name————环境名称
 * domain————项目域名
 * host————服务器IP
 * port————端口
 * username————账号
 * password————密码
 * path————服务器的项目路径
 */
const SERVER_LIST = [
  {
    id: 0,
    name: "测试服务器",
    domain: "https://cdebug.zhixingonline.com/cadmin",
    host: "49.232.47.204",
    port: 22,
    username: "root",
    password: "",
    path: "/www/wwwroot/cdebug.zhixingonline.com/app/web/home"
  },
  {
    id: 1,
    name: "生产服务器",
    domain: "https://census.zhixingonline.com/cadmin",
    host: "49.232.47.204",
    port: 22,
    username: "root",
    password: "",
    path: "/www/wwwroot/census.zhixingonline.com/app/web/home"
  }
];

module.exports = SERVER_LIST[SERVER_ID];
