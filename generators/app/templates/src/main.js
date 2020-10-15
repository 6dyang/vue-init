/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import Vue from "vue";

import "normalize.css/normalize.css"; // CSS样式初始化

import "@s/index.scss"; // 公共CSS样式

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "@/permission"; // 路由权限控制

Vue.config.productionTip = false;

/**
 * 统一提示
 * @param title {String} 提示信息
 * @param type {String} success,warning,error
 * @param duration {Number} 动画时间
 * @returns {boolean}
 */
Vue.prototype.$msg = function(title, type = "success", duration = 1500) {
  if (Boolean(title) === false) {
    return false;
  }
};

/* 手机号正则表达式 */
Vue.prototype.$cphone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
