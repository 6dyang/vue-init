/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import Cookies from "js-cookie";

const TokenKey = "Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
