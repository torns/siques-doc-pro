<template>
  <div class="d-flex flex-column pr-2">
    <div>
      <el-select
        v-model="tagSearch"
        :remote-method="remoteMethod"
        :loading="loading"
        size="mini"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="添加关注的标签"
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
  data: any
  results = null
  loading = false
  options = []
  list = []

  tagSearch = []

  remoteMethod(query: any) {
    if (query !== '') {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.options = this.data.filter((item: any) => {
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
