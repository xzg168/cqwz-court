<template>
  <div class="tinymce-editor">
    <editor
      v-if="!reloading"
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
    >
    </editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/print";
import "tinymce/icons/default";
export default {
  components: {
    Editor
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: String,
      required: false
    },
    isTemplate: {
      type: Boolean,
      default: false,
      required: false
    },
    triggerChange: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        "lists image link media table textcolor wordcount contextmenu fullscreen"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link unlink image media table | removeformat | fullscreen",
      branding: false
    }
  },
  data() {
    return {
      // 初始化配置
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/lightgray",
        height: 300,
        plugins: this.isTemplate
          ? "lists table textcolor wordcount contextmenu print fullscreen"
          : this.plugins,
        toolbar: this.isTemplate
          ? "undo redo | fontsizeselect fontselect  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists table | removeformat | print |  fullscreen"
          : this.toolbar,
        branding: false,
        menubar: false,
        toolbar_drawer: false,
        content_css: `/tinymce/editorCustom.css`,
        fontsize_formats:
          "二号=29.3px 小二=24px 三号=21.3px 小三=20px 四号=18.6px 小四=16px",
        font_formats:
          "宋体=SimSun;黑体=SimHei;仿宋=FangSong;方正小标宋体=FZXiaoBiaoSong-B05S;微软雅黑=Microsoft YaHei;"
        // images_upload_handler: (blobInfo, success) => {
        //   let formData = new FormData()
        //   formData.append('file', blobInfo.blob(), blobInfo.filename())
        //   formData.append('biz', 'jeditor')
        //   formData.append('jeditor', '1')
        //   uploadAction(window._CONFIG['domianURL'] + '/sys/common/upload', formData).then((res) => {
        //     if (res.success) {
        //       if (res.message == 'local') {
        //         const img = 'data:image/jpeg;base64,' + blobInfo.base64()
        //         success(img)
        //       } else {
        //         let img = getFileAccessHttpUrl(res.message)
        //         success(img)
        //       }
        //     }
        //   })
        // }
      },
      myValue: this.value,
      reloading: false
    };
  },
  mounted() {},
  methods: {
    reload() {
      this.reloading = true;
      this.$nextTick(() => (this.reloading = false));
    },

    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue == null ? "" : newValue;
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit("change", newValue);
      } else {
        this.$emit("input", newValue);
      }
    }
  }
};
</script>
<style scoped></style>
