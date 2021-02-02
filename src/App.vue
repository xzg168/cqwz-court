<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  data() {
    //这里存放数据
    return {
      locale: zhCN
    };
  }
};
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.table-page-search-wrapper {
  padding: 10px;
  .table-page-search-submitButtons {
    display: block;
    margin-top: 3px;
    margin-bottom: 15px;
    white-space: nowrap;
  }
}
.tableBtn {
  .ant-btn {
    margin-left: 20px;
  }
}
</style>
