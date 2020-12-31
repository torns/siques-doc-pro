<template>
  <div id="sidebar" class="sidebar   hidden-md-and-down">
    <div id="toc">
      <nav id="doc-toc" v-scroll-spy-active class="nav d-flex flex-column"></nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class TocBar extends Vue {
  mounted() {}
}
</script>

<style lang="scss"></style>
