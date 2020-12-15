<template>
  <v-app>
    <DocSystemBar></DocSystemBar>
    <DocAppBar></DocAppBar>
    <DocSideBar></DocSideBar>
    <BaseSnackBar></BaseSnackBar>
    <BaseLoading></BaseLoading>
    <keep-alive exclude="Archive,OverView">
      <router-view :key="$route.path"></router-view>
    </keep-alive>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class DocLayouts extends Vue {}
</script>

<style lang="scss" scoped></style>
