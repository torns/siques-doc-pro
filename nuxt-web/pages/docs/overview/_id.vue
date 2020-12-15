<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-card :elevation="6" class="mx-auto mx-6">
            <v-img :src="selectedCollection.cover" aspect-ratio="1.1"></v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="2">
          <p class="font-weight-black">
            {{ selectedCollection.name }}
          </p>
          <p class="font-weight-bold">
            {{ selectedCollection.description }}
          </p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4">
          <v-btn-toggle v-model="setting" dense background-color="primary" multiple>
            <v-btn>
              <v-icon>mdi-cog</v-icon>
            </v-btn>

            <v-btn @click="openPublishDialog">
              <v-icon>mdi-format-color-fill</v-icon>
              发布
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>

    <LazyCollectionPublishDialog ref="dialog"></LazyCollectionPublishDialog>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
@Component({
  computed: mapGetters(['selectedCollection'])
})
export default class OverView extends Vue {
  selectedCollection
  layout(context) {
    return 'doc'
  }

  $refs: any

  openPublishDialog() {
    this.$refs.dialog.visible = true
  }

  @Watch('selectedCollection')
  isCollectionChanged(newval, oldval) {
    if (newval.id) {
      this.$router.push(`/docs/overview/${newval.id}`)
    }
  }

  setting = ''
}
</script>

<style lang="scss" scoped></style>
