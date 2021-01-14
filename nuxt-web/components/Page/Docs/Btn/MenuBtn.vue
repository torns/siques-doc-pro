<template>
  <v-menu transition="slide-x-transition" bottom right>
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip top>
        <template v-slot:activator="{ on: tooltip }">
          <v-icon v-bind="attrs" color="darken-2" v-on="{ ...tooltip, ...menu }">
            <slot></slot>
          </v-icon>
        </template>
        <span>{{ title }}</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="(option, index) in validOptions" :key="index" link @click="option.callback(item)">
        <v-icon class="pr-1" v-if="option.icon"> {{ option.icon }}</v-icon>
        <v-list-item-title>{{ option.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class MenuBtn extends Vue {
  @Prop({ type: Array })
  options

  get validOptions() {
    this.options.forEach((e) => {
      if (!e.callback) {
        e.callback = this.consoler
      }
    })
    return this.options
  }

  @Prop({ type: String })
  title

  @Prop({ type: Object })
  item

  consoler() {
    console.warn('please add a valid callback')
  }
}
</script>

<style lang="scss" scoped></style>
