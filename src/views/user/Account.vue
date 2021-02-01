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
                v-model="queryParam.roleName"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item
              label="角色名称"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-input
                placeholder="请输入角色名称"
                v-model="queryParam.caseno"
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
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
      <template slot="title">
        <a-row>
          <a-col :span="12">数据列表</a-col>
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
          <a href="javascript:;">删除</a>
        </div>
      </template>
    </a-table>
    <div :style="{ textAlign: 'right', padding: '20px 0' }">
      <a-pagination
        show-quick-jumper
        :default-current="1"
        :total="500"
        @change="onPagChange"
      />
    </div>
    <AddModal ref="addRef" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import AddModal from "./modal/AddModal";
const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park"
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
        caseType: "a"
      },
      data,
      columns: [
        {
          title: "账号",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "姓名",
          className: "column-money",
          dataIndex: "money"
        },
        {
          title: "邮箱地址",
          dataIndex: "address"
        },
        {
          title: "添加时间",
          dataIndex: "address1"
        },
        {
          title: "是否启用",
          dataIndex: "address2"
        },
        {
          title: "操作",
          dataIndex: "address12",
          fixed: "right",
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
    searchQuery() {},
    searchReset() {},
    onPagChange(pageNumber) {
      console.log("Page: ", pageNumber);
    },
    handleAdd() {
      this.$refs.addRef.add();
    },
    handleEdit(record) {
      this.$refs.addRef.edit(record);
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
