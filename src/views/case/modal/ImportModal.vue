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
          label="选择产品"
        >
          <a-select
            default-value="lucy"
            style="width: 100%"
            v-decorator="['roleName', validatorRules.roleName]"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上传附件"
        >
          <a-upload
            v-decorator.trim="['file']"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <a-button> <a-icon type="upload" /> 选择上传附件 </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
// import pick from "lodash.pick";

export default {
  name: "ImportModal",
  data() {
    return {
      title: "导入",
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
        roleName: {
          rules: [
            { required: true, message: "请输入角色名称!" },
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
  created() {

  },
  methods: {
    add() {
      this.edit({});
      console.log("111111");
    },
    edit(record) {
      this.form.resetFields();
      this.model = Object.assign({}, record);
      this.visible = true;

      //编辑页面禁止修改角色编码
      if (this.model.id) {
        this.roleDisabled = true;
      } else {
        this.roleDisabled = false;
      }
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
