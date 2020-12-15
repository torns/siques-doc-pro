<template>
  <v-dialog v-model="loadMsg.loading" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        {{ loadMsg.text || `上传中` }}
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
}
</script>

<style lang="scss" scoped></style>
