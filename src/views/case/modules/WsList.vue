<!--  -->
<template>
  <a-card :bordered="false">
    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="docData"
        :pagination="false"
      >
        <!-- <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>-->
        <template slot="uploadList" slot-scope="file, row, index">
          <a @click="downloadFileById(row.id)"
            ><a-icon type="paper-clip" />{{ row.fileName }}</a
          >
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import { getAction, downloadFile, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
// import { filterDictTextByCache } from '@/components/dict/JDictSelectUtil'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      docData: [],
      // 表头
      columns: [
        {
          title: "序号",
          width: 80,
          align: "center",
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: "案件进展",
          align: "center",
          dataIndex: "type",
          customRender: (text, record, index) => {
            // return filterDictTextByCache('file_type', text)
          }
        },
        {
          title: "文书名称",
          align: "center",
          dataIndex: "fileName",
          scopedSlots: { customRender: "uploadList" }
        },
        {
          title: "附件",
          align: "center",
          dataIndex: "fileName",
          scopedSlots: { customRender: "uploadList" }
        },
        {
          title: "送达方式",
          align: "center",
          dataIndex: "type"
        }
      ]
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // filterDictTextByCache,
    // downloadFile,
    getInfo(id) {
      // getAction('ajjbxx/spAjjbxx/queryDocByAjId', { id: id }).then((res) => {
      //   console.log('文书res', res)
      //   this.docData = res.result
      // })
    },

    downloadFileById(fileId) {
      window.location.href = "/zhsp/fjxx/download?id=" + fileId;
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
</style>
