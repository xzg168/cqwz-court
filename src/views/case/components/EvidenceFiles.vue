<!--  -->
<template>
  <div class="">
    <div v-if="data.length > 0">
      <div class="fileItem" :key="index" v-for="(item, index) in data">
        <h3>证据{{ SectionToChinese(index + 1) }}</h3>
        <div>
          <h4>证据标题：{{ item.zjmc }}</h4>
        </div>
        <a-row>
          <a-col :span="1">
            <em>附件：</em>
          </a-col>
          <a-col :span="11">
            <div
              class="file"
              v-for="fileItem in item.evidenceFiles"
              :key="fileItem.id"
            >
              <em>{{ fileItem.fileName }}</em>
              <span class="btnContainer">
                <!-- <a @click="handlePreview(fileItem)">预览</a>
              <span>|</span> -->
                <!-- <a
                  @click="
                    downloadFile(fileItem.filePath, fileItem.fileName, {
                      id: fileItem.id
                    })
                  "
                  >下载</a
                > -->
              </span>
            </div>
          </a-col>
        </a-row>

        <div class="content"><em>证据内容：</em>{{ item.zjsm }}</div>
      </div>
    </div>
    <a-empty v-else />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { SectionToChinese } from "@/utils/util";
// import { downloadFile } from '@/api/manage'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    data: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    SectionToChinese,
    // downloadFile,
    handlePreview(record) {
      if (record) {
        record.url = `${window._CONFIG["domianURL"]}/${record.filePath}?id=${record.id}}`;
        let url =
          window._CONFIG["onlinePreviewDomainURL"] +
          "?url=" +
          encodeURIComponent(record.url);
        window.open(url, "_blank");
      }
    }
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
<style lang="css" scoped>
/* @import url(); 引入公共css类*/
.fileItem {
  border: 1px solid #f4f4f4;
  padding: 24px;
  margin-bottom: 20px;
  font-size: 12px;
  width: 100%;
}
.fileItem h3 {
  font-size: 16px;
  font-weight: bold;
}
.fileItem h4 {
  display: inline-block;
  font-size: 14px;
}
.fileItem .uploadTime {
  color: #868686;
  font-size: 12px;
}
.file {
  line-height: 34px;
  height: 34px;
  background-color: #fcfcfc;
  padding: 0 15px;
  margin-top: 8px;
}
.file .btnContainer {
  float: right;
}
.file .btnContainer a {
  color: #868686;
}
.file .btnContainer span {
  color: #f4f4f4;
  margin: 0 10px;
}
.content {
  color: #868686;
  margin-top: 10px;
  word-break: break-all;
  word-wrap: break-word;
}
.fileItem em {
  color: #313131;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}
</style>
