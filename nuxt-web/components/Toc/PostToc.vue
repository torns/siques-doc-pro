<template>
  <div class="sidebar  d-none d-sm-flex" style="z-index:20">
    <div id="toc">
      <nav id="doc-toc" v-scroll-spy-active class="nav d-flex flex-column"></nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class TocBar extends Vue {
  @Prop({
    type: String,
    default: '',
    required: false
  })
  title

  mounted() {}
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  right: 35px;
  top: 35%;
}
#toc .title-active {
  color: #1bbc8c !important;
}

#toc a {
  color: #9e9e9e;
  font-weight: 600;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding: 2px 0;
}
</style>
