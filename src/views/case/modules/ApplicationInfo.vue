<!--  -->
<template>
  <div>
    <h3 class="fieldDescription">请求信息</h3>
    <a-descriptions title="" :column="4">
      <a-descriptions-item label="案由">
        <!-- {{ filterDictTextByCache('court_ay',applicationData.ay) }} -->
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
    <dynamic-descriptions
      :optionsData="optionsData"
      ref="dynamicElement"
      v-if="optionsData && optionsData.length > 0"
    />
    <br v-else />
    <h3 class="fieldDescription">原告信息</h3>
    <!-- 原告 -->
    <div v-for="(item, index1) in ygData" :key="index1 + 100">
      <!-- <h3 class="dsrBj">原告{{ SectionToChinese(index1 + 1) }}</h3> -->
      <NaturalOrPerson :item="item" />
    </div>
    <h3 class="fieldDescription">代理人信息</h3>
    <a-descriptions title="" :column="2" class="verticallyCentered">
      <a-descriptions-item label="代理人一姓名">
        <!-- {{ item.firstDlr && item.firstDlr.dlrxm }} -->
      </a-descriptions-item>
      <a-descriptions-item label="代理人一委托权限">
        <!-- {{ filterDictTextByCache("wtqx", item.firstDlr && item.firstDlr.wtqx) }} -->
      </a-descriptions-item>
      <a-descriptions-item label="代理人二姓名">
        <!-- {{ item.sedDlr && item.sedDlr.dlrxm }} -->
      </a-descriptions-item>
      <a-descriptions-item label="代理人二委托权限">
        <!-- {{ filterDictTextByCache("wtqx", item.sedDlr && item.sedDlr.wtqx) }} -->
      </a-descriptions-item>
      <a-descriptions-item label="证件资料" :span="2">
        <!-- <div
          class="certificateContainer"
          :key="evidenceItem.id"
          v-for="evidenceItem in item.firstDlr && item.firstDlr.identityFiles"
        >
          <a-card style="width: 200px" :bordered="false" size="small">
            <img
              slot="cover"
              alt="example"
              style="height:120px"
              preview="agent"
              :preview-text="
                filterDictTextByCache('file_type', evidenceItem.type)
              " 
              :src="
                `${downLoadUrl}/${evidenceItem.filePath}?id=${evidenceItem.id}`
              "
            />
            <a-card-meta>
              <template slot="title">
                <div style="text-align:center">
                  {{ filterDictTextByCache("file_type", evidenceItem.type) }}
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </div>-->
      </a-descriptions-item>
    </a-descriptions>
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
      <a
        @click="
          previewFile(
            applicationData.indictmentDoc.filePath,
            applicationData.indictmentDoc.fileName,
            applicationData.indictmentDoc.id
          )
        "
        >{{ applicationData.indictmentDoc.fileName }}</a
      >
    </div>
  </div>
</template>

<script>
import DynamicDescriptions from "../components/DynamicDescriptions";
import NaturalOrPerson from "../components/NaturalOrPerson";
import { SectionToChinese } from "@/utils/util";
import EvidenceFiles from "../components/EvidenceFiles";
export default {
  components: { DynamicDescriptions, NaturalOrPerson, EvidenceFiles },
  data() {
    // 这里存放数据
    return {
      // downLoadUrl: window._CONFIG["domianURL"],
      applicationData: {
        indictmentDoc: {},
        evidences: []
      },
      bgData: [{ dsrlx: "1" }],
      ygData: [{ dsrlx: "2" }],
      optionsData: []
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    SectionToChinese,
    // filterDictTextByCache,
    // downloadFile,
    // previewFile(filePath, fileName, params) {
    //   this.$refs.pdfRef.add(filePath, fileName, params)
    // },
    previewFile(filePath, fileName, fileId) {
      // this.$refs.pdfRef.add(filePath, fileName, params)
      const query = { filePath, fileName, fileId };
      let routeData = this.$router.resolve({
        name: "pdf",
        query: query
      });
      window.open(routeData.href, "_blank");
    },
    getInfo(id) {
      // getAction(`/ajjbxx/spAjjbxx/queryById`, { id: id }).then(res => {
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
  created() {
    // setTimeout(() => {
    //   this.setData()
    // }, 1000)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
