<template>
  <div class="searchPage ">
    <div style="min-height:80px" class="bg-light px-2">
      <v-container>
        <v-row no-gutters style="padding-top: 85px;">
          <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
            <v-text-field
              v-model="search"
              @keyup.enter.native="changeRoute"
              label="Main input"
              placeholder="输入关键字搜索"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4" class="pt-3 pl-3">
            <v-btn @click="changeRoute" block>搜索</v-btn>
          </v-col>
          <!-- <v-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <v-tabs v-model="searchType" stretch>
              <v-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.label" :name="tab.alias"> </v-tab-pane>
            </v-tabs>
          </v-col> -->
        </v-row>
      </v-container>
    </div>
    <v-container class="container pt-2 px-3" style="min-height:50vh">
      <v-row type="flex">
        <v-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="searcData" style="min-height:300px">
            <div v-if="docs != []">
              <div class="text-gray-1">找到约 {{ 0 }} 条结果</div>

              <div>
                <div v-for="doc in docs[0]" :key="doc.id" class="text-gray-1">
                  <div class="point pt-4">
                    <router-link :to="`${link(doc)}`" tag="a" class="hoverlink text-primary ">{{
                      doc.title
                    }}</router-link>
                  </div>
                  <div class="py-2 fs-xm ">{{ doc.alias }}</div>
                  <div class="d-flex fs-xm ">
                    <div class="pr-2">{{ doc.liked }} 投票</div>
                    <div>{{ doc.concerned }} 关注</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class Index extends Vue {
  asyncData({ params }: any) {
    return {}
  }

  head() {
    return {
      title: '来愉快的搜索吧-思趣网'
    }
  }

  search: any = ''
  docs = []
}
</script>

<style lang="scss">
.searchPage .v-tabs__header {
  margin: 0 !important;
}
</style>
