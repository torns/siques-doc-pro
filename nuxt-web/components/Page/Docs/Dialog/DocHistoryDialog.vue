<template>
  <v-dialog v-model="visible" scrollable fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-show="selectedHistoryDoc.id"
          >{{ selectedDoc.title }}:
          {{ $dayjs(selectedHistoryDoc.updated).format('YYYY-MM-DD HH:mm') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-toolbar>
        <v-toolbar-title class="pa-3">
          <v-switch v-if="selectedHistoryDoc.id" v-model="showDiff" label="与当前版本比较"></v-switch
        ></v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items v-show="showDiff">
          <v-chip class="ma-2" close color="red" text-color="white">
            删除的内容
          </v-chip>
          <v-chip class="ma-2" close color="green" text-color="white">
            新增的内容
          </v-chip>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <CkEditor ref="editor" style="min-height:1000px" :read-only="true"></CkEditor>
      </v-card-text>

      <v-navigation-drawer
        v-model="model"
        style="top:112px;bottom:0;height: auto;"
        width="280"
        stateless
        absolute
        right
      >
        <v-list dense>
          <v-subheader>历史记录</v-subheader>
          <v-timeline dense>
            <template v-for="(doc, index) in historyList">
              <v-timeline-item
                :key="index"
                elevation="5"
                :color="selectedHistoryDoc.versionId == doc.versionId ? `red` : 'blue'"
                small
              >
                <v-sheet class="pointer" @click="getDocHistoryDetail(doc.versionId, index)">
                  <span class="title">
                    {{ $dayjs(doc.updated).format('YYYY-MM-DD HH:mm') }}
                  </span>
                </v-sheet>
              </v-timeline-item>
            </template>
          </v-timeline>
        </v-list>
        <template v-slot:append>
          <div class="pa-2 mb-3">
            <v-btn color="purple" dark block @click="retrack">
              恢复版本
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { getDocHistory, getDocHistoryDetail, retrack } from '@/api/history'
import { mapGetters } from 'vuex'
import diff from '@/plugins/diff'
@Component({
  computed: mapGetters(['selectedDoc'])
})
export default class DocHistoryDialog extends Vue {
  visible = false
  selectedDoc
  selectedHistoryDoc: any = {}

  historyDoc = ''
  model = true
  showDiff = false
  historyList = []

  mounted() {
    if (this.selectedDoc.id) {
      this.getHistoryList()
    }
  }

  @Watch('visible')
  isVisibleChanged(newval, oldval) {
    if (newval) {
      const vm = this
      setTimeout(() => {
        vm.model = true
      }, 0)
    }
  }

  @Watch('showDiff')
  isDiffChanged(newval, oldval) {
    if (newval) {
      const str = this.handleChnage(diff(this.historyDoc, this.selectedDoc.body))
      // console.log(str)
      this.$refs.editor.setContent(str)
    } else {
      this.$refs.editor.setContent(this.historyDoc)
    }
  }

  @Watch('selectedDoc')
  isDocChanged(newval, oldval) {
    if (newval.id) {
      this.historyDoc = ''
      this.showDiff = false
      this.selectedHistoryDoc = {}
      this.getHistoryList()
    }
  }

  $refs: any
  async getDocHistoryDetail(versionId, index) {
    this.showDiff = false
    const res = await getDocHistoryDetail(this.selectedDoc.id, { versionId })
    this.selectedHistoryDoc = this.historyList[index]

    this.historyDoc = res.datas.body

    this.$refs.editor.setContent(this.historyDoc)
    this.showDiff = true
  }

  handleChnage(changes) {
    let str = ''
    changes.map((e) => {
      if (e.added) {
        str = str + '<span style="background-color: #4caf50; color: white;">' + e.value + '</span>'
      } else if (e.removed) {
        str = str + '<span style="background-color: #f44336; color: white;">' + e.value + '</span>'
      } else {
        str = str + e.value
      }
    })
    return str
  }

  async getHistoryList() {
    const res = await getDocHistory({ docId: this.selectedDoc.id })
    this.historyList = res.datas
  }

  retrack() {
    if (this.selectedHistoryDoc.id) {
      this.$confirm({ text: '确定要恢复该版本' })
        .then(async () => {
          const res = await retrack({ versionId: this.selectedHistoryDoc.versionId })
          this.$store.commit('SET_DOC', {})
          if (res.respCode === 1) {
            this.$notify({ text: '恢复成功' })
          }
          this.visible = false
        })
        .catch(() => {})
    } else {
      this.$notify({ text: '请先选择版本' })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>
