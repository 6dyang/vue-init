/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

import request from "@u/request";

/**
 * 个人信息登记
 * @param data
 */
export function setPersonal(data) {
  return request({
    url: "/cworker/add-worker",
    method: "post",
    data
  });
}

/**
 * 企业信息登记
 * @param data
 */
export function setEnterprise(data) {
  return request({
    url: "/ccompany/add-company",
    method: "post",
    data
  });
}

/**
 * 获取企业信息
 * @param data
 */
export function getCompany(data) {
  return request({
    url: "/csite/search",
    method: "post",
    data
  });
}

/**
 * 验证个人
 * @param data
 */
export function perVerify(data) {
  return request({
    url: "/csyn/personal-verify",
    method: "post",
    data
  });
}

/**
 * 个人信息
 * @param data
 */
export function perInfo(data) {
  return request({
    url: "/csyn/personal-syn",
    method: "post",
    data
  });
}

/**
 * 验证企业
 * @param data
 */
export function corVerify(data) {
  return request({
    url: "/csyn/company-verify",
    method: "post",
    data
  });
}

/**
 * 企业信息
 * @param data
 */
export function corInfo(data) {
  return request({
    url: "/csyn/company-syn",
    method: "post",
    data
  });
}

/**
 * 文件上传
 * @param data { "UploadService[image_file]" | "UploadService[doc_file]" | "UploadService[video_file]"}
 */
export function uploadFile(data) {
  return request({
    url: "/file/upload",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data;"
    },
    transformRequest: [
      function() {
        return data;
      }
    ]
  });
}

/**
 * 个人图片ID上传
 * @param data
 * @returns {AxiosPromise}
 */
export function uploadPerFileID(data) {
  return request({
    url: "/cworker/add-img",
    method: "post",
    data
  });
}

/**
 * 企业图片ID上传
 * @param data
 * @returns {AxiosPromise}
 */
export function uploadCorFileID(data) {
  return request({
    url: "/ccompany/add-img",
    method: "post",
    data
  });
}
