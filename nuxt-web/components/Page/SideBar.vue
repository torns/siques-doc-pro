<template>
  <div>
    <div class="fs-xm">
      <h4 class="pb-4">认证与成就</h4>
      <ul class="text-primary">
        <li class="pb-2">
          <i class="iconfont pr-3 icon-thumbs-up"></i>
          <span class="text-dark-1">获得 0 次点赞</span>
        </li>
        <li>
          <i class="iconfont pr-3 icon-follow1"></i>
          <span class="text-dark-1">获得 0 个关注</span>
        </li>
      </ul>
      <el-divider></el-divider>
      <div>
        <div class="d-flex jc-between">
          <div>
            <h4 class="title">擅长技能</h4>
          </div>
          <div v-if="!id" class="text-gray">
            <i class="iconfont icon-Write"></i>
            <el-button @click="show" type="text">编辑</el-button>
          </div>
        </div>
        <sq-tag
          ref="reference"
          @add="addTag"
          cunstom="sq-tag"
          positon="left-start"
        ></sq-tag>
        <div
          v-if="!isInputShow"
          class="bg-light-1 ai-center jc-center d-flex mt-3"
          style="height:110px;border:1px dashed #DDDDDD;"
        >
          <div v-if="originTag != ''" class="flex-wrap">
            <el-tag
              v-for="tag in originTag"
              :key="tag.id"
              @close="handleClose(tag)"
              class="mx-1 my-2"
              type="primary"
              size="small"
              :closable="id ? false : true"
              >{{ tag.name }}</el-tag
            >
          </div>
          <div v-else class="text-gray ai-baseline">
            (ﾟ∀ﾟ ) 暂时没有，

            <el-button v-if="!id" @click="show" type="text">立即添加</el-button>
          </div>
        </div>
        <div v-else>
          <el-select
            v-model="skillTag"
            multiple
            filterable
            placeholder="多个用逗号分隔，最多十个"
          >
            <el-option
              v-for="item in this.$refs.reference.tags"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <div class="text-left pt-3">
            <el-button @click="isInputShow = false" size="mini" type="plain"
              >取消</el-button
            >
            <el-button @click="storeUserTag" size="mini" type="primary"
              >保存</el-button
            >
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <div class="d-flex jc-between">
          <div>
            <h4 class="title">开源项目&著作</h4>
          </div>
          <div v-if="!id" class="text-gray">
            <i class="iconfont icon-Write"></i>
            <el-button @click="show" type="text">编辑</el-button>
          </div>
        </div>

        <div
          class="bg-light-1 ai-center jc-center d-flex mt-3"
          style="height:110px;border:1px dashed #DDDDDD;"
        >
          <div class="text-gray ai-baseline">
            (ﾟ∀ﾟ ) 暂时没有，
            <el-button v-if="!id" type="text">立即添加</el-button>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        注册于{{
          this.$dayjs(this.$store.state.userCreated).format(
            'YYYY-MM-DD & HH:MM'
          )
        }}分
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import tag from '~/components/dialog/tag.vue'
@Component({
  components: { 'sq-tag': tag }
})
export default class MySideBar extends Vue {
  @Prop()
  id: any
  tagmodel = []
  skillTag = []
  originTag = []
  isInputShow = false
  mounted() {
    this.fetchUserTag()
  }
  async fetchUserTag() {
    const res = await this.$http.get(
      `/users/${this.$store.state.auth.user.id}/skill`
    )
    this.originTag = res.data
    this.skillTag = res.data.map((e: any) => {
      return e.id
    })
  }

  show() {
    // this.$refs.reference.visible = !this.$refs.reference.visible
    this.isInputShow = !this.isInputShow
  }
  async storeUserTag() {
    // console.log(this.skillTag)

    await this.$http.post(
      `/users/${this.$store.state.auth.user.id}/skill`,
      this.skillTag
    )
    this.isInputShow = false
    this.fetchUserTag()
  }

  async handleClose(tag: any) {
    await this.$http.delete(`/users/${tag.id}/skill`)
    this.$notify({
      type: 'success',
      message: '删除标签成功',
      title: '成功'
    })
    this.fetchUserTag()
  }

  addTag(name: any, id: any) {}
}
</script>

<style lang="scss">
.el-divider--horizontal {
  margin: 25px 0;
}
.sq-tag {
  left: 61%;
  bottom: -6%;
}
</style>
