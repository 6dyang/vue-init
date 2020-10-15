/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

/** 关于我们路由 **/

const aboutRouter = {
  path: "/about",
  name: "about",
  component: () => import("@v/about/index"),
  meta: {
    title: "关于我们"
  },
  children: []
};

export default aboutRouter;
