import Vue from 'vue'
import {
  Message
} from 'element-ui'

export default {
  install(Vue, options) {
    Vue.prototype.showToastSuccess = (str) => {
      Message({
        showClose: true,
        message: str,
        center: true,
        type: 'success'
      })
    }
    Vue.prototype.showToastError = (str) => {
      Message({
        showClose: true,
        message: str,
        center: true,
        type: 'error'
      })
    }
    Vue.prototype.showToast = (str) => {
      Message({
        showClose: true,
        message: str,
        center: true
      })
    }
  }
}
