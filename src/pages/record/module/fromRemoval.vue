<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 组件 健康信息卡
--%>
<template>

<div class="index">
      <el-form>
           <el-form-item label="当前档案所在区域:" :label-width="formLabelWidth">
               <el-input v-model="fromData.fullName"  disabled></el-input>
           </el-form-item>
           <el-form-item  class="item-title">请选择要迁移的区域</el-form-item>
      </el-form>
     
</div>

</template>
<script>
  import { formatDate, extend, updateKeyUnder } from '../../../assets/js/util.js';
  import Constants, { defaultMachineParam, defaultBloodType, defaultRhblood } from '../../../Constants';
 
  export default {
    props: ['record'],
    data() {           
      return {
        fromData: {
            fullName: ''
        },
         pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                    picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }]
        },
        formLabelWidth: '130px',
        defaultBloodType: defaultBloodType,
        defaultRhblood: defaultRhblood
      }
    },
    created() {
        // 将携带参数赋值
        extend(this.fromData, this.record.row);
        this.getUserInfoApi();
    },
    watch: {
        // 监听父组件字段更改
        record: function(newData, oldData) {
            let initData = this.$options.data();
            extend(this.fromData, initData.fromData, newData.row);
            setTimeout(() => {
                this.getUserInfoApi();
            }, 0)
        }
    },
    methods: {
        getUserInfoApi() {
            if (!this.fromData.healthfile_num) return;
            const areaCode = this.fromData.healthfile_num.slice(0, 12);
            const params = {};
            params.area_code = areaCode
            extend(params, defaultMachineParam);
            
            this.axios.post('SihealIMManagement/resource/get_district_fullname', params).then(res => {
                res = res || {};
                this.fromData.fullName = (res.data || {}).full_name || ''
            })
        }
    }
  };
</script>
<style lang="scss" scoped>
.el-input{
    width:80%;
}
.el-date-picker,.el-select,.el-textarea{
    width:80%;
}
.red{
    color:red;
}
.item-title{
    text-align: center;
    font-weight: 600;
}
.other-input{
    width:180px;
    margin-left:10px;
}
.other-input-desc{
    width:300px;
    margin-left:10px;
}
.item-unit{
    margin-left:10px;
}
.item-time{
    font-size:12px;
}
</style>