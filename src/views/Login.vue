<!--  -->
<template>
  <div class="loginContainer">
    <div class="formContent">
      <h1 class="title">
        <img src="@/assets/images/u30.png" alt="" />
        金融类案智慧审判系统
      </h1>
      <a-form layout="inline" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入用户名!' }]
              }
            ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入登录密码!' }]
              }
            ]"
            type="password"
            placeholder="请输入登录密码"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      form: this.$form.createForm(this, { name: "horizontal_login" })
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$http.post("/login", values);
          window.sessionStorage.setItem("token", "123");
          this.$store.dispatch("setUserInfo", values);
          this.$router.push("/");
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="css" scoped>
/* @import url(); 引入公共css类*/
.loginContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url("../assets/images/lgbj.jpg") center center;
  background-size: 100%;
}
.formContent {
  width: 100%;
  padding: 80px;
  background-color: rgba(0, 0, 0, 0.498039215686275);
}

.formContent .title {
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 48px;
  color: #ffffff;
  line-height: 48px;
}
</style>
<style lang="less">
.formContent {
  .ant-input {
    height: 50px;
    font-size: 20px;
  }
  .ant-btn {
    height: 50px;
  }
  .ant-input-prefix {
    font-size: 16px;
  }
}
</style>
