<template>
  <div class="border-radius">
    <div class="d-flex jc-between header bg-light-1 border-solid py-1 px-3">
      <div style="line-height:28px">高分内容</div>
      <div>
        <el-radio-group v-model="radio" size="mini">
          <el-radio-button label="概览"></el-radio-button>
          <el-radio-button label="提问"></el-radio-button>
          <el-radio-button label="回答"></el-radio-button>
          <el-radio-button label="文章"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="body border-solid">
      <div style="height:200px" class="d-flex ai-center">
        <div
          class="d-flex bg-light-1 ai-center jc-center border-dash border-radius"
          style="height:80%;width:80%;margin:0 auto;"
        >
          (ﾟ∀ﾟ ) 暂时没有任何数据
        </div>
      </div>
    </div>

    <div
      class="mt-4 d-flex jc-between header bg-light-1 border-solid py-1 px-3"
    >
      <div style="line-height:28px">个人动态</div>
    </div>
    <div class="body border-solid">
      <div style="min-height:200px" class="d-flex">
        <div
          v-for="act in action"
          :key="act.id"
          style="height:80px;width: -webkit-fill-available;"
          class="d-flex flex-column border-bottom mx-3 my-2"
        >
          <div v-if="act.type === 'followque'" class="text-gray fs-xm ">
            <span class="">{{ act.from_uid.name }}</span> 关注了问题·
            {{ $dayjs(act.created).format('M月D日') }}
          </div>
          <div class="text-primary py-1 hoverlink point">
            <router-link :to="`/q/${act.to_Post.id}`" tag="div">
              {{ act.to_Post.title }}</router-link
            >
          </div>
          <div class="d-flex ">
            <div class="fs-xm text-gray pr-3">
              关注 {{ act.to_Post.concerned }}
            </div>
            <div class="fs-xm text-gray">收藏 {{ act.to_Post.bookmarked }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class MyHomepage extends Vue {
  @Prop()
  id: any
  radio = []
  action: any = ''

  mounted() {
    this.fetchUserAction()
  }

  async fetchUserAction() {
    if (this.id) {
      const res = await this.$http.get(`/actions/${this.id}`)
      this.action = res.data
    } else {
      const res = await this.$http.get(
        `/actions/${this.$store.state.auth.user.id}`
      )
      this.action = res.data
    }
  }
}
</script>

<style lang="scss"></style>
