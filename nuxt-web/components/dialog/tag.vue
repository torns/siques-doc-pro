<template>
  <div>
    <el-popover @hide="hide" v-model="visible" placement="bottom" width="450">
      <div class="px-4 py-2" style="height:300px;">
        <div class="d-flex jc-between  gray-1 fs-sm " style="font-weight:600;">
          <div>还可添加{{ taglen }}个标签</div>
          <div>找不到标签?</div>
        </div>
        <el-input
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
        >
        </el-input>

        <div v-if="state !== ''">
          <li
            v-for="(item, index) in results"
            v-bind:key="index"
            v-bind:data-index="index"
            @click="handleSelect(item.name, item.id)"
            class="py-2 my-1 text-dark fs-md hover-2"
            style="margin-left: -24px;margin-right: -24px;"
          >
            <div class="px-4">
              {{ item.name }}
            </div>
          </li>
        </div>

        <div v-else>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="(tags, index) in taglist"
              :key="index"
              :label="tags.name"
              :name="tags.name"
              class="d-flex flex-wrap"
            >
              <div v-for="(tag, index) in tags.tags" :key="index">
                <ul>
                  <li
                    @click="addTag(tag.name, tag.id)"
                    class="bg-3  px-2 mx-1 py-1 my-2 hover-3"
                  >
                    {{ tag.name }}
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <slot slot="reference"></slot>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
// import { taglist } from '../../data.js'
@Component({})
export default class Tag extends Vue {
  taglen: number = null
  visible = false
  taglist: any = ''
  tags: any = []
  activeName = '开发语言'
  tagsearch = ''
  state = ''
  results: any = ''
  timeout: any

  mounted() {
    this.fetchTags()
  }
  async fetchTags() {
    const result = await this.$http.get('/tags')
    this.taglist = result.data

    let tags = []
    this.taglist.map((e) => {
      tags = tags.concat(e.tags)
    })
    this.tags = tags
  }

  //   get alltags() {

  //     return data
  //   }

  @Watch('state')
  onStateChanged(newvalue, oldvalue) {
    const taglist = this.tags
    const results = newvalue
      ? taglist.filter(this.createStateFilter(newvalue))
      : ''

    this.results = results
  }
  querySearchAsync(queryString) {
    const taglist = this.tags
    const results = queryString
      ? taglist.filter(this.createStateFilter(queryString))
      : taglist

    this.results = results
  }
  createStateFilter(queryString) {
    return (state) => {
      return state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
  }
  handleSelect(name, id) {
    this.$emit('add', name, id)
  }

  handleClick(tab, event) {
    console.log(tab, event)
  }
  hide() {
    this.state = ''
  }

  addTag(name, id) {
    this.$emit('add', name, id)
  }
}
</script>

<style lang="scss">
.el-tabs__item {
  padding: 0 4px !important;
}
</style>
