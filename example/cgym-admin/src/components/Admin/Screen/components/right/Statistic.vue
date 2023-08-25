<template>
  <div class="statistic-box center">
    <div class="statistic-box-body">
      <div class="charts-statistic" ref="echart">
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'

const echart = ref()

onMounted(() => {
  const myChart = echarts.init(echart.value)
  const data = [
    {value: 50, name: '低'},
    {value: 60, name: '中'},
    {value: 70, name: '高'}
  ]
  const option = {
    tooltip: {
      trigger: 'item'
      // formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      right: '0%',
      selectedMode: false
    },
    series: [
      {
        name: '总报警',
        type: 'pie',
        radius: ['40%', '63%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          formatter: '({d}%)'
        },
        color: ['#ffffff', '#73c0de', '#8b51fd'],
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: 'bold'
          }
        },
        data
      },
      {
        name: '总报警',
        type: 'pie',
        radius: ['34%', '40%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        silent: true,
        label: {
          formatter: '({d}%)'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: 'bold'
          }
        },
        data: [
          {value: 50, name: '低', itemStyle: {color: '#ffffff'}},
          {value: 60, name: '中', itemStyle: {color: '#73c0de'}},
          {value: 70, name: '高', itemStyle: {color: '#8b51fd'}}
        ]
      },
      {
        type: 'custom',
        coordinateSystem: 'none',
        silent: true,
        data: [0],
        renderItem(params, api) {
          //环形图半径
          const r = Math.min(api.getWidth(), api.getHeight()) / 2
          //圆心
          const center = {
            x: api.getWidth() / 2,
            y: api.getHeight() / 2
          }
          //大圆半径
          const rBig = r * 0.9
          //小圆半径
          const rSmall = r * 0.78
          //大圆上的扇形
          const bigSector = []
          const smallSector = []
          const circleOnCircle = [] //小圆上携带的小圆圈
          const sectorSize = 60 //扇形长度（弧度）
          const sectorInterval = 30 //扇形与扇形之间的间隔
          const BigStartAngle = 310 //大扇形起始角度
          for (let i = 0; i < 4; i++) {
            const startAngle = ((i * (sectorInterval + sectorSize) + BigStartAngle) * Math.PI) / 180
            const endAngle = startAngle + (sectorSize * Math.PI) / 180
            const smallStartAngle = (Math.PI / 180) * (280 + angle + i * (sectorSize + sectorInterval))
            const smallEndAngle = smallStartAngle + (sectorSize * Math.PI) / 180
            bigSector.push({
              type: 'sector',
              shape: {
                cx: center.x,
                cy: center.y,
                r: rBig,
                r0: rBig * 0.93,
                startAngle,
                endAngle
              },
              style: {
                fill: '#55EAF1',
                lineWidth: 2
              }
            })
            smallSector.push({
              type: 'sector',
              shape: {
                cx: center.x,
                cy: center.y,
                r: rSmall * 0.93,
                r0: rSmall * 0.87,
                startAngle: smallStartAngle,
                endAngle: smallEndAngle
              },
              style: {
                fill: '#14769f',
                lineWidth: 2
              }
            })
            circleOnCircle.push({
              type: 'circle',
              shape: {
                cx: getCirclePoint(center.x, center.y, rSmall, 270 + i * 90 - angle).x,
                cy: getCirclePoint(center.x, center.y, rSmall, 270 + i * 90 - angle).y,
                r: 6
              },
              style: {
                fill: '#8b51fd',
                stroke: '#8b51fd',
                lineWidth: 2
              }
            })
          }
          return {
            type: 'group',
            children: [
              {
                type: 'group',
                children: [
                  ...bigSector,
                  {
                    // 外圆环
                    type: 'arc',
                    shape: {
                      cx: center.x,
                      cy: center.y,
                      r: rBig
                    },
                    style: {
                      fill: 'transparent',
                      stroke: '#8b51fd',
                      lineWidth: 2
                    }
                  }
                ]
              },
              {
                //内圆环
                type: 'group',
                children: [
                  ...smallSector,
                  ...circleOnCircle,
                  {
                    //内圆
                    type: 'arc',
                    shape: {
                      cx: center.x,
                      cy: center.y,
                      r: rSmall
                    },
                    style: {
                      fill: 'transparent',
                      stroke: '#8b51fd',
                      lineWidth: 2
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    ]
  }


//获取圆上某点的坐标(x0、y0表示坐标，r半径，angle角度)
  function getCirclePoint(x0, y0, r, angle) {
    let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
    let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
    return {
      x: x1,
      y: y1
    }
  }

//添加旋转动画
  let timer
  let angle = 0

  function play() {
    angle += 3
    option && myChart.setOption(option)
    if (timer) return
    timer = setTimeout(() => {
      requestAnimationFrame(play)
      timer = null
    }, 28)
  }

//过渡完成后开始动画
  myChart.on('finished', () => {
    play()
  })
})
</script>

<style scoped lang="scss">
.statistic-box {
  width: 100%;
  height: 100%;

  .statistic-box-body {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    box-shadow: 2px 1px 8px 2px rgb(123, 173, 222);
    background-color: #555162;

    .charts-statistic {
      width: 100%;
      height: 100%;
    }
  }
}
</style>