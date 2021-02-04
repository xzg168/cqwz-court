<!--  -->
<template>
  <div>
    <h3 class="fieldDescription">请求信息</h3>
    <a-descriptions title="" :column="4">
      <a-descriptions-item label="案由">
        {{ applicationData.ay }}
      </a-descriptions-item>
      <a-descriptions-item label="案件费用(元)">
        {{ applicationData.cpmc }}
      </a-descriptions-item>
      <a-descriptions-item label="标的额(元)">
        {{ applicationData.ssbd }}
      </a-descriptions-item>
      <a-descriptions-item label="收案时间">
        {{ applicationData.createTime }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ applicationData.createTime }}
      </a-descriptions-item>
    </a-descriptions>
    <h3 class="fieldDescription">事实与理由</h3>
    <a-descriptions title="">
      <a-descriptions-item label="">
        <span v-html="applicationData.ssyly"></span>
      </a-descriptions-item>
    </a-descriptions>
    <!-- <h3 class="fieldDescription">诉讼与请求</h3>
    <a-descriptions title="">
      <a-descriptions-item label="">
        <span v-html="applicationData.ssqq"></span>
      </a-descriptions-item>
    </a-descriptions> -->
    <h3 class="fieldDescription">要素信息</h3>
    <dynamic-descriptions :optionsData="optionsData" ref="dynamicElement" />
    <h3 class="fieldDescription">原告信息</h3>
    <!-- 原告 -->
    <div v-for="(item, index1) in ygData" :key="index1 + 100">
      <!-- <h3 class="dsrBj">原告{{ SectionToChinese(index1 + 1) }}</h3> -->
      <NaturalOrPerson :item="item" />
    </div>
    <h3 class="fieldDescription">代理人信息</h3>
    <Agent
      :data="[
        {
          name: '张三',
          idNo: '123456789',
          tel: 15510067129,
          identityFiles: [{ filePath: '', id: '123', fileName: 'yy' }]
        },
        {
          name: '张三san',
          idNo: '123456789',
          tel: 15510067129,
          identityFiles: [{ filePath: '', id: '123', fileName: 'yy' }]
        }
      ]"
    />
    <h3 class="fieldDescription">被告信息</h3>
    <!-- 被告 -->
    <div v-for="(item, index2) in bgData" :key="index2">
      <h3 class="dsrBj">被告{{ SectionToChinese(index2 + 1) }}</h3>
      <NaturalOrPerson :item="item" :isBg="true" />
    </div>
    <h3 class="fieldDescription">证据材料</h3>
    <evidence-files :data="applicationData.evidences"></evidence-files>
    <br />
    <h3 class="fieldDescription">诉状书</h3>
    <div
      style="border:1px solid #E4E4E4;padding:10px"
      v-if="
        applicationData.indictmentDoc && applicationData.indictmentDoc.fileName
      "
    >
      <a @click="downFile">{{ applicationData.indictmentDoc.fileName }}</a>
    </div>
  </div>
</template>

