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
      </a-table>
    </div>
  </a-card>
</template>

<script>
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
    // 获取案件跟踪列表
    getInfo(id) {
      // this.$http.get(`/lcjl/spLcjl/queryByajid`, {params:{id: id} }).then((res) => {
      //   if (res.success) {
      //     this.dataSource = res.result
      //   }
      // })
    }
  }
};
</script>
<style scoped></style>
