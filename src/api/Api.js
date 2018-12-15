import Vue from 'vue'
import axios from 'axios'
import base from './base'
import {
  config
}
from './utils.js'
import * as request from './RequestClient'

Vue.use(base)

export default {
  install (Vue, pluginOptions = {}) {
    let requestClient = new request.Client({
      baseURL: config.BASE_URL
    }, {
      globalErrorHandler: error => {
        console.log(error)
        if (error.message) {
          Vue.prototype.showToastError(error.message)
        }
        return Promise.reject(error)
      },
      errCode: res => {
        console.log(res)
        if (res.data.msg) {
          Vue.prototype.showToastError(res.data.msg)
        }
        return Promise.reject(res)
      }
    })
    Vue.prototype.Api = {
      // 获取公司列表
      getCompanys () {
        return requestClient.fetch(request.METHOD_GET, `/company/id/0`)
      },
      // 获取图形验证码
      getImgCap () {
        return requestClient.fetch(request.METHOD_GET, `/captcha`, {})
      },
      // 获取短信验证码
      getMsgCap (data, options = {}) {
        return requestClient.fetch(request.METHOD_POST, `/messageCaptcha`, data, options)
      },
      // 注册
      register (data, options = {}) {
        return requestClient.fetch(request.METHOD_POST, `/register`, data, options)
      },
      // 登录
      login (data) {
        return requestClient.fetch(request.METHOD_POST, `/login`, data)
      },
      // 修改密码
      modifyPassword (data) {
        return requestClient.fetch(request.METHOD_PUT, `/user/password`, data)
      },
      // 获取用户信息
      getUserInfo (id) {
        return requestClient.fetch(request.METHOD_GET, `/student/id/${id}`)
      },
      // 获取banner课程信息
      bannerCourse () {
        return requestClient.fetch(request.METHOD_GET, `/curriculum?banner=1`)
      },
      // 获取banner考试信息
      bannerExam() {
        return requestClient.fetch(request.METHOD_GET, `/exam?banner=2`)
      },
      // 获取课程列表
      getCourse (query, options = {}) {
        return requestClient.fetch(request.METHOD_GET, `/curriculum`, query, options)
      },
      // 获取考试列表
      getExams () {
        return requestClient.fetch(request.METHOD_GET, `/exam/id/0`, {})
      },
      // 获取课程详情
      getCourseDetail (id) {
        return requestClient.fetch(request.METHOD_GET, `/curriculum/id/${id}`, {})
      },
      // 获取考试详情
      getExamDeatil (id) {
        return requestClient.fetch(request.METHOD_GET, `/exam/id/${id}`, {})
      },
      // 重新上传证书
      reUpload (data) {
        return requestClient.fetch(request.METHOD_POST, `/order/material`, data, {})
      },
      // 生成公司统一订单（考试）
      createCompanyExamOrder (data, options = {}) {
        return requestClient.fetch(request.METHOD_POST, `/order/company`, data, options)
      },
      // 生成个人考试订单
      createPersonalExamOrder (data, options = {}) {
        return requestClient.fetch(request.METHOD_POST, `/order/exam`, data, options)
      },
      // 生成个人课程订单
      createPersonalCourseOrder (data, options = {}) {
        return requestClient.fetch(request.METHOD_POST, `/order/curriculum`, data, options)
      },
      // 生成订单二维码
      createQrCodeImg (data, options = {}) {
        return requestClient.fetch(request.METHOD_POST, `/order/pay`, data, options)
      },
      // 获取个人课程列表
      getPersonalCourses (id) {
        return requestClient.fetch(request.METHOD_GET, `/student/curriculum/${id}`)
      },
      // 获取个人考试列表
      getPersonalExams (id) {
        return requestClient.fetch(request.METHOD_GET, `/student/exam/${id}`)
      },
      // 查询订单接口 （轮询、个人中心）
      pollingPay (id) {
        return requestClient.fetch(request.METHOD_GET, `/order/id/${id}`)
      }
    }
  }
}
