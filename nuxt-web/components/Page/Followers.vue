<template>
  <div>
    <div class="d-flex jc-between header border-bottom py-1 px-3">
      <div class="fs-xl pb-3">{{ id ? '他' : '我' }}的关注</div>
    </div>
    <div class="body">
      <div style="height:150px" class="mt-4 bg-light-1 border-dash">
        <div v-if="follows.follows == []" class="d-flex ai-center jc-center">
          <div class="text-gray">
            (ﾟ∀ﾟ ) 暂时没有任何数据
          </div>
        </div>
        <div v-else>
          <ul class="d-flex">
            <li
              @click="$router.push(`/u/${follow.id}`)"
              v-for="(follow, id) in follows.follows"
              :key="id"
              class="px-2 py-2"
            >
              <div class="avator d-flex flex-column ai-center">
                <el-avatar class="shadow-1">
                  <img
                    v-if="follow.avator[0]"
                    :src="follow.avator[0].url"
                    class="bg-white"
                  />
                  <img v-else src="~/static/avator.jpg" />
                </el-avatar>
                {{ follow.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Follows extends Vue {
  @Prop()
  id: any
  follows = ''
  mounted() {
    this.fetchfollows()
  }
  async fetchfollows() {
    if (this.id) {
      const res = await this.$http.get(`users/${this.id}/follows`)
      this.follows = res.data[0]
    } else {
      const res = await this.$http.get(
        `users/${this.$store.state.auth.user.id}/follows`
      )
      this.follows = res.data[0]
    }
  }
}
</script>

<style lang="scss"></style>
