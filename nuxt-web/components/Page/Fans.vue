<template>
  <div>
    <div class="d-flex jc-between header border-bottom py-1 px-3">
      <div class="fs-xl pb-3">{{ id ? '他' : '我' }}的粉丝</div>
    </div>
    <div class="body">
      <div style="height:150px" class="mt-4 bg-light-1 border-dash">
        <div v-if="fans.user == []" class="d-flex ai-center jc-center">
          <div class="text-gray">
            (ﾟ∀ﾟ ) 暂时没有任何数据
          </div>
        </div>
        <div v-else>
          <ul class="d-flex">
            <li
              @click="$router.push(`/u/${fans.id}`)"
              v-for="(fans, id) in fans.user"
              :key="id"
              class="px-2 py-2"
            >
              <div class="avator d-flex flex-column ai-center">
                <el-avatar class="shadow-1 ">
                  <img
                    v-if="fans.avator[0]"
                    :src="fans.avator[0].url"
                    class="bg-white"
                  />
                  <img v-else src="~/static/avator.jpg" />
                </el-avatar>
                {{ fans.name }}
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
export default class Fans extends Vue {
  @Prop()
  id: String
  fans = ''
  mounted() {
    this.fetchfans()
  }
  async fetchfans() {
    // 如果有id说明是其他用户
    if (this.id) {
      const res = await this.$http.get(`users/${this.id}/whofollows`)
      this.fans = res.data
    } else {
      const res = await this.$http.get(
        `users/${this.$store.state.auth.user.id}/whofollows`
      )

      this.fans = res.data
    }
  }
}
</script>

<style lang="scss"></style>
