<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="500px"
      title="创建收藏夹"
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
              v-model="bookmark.title"
              placeholder="最多输入32个字"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="font-weight:600"
            label="描述"
            label-position="top"
          >
            <el-input
              v-model="bookmark.description"
              :rows="2"
              placeholder="最多输入256个字"
              type="textarea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="text-right pt-5">
          <el-button @click="dialogFormVisible = false" size="mini"
            >取 消</el-button
          >
          <el-button @click="createBookmark" size="mini" type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class BookmarkDialog extends Vue {
  dialogFormVisible = false
  bookmark = {
    title: ''
  }
  async createBookmark() {
    if (this.bookmark.title) {
      await this.$http.post('/bookmarks', this.bookmark)
      this.$notify({
        title: '成功',
        type: 'success',
        message: '创建收藏夹成功'
      })
      this.dialogFormVisible = false
      this.bookmark = {}
      // 创建成功后去刷新父组件的数据
      this.$emit('refetch')
    } else {
      this.$notify({
        title: '错误',
        type: 'error',
        message: '标题不能为空'
      })
    }
  }
}
</script>

<style lang="scss"></style>
