/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import { setPersonal, setEnterprise, getCompany } from "@i/app";

const state = {
  cor: {},
  per: {}
};

const mutations = {
  SET_COR: (state, cor) => {
    state.cor = cor;
  },
  SET_PER: (state, per) => {
    state.per = per;
  }
};

const actions = {
  /**
   * 提交个人信息登记
   * @param commit { Function } 函数
   * @param data { Object } 参数
   * @returns {Promise<unknown>}
   */
  setPer({ commit }, data) {
    const {
      company,
      companytype,
      name,
      phonenumber,
      gender,
      age,
      city,
      town,
      street,
      village,
      door,
      fever,
      treat,
      isolate,
      fourteen,
      tohubei,
      fromhubei,
      other
    } = data;
    return new Promise((resolve, reject) => {
      setPersonal({
        company: company,
        companytype: companytype,
        name: name,
        phonenumber: phonenumber,
        gender: gender,
        age: age,
        city: city,
        town: town,
        street: street,
        village: village,
        door: door,
        fever: fever,
        treat: treat,
        isolate: isolate,
        fourteen: fourteen,
        tohubei: tohubei,
        fromhubei: fromhubei,
        other: other
      })
        .then(res => {
          const {
            data: { model, result }
          } = res;
          if (result === 1) {
            commit("SET_PER", data);
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
   * 提交企业信息登记
   * @param commit { Function } 函数
   * @param data { Object } 参数
   * @returns {Promise<unknown>}
   */
  setEnt({ commit }, data) {
    const {
      name,
      companytype,
      code,
      city,
      town,
      law,
      detailed,
      phone,
      amount,
      main,
      product,
      number,
      retnumber,
      sign,
      principal
    } = data;
    return new Promise((resolve, reject) => {
      setEnterprise({
        name: name,
        companytype: companytype,
        code: code,
        city: city,
        town: town,
        law: law,
        detailed: detailed,
        phone: phone,
        amount: amount,
        main: main,
        product: product,
        number: number,
        retnumber: retnumber,
        sign: sign,
        principal: principal
      })
        .then(res => {
          const {
            data: { model, result }
          } = res;
          if (result === 1) {
            commit("SET_COR", data);
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
   * 获取企业信息
   * @param commit { Function } 函数
   * @param data { Object } 参数
   * @returns {Promise<unknown>}
   */
  getCom({ commit }, data) {
    const { name } = data;
    return new Promise((resolve, reject) => {
      getCompany({
        name: name
      })
        .then(res => {
          const { data, stats } = res;
          data.forEach(item => {
            item.value = item.name;
          });
          if (stats === "1") {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 个人获取企业信息
   * @param commit { Function } 函数
   * @param data { Object } 参数
   * @returns {Promise<unknown>}
   */
  getcCom({ commit }, data) {
    const { company } = data;
    return new Promise((resolve, reject) => {
      getCompany({
        name: company
      })
        .then(res => {
          const { data, stats } = res;
          data.forEach(item => {
            item.value = item.name;
          });
          if (stats === "1") {
            resolve(data);
          } else {
            reject(data);
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
