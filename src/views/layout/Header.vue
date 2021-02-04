<!--  -->
<template>
  <div class="">
    <a-layout-header :style="{ width: '100%' }">
      <div class="logo">
        <img src="@/assets/images/u30.png" />
      </div>
      <a-row>
        <a-col :span="12">
          <a-menu
            theme="dark"
            mode="horizontal"
            v-model="onecurrent"
            :style="{ lineHeight: '64px', textAlign: 'left' }"
            @select="handleSelectOne"
          >
            <a-menu-item key="case">
              <a-icon type="database" />
              案件管理
            </a-menu-item>
            <a-menu-item key="user">
              <a-icon type="user" />
              用户管理
            </a-menu-item>
            <a-menu-item key="system">
              <a-icon type="project" />
              系统管理
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="6" :offset="2">
          <a-menu
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px', float: 'right' }"
            class="settingContent"
          >
            <a-menu-item key="1" @click="handleChangeInfo">
              <a-icon type="setting" />
              账户设置
            </a-menu-item>
            <a-menu-item key="2" @click="loginOut">
              <a-icon type="logout" />
              退出登录
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>
    <div>
      <a-menu
        :selectedKeys="[$route.path]"
        mode="horizontal"
        :style="{ textAlign: 'left' }"
      >
        <template v-if="onecurrent[0] === 'case'">
          <a-menu-item key="/case/list">
            <router-link to="/case/list">案件列表 </router-link>
          </a-menu-item>
        </template>
        <template v-if="onecurrent[0] === 'user'">
          <!-- <a-menu-item key="/user/role">
            <router-link to="/user/role">角色管理 </router-link>
          </a-menu-item> -->
          <a-menu-item key="/user/account">
            <router-link to="/user/account">账号管理 </router-link>
          </a-menu-item>
          <a-menu-item key="/user/log"
            ><router-link to="/user/log">操作日志 </router-link>
          </a-menu-item>
        </template>
        <template v-if="onecurrent[0] === 'system'">
          <a-menu-item key="/system/instrument">
            <router-link to="/system/instrument">文书维护 </router-link>
          </a-menu-item>
          <a-menu-item key="/system/product">
            <router-link to="/system/product">产品信息</router-link>
          </a-menu-item>
        </template>
      </a-menu>
    </div>
    <div :style="{ textAlign: 'left', padding: '10px 20px' }">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="">{{ activeMenu }}</a></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <SettingModal ref="setRef" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SettingModal from "./modal/SettingModal";
import { removeToken } from "@/utils/auth";
export default {
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: { SettingModal },
  data() {
    //这里存放数据
    return {
      onecurrent: ["case"],
      current: ["list"]
    };
  },
  //监听属性 类似于data概念
  computed: {
    activeMenu() {
      console.log("头部", this.$route.meta);
      return this.$route.meta.title;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSelectOne({ item, key, selectedKeys }) {
      console.log(item, key, selectedKeys);
      switch (key) {
        case "case":
          this.current = ["list"];
          this.$router.push("/case/list");
          break;
        case "user":
          this.current = ["account"];
          this.$router.push("/user");
          break;
        case "system":
          this.current = ["instrument"];
          this.$router.push("/system");
          break;
      }
    },
    loginOut() {
      window.sessionStorage.removeItem("token");
      removeToken();
      this.$store.dispatch("setUserInfo", {});
      this.$router.push("/login");
    },
    handleChangeInfo() {
      const userInfo = this.$store.getters.getUserFn;
      console.log("userInfo", userInfo);
      this.$refs.setRef.edit(userInfo);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log("当前路由", this.$route);
    this.$nextTick(() => {
      this.onecurrent = [this.$route.path.split("/")[1]];
    });
  },
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
.logo {
  width: 120px;
  height: 31px;
  /* background: rgba(255, 255, 255, 0.2); */
  /* margin: 16px 24px 16px 0; */
  float: left;
}
</style>
<style>
.settingContent.ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background-color: #001529;
}
</style>
