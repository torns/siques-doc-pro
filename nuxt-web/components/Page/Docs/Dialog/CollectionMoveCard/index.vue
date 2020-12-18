<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line @click="$emit('click', id)">
      <v-list-item-content>
        <div class="overline mb-4">
          知识点
        </div>
        <v-list-item-title class="headline mb-1">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="cover" aspect-ratio="1.7"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Prop } from 'vue-property-decorator'
@Component({})
export default class CollectionCard extends Vue {
  @Prop()
  title

  @Prop()
  id

  @Prop()
  cover

  @Prop({
    type: String,
    default: '该知识点的主人很懒，什么都没有留下'
  })
  description
}
</script>

<style lang="scss" scoped></style>
