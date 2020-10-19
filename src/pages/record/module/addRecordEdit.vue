<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 组件 表单
--%>
<template>

<div class="index">
      <el-form>
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="username" placeholder="请填写您的真实姓名" maxlength="10"></el-input>
           </el-form-item>
            <el-form-item label="身份证号码：" :label-width="formLabelWidth">
              <el-input v-model="card" placeholder="身份证号码" maxlength="30"></el-input>
              <span class="red">必填</span>
           </el-form-item>
            <el-form-item label="现住址：" :label-width="formLabelWidth">
              <el-input v-model="curAddress" placeholder="" maxlength="40"></el-input>
           </el-form-item>
           <el-form-item label="户籍地址：" :label-width="formLabelWidth">
              <el-input v-model="censusAddress" placeholder="" maxlength="40"></el-input>
           </el-form-item>
            <el-form-item label="联系电话：" :label-width="formLabelWidth">
              <el-input v-model="phoneValue" placeholder="" maxlength="40"></el-input>
           </el-form-item>
            <el-form-item label="建档单位：" :label-width="formLabelWidth">
               <el-select ref="curOrg" v-model="orgValue" @change='curOrgNamefn' placeholder="请选择">
                    <el-option
                    v-for="item in orgListArray"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px"> 自然人数（{{ item.population }}）</span>
                    </el-option>
                </el-select>
                <span class="red">必填</span>
           </el-form-item>
            <el-form-item label="建档人：" :label-width="formLabelWidth">
              <el-input v-model="createRecordRen" placeholder="" maxlength="10" disabled></el-input>
           </el-form-item>
           <el-form-item label="责任医生：" :label-width="formLabelWidth">
              <el-select ref="doctor" v-model="doctorValue" @change='doctorNamefn' placeholder="请选择">
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
           <el-form-item label="建档日期：" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="createDate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <span class="red">必填</span>
           </el-form-item>
      </el-form>
</div>

</template>
<script>
  import { extend } from '../../../assets/js/util.js';
  import Constants from '../../../Constants';

  export default {
 
    data() {           
      return {
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
          formLabelWidth: '120px',
          username: '',
          curAddress: '',
          censusAddress: '',
          orgListArray: [],
          doctorListArray: [],
          orgValue: '',
          phoneValue: '',
          doctorValue: '',
          createRecordRen: '',
          createDate: '',
          curOrgName: '',
          doctorName: '',
          card: ''
      }
    },
    created() {
        this.getOrgList();
        this.getDoctorList();
        this.createRecordRen = (this.$store.state.user || {}).username;
    },
    methods: {
       getOrgList() {
        //    获取机构列表
        let params = {
            num_page: 100,
            page_no: 0
        };
        extend(params, Constants.defaultMachineParam)
        this.axios.post('SihealIMManagement/resource/org_list', params).then(res => {
            res = res || {}
            this.orgListArray = res.data_array || []
        })
       },
       getDoctorList() {
        // 获取医生列表
         let params = {
                num_page: 100,
                page_no: 0
            };
        extend(params, Constants.defaultMachineParam)
        this.axios.post('SihealIMManagement/user/doctor_list', params).then(res => {
            res = res || {}
            this.doctorListArray = res.data_array || []
        })
       },
       doctorNamefn() {
        setTimeout(() => {
            this.doctorName = this.$refs.doctor.selectedLabel;
        }, 200)
       },
       curOrgNamefn() {
         setTimeout(() => {
            this.curOrgName = this.$refs.curOrg.selectedLabel;
         }, 200)
       }
    }
  };
</script>
<style lang="scss" scoped>
    .el-input,.el-select{
        width:80%;
    }
    .red{
        color:red;
    }
</style>
