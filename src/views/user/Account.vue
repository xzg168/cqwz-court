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
              label="用户姓名"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-input
                placeholder="请输入用户姓名"
                v-model="queryParam.name"
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
        :total="total"
        v-model="queryParam.pageNum"
        :page-size.sync="queryParam.pageSize"
        @showSizeChange="onShowSizeChange"
        @change="onPagChange"
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
    name: "John Brown",
    is_type: 1,
    mailbox: "123@qq.com",
    create_time: "2021-2-9",
    account: "admin"
  },
  {
    id: "2",
    name: "John Brown",
    is_type: 1,
    mailbox: "123@qq.com",
    create_time: "2021-2-9",
    account: "admin"
  },
  {
    id: "3",
    name: "John Brown",
    is_type: 2,
    mailbox: "123@qq.com",
    create_time: "2021-2-9",
    account: "admin"
  }
];

export default {
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: { AddModal },
  data() {
    //这里存放数据
    return {
      queryParam: {
        name: "",
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      data,
      columns: [
        {
          title: "账号",
          dataIndex: "account",
          align: "center"
        },
        {
          title: "姓名",
          align: "center",
          dataIndex: "name"
        },
        {
          title: "邮箱地址",
          dataIndex: "mailbox",
          align: "center"
        },
        {
          title: "添加时间",
          dataIndex: "create_time",
          align: "center",
          customRender: text => {
            return moment(text).format("YYYY-MM-DD");
          }
        },
        {
          title: "是否启用",
          dataIndex: "is_type",
          align: "center",
          scopedSlots: { customRender: "useStatus" }
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
      this.$http.get("/admin/list", { params: params }).then(res => {
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
      this.queryParam = {
        name: "",
        pageNum: 1,
        pageSize: 20
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
      this.$http.post("/admin/updateTypeById", { id: record.id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message);
        }
      });
    },
    handleAdd() {
      this.$refs.addRef.add();
    },
    handleEdit(record) {
      this.$refs.addRef.edit(record);
    },
    handleRemove(record) {
      this.$http.post("/admin/fakeDelete", { id: record.id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message);
          this.getData();
        }
      });
    }
  },
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
/* @import url(); 引入公共css类*/
</style>
