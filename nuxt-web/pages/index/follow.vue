<template>
  <div class="contanier h-100">
    <el-row
      :gutter="20"
      type="flex"
      style="margin-left: -5px;margin-right: -5px;"
      class="h-100 pt-4 text-right"
    >
      <el-col
        :xs="0"
        :sm="4"
        :md="5"
        :lg="4"
        :xl="4"
        class="hidden-sm-and-down"
      >
        <ul>
          <li v-for="(follow, id) in follows" :key="id">{{ follow.name }}</li>
        </ul>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14"></el-col>
      <el-col
        :xs="0"
        :sm="6"
        :md="6"
        :lg="6"
        :xl="6"
        class="hidden-sm-and-down"
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Follow extends Vue {
  follows = ''

  mounted() {
    this.fetchfollows()
  }
  async fetchfollows() {
    const res = await this.$http.get('users/1/follows')
    this.follows = res.data
  }
}
</script>

<style lang="scss"></style>
