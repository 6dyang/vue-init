/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import axios from "axios";
import { getToken } from "@u/auth";

/**
 * 全局配置 只能配置 静态数据
 */

/**
 * 创建一个axios实例
 * @type {AxiosInstance}
 */
const s = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {}
});

/**
 * 全局 请求拦截器, 支持添加多个拦截器
 * 例如: 配置token、添加一些默认的参数
 * `return config` 继续发送请求
 */
s.interceptors.request.use(
  config => {
    // 设置Token
    getToken() && (config.headers["X-Api-Key"] = getToken());

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

/**
 * 全局 响应拦截器, 支持添加多个拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 * @param {Object} res 请求返回的数据
 * @return {Promise<reject>}
 */
s.interceptors.response.use(
  async res => {
    const data = res.data;
    const code = data.code;

    try {
      return await handleCode({ data, code });
    } catch (err) {
      /* 请求未授权退出登录返回首页*/
      if (err.code === 401 && getToken() === undefined) {
        /**调用store退出登录 */
        // store.dispatch("logout");
      }
      return Promise.reject(err);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

/**
 * 处理 HTTP 状态码
 * @param data  请求返回的数据
 * @param code  HTTP状态码
 * @returns {Promise<never>|*}
 */
function handleCode({ data, code }) {
  const STATUS = {
    "200"() {
      return data;
    },
    "400"() {
      return Promise.reject({
        code,
        msg: "请求错误"
      });
    },
    "401"() {
      return Promise.reject({
        code,
        msg: "请求未授权"
      });
    },
    "403"() {
      return Promise.reject({
        code,
        msg: "拒绝请求"
      });
    },
    "500"() {
      return Promise.reject({
        code,
        msg: "服务器错误"
      });
    }
  };
  // 有状态码但不在这个封装的配置里，就直接进入 `fail`
  return STATUS[code] ? STATUS[code]() : Promise.reject(data);
}

export default s;
