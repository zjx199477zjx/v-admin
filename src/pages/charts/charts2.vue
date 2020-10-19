<template>
  <div class="chart2">
      
    <div slot="header" class="header">各项检测人数分布（单位 : 人）</div>
    <div>
        <vxe-button status="primary" content="今日" @click="today"></vxe-button>
        <vxe-button status="primary" content="本周" @click="toWeek"></vxe-button>
        <vxe-button status="primary" content="本月" @click="toMonth"></vxe-button>
        <vxe-input v-model="startTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>&nbsp;至
        <vxe-input v-model="endTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
    </div>
    <chart ref="A" :options="optionsA" style="width: 100%;"></chart>
  </div>
</template>
<script>
  import { curDate, getTimestamp, getTypeName, beforeDay, measureArray } from '../../assets/js/util'
  export default {
    data () {
      return {
        startTime: curDate(-1),
        endTime: curDate(),
        measureType: measureArray(true),
        optionsA: {
          tooltip: {
            trigger: 'item'
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: [
            {
              data: []
            }
          ],
          yAxis: {},
          series: []
        }
      }
    },
    mounted () {
      this.getDataApi()
    },
    updated () {
      // this  update exec
      this.getDataApi()
    },
    methods: {
        onChangeDataSendApi(ops) {
            const chartA = this.$refs['A'];
            this.axios.post('data_management/measure_stat/stat_num_measure_user', ops).then(data => {
                data = data.data || {};
                let chartsData = {
                        type: 'bar',
                        stack: '人数',
                        barMaxWidth: 40,
                        itemStyle: {normal: {color: '#108dd7', label: {show: true, position: 'insideRight'}}},
                        data: []
                };
                let title = [];
                for (let i in data) {
                    title.push(getTypeName(i));
                    chartsData.data.push(+data[i] || 0)
                }
                chartA.mergeOptions({
                    series: chartsData
                });
                chartA.hideLoading();
                this.optionsA.series = chartsData;
                this.optionsA.xAxis[0].data = title;
            }).catch(error => {
                console.log(error)
            })
        },
        getDataApi() {
            const chartA = this.$refs['A'];
            chartA.showLoading();
            let options = {
                start_time: getTimestamp(this.startTime),
                end_time: getTimestamp(this.endTime),
                measure_type: this.measureType,
                role: 'ROLE_SUPER_ADMIN'

            };
            this.onChangeDataSendApi(options)
        },
        today() {
            this.startTime = curDate();
            this.endTime = curDate();
        },
        toWeek() {
            var array = beforeDay(7);
            this.startTime = array[0];
            this.endTime = array[6];
        },
        toMonth() {
            this.startTime = curDate(0, -1);
            this.endTime = curDate();
        },
        disabledDateMethod(date) {
          let dd = (date.date).getTime()
          let curTime = new Date().getTime();
          return dd > curTime;
        }
    }
  };
</script>
<style lang="scss" scoped>
  .header{
    padding: 9px 10px;
    margin-bottom:10px;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
