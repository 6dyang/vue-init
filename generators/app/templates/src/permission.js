/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import router from "./router";
import store from "./store";
import { getToken } from "@u/auth"; // 从Cookie获取令牌
import getPageTitle from "@u/get-page-title";

router.beforeEach(async (to, from, next) => {
  /**设置页面标题 */
  document.title = getPageTitle(to.meta.title);

  /**确定用户是否已登录 */
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      /**如果已登录，请重定向到主页 */
      next({ path: "/" });
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          /**获取用户信息 */
          // await store.dispatch("user/getInfo");

          next();
        } catch (error) {
          /**删除令牌并进入登录页面以重新登录 */
          // await store.dispatch("user/resetToken");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    /* 需要登录验证的路由 设置 meta.VerifyLogin:true */
    if (to.meta.VerifyLogin) {
      /**其他无权访问的页面将重定向到登录页面。 */
      next(`/login?redirect=${to.fullPath}`);
    } else {
      next();
    }
  }
});

/**路由跳转之后 */
router.afterEach(() => {});
