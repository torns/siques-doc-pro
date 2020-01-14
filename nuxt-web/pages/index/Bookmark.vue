<template>
  <div class="container h-100">
    <el-row type="flex" class="pt-4">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="我创建的收藏夹" name="first">
            <el-button type="info" size="mini" @click="dialogFormVisible = true"
              >创建收藏夹</el-button
            >
            <el-divider></el-divider>
            <div>{{}}</div>
          </el-tab-pane>
          <el-tab-pane label="我关注的收藏夹" name="second"
            >关注的收藏夹</el-tab-pane
          >
        </el-tabs>

        <el-dialog
          width="500px"
          title="创建收藏夹"
          :visible.sync="dialogFormVisible"
          class="border-radius"
        >
          <div>
            <el-form :model="bookmark">
              <el-form-item
                style="font-weight:600"
                label="名称*"
                label-position="top"
              >
                <el-input
                  placeholder="最多输入32个字"
                  v-model="bookmark.title"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                style="font-weight:600"
                label="描述"
                label-position="top"
              >
                <el-input
                  placeholder="最多输入256个字"
                  v-model="bookmark.description"
                  type="textarea"
                  :rows="2"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="text-right pt-5">
              <el-button size="mini" @click="dialogFormVisible = false"
                >取 消</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="dialogFormVisible = false"
                >确 定</el-button
              >
            </div>
          </div>
        </el-dialog>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="6"
        :xl="6"
        class="hidden-md-and-down pl-2"
        >123</el-col
      >
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Bookmark extends Vue {
  @Prop()
  name: string
  activeName = 'first'
  dialogFormVisible = false
  bookmark = {}

  handleClick(e: any) {}
}
</script>

<style lang="scss">
.el-dialog__body {
  padding-bottom: 10px;
}
.el-form {
  width: 100% !important;
  margin: 0 auto;
}
</style>
