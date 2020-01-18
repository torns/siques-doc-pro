<template>
  <div>
    <el-popover v-model="visible" placement="top" width="160">
      <!-- // 连接需要修改 -->
      <social-sharing
        :url="`http://localhost:3000/p/${description.id}`"
        :title="description.title"
        :description="description.alias"
        :quote="description.alias"
        hashtags="vuejs,javascript,framework"
        twitter-user="shuxie"
        inline-template
      >
        <div class="fs-lg d-flex flex-column">
          <div class="hover-2  w-100 text-center point py-2">
            <network network="twitter">
              <font-awesome-icon :icon="['fab', 'twitter']" />
              Twitter
            </network>
          </div>
          <div class="hover-2  w-100 text-center point py-2">
            <network network="weibo">
              <font-awesome-icon :icon="['fab', 'weibo']" /> 新浪微博
            </network>
          </div>
        </div>
      </social-sharing>

      <slot slot="reference"></slot>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class Share extends Vue {
  @Prop()
  description: any
  visible = false
}
</script>

<style lang="scss"></style>
