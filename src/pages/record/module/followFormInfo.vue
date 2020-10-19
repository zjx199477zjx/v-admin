<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 组件 随访表单提交
--%>
<template>

<div class="index">
      <el-form>
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="fromData.userName" placeholder="请填写您的真实姓名" maxlength="10" disabled></el-input>
           </el-form-item>
            <el-form-item label="编号：" :label-width="formLabelWidth">
              <el-input v-model="fromData.cardNum" placeholder="请填写您的真实姓名" maxlength="10" disabled></el-input>
           </el-form-item>
            <el-form-item label="随访日期：" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="fromData.followDate"
                    value-format="yyyy-MM-dd"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="随访方式：" :label-width="formLabelWidth">
               <el-select ref="curOrg" v-model="fromData.followType" placeholder="请选择">
                    <el-option
                    v-for="item in defaultFollowType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >
                    {{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="症状:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.symptoms">
                    <el-checkbox v-for="item in defaultSymptom" :key="item.value" :label="item.value" @change="symptomChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.symptoms_other" :placeholder="item.name"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
          </el-form-item>
          <el-form-item  class="item-title">体征</el-form-item>
           <el-form-item label="血压:" :label-width="formLabelWidth">
             <el-input v-model="fromData.bloodPressure" placeholder="血压(左侧)"></el-input><span class="item-unit">mmHg</span><br/>
           </el-form-item>
            <el-form-item label="体重:" :label-width="formLabelWidth">
             <el-input v-model="fromData.weight" placeholder="体重"></el-input><span class="item-unit">kg</span><br/>
           </el-form-item>
            <el-form-item label="体质指数(BMI):" :label-width="formLabelWidth">
             <el-input v-model="fromData.bmi" placeholder="体质指数(BMI)"></el-input><span class="item-unit">Kg/m²</span><br/>
           </el-form-item>
            <el-form-item label="心 率 :" :label-width="formLabelWidth">
             <el-input v-model="fromData.heartRate" placeholder="心率"></el-input>
           </el-form-item>
            <el-form-item label="其 他  :" :label-width="formLabelWidth">
             <el-input v-model="fromData.hbpOther" placeholder="其 他 "></el-input>
           </el-form-item>
           <el-form-item  class="item-title">生活方式指导</el-form-item>

            <el-form-item label="日吸烟量:" :label-width="formLabelWidth">
             <el-input v-model="fromData.smoking"></el-input><span class="item-unit">支</span>
           </el-form-item>
           <el-form-item label="日饮酒量:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drinking"></el-input><span class="item-unit">两</span>
          </el-form-item>
          <el-form-item label="运 动:" :label-width="formLabelWidth">
             <el-input v-model="fromData.movementWeeks"></el-input><span class="item-unit">次/周</span>
          </el-form-item>
           <el-form-item label="运 动:" :label-width="formLabelWidth">
             <el-input v-model="fromData.movementMinutes"></el-input><span class="item-unit">次/分钟</span>
          </el-form-item>
           <el-form-item label="摄盐情况(咸淡)：" :label-width="formLabelWidth">
               <el-select v-model="fromData.salt" placeholder="请选择">
                    <el-option
                    v-for="item in defaultSalt"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >{{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
                <el-form-item label="心理调整：" :label-width="formLabelWidth">
               <el-select v-model="fromData.psychological" placeholder="请选择">
                    <el-option
                    v-for="item in defaultBehavior"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >{{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
                <el-form-item label="遵医行为：" :label-width="formLabelWidth">
               <el-select v-model="fromData.behavior" placeholder="请选择">
                    <el-option
                    v-for="item in defaultBehavior"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >{{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="辅助检查:" :label-width="formLabelWidth">
             <el-input v-model="fromData.hbpHelp"></el-input>
           </el-form-item>
                  <el-form-item label="服药依从性：" :label-width="formLabelWidth">
               <el-select v-model="fromData.mAdherence" placeholder="请选择">
                    <el-option
                    v-for="item in defaultZmedcompli"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >{{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
                <el-form-item label="药物不良反应：" :label-width="formLabelWidth">
               <el-select v-model="fromData.mReactions" placeholder="请选择">
                    <el-option
                    v-for="item in defaultMReactions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >{{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="此次随访分类：" :label-width="formLabelWidth">
               <el-select v-model="fromData.hbpType" placeholder="请选择">
                    <el-option
                    v-for="item in defaultHbpType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >{{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
           <el-form-item  class="item-title">生活方式指导</el-form-item>
           <el-form-item label="药物名称1:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugName1"></el-input>
           </el-form-item>
            <el-form-item label="每日:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugDay1"></el-input><span class="item-unit">次</span>
           </el-form-item>
           <el-form-item label="每次:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugTime1"></el-input><span class="item-unit">mg</span>
           </el-form-item>
             <el-form-item label="药物名称2:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugName2"></el-input>
           </el-form-item>
            <el-form-item label="每日:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugDay2"></el-input><span class="item-unit">次</span>
           </el-form-item>
           <el-form-item label="每次:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugTime2"></el-input><span class="item-unit">mg</span>
           </el-form-item>
             <el-form-item label="药物名称3:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugName3"></el-input>
           </el-form-item>
            <el-form-item label="每日:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugDay3"></el-input><span class="item-unit">次</span>
           </el-form-item>
           <el-form-item label="每次:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugTime3"></el-input><span class="item-unit">mg</span>
           </el-form-item>

            <el-form-item label="其他药物:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugOtherName"></el-input>
           </el-form-item>
            <el-form-item label="每日:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugOtherDay"></el-input><span class="item-unit">次</span>
           </el-form-item>
           <el-form-item label="每次:" :label-width="formLabelWidth">
             <el-input v-model="fromData.drugOtherTime"></el-input><span class="item-unit">mg</span>
           </el-form-item>
            <el-form-item label="转 诊：" :label-width="formLabelWidth">
               <el-select v-model="fromData.referral" placeholder="请选择">
                    <el-option
                    v-for="item in defaultMReactions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    >{{item.name}}
                    </el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="转诊原因:" :label-width="formLabelWidth">
             <el-input v-model="fromData.referralReason"></el-input><span class="item-unit">mg</span>
           </el-form-item>
            <el-form-item label="转诊机构及科室:" :label-width="formLabelWidth">
             <el-input v-model="fromData.referralAgencies"></el-input><span class="item-unit">mg</span>
           </el-form-item>
             <el-form-item label="下次随访日期：" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="fromData.nextFollowDate"
                    value-format="yyyy-MM-dd"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
      </el-form>
     
</div>

</template>
<script>
  import { formatDate, extend, deleteArrayAttr } from '../../../assets/js/util.js';
  import Constants, { 
    defaultMachineParam,
    defaultFollowType,
    defaultSymptom, 
    defaultSalt, 
    defaultZmedcompli, 
    defaultMReactions, 
    defaultBehavior, 
    defaultHbpType } from '../../../Constants';
 
  export default {
    props: ['record', 'updateUrl'],
    data() {           
      return {
        fromData: {
            userName: '',
            cardNum: '',
            followDate: '',
            followType: 1,
            symptoms: [1],
            symptoms_other: '',
            bloodPressure: '',
            weight: '',
            bmi: '',
            heartRate: '',
            hbpOther: '',
            smoking: '',
            drinking: '',
            movementWeeks: '',
            movementMinutes: '',
            salt: 1,
            psychological: 1,
            behavior: 1,
            hbpHelp: '',
            mAdherence: 1,
            mReactions: 1,
            hbpType: 1,
            drugName1: '',
            drugName2: '',
            drugName3: '',
            drugDay1: '',
            drugDay2: '',
            drugDay3: '',
            drugTime1: '',
            drugTime2: '',
            drugTime3: '',
            drugOtherName: '',
            drugOtherDay: '',
            drugOtherTime: '',
            referralReason: '',
            referralAgencies: ''
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
        defaultFollowType: defaultFollowType,
        defaultSalt: defaultSalt,
        defaultBehavior: defaultBehavior,
        defaultZmedcompli: defaultZmedcompli,
        defaultMReactions: defaultMReactions,
        defaultHbpType: defaultHbpType,
        defaultSymptom: defaultSymptom
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
        },
        updateUrl: function(n, o) {
          this.updateUrl = n.updateUrl;
        }
    },
    methods: {
        updateMatch() {
          // 检测 解决字段命名不同的问题 和异常问题
          let curData = this.fromData;
          if (curData.name) curData.userName = curData.name;
          if (curData.healthfile_num) curData.cardNum = curData.healthfile_num;
          curData.nextFollowDate = typeof curData.nextFollowDate === 'number' ? formatDate(curData.nextFollowDate, 'Y-M-D') : curData.nextFollowDate;
        },
        getUserInfoApi() {
            this.updateMatch();
            if (!this.fromData.cardNum || !this.updateUrl) return;
            const params = {};
            params.id = this.fromData.id
            extend(params, defaultMachineParam);
            this.axios.post(this.updateUrl || 'SihealIMManagement/resource/get_district_fullname', params).then(res => {
                res = res || {};
                extend(this.fromData, res.data);
                this.updateMatch();
            })
        },
        symptomChange(val, item) {
            // 症状切换
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.symptoms = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.symptoms, 1);
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