<script>
import DynamicDescriptions from "../components/DynamicDescriptions";
import NaturalOrPerson from "../components/NaturalOrPerson";
import { SectionToChinese } from "@/utils/util";
import EvidenceFiles from "../components/EvidenceFiles";
import Agent from "../components/Agent";
// 动态要素字段格式，后台返回可以自己定义内容，这里只为展示
const dtysData = [
  {
    type: "div",
    class: ["fieldDesc"],
    native: true,
    children: ["要素基本信息"]
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "sfzdqr",
    validate: [
      {
        required: true,
        message: "请选择身份证到期日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择身份证到期日",
      disabled: true,
      style: "width:100%"
    },
    title: "身份证到期日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "jkbj",
    validate: [
      {
        required: true,
        message: "请输入借款本金"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "借款本金(元)",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "lsf",
    validate: [
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "律师费(元)",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "lx",
    validate: [
      {
        required: true,
        message: "请输入利息"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "利息(元)",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "fx",
    validate: [
      {
        required: true,
        message: "请输入罚息"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "罚息(元)",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "fl",
    validate: [
      {
        required: true,
        message: "请输入复利"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "复利(元)",
    value: ""
  },
  {
    type: "div",
    class: ["fieldDesc"],
    native: true,
    children: ["合同基本信息"]
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "dkhtqdr",
    validate: [
      {
        required: true,
        message: "请选择贷款合同签订日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择贷款合同签订日",
      disabled: true,
      style: "width:100%"
    },
    title: "贷款合同签订日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "dked",
    validate: [
      {
        required: true,
        message: "请输入贷款额度"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "贷款额度(元)",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "dksqr",
    validate: [
      {
        required: true,
        message: "请选择贷款申请日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择贷款申请日",
      disabled: true,
      style: "width:100%"
    },
    title: "贷款申请日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "eddqr",
    validate: [
      {
        required: true,
        message: "请选择额度到期日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择额度到期日",
      disabled: true,
      style: "width:100%"
    },
    title: "额度到期日",
    emit: ["change"],
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: ".",
    validate: [
      {
        required: true,
        message: "请选择额度到期次日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择额度到期次日",
      disabled: true,
      style: "width:100%"
    },
    title: "额度到期次日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "htdqr",
    validate: [
      {
        required: true,
        message: "请选择合同到期日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择合同到期日",
      disabled: true,
      style: "width:100%"
    },
    title: "合同到期日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "nll",
    validate: [
      {
        required: true,
        message: "请输入年利率"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      precision: 6,
      controls: false
    },
    title: "年利率",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "input",
    field: "dkqs",
    validate: [
      {
        required: true,
        message: "请输入贷款期数"
      }
    ],
    props: {
      type: "text",
      disabled: true
    },
    title: "贷款期数",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "input",
    field: "dkzh",
    validate: [
      {
        required: true,
        message: "请输入贷款账号"
      }
    ],
    props: {
      type: "text",
      disabled: true
    },
    title: "贷款账号",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "select",
    field: "hkfs",
    options: [
      {
        value: "到期一次性还本付息",
        label: "到期一次性还本付息"
      },
      {
        value: "按月付息到期还本",
        label: "按月付息到期还本"
      }
    ],
    props: {
      disabled: true,
      style: "width:100%"
    },
    title: "还款方式",
    value: ""
  },
  {
    type: "div",
    class: ["fieldDesc"],
    native: true,
    children: ["逾期情况"]
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "radio",
    title: "逾期类别",
    field: "yqlb",
    props: {
      disabled: true
    },
    value: "0",
    options: [
      {
        value: "0",
        label: "到期前逾期"
      },
      {
        value: "1",
        label: "到期后逾期"
      }
    ]
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "dkyqr",
    validate: [
      {
        required: true,
        message: "请选择贷款逾期日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择贷款逾期日",
      disabled: true,
      style: "width:100%"
    },
    title: "贷款逾期日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "sqdkbj",
    validate: [
      {
        required: true,
        message: "请输入尚欠贷款本金"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "尚欠贷款本金(元)",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "sqqnlx",
    validate: [
      {
        required: true,
        message: "请输入尚欠期内利息"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "尚欠期内利息(元)",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "yhzdr",
    validate: [
      {
        required: true,
        message: "请选择银行自定日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择银行自定日",
      disabled: true,
      style: "width:100%"
    },
    emit: ["change"],
    title: "银行自定日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "DatePicker",
    field: "yhzdrcr",
    validate: [
      {
        required: true,
        message: "请选择银行自定日次日"
      }
    ],
    props: {
      format: "yyyy-MM-dd",
      placeholder: "请选择银行自定日次日",
      disabled: true,
      style: "width:100%"
    },
    title: "银行自定日次日",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "input",
    field: "edqx",
    validate: [
      {
        required: true,
        message: "请选择额度期限"
      }
    ],
    props: {
      type: "text",
      disabled: true
    },
    title: "额度期限",
    value: ""
  },
  {
    col: {
      xs: {
        span: 24
      },
      span: 8
    },
    type: "InputNumber",
    field: "yqhchfx",
    validate: [
      {
        required: true,
        message: "请输入逾期后偿还的罚息"
      },
      {
        type: "number",
        message: "请输入正确的值"
      }
    ],
    props: {
      type: "text",
      disabled: true,
      style: "width:100%",
      controls: false
    },
    title: "逾期后偿还的罚息(元)",
    value: ""
  }
];
export default {
  components: { DynamicDescriptions, NaturalOrPerson, EvidenceFiles, Agent },
  data() {
    // 这里存放数据
    return {
      // 以下字段根据字段自行修改，这里只为展示静态数据
      applicationData: {
        indictmentDoc: {},
        evidences: [
          { zjmc: "证据", zjsm: "123", evidenceFiles: [] },
          { zjmc: "证据", zjsm: "123", evidenceFiles: [] }
        ]
      },
      bgData: [{ dsrlx: "1" }, { dsrlx: "2" }],
      ygData: [{ dsrlx: "2" }],
      optionsData: dtysData
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    SectionToChinese,
    // 下载附件
    downFile() {},
    // 获取详情
    getInfo(id) {
      // 发起申请信息请求
      // this.$http.get(`/ajjbxx/spAjjbxx/queryById`, { params:{id: id} }).then(res => {
      //   console.log("申请信息res", res);
      //   if (res.success) {
      //     this.applicationData = res.result;
      //     this.$nextTick(() => {
      //       if (res.result.cpbdx) {
      //         this.optionsData = JSON.parse(res.result.cpbdx);
      //       }
      //       if (res.result.cpbdz) {
      //         this.$refs.dynamicElement.dataResources = JSON.parse(
      //           res.result.cpbdz
      //         );
      //         //  .replace(/\\/g, '')
      //       }
      //     });
      //   }
      // });
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="css">
.dsrBj {
  font-weight: bold;
}
</style>
