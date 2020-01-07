<template>
  <div>
    <div class="d-flex jc-between header border-bottom py-1 px-3">
      <div class="fs-xl pb-3">我的粉丝</div>
    </div>
    <div class="body">
      <div style="height:150px" class="mt-4 bg-light-1 border-dash">
        <div v-if="!fans.user" class="d-flex ai-center jc-center">
          <div class="text-gray">
            (ﾟ∀ﾟ )
            暂时没有任何数据
          </div>
        </div>
        <div v-else>
          <ul class="d-flex">
            <li
              @click="$router.push(`/u/${fans.id}`)"
              class="px-2 py-2"
              v-for="(fans,id) in fans.user"
              :key="id"
            >
              <div class="avator d-flex flex-column ai-center">
                <el-avatar :size="50" src="../assets/avator.jpg" class="shadow-1">
                  <img src="https://shuxie.oss-cn-hangzhou.aliyuncs.com/avator/avator.jpg" />
                </el-avatar>
                {{fans.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class MyFans extends Vue {
  @Prop()
  id: String;
  fans = "";
  mounted() {
    this.fetchfollows();
  }
  async fetchfollows() {
    console.log(this.id);
    if (this.id) {
      const res = await this.$http.get(`users/${this.id}/whofollows`);
      this.fans = res.data;
    } else {
      const res = await this.$http.get(
        `users/${this.$store.state.userId}/whofollows`
      );
      this.fans = res.data;
    }
  }
}
</script>

<style lang="scss">
</style>
