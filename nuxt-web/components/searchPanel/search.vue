<template>
  <div class="d-flex flex-column pr-2">
    <div>
      <el-select
        size="mini"
        v-model="tagSearch"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="添加关注的标签"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Search extends Vue {
  @Prop()
  data = null
  results = null
  loading = false
  options = []
  list = []

  tagSearch = []

  remoteMethod(query) {
    if (query !== '') {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.options = this.data.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase()) === true
        })
      }, 200)
    } else {
      this.options = []
    }
  }
}
</script>

<style lang="scss"></style>
