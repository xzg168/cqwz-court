<!--  -->
<template>
  <div class="niceBorder">
    <div v-if="item.dsrlx === '1'">
      <a-descriptions class="verticallyCentered" title="" size="small">
        <a-descriptions-item label="姓名">
          {{ item.dsrmc }}
        </a-descriptions-item>
        <a-descriptions-item label="性别">
          <!-- {{ filterDictTextByCache('sex',item.xb) }} -->
        </a-descriptions-item>
        <a-descriptions-item label="民族">
          <!-- {{ filterDictTextByCache('mz',item.mz) }} -->
        </a-descriptions-item>
        <a-descriptions-item label="证件类型 ">
          <!-- {{ filterDictTextByCache('zjzl',item.zjzl) }} -->
        </a-descriptions-item>
        <a-descriptions-item label="证件号">
          {{ item.zjhm }}
        </a-descriptions-item>
        <a-descriptions-item label="出生年月">
          {{ item.csrq }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号码">
          {{ item.lxdh }}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          {{ item.lxyx }}
        </a-descriptions-item>
        <a-descriptions-item label="居住地址">
          {{ item.zsdz }}
        </a-descriptions-item>
        <a-descriptions-item label="送达地址 " :span="3">
          {{ item.sddz }}
        </a-descriptions-item>
        <a-descriptions-item label="证件资料" :span="3">
          <div
            class="certificateContainer"
            :key="evidenceItem.id"
            v-for="evidenceItem in item.identityFiles"
          >
            <!-- :preview-text="filterDictTextByCache('file_type',evidenceItem.type)" -->
            <a-card style="width: 200px" :bordered="false" size="small">
              <img
                slot="cover"
                alt="example"
                style="width:60px;height:40px"
                preview="applicant"
                :src="
                  `${downLoadUrl}/${evidenceItem.filePath}?id=${evidenceItem.id}`
                "
              />
              <a-card-meta>
                <template slot="title">
                  <!-- <div style="text-align:center">{{ filterDictTextByCache('file_type',evidenceItem.type) }}</div> -->
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div v-else>
      <a-descriptions class="verticallyCentered" title="" size="small">
        <a-descriptions-item label="企业名称">
          {{ item.dsrmc }}
        </a-descriptions-item>
        <a-descriptions-item label="组织机构代码 ">
          {{ item.zzjgdm }}
        </a-descriptions-item>
        <a-descriptions-item label="法定代表人">
          {{ item.fddbr }}
        </a-descriptions-item>
        <a-descriptions-item label="法人证件类型">
          <!-- {{ filterDictTextByCache('zjzl',item.zjzl) }}
           -->
        </a-descriptions-item>
        <a-descriptions-item label="法人证件号">
          {{ item.zjhm }}
        </a-descriptions-item>
        <a-descriptions-item label="注册地址">
          {{ item.zsdz }}
        </a-descriptions-item>
        <a-descriptions-item label="送达地址">
          {{ item.sddz }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{ item.lxdh }}
        </a-descriptions-item>
        <a-descriptions-item label="联系人邮箱">
          {{ item.lxyx }}
        </a-descriptions-item>
        <a-descriptions-item label="证件资料" :span="3">
          <a-col
            class="certificateContainer"
            :key="evidenceItem.id"
            v-for="evidenceItem in item.identityFiles"
          >
            <!-- :preview-text="filterDictTextByCache('file_type',evidenceItem.type)" -->
            <a-card style="width: 200px" :bordered="false" size="small">
              <img
                slot="cover"
                alt="example"
                style="height:120px"
                preview="applicant"
                :src="
                  `${downLoadUrl}/${evidenceItem.filePath}?id=${evidenceItem.id}`
                "
              />
              <a-card-meta>
                <template slot="title">
                  <!-- <div style="text-align:center">{{ filterDictTextByCache('file_type',evidenceItem.type) }}</div> -->
                </template>
              </a-card-meta>
            </a-card>
          </a-col></a-descriptions-item
        >
      </a-descriptions>
    </div>
    <!-- <div v-if="!isBg && item.firstDlr&&item.firstDlr.dlrxm">
      <h3 class="fieldDescription">代理人信息</h3>
      <a-descriptions title="" :column="2" class="verticallyCentered">
        <a-descriptions-item label="代理人一姓名">
          {{ item.firstDlr&&item.firstDlr.dlrxm }}
        </a-descriptions-item>
        <a-descriptions-item label="代理人一委托权限">
          {{ filterDictTextByCache('wtqx',item.firstDlr&&item.firstDlr.wtqx) }}
        </a-descriptions-item>
        <a-descriptions-item label="代理人二姓名" v-if="item.sedDlr">
          {{ item.sedDlr&&item.sedDlr.dlrxm }}
        </a-descriptions-item>
        <a-descriptions-item label="代理人二委托权限" v-if="item.sedDlr">
          {{ filterDictTextByCache('wtqx',item.sedDlr&&item.sedDlr.wtqx) }}
        </a-descriptions-item>
        <a-descriptions-item label="证件资料" :span="2">
          <div class="certificateContainer" :key="evidenceItem.id" v-for="evidenceItem in item.firstDlr&&item.firstDlr.identityFiles">
            <a-card style="width: 200px" :bordered="false" size="small">
              <img
                slot="cover"
                alt="example"
                style="height:120px"
                preview="agent"
                :preview-text="filterDictTextByCache('file_type',evidenceItem.type)"
                :src="`${downLoadUrl}/${evidenceItem.filePath}?id=${evidenceItem.id}`"
              />
              <a-card-meta>
                <template slot="title">
                  <div style="text-align:center">{{ filterDictTextByCache('file_type',evidenceItem.type) }}</div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </div> -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import { filterDictTextByCache } from '@/components/dict/JDictSelectUtil'
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    },
    isBg: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {},
  data() {
    // 这里存放数据
    return {
      downLoadUrl: "/zhsp"
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // filterDictTextByCache
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
/* @import url(); 引入公共css类*/
.niceBorder {
  // border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px #ccc inset;
}
.centerP {
  width: 150px;
  height: 120px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  border: 1px solid #000;
}
.centerP img {
  width: 60px;
  height: 60px;
}
.certificateContainer {
  display: inline-block;
  margin-right: 15px;
}
</style>
<style>
.verticallyCentered .ant-descriptions-item-label {
  display: table-cell;
  vertical-align: middle;
}
.verticallyCentered .ant-descriptions-item-content {
  display: table-cell;
  vertical-align: middle;
}
</style>
