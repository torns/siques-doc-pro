<template>
  <v-system-bar app window dark-out>
    <v-icon>mdi-message</v-icon>
    <span class="text-truncate">{{ $store.state.message }}</span>
    <v-spacer></v-spacer>
    <v-icon>mdi-minus</v-icon>
    <v-icon>mdi-checkbox-blank-outline</v-icon>
    <v-icon @click="$router.push('/')">mdi-close</v-icon>
  </v-system-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class DocSystemBar extends Vue {}
</script>

<style lang="scss" scoped></style>
