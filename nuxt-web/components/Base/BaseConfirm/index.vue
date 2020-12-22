<template>
  <v-dialog v-model="confirmMsg.modal" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">
        {{ confirmMsg.title }}
      </v-card-title>
      <v-card-text> {{ confirmMsg.text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cancle">
          取消
        </v-btn>
        <v-btn color="warning" text @click="confirm">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
@Component({
  computed: {
    confirmMsg: {
      get() {
        return this.$store.state.modules.tips.confirmMsg
      },
      set(v) {
        this.$store.commit('modules/tips/SET_CONFIRM', { modal: v })
      }
    }
  }
})
export default class BaseConfirm extends Vue {
  confirmMsg
  cancle() {
    if (typeof this.confirmMsg.catch === 'function') {
      this.confirmMsg.catch()
    }
    this.confirmMsg.modal = false
  }

  confirm() {
    if (typeof this.confirmMsg.catch === 'function') {
      this.confirmMsg.then()
    }

    this.confirmMsg.modal = false
  }
}
</script>

<style lang="scss" scoped></style>
