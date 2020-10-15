/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import defaultSettings from "@/settings";

const title = defaultSettings.title || "项目初始化";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
