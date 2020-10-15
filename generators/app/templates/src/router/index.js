/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import Vue from "vue";
import VueRouter from "vue-router";

import aboutRouter from "./modules/about";

Vue.use(VueRouter);

/**
 * redirect: "/"                  重定向路由
 * name:'router-name'             该名称由<keep-alive>使用（必须设置）
 * meta : {
    roles: ['admin','editor']     控制页面角色（您可以设置多个角色）
    title: 'title'                名称显示在侧边栏和面包屑中（推荐设置）
    VerifyLogin: true             需要登录验证设置 true
  }
 */

export const constantRoutes = [
  aboutRouter,
  {
    path: "/",
    name: "home",
    component: () => import("@v/home/index"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/404",
    name: "Page404",
    component: () => import("@v/error-page/404")
  },
  {
    path: "/401",
    name: "Page401",
    component: () => import("@v/error-page/401")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

// 动态替换路由 文档 see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // historoy需要后台支持
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 重置路由
}

export default router;
