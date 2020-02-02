<template>
  <div>
    <div class="d-flex" style="flex-direction: row-reverse;">
      <ul class="text-left fs-xm">
        <li
          @click="handleCategory(link.alias, link.sort)"
          v-for="(link, index) in data"
          :key="index"
          :class="
            (link.alias == category ? 'bg-1 ' : 'hover-2 ') + `pr-6  pl-3 py-2`
          "
        >
          <font-awesome-icon :icon="[link.tag, link.icon]" class="pr-1" />
          {{ link.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class HomepageList extends Vue {
  @Prop()
  data: any
}
</script>

<style lang="scss" scoped></style>
