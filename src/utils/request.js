import axios from "axios";
import { notification, message, Modal } from "ant-design-vue";
import store from "@/store";
import { getToken } from "@/utils/auth";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // 开发环境webpack /api 做代理
  baseURL: process.env.NODE_ENV === "development" ? "/api" : "",
  // 超时
  timeout: 10000
});
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  res => {
    const code = res.data.code;
    if (code === 401) {
      Modal.error({
        title: "登录已过期",
        content: "很抱歉，登录已过期，请重新登录",
        okText: "重新登录",
        mask: false,
        onOk: () => {
          window.sessionStorage.removeItem("token");
          window.location.reload();
        }
      });
    } else if (code !== 200) {
      notification.error({
        message: "系统提示",
        description: res.data.message,
        duration: 4
      });
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  error => {
    console.log("err" + error);
    message.error({
      content: error
    });
    return Promise.reject(error);
  }
);

export default service;
