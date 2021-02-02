<!--  -->
<template>
  <div class="">
    <div>
      <a-radio-group
        default-value="a"
        button-style="solid"
        size="large"
        v-model="queryParam.caseType"
        @change="changeCaseType"
      >
        <a-radio-button value="a">
          全部案件
        </a-radio-button>
        <a-radio-button value="b">
          待收案
        </a-radio-button>
        <a-radio-button value="c">
          待立案
        </a-radio-button>
        <a-radio-button value="d">
          待排期
        </a-radio-button>
        <a-radio-button value="e">
          待结案
        </a-radio-button>
        <a-radio-button value="f">
          待提交送达结案信息
        </a-radio-button>
        <a-radio-button value="g">
          已结案
        </a-radio-button>
      </a-radio-group>
    </div>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <!-- 搜索区域 -->
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item
              label="案件编号"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-input
                placeholder="请输入案件编号"
                v-model="queryParam.caseNum"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item
              label="案件号"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-input
                placeholder="请输入案件号"
                v-model="queryParam.caseno"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item
              label="申请时间"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-date-picker
                placeholder="请选择申请时间"
                v-model="queryParam.atime"
                valueFormat="YYYY-MM-DD"
              />
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
          <a-col :md="6" :sm="8">
            <a-form-item
              label="申请人"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-input
                placeholder="请输入申请人"
                v-model="queryParam.pep"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item
              label="执行"
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 17, offset: 1 }"
            >
              <a-select style="width: 180px" v-model="queryParam.excut">
                <a-select-option value="jack">
                  请选择
                </a-select-option>
                <a-select-option value="lucy">
                  执行失败
                </a-select-option>
                <a-select-option value="disabled" disabled>
                  正在执行
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      rowKey="id"
      :row-selection="rowSelection"
      :scroll="{ x: 'calc(1700px + 50%)' }"
      :pagination="false"
    >
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
      <template slot="title">
        <a-row>
          <a-col :span="12">数据列表</a-col>
          <a-col
            :span="12"
            :style="{ textAlign: 'right' }"
            v-if="queryParam.caseType !== 'a'"
            class="tableBtn"
          >
            <template v-if="queryParam.caseType === 'b'">
              <a-button type="primary" @click="handleImport">
                导入
              </a-button>
              <a-button type="primary" :disabled="selectedRowKeys.length === 0">
                收案
              </a-button>
            </template>
            <template v-if="queryParam.caseType === 'c'">
              <a-button type="primary">
                立案
              </a-button>
            </template>
            <template v-if="queryParam.caseType === 'd'">
              <a-button type="primary">
                排期
              </a-button>
            </template>
            <template v-if="queryParam.caseType === 'e'">
              <a-button type="primary">
                结案
              </a-button>
            </template>
            <a-button type="primary" v-if="queryParam.caseType === 'f'">
              待提交送达结案信息
            </a-button>
          </a-col>
        </a-row>
      </template>
      <a
        slot="action"
        slot-scope="text"
        href="javascript:;"
        @click="goDetail(text)"
        >详情</a
      >
    </a-table>
    <div :style="{ textAlign: 'right', padding: '20px 0' }">
      <a-pagination
        show-quick-jumper
        v-model="queryParam.current"
        :total="total"
        :page-size.sync="queryParam.pageSize"
        show-size-changer
        @showSizeChange="onShowSizeChange"
        @change="onPagChange"
      />
    </div>
    <ImportModal ref="importRef" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ImportModal from "./modal/ImportModal";
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
  components: { ImportModal },
  data() {
    //这里存放数据
    return {
      // 数据多选
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
          this.selectedRowKeys = selectedRowKeys;
        }
        // onSelect: (record, selected, selectedRows) => {
        //   console.log(record, selected, selectedRows);
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //   console.log(selected, selectedRows, changeRows);
        // }
      },
      // 查询条件
      queryParam: {
        caseType: "a",
        pageSize: 20,
        current: 1
      },
      // 数据总数
      total: 200,
      // 选中条数key值
      selectedRowKeys: [],
      // 列表数据
      data,
      // 列表项
      columns: [
        {
          title: "序号",
          width: 80,
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: "案件号",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "案由",
          className: "column-money",
          dataIndex: "money"
        },
        {
          title: "申请人",
          dataIndex: "address"
        },
        {
          title: "被申请人",
          dataIndex: "address1"
        },
        {
          title: "产品类型",
          dataIndex: "address2"
        },
        {
          title: "标的金额（元）",
          dataIndex: "address3"
        },
        {
          title: "创建时间",
          dataIndex: "address4"
        },
        {
          title: "收案时间",
          dataIndex: "address5"
        },
        {
          title: "立案时间",
          dataIndex: "address6"
        },
        {
          title: "排期时间",
          dataIndex: "address7"
        },
        {
          title: "结案时间",
          dataIndex: "address8"
        },
        {
          title: "提交送达结案时间",
          dataIndex: "address9"
        },
        {
          title: "文书",
          dataIndex: "address0"
        },
        {
          title: "状态",
          dataIndex: "address10"
        },
        {
          title: "操作步骤",
          dataIndex: "address11"
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
    // 获取列表项
    getData() {
      let params = JSON.parse(JSON.stringify(this.queryParam));
      this.$http.get("/list", { params: params });
    },
    // 查询方法
    searchQuery() {
      console.log("queryPa", this.queryParam);
      this.getData();
    },
    // 查询方法重置
    searchReset() {
      this.queryParam = {
        caseType: "a",
        pageSize: 20,
        current: 1
      };
    },
    // 跳转详情页
    goDetail(record) {
      this.$router.push("/case/detail/123");
    },
    // 分页跳转
    onPagChange(pageNumber) {
      console.log("Page: ", pageNumber);
      // this.queryParam.current = pageNumber;
      this.getData();
    },
    // 改变案件状态
    changeCaseType(type) {
      console.log("type", type);
      this.getData();
    },
    // 显示分页pageSize
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      this.queryParam.current = current;
      this.queryParam.pageSize = pageSize;
      this.getData();
    },
    // 导入
    handleImport() {
      this.$refs.importRef.add();
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
