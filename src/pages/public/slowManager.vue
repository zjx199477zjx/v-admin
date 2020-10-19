<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: 1246888200@qq.com
@Idea: WebStorm
@Desc: 公共卫生服务管理  慢病管理统计
--%>
<template>
  <div class="chart2">
      
    <div slot="header" class="header">慢病统计管理</div>
    <div>
<!--         
        <vxe-button status="primary" content="今日" @click="today"></vxe-button>
        <vxe-button status="primary" content="本周" @click="toWeek"></vxe-button>
        <vxe-button status="primary" content="本月" @click="toMonth"></vxe-button>
        <vxe-input v-model="startTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>&nbsp;至
        <vxe-input v-model="endTime" placeholder="日期选择" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input> -->
        <span style="margin-left:10px;">疾病类型:</span>
        <el-select v-model="params.disease_type" placeholder="">
          <el-option
            v-for="item in defaultDiseaseType"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-left:10px;">人群范围:</span>
        <el-select v-model="params.crowd" placeholder="">
          <el-option
            v-for="item in defaultCrowd"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
    </div>
    <chart ref="A" :options="optionsA" style="width: 100%;"></chart>
  </div>
</template>
<script>
  import { curDate, getTimestamp, getTypeName, beforeDay, measureArray, extend } from '../../assets/js/util'
  import { defaultMachineParam, defaultDiseaseType, defaultCrowd } from '../../Constants'
  export default {
    data () {
      return {
        startTime: curDate(-1),
        endTime: curDate(),
        measureType: measureArray(true),
        defaultDiseaseType: defaultDiseaseType,
        defaultCrowd: defaultCrowd,
        params: {
          disease_type: 0,
          crowd: -1
        },
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
            this.axios.post('SihealIMManagement/statistics/disease_management', ops).then(data => {
                data = data.data || {};
                let chartsData = {
                        type: 'bar',
                        stack: '占比',
                        barMaxWidth: 40,
                        itemStyle: {normal: {color: '#108dd7', label: {show: true, position: 'insideRight'}}},
                        data: []
                };
                let title = [];
                for (let i in data) {
                    title.push(this.getName(i));
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
        getName(i) {
          switch (i) {
            case 'wr': return '饮酒占比';
            case 'er': return '饮食占比';
            case 'sr': return '运动占比';
            case 'cr': return '吸烟占比';
          }
        },
        getDataApi() {
            const chartA = this.$refs['A'];
            chartA.showLoading();
            let options = {
                disease_type: this.params.disease_type,
                crowd: this.params.crowd
            };
            extend(options, defaultMachineParam)
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
