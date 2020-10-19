<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 组件 获取医生列表
--%>
<template>

<div class="index">
      <el-form>
           <el-form-item label="责任医生：" :label-width="formLabelWidth">
              <el-select ref="doctor" v-model="fromData.doctorName" :disabled="isDisabled" @change='doctorNamefn' placeholder="请选择">
                    <el-option
                    v-for="item in doctorListArray"
                    :key="item.adminid"
                    :label="item.cname"
                    :value="item.adminid">
                    <span style="float: left">{{ item.cname }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px"> {{ (item.areaName || '') + ' ' + (item.orgName || '') }}</span>
                    </el-option>
                </el-select>
                <span class="red">必填</span>
           </el-form-item>
      </el-form>
</div>

</template>
<script>
  import { extend } from '../../../assets/js/util.js';
  import Constants from '../../../Constants';

  export default {
      props: ['record', 'disabled'],
    data() {           
      return {
          formLabelWidth: '120px',
          doctorListArray: [],
          isDisabled: false,
          fromData: {
               doctorValue: '',
               doctorName: '',
               curOrgName: ''
          }
         
      }
    },
    created() {
        this.getDoctorList();
        this.fromData.doctorName = this.record.doctorName;
        this.fromData.doctorValue = this.record.doctor;
        if (this.disabled) this.isDisabled = true;
    },
    watch: {
        record: function(n, o) {
            this.fromData.doctorName = n.row.doctorName;
            this.fromData.doctorValue = n.row.doctor;
        },
        disabled: function(n, o) {
            if (n.row.disabled) this.isDisabled = true;
        }
    },
    methods: {
       getDoctorList() {
        // 获取医生列表
         let params = {
                num_page: 100,
                page_no: 0
            };
        extend(params, Constants.defaultMachineParam)
        this.axios.post('SihealIMManagement/user/doctor_list', params).then(res => {
            console.log(res)
            res = res || {}
            this.doctorListArray = res.data_array || []
        })
       },
       doctorNamefn() {
        setTimeout(() => {
            this.fromData.doctorValue = this.$refs.doctor.selectedLabel;
        }, 200)
       },
       curOrgNamefn() {
         setTimeout(() => {
            this.fromData.curOrgName = this.$refs.curOrg.selectedLabel;
         }, 200)
       }
    }
  };
</script>
<style lang="scss" scoped>
    .el-input,.el-select{
        width:80%;
    }
</style>
