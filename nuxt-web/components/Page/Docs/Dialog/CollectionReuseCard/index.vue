<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, index) in delCollection" :key="index" cols="6">
        <v-card :color="colors[index % colors.length]" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title v-text="item.name" class="headline"></v-card-title>

              <v-card-subtitle v-text="item.description"></v-card-subtitle>

              <v-card-actions>
                <v-btn @click="reuse(item, index)" class="ml-2 mt-5" outlined rounded small>
                  取消删除
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="item.cover"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import { reUseCollection } from '@/api/collection'
@Component({
  computed: mapGetters(['delCollection'])
})
/** 回收站 */
export default class CollectionReuseCard extends Vue {
  colors = ['#1F7087', '#952175', '#385F73']

  delCollection

  mounted() {
    this.$store.dispatch('modules/collection/getDelCollection')
  }

  async reuse(item, index) {
    await reUseCollection({ collectionId: item.id })
    this.$store.dispatch('modules/collection/getUserCollection')
    this.delCollection.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped></style>
