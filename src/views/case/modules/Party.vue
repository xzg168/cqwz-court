<!--  -->
<template>
  <div class="">
    <!-- 原告 -->
    <div v-for="(item,index1) in ygData" :key="index1+100">
      <h3 class="dsrBj">原告{{ SectionToChinese(index1+1) }}</h3>
      <NaturalOrPerson :item="item"/>
    </div>
    <!-- 被告 -->
    <div v-for="(item,index2) in bgData" :key="index2">
      <h3 class="dsrBj">被告{{ SectionToChinese(index2+1) }}</h3>
      <NaturalOrPerson :item="item" :isBg="true"/>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
import NaturalOrPerson from '../components/NaturalOrPerson'
import { SectionToChinese } from '@/utils/util'
export default {
// import引入的组件需要注入到对象中才能使用
components: { NaturalOrPerson },
data() {
// 这里存放数据
return {
  bgData: [],
  ygData: []
}
},
// 监听属性 类似于data概念
computed: {},
// 监控data中的数据变化
watch: {},
// 方法集合
methods: {
  SectionToChinese,
  getInfo(id) {
    getAction('/dsr/spDsr/queryByajid', { ajid: id }).then((res) => {
      console.log('当事人', res)
      if (res.success) {
       this.$nextTick(() => {
          this.bgData = res.result.bg
          this.ygData = res.result.yg
       })
      }
    })
  }
},
// 生命周期 - 创建完成（可以访问当前this实例）
created() {

},
// 生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, // 生命周期 - 创建之前
beforeMount() {}, // 生命周期 - 挂载之前
beforeUpdate() {}, // 生命周期 - 更新之前
updated() {}, // 生命周期 - 更新之后
beforeDestroy() {}, // 生命周期 - 销毁之前
destroyed() {}, // 生命周期 - 销毁完成
activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='css' scoped>
/* @import url(); 引入公共css类*/
.dsrBj{
  font-size: 18px;
  font-weight: bold;
  border-left: 5px solid #e4393c;
  padding-left: 10px;
  margin: 10px 0;
}
</style>
