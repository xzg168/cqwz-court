<!--  -->
<template>
  <div class="">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <!-- 搜索区域 -->
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item
              label="操作人员"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-input
                placeholder="请输入操作人员"
                v-model="queryParam.account"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item
              label="操作日期"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <!-- <a-date-picker
                placeholder="请选择操作日期"
                v-model="queryParam.caseno"
                valueFormat="YYYY-MM-DD"
              /> -->
              <a-range-picker v-model="queryParam.dateRang" valueFormat="x" />
            </a-form-item>
          </a-col>

          <span
            style="float: left;overflow: hidden;"
            class="table-page-search-submitButtons"
          >
            <a-col :md="6" :sm="8">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset"
                >重置</a-button
              >
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      rowKey="id"
      :pagination="false"
    >
      <!-- <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template> -->
      <template slot="title">
        <a-row>
          <a-col :span="12"><a-icon type="database" />数据列表</a-col>
          <a-col :span="12" :style="{ textAlign: 'right' }" class="tableBtn">
          </a-col>
        </a-row>
      </template>
    </a-table>
    <div :style="{ textAlign: 'right', padding: '20px 0' }">
      <a-pagination
        show-quick-jumper
        show-size-changer
        :default-current="1"
        :total="total"
        @change="onPagChange"
        v-model="queryParam.pageNum"
        @showSizeChange="onShowSizeChange"
        :page-size.sync="queryParam.pageSize"
      />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
const data = [
  {
    id: "1",
    account: "John Brown",
    create_time: 1612257868292,
    operation_content: "New York No. 1 Lake Park"
  },
  {
    id: "2",
    account: "John Brown",
    create_time: 1612257868292,
    operation_content: "New York No. 1 Lake Park"
  },
  {
    id: "3",
    account: "John Brown",
    create_time: 1612257868292,
    operation_content: "New York No. 1 Lake Park"
  }
];
import moment from "moment";
export default {
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      total: 0,
      queryParam: {
        dateRang: [],
        account: "",
        pageNum: 1,
        pageSize: 20
      },
      data,
      columns: [
        {
          title: "序号",
          width: 80,
          align: "center",
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: "操作者",
          dataIndex: "account",
          align: "center",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "操作日期",
          align: "center",
          dataIndex: "create_time",
          customRender: text => {
            return moment(text).format("YYYY-MM-DD");
          }
        },
        {
          title: "IP地址",
          align: "center",
          dataIndex: "address"
        },
        {
          title: "操作记录",
          align: "center",
          dataIndex: "operation_content"
        }
      ],
      loading: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取列表数据
    getData() {
      console.log(this.queryParam.dateRang);
      if (this.queryParam.dateRang.length > 0) {
        // moment 转时间戳
        // this.queryParam.start_time = this.queryParam.dateRang[0].valueOf();
        // this.queryParam.end_time = this.queryParam.dateRang[1].valueOf();
        // 日期插件转时间戳
        this.queryParam.start_time = this.queryParam.dateRang[0];
        this.queryParam.end_time = this.queryParam.dateRang[1];
        delete this.queryParam.dateRang;
      }
      let params = JSON.parse(JSON.stringify(this.queryParam));
      this.$http.get("/operation/log/list", { params: params }).then(res => {
        if (res.code === 200) {
          this.total = res.data.total;
          this.data = res.data.list;
        }
      });
    },
    // 查询
    searchQuery() {
      this.getData();
    },
    // 重置
    searchReset() {
      this.queryParam = { dateRang: [], account: "", pageNum: 1, pageSize: 20 };
      this.getData();
    },
    // 显示分页pageSize
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      this.queryParam.pageNum = current;
      this.queryParam.pageSize = pageSize;
      this.getData();
    },
    // 分页跳转
    onPagChange(pageNumber) {
      // this.queryParam.current = pageNumber;
      this.getData();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
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
