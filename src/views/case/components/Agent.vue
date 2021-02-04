<!--  -->
<template>
  <div class="">
    <a-descriptions title="" :column="3" class="verticallyCentered">
      <template v-for="(item, index) in data">
        <a-descriptions-item
          :label="`代理人${SectionToChinese(index + 1)}姓名`"
          :key="index"
        >
          {{ item.name }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证号" :key="index">
          {{ item.idNo }}
        </a-descriptions-item>
        <a-descriptions-item label="联系方式" :key="index">
          {{ item.tel }}
        </a-descriptions-item>
        <a-descriptions-item label="证件资料" :span="3" :key="index">
          <div
            class="certificateContainer"
            :key="evidenceItem.id"
            v-for="evidenceItem in item.identityFiles"
          >
            <a-card style="width: 200px" :bordered="false" size="small">
              <img
                slot="cover"
                alt="example"
                style="height:120px"
                preview="agent"
                :preview-text="123"
                :src="`/${evidenceItem.filePath}?id=${evidenceItem.id}`"
              />
              <a-card-meta>
                <template slot="title">
                  <div style="text-align:center">
                    {{ evidenceItem.fileName }}
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </a-descriptions-item>
      </template>
    </a-descriptions>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { SectionToChinese } from "@/utils/util";
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: { SectionToChinese },
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
