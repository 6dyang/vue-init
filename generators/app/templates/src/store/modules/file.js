/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import { uploadFile, uploadPerFileID, uploadCorFileID } from "@i/app";

const state = {};

const mutations = {};

const actions = {
  /**
   * 上传图片文件
   * @param commit
   * @param dispatch
   * @param data
   * @returns {Promise<unknown>}
   */
  uploadImgFile({ commit, dispatch }, data) {
    let bstr = atob(data.file.split(",")[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    let file = new File([u8arr], data.filename, { type: `image/png` });

    //开始上传文件 新建一个formData
    let formData = new FormData();
    //通过append向form对象添加数据
    formData.append("UploadService[image_file]", file);
    return new Promise((resolve, reject) => {
      uploadFile(formData)
        .then(res => {
          if (res.status === "1") {
            if (data.type === "per") {
              dispatch("upPerImgId", {
                id: data.id,
                fileid: res.data[0].image_file[0].id
              })
                .then(r => {
                  resolve(r);
                })
                .catch(e => {
                  reject(e);
                });
            }
            if (data.type === "cor") {
              dispatch("upCorImgId", {
                id: data.id,
                fileid: res.data[0].image_file[0].id
              })
                .then(r => {
                  resolve(r);
                })
                .catch(e => {
                  reject(e);
                });
            }
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
   * 上传个人文件ID
   * @param commit
   * @param data
   * @returns {Promise<unknown>}
   */
  upPerImgId({ commit }, data) {
    const { id, fileid } = data;
    return new Promise((resolve, reject) => {
      uploadPerFileID({ id: id, fileid: fileid })
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
   * 上传公司文件ID
   * @param commit
   * @param data
   * @returns {Promise<unknown>}
   */
  upCorImgId({ commit }, data) {
    const { id, fileid } = data;
    return new Promise((resolve, reject) => {
      uploadCorFileID({ id: id, fileid: fileid })
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
