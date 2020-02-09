<template>
  <div class="h-100">
    <div class="d-flex jc-between ai-center">
      <div class="fs-md">推荐关注</div>
      <el-button type="text" @click="fetchRecomendFollow">换一批</el-button>
    </div>
    <div class="body">
      <div
        v-for="data in datas[0]"
        :key="data.id"
        class="border-solid border-radius mb-3 "
      >
        <div class="d-flex jc-between py-4 px-3">
          <div>
            <el-tag class="point" size="mini" type="primary hover-3">{{
              data.name
            }}</el-tag>
            <div class="fs-xm text-gray">{{ data.interest }}关注</div>
          </div>
          <div>
            <el-button @click="follow" size="mini" type="plain">关注</el-button>
          </div>
        </div>
      </div>

      <div
        v-for="data in datas[1]"
        :key="data.id"
        class="border-solid border-radius mb-3 "
      >
        <div class="d-flex jc-between py-4 px-3">
          <div class="d-flex ai-center">
            <el-avatar :size="35" :src="data.avator.url">
              <img src="~/static/avator.jpg" />
            </el-avatar>
            <div class="pl-2 text-primary fs-xm point">
              <router-link :to="`/u/${data.id}`" tag="div">
                {{ data.name }}</router-link
              >
            </div>
          </div>
          <div>
            <el-button @click="follow" size="mini" type="plain">关注</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class FollowSideBar extends Vue {
  @Prop()
  id: any
  datas: any = []
  mounted() {
    setTimeout(() => {
      this.fetchRecomendFollow()
    }, 200)
  }

  async fetchRecomendFollow() {
    if (this.id) {
      const res = await this.$http.get(`users/${this.id}/recomend`)
      this.datas = res.data
    } else {
      const res = await this.$http.get(
        `users/${this.$store.state.auth.user.id}/recomend`
      )
      this.datas = res.data
    }
  }
}
</script>

<style lang="scss"></style>
