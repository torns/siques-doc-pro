<template>
  <div class="wrapper">
    <div class="pie-charts">
      <div class="pieID--operations pie-chart--wrapper">
        <div id="pie-chart" class="pie-chart">
          <div v-if="show" class="pie-chart__pie">
            <div :title="i" v-for="(i, index) in dataList" :style="`transform: rotate(${offset[index] - 1}deg) translate3d(0px, 0px, 0px);`" :key="index" :class="`slice s${index}-0`">
              <span :style="`transform: rotate(${-179 + sliceSize(dataList[index], dataTotal)}deg) translate3d(0,0,0);background-color: ${color[index]};`"></span>
            </div>
          </div>

          <ul class=" pie-chart__legend" style="transition:1s">
            <li :style="`border-color:${color[i]}`" v-for="(val, key, i) in $attrs.data" :key="i">
              <em>{{ key }}</em
              ><span>{{ val }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class piechart extends Vue {
  /* eslint-disable */
  // 角度

  offset = []
  sliceSizes = []

  get dataList() {
    let datas: any = this.$attrs.data
    let list = []
    for (let key in datas) {
      list.push(datas[key])
    }
    return list
  }

  get dataTotal() {
    let total = 0
    this.dataList.forEach((element) => {
      total += element
    })
    return total
  }
  timer: any = null
  init() {
    var maxSize = 179

    for (let i = 0; i < this.dataList.length; i++) {
      var size = this.sliceSize(this.dataList[i], this.dataTotal)

      if (i === 0) {
        this.sliceSizes.push(size)
        this.offset.push(0)
      } else {
        const last = this.sliceSizes[i - 1]
        this.sliceSizes.push(size + last)
        this.offset.push(this.sliceSizes[i - 1])
      }
    }
    document.getElementById('home').removeEventListener('scroll', this.doTimer())
    document.getElementById('home').addEventListener('scroll', this.doTimer(), true)
  }

  doTimer(): any {
    if (typeof this.timer == 'number') {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      //添加业务逻辑
      this.scrollBehave()
    }, 200)
  }

  scrollBehave() {
    let top = document.getElementById('pie-chart').scrollHeight
    let height = $(window).height()
    console.log(height)
    let scrolltop = document.getElementById('home').scrollTop
    if (top + scrolltop > height + 600) {
      this.show = true
    } else {
      this.show = false
    }
  }

  show = false
  color = [
    'rgb(187,228,255)',
    'rgb(2,166,209)',
    'rgb(5,116,206)',
    'rgb(239,71,111)',
    'rgb(255,209,102)',
    'rgb(6,214,160)',
    'rgb(172,78,221)',
    'rgb(255,140,62)',
    'rgb(0,188,212)',
    'rgb(194,24,91)',
    'rgb(230,74,25)',
    'rgb(103,58,183)'
  ]

  sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360
  }

  // id = .pieID--operation

  mounted() {
    setTimeout(() => {
      this.init()
    }, 300)
  }
}
</script>

<style lang="scss">
@-webkit-keyframes bake-pie {
  from {
    -webkit-transform: rotate(0deg) translate3d(0, 0, 0);
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

@keyframes bake-pie {
  from {
    -webkit-transform: rotate(0deg) translate3d(0, 0, 0);
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}
.pie-chart {
  font-family: 'Open Sans', Arial;
}
.pie-chart--wrapper {
  width: 400px;
  margin: 30px auto;
  text-align: center;
}
.pie-chart__pie,
.pie-chart__legend {
  display: inline-block;
  vertical-align: top;
}
.pie-chart__pie {
  position: relative;
  height: 200px;
  width: 200px;
  margin: 10px auto 35px;
}
.pie-chart__pie::before {
  content: '';
  display: block;
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background: #eee;
  border-radius: 50%;
  top: 50px;
  left: 50px;
}
.pie-chart__pie::after {
  content: '';
  display: block;
  width: 120px;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  box-shadow: 0 0 3px 4px rgba(0, 0, 0, 0.1);
  margin: 220px auto;
}

.slice {
  position: absolute;
  width: 200px;
  height: 200px;
  clip: rect(0px, 200px, 200px, 100px);
  -webkit-animation: bake-pie 1s;
  animation: bake-pie 1s;
}
.slice span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  clip: rect(0px, 200px, 200px, 100px);
}

.pie-chart__legend {
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  background: #fff;
  padding: 0.75em 0.75em 0.05em;
  font-size: 13px;
  box-shadow: 1px 1px 0 #ddd, 2px 2px 0 #bbb;
  text-align: left;
  width: 65%;
}
.pie-chart__legend li {
  height: 1.25em;
  margin-bottom: 0.7em;
  padding-left: 0.5em;
  border-left: 1.25em solid black;
}
.pie-chart__legend em {
  font-style: normal;
}
.pie-chart__legend span {
  float: right;
}

.pie-charts {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}
@media (max-width: 500px) {
  .pie-charts {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}
</style>
