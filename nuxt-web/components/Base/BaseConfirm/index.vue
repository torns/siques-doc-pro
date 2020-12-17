<template>
  <v-dialog v-model="confirmMsg.modal" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">
        {{ confirmMsg.title }}
      </v-card-title>
      <v-card-text> {{ confirmMsg.text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancle" color="green darken-1" text>
          取消
        </v-btn>
        <v-btn @click="confirm" color="warning" text>
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
    this.confirmMsg.catch()
    this.confirmMsg.modal = false
  }
  confirm() {
    this.confirmMsg.then()
    this.confirmMsg.modal = false
  }
}
</script>

<style lang="scss" scoped></style>
