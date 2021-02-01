<!--  -->
<template>
  <div class="">
    <a-row>
      <div v-for="(item,index) in optionsData" :key="index">
        <div v-if="item.type==='div'">
          <a-col :span="24">
            <h3 class="descriptionsTitle">{{ item.children[0] }}</h3>
          </a-col>
        </div>
        <div v-else>
          <a-col :span="item.col.span">
            <p>
              <span class="descriptionsItemLabel">{{ item.title }}</span>
              <span class="descriptionsItemContent" v-if="item.type==='DatePicker'">{{ parseTime(dataResources[item.field],'{y}-{m}-{d}') }}</span>
              <span class="descriptionsItemContent" v-else>{{ dataResources[item.field] }}</span>
            </p>
          </a-col>
        </div>
      </div>
    </a-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { parseTime } from '@/utils/util'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // eslint-disable-next-line vue/require-prop-types
  props: ['optionsData'],
  data() {
  // 这里存放数据
  return {
    dataResources: {}
  }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    parseTime
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
  }
</script>
<style lang='css' scoped>
/* @import url(); 引入公共css类*/
	.descriptionsTitle{
		margin-bottom: 20px;
		color: rgba(0, 0, 0, 0.85);
		font-weight: bold;
		font-size: 16px;
		line-height: 1.5;
	}
	.descriptionsItemLabel{
		color: rgba(0, 0, 0, 0.85);
		font-weight: normal;
		font-size: 14px;
		line-height: 1.5;
		display: inline-block;
	}
	.descriptionsItemContent{
		color: rgba(0, 0, 0, 0.65);
		font-size: 14px;
		line-height: 1.5;
		display: inline-block;
	}
	.descriptionsItemLabel::after {
		position: relative;
		top: -0.5px;
		margin: 0 8px 0 2px;
		content: ':';
	}
</style>
