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
          <a-input
            v-decorator="['account', validatorRules.account]"
            :disabled="isDisabled"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码"
          extra="默认密码为“123456”，登录后可修改密码"
        >
          <a-input v-decorator="['password', { initialValue: 123456 }]">
          </a-input>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="成员姓名"
        >
          <a-input v-decorator="['name']" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮箱地址"
        >
          <a-input v-decorator="['mailbox']" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注信息"
        >
          <a-textarea v-decorator="['bz']" />
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
      isDisabled: false,
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
        account: {
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
      this.confirmLoading = false;
      //编辑页面禁止修改角色编码
      if (this.model.id) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(record);
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
          console.log(formData);
          if (this.isDisabled) {
            this.$http.post("/admin/update", { ...formData }).then(res => {
              if (res.code === 200) {
                this.confirmLoading = false;
                this.visible = false;
                this.$emit("ok");
              }
            });
          } else {
            this.$http.post("/admin/add", { ...formData }).then(res => {
              if (res.code === 200) {
                this.confirmLoading = false;
                this.visible = false;
                this.$emit("ok");
              }
            });
          }
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
