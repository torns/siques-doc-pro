<template>
  <v-container>
    <canvas id="head_canvas_default" style="display:none"></canvas>
    <v-row justify="center" class="pt-3 collection">
      <v-col
        v-for="(collect, index) in collects"
        :key="collect.id"
        class="pb-2 list-complete-item"
        cols="12"
        md="12"
        sm="12"
        lg="12"
        xl="12"
        xs="12"
      >
        <v-row v-if="collect.docId" justify="center" class="collection_wrapper d-flex flex-wrap ">
          <v-col :class="index % 2 == 1 ? colLast : colFirst" xs="12" sm="9" md="8" lg="6" xl="5">
            <router-link :to="`/doc/${collect.docId}`" target="_blank" class="pannel-image pointer">
              <v-img
                :src="collect.cover"
                cover
                style="height:350px;border-radius:20px;box-shadow: rgb(0 0 0 / 5%) 16px 17px 39px 0px"
              ></v-img>
            </router-link>
          </v-col>

          <v-col
            :class="`${index % 2 == 0 ? colLast : colFirst} d-flex flex-column jc-center`"
            xs="12"
            sm="3"
            md="4"
            lg="6"
            xl="5"
          >
            <div class="description">
              <div>
                <!-- <div class="header py-1  text-gray fs-xm">
                  <i class="fa fa-leaf   pr-2"></i
                  ><span @click="$router.push(`/t/${post.tags[0] ? post.tags[0].id : '1'}`)" class="point">{{
                    post.tags[0] ? post.tags[0].name : ''
                  }}</span>
                </div> -->
                <router-link :to="`/doc/${collect.docId}`" tag="a" target="_blank" class="pannel-image point">
                  <h2 class=" pb-2  fs-xll ellipsis-1 black--text">{{ collect.name }}</h2>
                </router-link>
                <div class="pr-3">
                  <p class="alias pb-2  fs-xm">{{ collect.description }}...</p>
                </div>
                <div class="footer pt-4 d-flex ">
                  <div class="pr-2">
                    <v-avatar
                      :size="44"
                      class="note_avatar"
                      style="background-color: white ;border: 1px solid #de7d7d;"
                    >
                      <img style="padding: 4px;" :src="collect.avatar" />
                    </v-avatar>
                  </div>
                  <div class="fs-xs pt-2 text-gray">
                    <div><i class="fa fa-clock-o pr-2"></i>{{ $dayjs(collect.created).format('YYYY-MM-DD') }}</div>
                    <div><i class="fa fa-quote-right pr-1"></i> {{ Math.ceil(Math.random() * 4) }}分钟阅读</div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class CollectionList extends Vue {
  reveal = false
  @Prop()
  collects

  beforeMount() {
    this.$nextTick(() => {
      this.collects.forEach((e) => {
        e.avatar = this.textToImg(e.userName.substring(0, 1))
      })
    })
  }

  textToImg(str) {
    let name, fsize
    if (str.length < 2) {
      name = str
      fsize = 60
    } else if (str.length === 2) {
      name = str.substring(0, str.length)
      fsize = 45
    } else if (str.length === 3) {
      name = str.substring(0, str.length)
      fsize = 30
    } else if (str.length === 4) {
      name = str.substring(0, str.length)
      fsize = 25
    } else if (str.length > 4) {
      name = str.substring(0, 2)
      fsize = 45
    }
    const fontSize = 60
    const fontWeight = 'bold'
    const canvas: any = document.getElementById('head_canvas_default')

    canvas.width = 120
    canvas.height = 120
    const context = canvas.getContext('2d')
    context.fillStyle = this.getBG(str)
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#FFF'
    context.font = fontWeight + ' ' + fsize + 'px sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(name, fontSize, fontSize + 3)
    return canvas.toDataURL('image/png')
  }

  getBG(str) {
    const bgArray = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#34495e',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#2c3e50',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#eca0f1',
      '#95a5a6',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d'
    ]
    console.log(this.hash(str))
    const color = bgArray[this.hash(str) % bgArray.length]
    return color
  }

  hash(str) {
    let hash = 0
    let chr
    if (str.length === 0) return hash
    for (let i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0 // Convert to 32bit integer
    }
    return hash
  }

  get colLast() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return ''
      case 'sm':
        return 'order-lg-last'
      case 'md':
        return 'order-lg-last'
      case 'lg':
        return 'order-lg-last'
      case 'xl':
        return 'order-lg-last'
    }
  }

  get colFirst() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return ''
      case 'sm':
        return 'order-lg-first'
      case 'md':
        return 'order-lg-first'
      case 'lg':
        return 'order-lg-first'
      case 'xl':
        return 'order-lg-first'
    }
  }
}
</script>

<style lang="scss">
.v-img:not(.on-hover) {
  opacity: 0.6;
}
.note_avatar > img {
  border-radius: 50% !important;
}
.collection {
  .list-complete-item {
    transition: all 1s;
    // display: inline-block;
  }
}
.collection_wrapper {
  .el-image__inner {
    transform: scale(1, 1);
    transition: transform 1s;
    &:hover {
      transform: scale(1.05, 1.05);
    }
  }
}

.order-lg-last {
  -ms-flex-order: 13;
  order: 13;
}

.order-lg-first {
  -ms-flex-order: -1;
  order: -1;
}
</style>
