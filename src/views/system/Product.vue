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
              label="产品名称"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-input
                placeholder="请输入用户姓名"
                v-model="queryParam.product_name"
              ></a-input>
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
      <template slot="title">
        <a-row>
          <a-col :span="12"><a-icon type="database" />数据列表</a-col>
          <a-col :span="12" :style="{ textAlign: 'right' }" class="tableBtn">
            <a-button type="primary" @click="handleAdd">
              添加
            </a-button>
          </a-col>
        </a-row>
      </template>
      <template slot="action" slot-scope="text">
        <div>
          <a href="javascript:;" @click="handleEdit(text)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确认删除这条数据?"
            placement="topRight"
            ok-text="是"
            cancel-text="否"
            @confirm="handleRemove(text)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </div>
      </template>
      <template slot="useStatus" slot-scope="text, record">
        <div>
          <a-switch
            checked-children="ON"
            un-checked-children="OFF"
            :defaultChecked="text === 1 ? true : false"
            @change="e => changeStatus(e, record)"
          />
        </div>
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
    <AddModal ref="addRef" @ok="getData" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from "moment";
import AddModal from "./modal/AddModal";
const data = [
  {
    id: "1",
    product_name: "John Brown",
    document_name: "￥300,000.00",
    product_describe: "New York No. 1 Lake Park",
    is_type: 1,
    create_time: 1612421493292
  },
  {
    id: "2",
    product_name: "Jim Green",
    document_name: "￥1,256,000.00",
    is_type: 2,
    product_describe: "London No. 1 Lake Park",
    create_time: 1612421493292
  },
  {
    id: "3",
    product_name: "Joe Black",
    document_name: "￥120,000.00",
    is_type: 1,
    product_describe: "Sidney No. 1 Lake Park",
    create_time: 1612421493292
  }
];

export default {
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: { AddModal },
  data() {
    //这里存放数据
    return {
      total: 0,
      queryParam: {
        product_name: "",
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
          title: "产品名称",
          dataIndex: "product_name",
          align: "center"
        },
        {
          title: "描述",
          align: "center",
          dataIndex: "product_describe"
        },
        {
          title: "文书名称",
          dataIndex: "document_name",
          align: "center"
        },
        {
          title: "是否启用",
          align: "center",
          dataIndex: "is_type",
          scopedSlots: { customRender: "useStatus" }
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "create_time",
          customRender: text => {
            return moment(text).format("YYYY-MM-DD");
          }
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "action" }
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
    // 获取列表项
    getData() {
      let params = JSON.parse(JSON.stringify(this.queryParam));
      this.$http.get("/product/list", { params: params }).then(res => {
        if (res.code === 200) {
          this.total = res.data.total;
          this.data = res.data.list;
        }
      });
    },
    searchQuery() {
      this.getData();
    },
    searchReset() {
      this.queryParam = {
        pageNum: 1,
        pageSize: 20,
        product_name: ""
      };
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
    },
    // 改变状态
    changeStatus(checked, record) {
      console.log("checked", checked, record);
      this.$http
        .post("/document/maintain/updateTypeById", { id: record.id })
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.message);
          }
        });
    },
    handleAdd() {
      this.$refs.addRef.add();
    },
    handleEdit(text) {
      this.$refs.addRef.edit(text);
    },
    handleRemove(record) {
      this.$http.post("/product/fakeDelete", { id: record.id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.getData();
        }
      });
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
