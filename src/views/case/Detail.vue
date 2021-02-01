<!--  -->
<template>
  <div class="detailsContainer">
    <a-page-header :ghost="false" :backIcon="false">
      <template slot="title">
        <a-row>
          <a-col :span="24">
            <span>(2020)南仲案字第2-0233号</span>
          </a-col>
        </a-row>
      </template>
      <a-descriptions size="small" :column="4">
        <a-descriptions-item label="案由">
          储蓄存款合同纠纷
        </a-descriptions-item>
        <a-descriptions-item label="申请日期">
          2020年9月24日
        </a-descriptions-item>
        <a-descriptions-item label="调解结果">
          调解成功
        </a-descriptions-item>
      </a-descriptions>
      <a-steps :current="0" size="small">
        <a-step title="待收案" />
        <a-step title="待立案" />
      </a-steps>
      <br />
      <a-tabs :activeKey="activeKey" @change="changeTabCallback" type="card">
        <a-tab-pane key="1" tab="申请信息">
          <application-info ref="applicationRef"></application-info>
        </a-tab-pane>
        <a-tab-pane key="2" tab="案件跟踪">
          <OperationRecord />
        </a-tab-pane>
        <a-tab-pane key="3" tab="案件文书">
          <WsList />
        </a-tab-pane>
      </a-tabs>
    </a-page-header>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ApplicationInfo from "./modules/ApplicationInfo";
import OperationRecord from "./modules/OperationRecord";
import WsList from "./modules/WsList";
export default {
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: { ApplicationInfo, OperationRecord, WsList },
  data() {
    //这里存放数据
    return {
      activeKey: "1",
      detailId: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取案件基本信息
    getInfo() {
      // getAction('/ajjbxx/spAjjbxx/queryById', { id: this.detailId }).then((res) => {
      //   this.ah = res.result.ah;
      // })
      // this.$nextTick(() => {
      //   this.$refs.applicationRef.getInfo(this.detailId)
      // })
    },
    changeTabCallback(key) {
      this.activeKey = key;
      this.$nextTick(() => {
        switch (key) {
          case "1":
            this.$refs.applicationRef.getInfo(this.detailId);
            break;
          case "2":
            this.$refs.dsrRef.getInfo(this.detailId);
            break;
          case "3":
            this.$refs.zjRef.getInfo(this.detailId);
            break;
          case "4":
            this.$refs.lcRef.getInfo(this.detailId);
            break;
          case "5":
            this.$refs.tjRef.getInfo(this.detailId);
            break;
          case "6":
            this.$refs.laRef.getInfo(this.detailId);
            break;
          case "7":
            this.$refs.wsRef.getInfo(this.detailId);
            break;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route);
    this.detailId = this.$route.params.id;
    this.getInfo();
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
</style>
<style>
.fieldDescription {
  background: #f2f2f2;
  padding: 15px 5px;
  font-size: 16px;
}
</style>
