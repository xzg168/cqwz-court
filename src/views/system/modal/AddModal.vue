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
          label="产品名称"
        >
          <a-input
            style="width: 100%"
            v-decorator="['product_name', validatorRules.product_name]"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联文书"
        >
          <a-select
            default-value="lucy"
            style="width: 100%"
            v-decorator="['document_ids', validatorRules.gName]"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
              Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
              yiminghe
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否启用"
        >
          <a-switch v-decorator="['is_type', { valuePropName: 'checked' }]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="描述">
          <a-textarea v-decorator="['product_describe']" />
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
      title: "添加产品",
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
        product_name: {
          rules: [
            { required: true, message: "请输入产品名称!" },
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
      this.title = "添加产品";
    },
    edit(record) {
      this.form.resetFields();
      if (record.is_type === 1) {
        record.is_type = "checked";
      } else {
        record.is_type = false;
      }
      this.model = Object.assign({}, record);
      this.visible = true;
      this.title = "编辑产品";
      //编辑页面禁止修改角色编码
      if (this.model.id) {
        this.roleDisabled = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(this.model);
        });
      } else {
        this.roleDisabled = false;
        this.$nextTick(() => {
          this.form.setFieldsValue({ is_type: "checked" });
        });
      }
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
          if (formData.is_type) {
            formData.is_type = 1;
          } else {
            formData.is_type = 2;
          }
          console.log(formData);
          if (this.roleDisabled) {
            this.$http.post("/product/update", { ...formData }).then(res => {
              if (res.code === 200) {
                this.$message.success(res.message);
                this.visible = false;
                this.$emit("ok");
              }
            });
          } else {
            this.$http.post("/product/add", { ...formData }).then(res => {
              if (res.code === 200) {
                this.$message.success(res.message);
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
