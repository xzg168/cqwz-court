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
            v-decorator="['document_name', validatorRules.document_name]"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文书描述"
        >
          <a-textarea style="width: 100%" v-decorator="['document_describe']">
          </a-textarea>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="文书内容"
        >
          <JEditor
            v-decorator="['document_content']"
            isTemplate
            triggerChange
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
          <a-switch v-decorator="['is_type', { valuePropName: 'checked' }]" />
        </a-form-item>
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
        document_name: {
          rules: [
            { required: true, message: "请输入文书名称!" },
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
      this.title = "添加文书";
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
      this.title = "编辑文书";
      this.confirmLoading = false;
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
            this.$http
              .post("/document/maintain/update", { ...formData })
              .then(res => {
                if (res.code === 200) {
                  this.$message.success(res.message);
                  this.visible = false;
                  this.$emit("ok");
                }
              });
          } else {
            this.$http
              .post("/document/maintain/add", { ...formData })
              .then(res => {
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
