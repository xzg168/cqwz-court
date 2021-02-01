<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
    style="top:5%;height: 85%;overflow-y: hidden"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文书名称"
        >
          <a-input
            style="width: 100%"
            v-decorator="['pName', validatorRules.pName]"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文书描述"
        >
          <!-- <a-textarea
            style="width: 100%"
            v-decorator="['gName', validatorRules.gName]"
          >
          </a-textarea> -->
          <JEditor v-decorator="['des']" isTemplate />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
          <a-switch v-decorator="['ststus']" />
        </a-form-item>
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="模板">
          <JEditor v-decorator="['des']" isTemplate />
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
// import pick from "lodash.pick";
import JEditor from "@/components/JEditor";
export default {
  name: "ImportModal",
  components: { JEditor },
  data() {
    return {
      title: "添加文书",
      visible: false,
      roleDisabled: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        pName: {
          rules: [
            { required: true, message: "请输入产品名称!" },
            {
              min: 2,
              max: 30,
              message: "长度在 2 到 30 个字符",
              trigger: "blur"
            }
          ]
        },
        roleCode: {
          rules: [
            { required: true, message: "请输入角色编码!" },
            {
              min: 0,
              max: 64,
              message: "长度不超过 64 个字符",
              trigger: "blur"
            }
          ]
        }
      }
    };
  },
  created() {},
  methods: {
    add() {
      this.edit({});
      this.title = "添加文书";
    },
    edit(record) {
      this.form.resetFields();
      this.model = Object.assign({}, record);
      this.visible = true;
      this.title = "编辑文书";
      //编辑页面禁止修改角色编码
      // if (this.model.id) {
      //   this.roleDisabled = true;
      // } else {
      //   this.roleDisabled = false;
      // }
      this.$nextTick(() => {
        this.form
          .setFieldsValue
          //   pick(this.model, "roleName", "description", "roleCode")
          ();
      });
    },
    close() {
      this.$emit("close");
      this.visible = false;
    },
    handleOk() {
      const that = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true;
          let formData = Object.assign(this.model, values);
          let obj;
          console.log(formData);
        }
      });
    },
    handleCancel() {
      this.close();
    }
  }
};
</script>

<style scoped></style>
