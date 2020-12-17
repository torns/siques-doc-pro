<template>
  <v-snackbar v-model="notifyMsg.loading">
    {{ notifyMsg.text || `Open Snackbar` }}

    <!-- <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" @click="snackbar = false" color="pink" text>
        Close
      </v-btn>
    </template> -->
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
@Component({
  computed: mapGetters(['notifyMsg'])
})
export default class BaseSnackBar extends Vue {
  snackbar = false
}
</script>

<style lang="scss" scoped></style>
