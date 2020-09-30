<template>
    <el-row>
        <el-col :span="16">
            <div class="map-screen-box">
                <div class="map-header">设备地址分布图</div>
                <div class="map-box clearfix">
                <baidu-map
                    ref="baiduMap"
                    :center="center"  
                    :zoom="zoom" 
                    :dragging="true" 
                    :scroll-wheel-zoom="true"
                    class="map"
                    @ready="handler"
                >
                        <bm-marker v-for="(item,index) of devArray" :key="index" :position="item" :title="item.address" :icon="{url: item.icon, size: {width: 50, height: 50}}" :dragging="false" @click="infoWindowOpen(index,item)">
                            <bm-info-window :show="item.mapShow" @close="infoWindowClose(index,item)" @open="infoWindowOpen(index,item)">
                            设备地址： {{item.address}}<br/>
                            {{item.code}}<br/>
                            是否在线：{{item.isOnline ? '是' : '否'}}<br/>
                            经度：{{item.lng}}<br/>
                            纬度：{{item.lat}}
                            </bm-info-window>
                        </bm-marker>
                
                </baidu-map>
                </div>
                <childeMenu :list="deviceList" :childWindowOpen="childWindowOpen"></childeMenu>
            </div>
        </el-col>
        <el-col :span="8">
            <el-card>
                <div slot="header">在线/离线设备统计</div>
                <chart ref="A" :options="optionsA" style="width: 100%;"></chart>
            </el-card>
        </el-col>
    </el-row>

</template>
<script>
    import childeMenu from './childeMenu';
    const offMapIcon = require('./../../assets/images/map-off.png');
    const onMapIcon = require('./../../assets/images/map-online.png');

    
  export default {
        components: {
            childeMenu
        },
        data () {
            return {
                baidumapSwitch: false,
                center: { lng: 114.302441, lat: 30.596216 },
                zoom: 11,
                location: '湖北省武汉市',
                keyword: '请输入搜索关键词',
                deviceList: [],
                mapShow: false,
                offMap: offMapIcon,
                onMap: onMapIcon,
                optionsA: {
                     toolbox: {
                        show: true,
                        feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                            }
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                        tooltip: {
                            trigger: 'item',
                            formatter: '设备状态 <br/>{b} : {c} ({d}%)'
                        },
                        series: []
                    },
                devArray: [],
                devicePieData(online, offline) {
                    let chartA = this.$refs['A']; 
                    let chartData = {
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                    {
                                        name: '在线',
                                        value: online,
                                        itemStyle: {
                                            normal: {
                                            color: '#108dd7'
                                            }
                                        }
                                    },
                                    {
                                        name: '离线',
                                        value: offline
                                      
                                    }
                            ]
                        };         
                    this.optionsA.series = chartData;
                    chartA.mergeOptions({ series: chartData });
                    chartA.hideLoading();
                }
            }
        },
        
        mounted () {
            //  加载结束 
            let that = this;
            let chartA = this.$refs['A']; 

            chartA.showLoading();

            // 获取经纬度
            let getPoSition = async function (data) {
                const position = {}
                let myGeo = new window.BMap.Geocoder();
                let a = data.map(item => {
                    let address = item.address.replace(/\s*/g, '');
                    return new Promise(resolve => {
                        myGeo.getPoint(
                            address || '光谷生物城',
                            point => {
                                  if (point) {
                                    position[item.id] = {lng: point.lng, lat: point.lat, code: '机器码: ' + item.code2, address: address, isOnline: item.isOnline, mapShow: false, icon: offMapIcon};
                                    if (item.isOnline) position[item.id]['icon'] = onMapIcon;
                                  }

                                resolve() 
                            },
                            address || '光谷生物城'
                        )
                    })
                })
                await Promise.all(a)
                return position
            }

             that.axios.post(`/resource/all_device`, {'num_page': -1, 'page_no': -1})
                .then(data => {
                    let arrayData = data.data_array || [];
                    getPoSition(arrayData).then((resData) => {
                        that.devArray = resData;
                        that.deviceList = arrayData;
                    }).catch((error) => {
                        console.log(error)
                    })
                    // 计算在线个数
                    const sum = arrayData.reduce((pre, item) => { return pre + (item.isOnline ? 1 : 0); }, 0);
                    this.devicePieData(sum, arrayData.length - sum)
                }).catch(error => {
                    console.log(error)
                })
        },
        updated() {
            // console.log('updated')
        },
        methods: {
            handler({ BMap, map }) {},
            infoWindowOpen(index, item) {
                item.mapShow = true
                this.$set(this.devArray, index, item);
                 this.center = {lng: item.lng, lat: item.lat};
            },
            infoWindowClose(index, item) {
                item.mapShow = false
                this.$set(this.devArray, index, item)
            },
            childWindowOpen(item) {
                var curDevice = this.devArray[item.id] || {};
                if (!curDevice.lng || !curDevice.lat) return console.log('该设备显示地理位置异常')
                    curDevice.mapShow = true;
                    this.center = {lng: curDevice.lng, lat: curDevice.lat};
            },
            baidumap () {
                this.baiduDevicelocationx = this.center.lng
                this.baiduDevicelocationy = this.center.lat
            }
        }
    }
</script>
<style>
/* The container of BaiduMap must be set width & height. */
.map-screen-box{
    background: #fff;
}
.map-header{
    padding: 18px 20px;
}
.map-box{
    padding: 0 20px 18px 20px;
     height: 300px;
}
.map {
  width: 100%;
  height: 300px;
}
</style>