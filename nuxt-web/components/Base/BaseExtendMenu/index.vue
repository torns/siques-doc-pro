<template>
  <v-dialog id="extend-bar" v-model="extendMenu" :append-to-body="true" :show-close="false" fullscreen>
    <v-list-item style="place-content: flex-end;width:100vw">
      <v-btn icon class="ma-3 float-right pointer" large color="white" @click="extendMenu = false">
        <v-icon dark>
          mdi-close
        </v-icon>
      </v-btn>
    </v-list-item>
    <div>
      <slot></slot>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  computed: {
    extendMenu: {
      get() {
        return this.$store.state.extendMenu
      },
      set(v) {
        this.$store.commit('SET_EXTENDMENU', v)
      }
    }
  }
})
export default class ExtendMenu extends Vue {
  extendMenu
}
</script>

<style lang="scss">
.v-dialog.v-dialog--active.v-dialog--fullscreen {
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.17);
  height: 100%;
}
</style>
