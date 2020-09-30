<template>
  <div class="chart3">
      <div style="margin-bottom:10px;">
        <vxe-button status="primary" content="今日" @click="today"></vxe-button>
        <vxe-button status="primary" content="本周" @click="toWeek"></vxe-button>
        <vxe-button status="primary" content="本月" @click="toMonth"></vxe-button>
        <el-select v-model="measureTypeValue" placeholder="请选择">
            <el-option
            v-for="item in measureTypeArray"
            :key="item.value"
            :label="item.name"
            :value="item.value">
            </el-option>
        </el-select>
        <vxe-input v-model="startTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>&nbsp;至
        <vxe-input v-model="endTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
     </div>
    <el-row style="margin-bottom: 16px;">
      <el-col :span="12" style="padding-right: 4px;">
          <el-card>
            <div slot="header">监控指标平均走势</div>
            <chart ref="B" :options="optionsB" style="width: 100%;"></chart>
          </el-card>
        </el-col>
        <el-col :span="12" style="padding-left: 4px;">
          <el-card>
            <div slot="header">监控指标方差走势</div>
            <chart ref="C" :options="optionsC" style="width: 100%;"></chart>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>
<script>
  import { curDate, getTimestamp, getTypeName, beforeDay, measureArray } from '../../assets/js/util';


  export default {
    data () {
      return {
        startTime: curDate(-1),
        endTime: curDate(),
        measureTypeArray: measureArray('value', 'name'),
        measureTypeValue: 'oxygen',
        optionsB: {
          tooltip: {
            trigger: 'item'
          },
          title: {
            show: true,
            text: '收支盈利统计图'
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
        },
        optionsC: {
          tooltip: {
            trigger: 'item'
          },
           title: {
            show: true,
            text: '收支盈利统计图'
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
            const chartB = this.$refs['B'];
            const chartC = this.$refs['C'];

            this.axios.post('/measure_stat/stat_average_measure', ops).then(data => {
                data = data.data || {};
                let chartsData = {
                        type: 'line',
                        stack: '人数',
                        itemStyle: {normal: {color: '#108dd7', label: {show: true, position: 'insideRight'}}},
                        data: []
                };
                (data.measure_list || []).map(function(item) {
                    chartsData.data.push(item.oxygen)
                })
                chartB.mergeOptions({
                    series: chartsData
                });
                chartB.hideLoading();
                this.optionsB.series = chartsData;
                this.optionsB.title.text = getTypeName(this.measureTypeValue);
            }).catch(error => {
                console.log(error)
            })

            this.axios.post('/measure_stat/stat_variance_measure', ops).then(data => {
                data = data.data || {};
                let chartsData = {
                        type: 'line',
                        stack: '人数',
                        itemStyle: {normal: {color: '#108dd7', label: {show: true, position: 'insideRight'}}},
                        data: []
                };
                (data.measure_list || []).map(function(item) {
                    chartsData.data.push(item.oxygen)
                })
                chartC.mergeOptions({
                    series: chartsData
                });
                chartC.hideLoading();
                this.optionsC.series = chartsData;
                this.optionsC.title.text = getTypeName(this.measureTypeValue);
            }).catch(error => {
                console.log(error)
            })
        },
        getDataApi() {
            const chartB = this.$refs['B'];
            const chartC = this.$refs['C'];
            chartB.showLoading();
            chartC.showLoading();
            let options = {
                start_time: getTimestamp(this.startTime),
                end_time: getTimestamp(this.endTime),
                measure_type: this.measureTypeValue,
                role: 'ROLE_SUPER_ADMIN',
                period: 'month'

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
  .chart3{
      background: #fff;
      padding: 20px;
  }
  .header{
    padding: 9px 10px;
    margin-bottom:10px;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
