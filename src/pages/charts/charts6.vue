<template>
  <div class="chart6">
      <div style="margin-bottom:10px;">
        <vxe-button status="primary" content="今日" @click="today"></vxe-button>
        <vxe-button status="primary" content="本周" @click="toWeek"></vxe-button>
        <vxe-button status="primary" content="本月" @click="toMonth"></vxe-button>
        <!-- <el-select v-model="measureTypeValue" placeholder="请选择">
            <el-option
            v-for="item in measureTypeArray"
            :key="item.value"
            :label="item.name"
            :value="item.value">
            </el-option>
        </el-select> -->
        <vxe-input v-model="startTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>&nbsp;至
        <vxe-input v-model="endTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
     </div>
    <el-row style="margin-bottom: 16px;">
      <el-col :span="16" style="padding-right: 4px;">
          <el-card>
            <div slot="header">总体检查结果统计</div>
            <chart ref="B" :options="optionsB" style="width: 100%;"></chart>
          </el-card>
        </el-col>
        <el-col :span="8" style="padding-left: 4px;">
          <el-card>
            <div slot="header">各项检查结果统计 ( 次 )</div>
            <chart ref="C" :options="optionsC" style="width: 100%;"></chart>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>
<script>
  import { curDate, getTimestamp, getTypeName, beforeDay, measureArray, reduceArray } from '../../assets/js/util';


  export default {
    data () {
      return {
        startTime: curDate(-1),
        endTime: curDate(),
        // measureTypeArray: measureArray('value', 'name'),
        measureTypeValue: measureArray(true),
        optionsB: {
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
        },
        optionsC: {
          tooltip: {
            trigger: 'item'
          },
           toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
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

            this.axios.post('data_management/measure_stat/stat_num_measure_result', ops).then(data => {
                data = data.data || {};
                let title = []
                let chartsData = [{
                            type: 'line',
                            stack: '人数',
                            name: '正常',
                            barMaxWidth: 20,
                            itemStyle: {normal: {color: '#108dd7', label: {show: false, position: 'insideRight'}}},
                            data: []
                    },
                    {
                            type: 'line',
                            stack: '人数',
                            name: '异常',
                            barMaxWidth: 20,
                            itemStyle: {normal: {color: 'red', label: {show: false, position: 'insideRight'}}},
                            data: []
                    },
                    {
                            type: 'line',
                            stack: '人数',
                            name: '未检',
                            barMaxWidth: 20,
                            itemStyle: {normal: {color: '#666666', label: {show: false, position: 'insideRight'}}},
                            data: []
                    }
                ];
                for (let i in data) {
                    const curObj = data[i] || {};
                    chartsData[0].data.push(curObj.normal || 0);
                    chartsData[1].data.push(curObj.abnormal || 0);
                    chartsData[2].data.push(curObj.no_assess || 0);
                    title.push(getTypeName(i));
                }
                chartB.mergeOptions({
                    series: chartsData
                });
                chartB.hideLoading();
                this.optionsB.series = chartsData;
                this.optionsB.xAxis[0].data = title;
                let normal = reduceArray(chartsData[0].data);
                let abnormal = reduceArray(chartsData[1].data);
                let noAssess = reduceArray(chartsData[2].data);
                let pieData = [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: [
                                        {
                                            name: '正常',
                                            value: normal,
                                            itemStyle: {
                                                    normal: {
                                                    color: '#108dd7'
                                                    }
                                                }
                                        },
                                        {
                                            name: '异常',
                                            value: abnormal
                                            
                                        },
                                        {
                                            name: '未检',
                                            value: noAssess,
                                            itemStyle: {
                                                normal: {
                                                    color: '#666666'
                                                }
                                            }
                                        }
                                      ]
                                } 
                            ];
                 chartC.mergeOptions({
                    series: pieData
                });
                chartC.hideLoading();
                this.optionsC.series = pieData;
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
  .chart6{
      background: #fff;
      padding: 20px;
  }
  .header{
    padding: 9px 10px;
    margin-bottom:10px;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
