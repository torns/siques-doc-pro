<template>
  <div>
    <div class="page">
      <div class="page__current-date"></div>
      <ul class="page__grid grid">
        <div class="grid__head grid-head">
          <span
            v-for="(i, index) in gridHead"
            :key="index"
            class="grid-head__cell"
            >{{ i }}</span
          >
        </div>
        <div class="grid__cols grid-cols">
          <span
            v-for="(j, index) in gridCol"
            :key="index"
            class="grid-cols__cell"
            >{{ j }}</span
          >
        </div>
        <div class="grid__body">
          <div v-for="i in 371" :key="i">
            <el-tooltip
              :offset="10"
              :hide-after="2000"
              placement="top-start"
              :content="
                getContributionsObj(i, true).str + ' ' + getDateString(i)
              "
              effect="dark"
            >
              <li class="grid__cell"></li>
            </el-tooltip>
          </div>
        </div>
        <div class="grid__footer grid-footer">
          <span class="grid-footer__first">Less</span>
          <div class="grid-footer__cell"></div>
          <div class="grid-footer__cell grid-footer__cell_color_1"></div>
          <div class="grid-footer__cell grid-footer__cell_color_2"></div>
          <div class="grid-footer__cell grid-footer__cell_color_3"></div>
          <div class="grid-footer__cell grid-footer__cell_color_4"></div>
          <span class="grid-footer__last">More</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class Github extends Vue {
  /* eslint-disable */
  gridHead = [
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar'
  ]
  gridCol = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  alphabet: any = {
    D: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0, 0]
    ],
    E: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0]
    ],
    H: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0]
    ],
    L: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0]
    ],
    O: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 0]
    ],
    R: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 1, 0]
    ],
    W: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 0]
    ],
    ',': [[0, 0, 0, 0, 0, 1, 1]],
    '<': [
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0]
    ],
    '>': [
      [0, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0]
    ]
  }

  get gridCell() {
    return document.querySelectorAll('.grid__cell')
  }

  monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  flag = false

  gridMessage: any = []
  msDay = 86400000

  msFirstDay = 1590422059000
  counter = 0

  // 1
  getDateString(cnt: any) {
    const date = new Date(this.msFirstDay + this.msDay * cnt)
    return `${
      this.monthArr[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`
  }

  // 前缀
  getContributionsObj = (cnt: any, isCommits: any) => {
    const min = 1
    const max = 12
    const rand = isCommits
      ? Math.floor(Math.random() * (+max - +min) + +min)
      : 0

    return {
      rand,
      str: isCommits
        ? `${rand} contribution${rand > 1 ? 's' : ''}`
        : 'No contributions'
    }
  }

  drawSymbol = (l: any) => {
    const data: any = this.alphabet[l] || []
    for (
      let i = 0, commit = { rand: 0, str: '' }, date = '';
      i < data.length;
      i++
    ) {
      for (let j = 0; j < 7; j++) {
        date = this.getDateString(this.counter)
        commit = this.getContributionsObj(this.counter, data[i][j] === 1)

        if (data[i][j] === 1) {
          this.gridCell[this.counter].classList.add(
            `grid__cell_color_${Math.floor((commit.rand + 2) / 3)}`
          )
        }
        let object = { commit: commit.str, date: date }
        this.gridMessage[this.counter] = object
        // setAttribute('data-commit', commit.str)
        // this.gridMessage[this.counter].setAttribute('data-date', date)

        this.counter++
      }
    }
  }

  drawSpace = () => {
    for (let i = 0, commit = {}, date = ''; i < 7; i++) {
      date = this.getDateString(this.counter)
      commit = this.getContributionsObj(this.counter, false)

      //   this.gridCell[this.counter].setAttribute('data-commit', '')
      //   this.gridCell[this.counter].setAttribute('data-date', date)
      let object = { commit: '', date: date }
      this.gridMessage[this.counter] = object
      this.counter++
    }
  }

  drawString(string: any) {
    this.drawSpace()
    string.split('').forEach((symbol: any) => {
      this.drawSymbol(symbol.toUpperCase())
      this.drawSpace()
    })
  }

  mounted() {
    this.init()
  }

  init() {
    this.drawString('<Hello, World>')
  }
}
</script>

<style lang="scss">
.page {
  padding: 10px 0;
  display: -webkit-box;
  display: flex;
  flex-diraction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.grid {
  position: relative;
  width: 822px;
  padding-left: 30px;
}
.grid__head {
  width: 100%;
  margin-bottom: 10px;
}
.grid__cols {
  position: absolute;
  left: 0;
  top: 10px;
  width: 25px;
}
.grid__body {
  display: grid;
  grid-gap: 3px;
  grid-auto-flow: column;
  grid-template: repeat(7, 1fr) / repeat(53, 1fr);
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 10px;
}
.grid__footer {
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
}
.grid__cell {
  width: 8px;
  height: 8px;
  background-color: #ebedf0;
}
.grid__cell_color_1 {
  background-color: #c6e48b;
}
.grid__cell_color_2 {
  background-color: #7bc96f;
}
.grid__cell_color_3 {
  background-color: #239a3b;
}
.grid__cell_color_4 {
  background-color: #196127;
}

.grid-head {
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(53, 1fr);
  grid-template-rows: 12px;
}
.grid-head__cell {
  font-size: 10px;
  color: #767676;
}
.grid-head__cell:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 3;
}
.grid-head__cell:nth-child(2) {
  grid-column-start: 3;
  grid-column-end: 7;
}
.grid-head__cell:nth-child(3) {
  grid-column-start: 7;
  grid-column-end: 11;
}
.grid-head__cell:nth-child(4) {
  grid-column-start: 11;
  grid-column-end: 16;
}
.grid-head__cell:nth-child(5) {
  grid-column-start: 16;
  grid-column-end: 20;
}
.grid-head__cell:nth-child(6) {
  grid-column-start: 20;
  grid-column-end: 24;
}
.grid-head__cell:nth-child(7) {
  grid-column-start: 24;
  grid-column-end: 29;
}
.grid-head__cell:nth-child(8) {
  grid-column-start: 29;
  grid-column-end: 33;
}
.grid-head__cell:nth-child(9) {
  grid-column-start: 33;
  grid-column-end: 37;
}
.grid-head__cell:nth-child(10) {
  grid-column-start: 37;
  grid-column-end: 42;
}
.grid-head__cell:nth-child(11) {
  grid-column-start: 42;
  grid-column-end: 46;
}
.grid-head__cell:nth-child(12) {
  grid-column-start: 46;
  grid-column-end: 50;
}
.grid-head__cell:nth-child(13) {
  grid-column-start: 50;
  grid-column-end: 54;
}

.grid-cols {
  display: grid;
  grid-gap: 3px;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1fr);
}
.grid-cols__cell {
  font-size: 10px;
  color: #767676;
  width: 25px;
  height: 12px;
}

.grid-footer {
  display: -webkit-box;
  display: flex;
  padding: 10px 0;
  -webkit-box-pack: end;
  justify-content: flex-end;
}
.grid-footer__cell {
  width: 12px;
  height: 12px;
  margin: 0 1.5px;
  background-color: #ebedf0;
}
.grid-footer__cell_color_1 {
  background-color: #c6e48b;
}
.grid-footer__cell_color_2 {
  background-color: #7bc96f;
}
.grid-footer__cell_color_3 {
  background-color: #239a3b;
}
.grid-footer__cell_color_4 {
  background-color: #196127;
}
.grid-footer__first,
.grid-footer__last {
  margin: 0 6px;
  font-size: 10px;
  color: #767676;
}
</style>
