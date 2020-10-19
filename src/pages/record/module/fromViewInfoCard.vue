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
           <el-form-item label="姓名:" :label-width="formLabelWidth">
               <el-input v-model="fromData.name"  disabled></el-input>
           </el-form-item>
            <el-form-item label="性别:" :label-width="formLabelWidth">
               <el-input v-model="fromData.sex"  disabled></el-input>
           </el-form-item>
            <el-form-item label="出生日期:" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="fromData.birthDate"
                    align="right"
                    type="date"
                    placeholder="出生日期"
                    disabled
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="健康档案编号:" :label-width="formLabelWidth">
               <el-input v-model="fromData.healthfileNum" disabled></el-input>
           </el-form-item>
           <el-form-item label="血型" :label-width="formLabelWidth">
               <el-radio v-for="item in defaultBloodType" :key="item.value" v-model="fromData.blood" :label="item.value" disabled>{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="是否为RH血型" :label-width="formLabelWidth">
               <el-radio v-for="item in defaultRhblood" :key="item.value" v-model="fromData.rhBlood" :label="item.value" disabled>{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="慢性病患病情况:" :label-width="formLabelWidth">
                 <el-input type="textarea" :rows="3" v-model="fromData.chronic" disabled></el-input>
           </el-form-item>
            <el-form-item label="过敏史:" :label-width="formLabelWidth">
               <el-input v-model="fromData.allergy"  disabled></el-input>
           </el-form-item>
            <el-form-item label="家庭住址:" :label-width="formLabelWidth">
               <el-input v-model="fromData.currentAddress" disabled></el-input>
           </el-form-item>
            <el-form-item label="家庭电话:" :label-width="formLabelWidth">
               <el-input v-model="fromData.homePhone" disabled></el-input>
           </el-form-item>
            <el-form-item label="紧急情况联系人:" :label-width="formLabelWidth">
               <el-input v-model="fromData.contactName" disabled></el-input>
           </el-form-item>
            <el-form-item label="紧急情况联系人电话:" :label-width="formLabelWidth">
               <el-input v-model="fromData.contactPhone" disabled></el-input>
           </el-form-item>
             <el-form-item label="建档机构名称:" :label-width="formLabelWidth">
               <el-input v-model="fromData.createUnits" disabled></el-input>
           </el-form-item>
             <el-form-item label="机构联系电话:" :label-width="formLabelWidth">
               <el-input v-model="fromData.createPhone" disabled></el-input>
           </el-form-item>
             <el-form-item label="责任医生或护士:" :label-width="formLabelWidth">
               <el-input v-model="fromData.doctorName" disabled></el-input>
           </el-form-item>
             <el-form-item label="责任医生或护士联系电话:" :label-width="formLabelWidth">
               <el-input v-model="fromData.respPhone" disabled></el-input>
           </el-form-item>
            <el-form-item label="其他说明:" :label-width="formLabelWidth">
                 <el-input type="textarea" :rows="3" v-model="fromData.otherDesc" disabled></el-input>
           </el-form-item>
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
            name: '',
            sex: '',
            birthDate: '',
            createPhone: '',
            createUnits: '',
            otherDesc: '',
            respPhone: '',
            healthfileNum: '',
            doctorName: '',
            contactPhone: '',
            contactName: '',
            homePhone: '',
            blood: '',
            rhBlood: '',
            chronic: '',
            allergy: '',
            currentAddress: ''
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
        // this.getCurAddress();
        this.getUserInfoApi();
    },
    watch: {
        // 监听父组件字段更改
        record: function(newData, oldData) {
            extend(this.fromData, newData.row);
            let initData = this.$options.data();
            extend(this.fromData, initData.fromData, newData.row);
            this.curUserInfoPars();
            this.getUserInfoApi();
        }
    },
    methods: {
         curUserInfoPars() {
            // 基本信息解析
            let _this = this.fromData;
            _this.sex = _this.sex === 2 ? '女' : '男';
        },
        getUserInfoApi() {
            const params = {idcard: this.fromData.idcard}
            extend(params, defaultMachineParam);
            this.axios.post('SihealIMManagement/health_file/get_health_card', params).then(res => {
                extend(this.fromData, updateKeyUnder(res.data || {}));
                 this.curUserInfoPars();
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