<template>
  <div class="chart4">
      
    <div slot="header" class="header">仪器使用走势统计（单位 : 次）</div>
    <div>
        <!-- <vxe-button status="primary" content="今日" @click="today"></vxe-button>
        <vxe-button status="primary" content="本周" @click="toWeek"></vxe-button>
        <vxe-button status="primary" content="本月" @click="toMonth"></vxe-button> -->
        <el-select v-model="addressValue" placeholder="请选择">
            <el-option
            v-for="item in addressArray"
            :key="item.value"
            :label="item.name"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="deviceValue" placeholder="请选择">
            <el-option
            v-for="item in deviceArray"
            :key="item.value"
            :label="item.name"
            :value="item.value">
            </el-option>
        </el-select>
        <vxe-input v-model="startTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>&nbsp;至
        <vxe-input v-model="endTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
    </div>
    <chart ref="A" :options="optionsA" style="width: 100%;"></chart>
  </div>
</template>
<script>
  import { curDate, getTimestamp, getTypeName, beforeDay, measureArray, deviceAddressArray } from '../../assets/js/util';

  export default {
    data () {
      return {
        startTime: curDate(-1),
        endTime: curDate(),
        addressArray: deviceAddressArray(),
        addressValue: '15050501',
        deviceArray: [{value: 'self_service_machine-50000', name: '05型健康监护机'}, {value: 'self_service_machine-60000', name: '06型健康监护机'}],
        deviceValue: 'self_service_machine-50000',
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
            this.axios.post('/measure_stat/stat_measure_type', ops).then(data => {
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
                // console.log(chartsData)
                this.optionsA.series = chartsData;
                this.optionsA.xAxis[0].data = title;
            }).catch(error => {
                console.log(error)
            })
        },
        getDataApi() {
            const chartA = this.$refs['A'];
            chartA.showLoading();
            // measure_type  顺序不能错，否则接口报错
            let options = {
                start_time: getTimestamp(this.startTime),
                end_time: getTimestamp(this.endTime),
                measure_type: 'height_weight&pressure&eyesight&temperature&oxygen&glucose&blood_uric_acid&electrocardio&blood_fat&body_fat&height&weight&rate&urinalysis&pulse',
                role: 'ROLE_SUPER_ADMIN',
                projCode: this.addressValue,
                machine_type: this.deviceValue
            };
            this.onChangeDataSendApi(options)
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
    .chart4{
        background: #fff;
        padding: 20px;
    }
  .header{
    padding: 9px 10px;
    margin-bottom:10px;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
