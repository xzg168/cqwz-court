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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="账号">
          <a-input v-decorator="['zName', validatorRules.zName]"> </a-input>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成员姓名"
        >
          <a-input v-decorator="['cName']" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮箱地址"
          extra="默认密码为“123456”，登录后可修改密码"
        >
          <a-input v-decorator="['yName']" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注信息"
        >
          <a-textarea v-decorator="['cName']" />
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
      title: "账号",
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
        zName: {
          rules: [
            { required: true, message: "请输入账号!" },
            {
              min: 2,
              max: 30,
              message: "长度在 2 到 30 个字符",
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
