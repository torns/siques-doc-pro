<template>
  <div class="searchPage ">
    <div style="min-height:80px" class="bg-light px-2">
      <v-container>
        <v-row no-gutters style="padding-top: 85px;">
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
            <v-form ref="form" @submit.native.prevent v-model="valid" lazy-validation>
              <v-text-field
                :counter="40"
                v-model="pagination.queryStr"
                :rules="searchRules"
                @keyup.enter.native="initSearch"
                label="请输入"
                placeholder="输入关键字搜索"
                hide-details="auto"
              ></v-text-field>
            </v-form>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4" class="pt-3 pl-3">
            <v-btn @click="initSearch" block>搜索</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container style="min-height:50vh">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
          <div class="searcData" style="min-height:300px">
            <div>
              <div class="text-gray-1  ">找到约 {{ pagination.total }} 条结果</div>

              <div v-if="docs.length > 0">
                <div v-for="doc in docs" :key="doc.id" class="text-gray-1">
                  <div class="point pt-4">
                    <router-link :to="`/doc/${doc.id}`" v-html="doc.title" tag="a"> </router-link>
                  </div>
                  <div v-html="doc.body" class="py-2 fs-xm "></div>
                </div>
              </div>
              <div v-else>
                <v-skeleton-loader type="article"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
                <v-skeleton-loader type="article"></v-skeleton-loader>
              </div>
            </div>
          </div>
          <v-btn v-if="hasMore" @click="moreSearch" text class="mt-4" block color="primary">点击查看更多</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { getSearchResult } from '@/api/search'
@Component({
  components: {}
})
export default class searchIndex extends Vue {
  async asyncData({ params }: any) {
    if (params.key) {
      const res = await getSearchResult({ pageNum: 1, pageSize: 10, queryStr: params.key })
      const pagination = {
        pageNum: 1,
        pageSize: 10,
        queryStr: params.key,
        total: res.datas.total
      }
      return {
        docs: res.datas.records,
        pagination
      }
    }
    return {}
  }
  valid = false
  head() {
    return {
      title: '来愉快的搜索吧-思趣网'
    }
  }

  docs: any = []
  $refs: any
  pagination = {
    pageNum: 1,
    pageSize: 10,
    queryStr: '',
    total: 0
  }

  get hasMore() {
    return this.pagination.total - this.pagination.pageNum * this.pagination.pageSize > 0
  }

  async initSearch() {
    const docs = await this.doSearch(1, this.pagination.pageSize, this.pagination.queryStr)
    this.docs = docs
  }

  async moreSearch() {
    const docs = await this.doSearch(++this.pagination.pageNum, this.pagination.pageSize, this.pagination.queryStr)
    this.docs = this.docs.concat(docs)
  }

  async doSearch(pageNum, pageSize, queryStr) {
    const valid = this.$refs.form.validate()
    if (valid) {
      const loading = this.$loading({ text: '加载中' })
      const res = await getSearchResult({
        pageNum,
        pageSize,
        queryStr
      })

      this.pagination.total = res.datas.total
      loading.close()
      return res.datas.records
    }
  }

  searchRules = [(v) => !!v || '搜索不能为空哦', (v) => (v && v.length >= 2) || '再写一点吧']
}
</script>

<style lang="scss">
.searchPage .v-tabs__header {
  margin: 0 !important;
}
</style>
