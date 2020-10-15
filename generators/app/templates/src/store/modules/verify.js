/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import { perVerify, perInfo, corVerify, corInfo } from "@i/app";

const state = {};

const mutations = {};

const actions = {
  /**
   * 验证个人信息
   * @param commit { Function } 函数
   * @param data { Object } 参数
   * @returns {Promise<unknown>}
   */
  aPerVerify({ commit }, data) {
    const { name, company } = data;
    return new Promise((resolve, reject) => {
      perVerify({ company: company, name: name })
        .then(res => {
          const {
            data: { result }
          } = res;
          if (result === 1) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 获取个人信息
   * @param commit { Function } 函数
   * @param data { Object } 参数
   * @returns {Promise<unknown>}
   */
  aPerInfo({ commit }, data) {
    const { name, company } = data;
    return new Promise((resolve, reject) => {
      perInfo({ company: company, name: name })
        .then(res => {
          const {
            data: { model, result }
          } = res;
          if (result === 1) {
            resolve(model);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 验证企业信息
   * @param commit { Function } 函数
   * @param data { Object } 参数
   * @returns {Promise<unknown>}
   */
  aCorVerify({ commit }, data) {
    const { name } = data;
    return new Promise((resolve, reject) => {
      corVerify({ name: name })
        .then(res => {
          const {
            data: { result }
          } = res;
          if (result === 1) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 获取企业信息
   * @param commit
   * @param data
   * @returns {Promise<unknown>}
   */
  aCorInfo({ commit }, data) {
    const { name } = data;
    return new Promise((resolve, reject) => {
      corInfo({ name: name })
        .then(res => {
          const {
            data: { model, result }
          } = res;
          if (result === 1) {
            resolve(model);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
