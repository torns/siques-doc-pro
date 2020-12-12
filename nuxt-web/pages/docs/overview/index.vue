<template>
  <v-main>
    <v-container grid-list-xs>
      <v-row>
        <v-col cols="12" md="8">
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn-toggle v-model="setting" dense background-color="primary" dark multiple>
            <v-btn>
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>

            <v-btn>
              <v-icon>mdi-cog</v-icon>
            </v-btn>

            <v-btn>
              <v-icon>mdi-format-color-fill</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class OverView extends Vue {
  layout(context) {
    return 'doc'
  }
  setting = ''
}
</script>

<style lang="scss" scoped></style>
