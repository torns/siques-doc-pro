<template>
  <v-dialog v-model="loadMsg.loading" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        <div class="d-flex jc-between">
          <div>{{ loadMsg.text || `上传中` }}</div>
          <v-icon @click="close" small>mdi-close</v-icon>
        </div>
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
@Component({
  computed: mapGetters(['loadMsg'])
})
export default class BaseLoading extends Vue {
  loadMsg

  close() {
    this.$store.commit('modules/tips/STOP_LOADING')
  }
}
</script>

<style lang="scss" scoped></style>
