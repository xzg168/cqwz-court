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
        :dataSource="dataSource"
        :pagination="false"
      >
        <!-- <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template> -->
      </a-table>
    </div>
  </a-card>
</template>

<script>
// import { getAction } from '@/api/manage'
// import { filterDictTextByCache } from '@/components/dict/JDictSelectUtil'

export default {
  name: "OperationRecord",
  components: {},
  data() {
    return {
      description: "操作记录",
      dataSource: [],
      // 表头
      columns: [
        {
          title: "序号",
          width: 80,
          align: "center",
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: "操作步骤",
          align: "center",
          dataIndex: "createBy1"
        },
        {
          title: "处理信息",
          align: "center",
          dataIndex: "createBy2"
        },
        {
          title: "操作人",
          align: "center",
          dataIndex: "createBy"
        },
        {
          title: "处理时间",
          align: "center",
          dataIndex: "createTime"
        }
      ]
    };
  },
  created() {},
  computed: {},
  methods: {
    // filterDictTextByCache,
    getInfo(id) {
      // getAction(`/lcjl/spLcjl/queryByajid`, { ajid: id }).then((res) => {
      //   if (res.success) {
      //     this.dataSource = res.result
      //   }
      // })
    }
  }
};
</script>
<style scoped></style>
