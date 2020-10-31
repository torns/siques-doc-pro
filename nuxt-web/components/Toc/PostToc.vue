<template>
  <div class="sidebar">
    <div id="toc">
      <div class=" py-3 " style="overflow-y: unset; min-height:100px;width:250px">
        <div>
          <!-- 滚动激活区域 -->
          <nav id="post-toc" v-scroll-spy-active class="nav d-flex flex-column"></nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class TocBar extends Vue {
  mounted() {}
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 250px;
  height: auto;
}
</style>
