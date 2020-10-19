<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 组件 查看个人信息档案
--%>
<template>

<div class="index">
      <el-form>
          <el-form-item class="item-title">查看或修改居民档案</el-form-item>
          <el-form-item label="档案首页编号:" :label-width="formLabelWidth">
             <el-input v-model="fromData.healthfileNum" placeholder="档案首页编号" disabled></el-input>
           </el-form-item>
           <el-form-item label="居民姓名:" :label-width="formLabelWidth">
             <el-input v-model="fromData.name" placeholder="居民姓名" disabled></el-input>
           </el-form-item>
            <el-form-item label="性别:" :label-width="formLabelWidth">
             <el-input v-model="fromData.sexName" placeholder="性别" disabled></el-input>
           </el-form-item>
            <el-form-item label="居民编号:" :label-width="formLabelWidth">
             <el-input v-model="fromData.no_number" placeholder="居民编号" disabled></el-input>
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
             <!-- <el-input v-model="birthDate"  placeholder="出生日期" disabled></el-input> -->
           </el-form-item>
           <el-form-item label="身份证号:" :label-width="formLabelWidth">
             <el-input v-model="fromData.idcard" placeholder="身份证号" disabled></el-input>
           </el-form-item>
            <el-form-item label="工作单位:" :label-width="formLabelWidth">
             <el-input v-model="fromData.workunit" placeholder="工作单位"></el-input>
           </el-form-item>
            <el-form-item label="本人电话:" :label-width="formLabelWidth">
             <el-input v-model="fromData.selfphone" placeholder="本人电话"></el-input>
           </el-form-item>
            <el-form-item label="联系人姓名:" :label-width="formLabelWidth">
             <el-input v-model="fromData.contactName" placeholder="联系人姓名"></el-input>
           </el-form-item>
           <el-form-item label="联系人电话:" :label-width="formLabelWidth">
             <el-input v-model="fromData.contactPhone" placeholder="联系人电话" ></el-input>
           </el-form-item>
            <el-form-item label="常住类型:" :label-width="formLabelWidth">
              <el-select v-model="fromData.permanent" placeholder="常住类型">
                  <el-option
                      v-for="item in censusArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="民族:" :label-width="formLabelWidth">
              <el-select v-model="fromData.ethnic" placeholder="民族">
                  <el-option
                      v-for="item in nationalArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
             <el-form-item label="血型:" :label-width="formLabelWidth">
              <el-select v-model="fromData.blood" placeholder="血型">
                  <el-option
                      v-for="item in bloodTypeArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="是否RH血型:" :label-width="formLabelWidth">
              <el-select v-model="fromData.rhBlood" placeholder="是否RH血型">
                  <el-option
                      v-for="item in rhbloodArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="文化程度:" :label-width="formLabelWidth">
              <el-select v-model="fromData.cultrue" placeholder="文化程度">
                  <el-option
                      v-for="item in culTrueOptionArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="职业:" :label-width="formLabelWidth">
              <el-select v-model="fromData.occuption" placeholder="职业">
                  <el-option
                      v-for="item in workUnitsArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="职业:" :label-width="formLabelWidth">
              <el-select v-model="fromData.marrage" placeholder="职业">
                  <el-option
                      v-for="item in marrageArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="医疗费用支付方式:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.paymentArray">
                    <el-checkbox label="1">城镇职工基本医疗保险</el-checkbox>
                    <el-checkbox label="2">城镇居民基本医疗保险</el-checkbox>
                    <el-checkbox label="3">新型农村合作医疗</el-checkbox>
                    <el-checkbox label="4">贫困救助</el-checkbox>
                    <el-checkbox label="5">商业医疗保险</el-checkbox>
                    <el-checkbox label="6">全公费</el-checkbox>
                    <el-checkbox label="7">全自费</el-checkbox>
                    <el-checkbox label="8">其他</el-checkbox>
                </el-checkbox-group>
           </el-form-item>
            <el-form-item label="其他医疗费用支付方式:" :label-width="formLabelWidth">
             <el-input v-model="fromData.otherpay" placeholder="其他医疗费用支付方式"></el-input>
           </el-form-item>
           <el-form-item label="药物过敏史:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.hasDrug" label="2">有</el-radio>
              <el-radio v-model="fromData.hasDrug" label="1">无</el-radio>
           </el-form-item>
             <el-form-item label="药物过敏史:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.drugAllergy">
                    <el-checkbox label="2">青霉素</el-checkbox>
                    <el-checkbox label="3">磺胺</el-checkbox>
                    <el-checkbox label="4">链霉素</el-checkbox>
                    <el-checkbox label="5">其他<el-input class="other-input" v-model="fromData.otherDrug" placeholder="其他疾病"></el-input></el-checkbox>
                </el-checkbox-group>
           </el-form-item>
            <el-form-item label="暴露史:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.hasExposure" label="2">有</el-radio>
              <el-radio v-model="fromData.hasExposure" label="1">无</el-radio>
           </el-form-item>
            <el-form-item label="暴露史:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.exposure">
                    <el-checkbox label="2">化学品</el-checkbox>
                    <el-checkbox label="3">毒物</el-checkbox>
                    <el-checkbox label="4">射线</el-checkbox>
                </el-checkbox-group>
           </el-form-item>
           <!-- 既往史 -->
           <el-form-item class="item-title">既往史</el-form-item>
           <el-form-item>疾病</el-form-item>
           <el-form-item label="疾病1:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.disease1Has1" label="0" @change="checkChangeAll(1)">有</el-radio>
              <el-radio v-model="fromData.disease1Has1" label="1" @change="checkChangeAll(1)">无</el-radio>
           </el-form-item>
            <el-form-item label="名称1:" :label-width="formLabelWidth" v-show="fromData.disease1Has1 === '0'">
              <el-radio v-model="fromData.disease1" label="2">高血压</el-radio>
              <el-radio v-model="fromData.disease1" label="3">糖尿病</el-radio>
              <el-radio v-model="fromData.disease1" label="4">冠心病</el-radio>
              <el-radio v-model="fromData.disease1" label="5">慢性阻塞性肺疾病</el-radio>
              <el-radio v-model="fromData.disease1" label="6">恶性肿瘤</el-radio>
              <el-radio v-model="fromData.disease1" label="7">脑卒中</el-radio>
              <el-radio v-model="fromData.disease1" label="8">重性精神疾病</el-radio>
              <el-radio v-model="fromData.disease1" label="9">结核病</el-radio>
              <el-radio v-model="fromData.disease1" label="10">肝炎</el-radio>
              <el-radio v-model="fromData.disease1" label="11">其他法定传染病</el-radio>
              <el-radio v-model="fromData.disease1" label="12">职业病</el-radio>
              <el-radio v-model="fromData.disease1" label="13">其他<el-input class="other-input" v-model="fromData.otherDisease1" placeholder="其他疾病"></el-input></el-radio>
              
           </el-form-item>
            <el-form-item label="确诊时间1:" :label-width="formLabelWidth" v-show="fromData.disease1Has1 === '0'">
                <el-date-picker
                    v-model="fromData.diseaseTruetime1"
                    align="right"
                    type="date"
                    placeholder="确诊时间1"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
            <el-form-item label="疾病2:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.disease1Has2" label="0" @change="checkChangeAll(2)">有</el-radio>
              <el-radio v-model="fromData.disease1Has2" label="1" @change="checkChangeAll(2)">无</el-radio>
           </el-form-item>
            <el-form-item label="名称2:" :label-width="formLabelWidth" v-show="fromData.disease1Has2 === '0'">
              <el-radio v-model="fromData.disease2" label="2" @change="checkChange(2)">高血压</el-radio>
              <el-radio v-model="fromData.disease2" label="3" @change="checkChange(2)">糖尿病</el-radio>
              <el-radio v-model="fromData.disease2" label="4" @change="checkChange(2)">冠心病</el-radio>
              <el-radio v-model="fromData.disease2" label="5" @change="checkChange(2)">慢性阻塞性肺疾病</el-radio>
              <el-radio v-model="fromData.disease2" label="6" @change="checkChange(2)">恶性肿瘤</el-radio>
              <el-radio v-model="fromData.disease2" label="7" @change="checkChange(2)">脑卒中</el-radio>
              <el-radio v-model="fromData.disease2" label="8" @change="checkChange(2)">重性精神疾病</el-radio>
              <el-radio v-model="fromData.disease2" label="9" @change="checkChange(2)">结核病</el-radio>
              <el-radio v-model="fromData.disease2" label="10" @change="checkChange(2)">肝炎</el-radio>
              <el-radio v-model="fromData.disease2" label="11" @change="checkChange(2)">其他法定传染病</el-radio>
              <el-radio v-model="fromData.disease2" label="12" @change="checkChange(2)">职业病</el-radio>
              <el-radio v-model="fromData.disease2" label="13" @change="checkChange(2)">其他<el-input class="other-input" v-model="fromData.otherDisease2" placeholder="其他疾病"></el-input></el-radio>
              
           </el-form-item>
            <el-form-item label="确诊时间2:" :label-width="formLabelWidth" v-show="fromData.disease1Has2 === '0'">
                <el-date-picker
                    v-model="fromData.diseaseTruetime2"
                    align="right"
                    type="date"
                    placeholder="确诊时间2"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
            <el-form-item label="疾病3:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.disease1Has3" label="0" @change="checkChangeAll(3)">有</el-radio>
              <el-radio v-model="fromData.disease1Has3" label="1" @change="checkChangeAll(3)">无</el-radio>
           </el-form-item>
            <el-form-item label="名称3:" :label-width="formLabelWidth" v-show="fromData.disease1Has3 === '0'">
              <el-radio v-model="fromData.disease3" label="2" @change="checkChange(3)">高血压</el-radio>
              <el-radio v-model="fromData.disease3" label="3" @change="checkChange(3)">糖尿病</el-radio>
              <el-radio v-model="fromData.disease3" label="4" @change="checkChange(3)">冠心病</el-radio>
              <el-radio v-model="fromData.disease3" label="5" @change="checkChange(3)">慢性阻塞性肺疾病</el-radio>
              <el-radio v-model="fromData.disease3" label="6" @change="checkChange(3)">恶性肿瘤</el-radio>
              <el-radio v-model="fromData.disease3" label="7" @change="checkChange(3)">脑卒中</el-radio>
              <el-radio v-model="fromData.disease3" label="8" @change="checkChange(3)">重性精神疾病</el-radio>
              <el-radio v-model="fromData.disease3" label="9" @change="checkChange(3)">结核病</el-radio>
              <el-radio v-model="fromData.disease3" label="10" @change="checkChange(3)">肝炎</el-radio>
              <el-radio v-model="fromData.disease3" label="11" @change="checkChange(3)">其他法定传染病</el-radio>
              <el-radio v-model="fromData.disease3" label="12" @change="checkChange(3)">职业病</el-radio>
              <el-radio v-model="fromData.disease3" label="13" @change="checkChange(3)">其他<el-input class="other-input" v-model="fromData.otherDisease3" placeholder="其他疾病"></el-input></el-radio>
              
           </el-form-item>
            <el-form-item label="确诊时间3:" :label-width="formLabelWidth" v-show="fromData.disease1Has3 === '0'">
                <el-date-picker
                    v-model="fromData.diseaseTruetime3"
                    align="right"
                    type="date"
                    placeholder="确诊时间3"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="疾病4:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.disease1Has4" label="0" @change="checkChangeAll(4)">有</el-radio>
              <el-radio v-model="fromData.disease1Has4" label="1" @change="checkChangeAll(4)">无</el-radio>
           </el-form-item>
            <el-form-item label="名称4:" :label-width="formLabelWidth" v-show="fromData.disease1Has4 === '0'">
              <el-radio v-model="fromData.disease4" label="2" @change="checkChange(4)">高血压</el-radio>
              <el-radio v-model="fromData.disease4" label="3" @change="checkChange(4)">糖尿病</el-radio>
              <el-radio v-model="fromData.disease4" label="4" @change="checkChange(4)">冠心病</el-radio>
              <el-radio v-model="fromData.disease4" label="5" @change="checkChange(4)">慢性阻塞性肺疾病</el-radio>
              <el-radio v-model="fromData.disease4" label="6" @change="checkChange(4)">恶性肿瘤</el-radio>
              <el-radio v-model="fromData.disease4" label="7" @change="checkChange(4)">脑卒中</el-radio>
              <el-radio v-model="fromData.disease4" label="8" @change="checkChange(4)">重性精神疾病</el-radio>
              <el-radio v-model="fromData.disease4" label="9" @change="checkChange(4)">结核病</el-radio>
              <el-radio v-model="fromData.disease4" label="10" @change="checkChange(4)">肝炎</el-radio>
              <el-radio v-model="fromData.disease4" label="11" @change="checkChange(4)">其他法定传染病</el-radio>
              <el-radio v-model="fromData.disease4" label="12" @change="checkChange(4)">职业病</el-radio>
              <el-radio v-model="fromData.disease4" label="13" @change="checkChange(4)">其他<el-input class="other-input" v-model="fromData.otherDisease4" placeholder="其他疾病"></el-input></el-radio>
           </el-form-item>
            <el-form-item label="确诊时间4:" :label-width="formLabelWidth" v-show="fromData.disease1Has4 === '0'">
                <el-date-picker
                    v-model="fromData.diseaseTruetime4"
                    align="right"
                    type="date"
                    placeholder="确诊时间4"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="疾病5:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.disease1Has5" label="0" @change="checkChangeAll(5)">有</el-radio>
              <el-radio v-model="fromData.disease1Has5" label="1" @change="checkChangeAll(5)">无</el-radio>
           </el-form-item>
            <el-form-item label="名称5:" :label-width="formLabelWidth" v-show="fromData.disease1Has5 === '0'">
              <el-radio v-model="fromData.disease5" label="2" @change="checkChange(5)">高血压</el-radio>
              <el-radio v-model="fromData.disease5" label="3" @change="checkChange(5)">糖尿病</el-radio>
              <el-radio v-model="fromData.disease5" label="4" @change="checkChange(5)">冠心病</el-radio>
              <el-radio v-model="fromData.disease5" label="5" @change="checkChange(5)">慢性阻塞性肺疾病</el-radio>
              <el-radio v-model="fromData.disease5" label="6" @change="checkChange(5)">恶性肿瘤</el-radio>
              <el-radio v-model="fromData.disease5" label="7" @change="checkChange(5)">脑卒中</el-radio>
              <el-radio v-model="fromData.disease5" label="8" @change="checkChange(5)">重性精神疾病</el-radio>
              <el-radio v-model="fromData.disease5" label="9" @change="checkChange(5)">结核病</el-radio>
              <el-radio v-model="fromData.disease5" label="10" @change="checkChange(5)">肝炎</el-radio>
              <el-radio v-model="fromData.disease5" label="11" @change="checkChange(5)">其他法定传染病</el-radio>
              <el-radio v-model="fromData.disease5" label="12" @change="checkChange(5)">职业病</el-radio>
              <el-radio v-model="fromData.disease5" label="13" @change="checkChange(5)">其他<el-input class="other-input" v-model="fromData.otherDisease5" placeholder="其他疾病"></el-input></el-radio>
           </el-form-item>
            <el-form-item label="确诊时间5:" :label-width="formLabelWidth" v-show="fromData.disease1Has5 === '0'">
                <el-date-picker
                    v-model="fromData.diseaseTruetime5"
                    align="right"
                    type="date"
                    placeholder="确诊时间5"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="疾病6:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.disease1Has6" label="0" @change="checkChangeAll(6)">有</el-radio>
              <el-radio v-model="fromData.disease1Has6" label="1" @change="checkChangeAll(6)">无</el-radio>
           </el-form-item>
            <el-form-item label="名称6:" :label-width="formLabelWidth" v-show="fromData.disease1Has6 === '0'">
              <el-radio v-model="fromData.disease6" label="2" @change="checkChange(6)">高血压</el-radio>
              <el-radio v-model="fromData.disease6" label="3" @change="checkChange(6)">糖尿病</el-radio>
              <el-radio v-model="fromData.disease6" label="4" @change="checkChange(6)">冠心病</el-radio>
              <el-radio v-model="fromData.disease6" label="5" @change="checkChange(6)">慢性阻塞性肺疾病</el-radio>
              <el-radio v-model="fromData.disease6" label="6" @change="checkChange(6)">恶性肿瘤</el-radio>
              <el-radio v-model="fromData.disease6" label="7" @change="checkChange(6)">脑卒中</el-radio>
              <el-radio v-model="fromData.disease6" label="8" @change="checkChange(6)">重性精神疾病</el-radio>
              <el-radio v-model="fromData.disease6" label="9" @change="checkChange(6)">结核病</el-radio>
              <el-radio v-model="fromData.disease6" label="10" @change="checkChange(6)">肝炎</el-radio>
              <el-radio v-model="fromData.disease6" label="11" @change="checkChange(6)">其他法定传染病</el-radio>
              <el-radio v-model="fromData.disease6" label="12" @change="checkChange(6)">职业病</el-radio>
              <el-radio v-model="fromData.disease6" label="13" @change="checkChange(6)">其他<el-input class="other-input" v-model="fromData.otherDisease6" placeholder="其他疾病"></el-input></el-radio>
           </el-form-item>
            <el-form-item label="确诊时间6:" :label-width="formLabelWidth" v-show="fromData.disease1Has6 === '0'">
                <el-date-picker
                    v-model="fromData.diseaseTruetime6"
                    align="right"
                    type="date"
                    placeholder="确诊时间6"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item>手术</el-form-item>
            <el-form-item label="手术1:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.operation1" label="2">有</el-radio>
              <el-radio v-model="fromData.operation1" label="1">无</el-radio>
           </el-form-item>
           <el-form-item label="名称1:" :label-width="formLabelWidth" v-show="fromData.operation1 === '2'">
             <el-input v-model="fromData.operationName1" placeholder="名称1"></el-input>
           </el-form-item>
              <el-form-item label="时间1:" :label-width="formLabelWidth" v-show="fromData.operation1 === '2'">
                <el-date-picker
                    v-model="fromData.operationTime1"
                    align="right"
                    type="date"
                    placeholder="时间1"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="手术2:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.operation2" label="2">有</el-radio>
              <el-radio v-model="fromData.operation2" label="1">无</el-radio>
           </el-form-item>
           <el-form-item label="名称2:" :label-width="formLabelWidth" v-show="fromData.operation2 === '2'">
             <el-input v-model="fromData.operationName2" placeholder="名称2"></el-input>
           </el-form-item>
              <el-form-item label="时间2:" :label-width="formLabelWidth" v-show="fromData.operation2 === '2'">
                <el-date-picker
                    v-model="fromData.operationTime2"
                    align="right"
                    type="date"
                    placeholder="时间2"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item>外伤</el-form-item>
            <el-form-item label="外伤1:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.trauma1" label="2">有</el-radio>
              <el-radio v-model="fromData.trauma1" label="1">无</el-radio>
           </el-form-item>
           <el-form-item label="名称1:" :label-width="formLabelWidth" v-show="fromData.trauma1 === '2'">
             <el-input v-model="fromData.traumaName1" placeholder="名称1"></el-input>
           </el-form-item>
              <el-form-item label="时间1:" :label-width="formLabelWidth" v-show="fromData.trauma1 === '2'">
                <el-date-picker
                    v-model="fromData.traumaTime1"
                    align="right"
                    type="date"
                    placeholder="时间1"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
             <el-form-item label="外伤2:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.trauma2" label="2">有</el-radio>
              <el-radio v-model="fromData.trauma2" label="1">无</el-radio>
           </el-form-item>
           <el-form-item label="名称2:" :label-width="formLabelWidth" v-show="fromData.trauma2 === '2'">
             <el-input v-model="fromData.traumaName2" placeholder="名称2"></el-input>
           </el-form-item>
              <el-form-item label="时间2:" :label-width="formLabelWidth" v-show="fromData.trauma2 === '2'">
                <el-date-picker
                    v-model="fromData.traumaTime2"
                    align="right"
                    type="date"
                    placeholder="时间2"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item>输血</el-form-item>
            <el-form-item label="输血1:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.sblood1" label="2">有</el-radio>
              <el-radio v-model="fromData.sblood1" label="1">无</el-radio>
           </el-form-item>
           <el-form-item label="原因1:" :label-width="formLabelWidth" v-show="fromData.sblood1 === '2'">
             <el-input v-model="fromData.sbloodName1" placeholder="原因1"></el-input>
           </el-form-item>
              <el-form-item label="时间1:" :label-width="formLabelWidth" v-show="fromData.sblood1 === '2'">
                <el-date-picker
                    v-model="fromData.sbloodTime1"
                    align="right"
                    type="date"
                    placeholder="时间1"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="输血2:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.sblood2" label="2">有</el-radio>
              <el-radio v-model="fromData.sblood2" label="1">无</el-radio>
           </el-form-item>
           <el-form-item label="原因2:" :label-width="formLabelWidth" v-show="fromData.sblood2 === '2'">
             <el-input v-model="fromData.sbloodName2" placeholder="原因2"></el-input>
           </el-form-item>
              <el-form-item label="时间2:" :label-width="formLabelWidth" v-show="fromData.sblood2 === '2'">
                <el-date-picker
                    v-model="fromData.sbloodTime2"
                    align="right"
                    type="date"
                    placeholder="时间2"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
           <!-- 家族史 -->
           <el-form-item class="item-title">家族史</el-form-item>
            <el-form-item label="家族史父亲:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.fatherHistory" label="1">有</el-radio>
              <el-radio v-model="fromData.fatherHistory" label="0">无</el-radio>
           </el-form-item>
            <el-form-item label="遗传病名称:" :label-width="formLabelWidth" v-show="fromData.fatherHistory === '1'">
               <el-checkbox-group v-model="fromData.familyFather">
                    <el-checkbox label="2">高血压</el-checkbox>
                    <el-checkbox label="3">糖尿病</el-checkbox>
                    <el-checkbox label="4">冠心病</el-checkbox>
                    <el-checkbox label="5">慢性阻塞性肺疾病</el-checkbox>
                    <el-checkbox label="6">恶性肿瘤</el-checkbox>
                    <el-checkbox label="7">脑卒中</el-checkbox>
                    <el-checkbox label="8">重性精神疾病</el-checkbox>
                    <el-checkbox label="9">结核病</el-checkbox>
                    <el-checkbox label="10">肝炎</el-checkbox>
                    <el-checkbox label="11">先天畸形</el-checkbox>
                    <el-checkbox label="12">其他 <el-input class="other-input" v-model="fromData.fatherOther" placeholder="其他疾病"></el-input></el-checkbox>
                </el-checkbox-group>
           </el-form-item>
           <el-form-item label="家族史母亲:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.motherHistory" label="1">有</el-radio>
              <el-radio v-model="fromData.motherHistory" label="0">无</el-radio>
           </el-form-item>
            <el-form-item label="遗传病名称:" :label-width="formLabelWidth" v-show="fromData.motherHistory === '1'">
               <el-checkbox-group v-model="fromData.familyMother">
                    <el-checkbox label="2">高血压</el-checkbox>
                    <el-checkbox label="3">糖尿病</el-checkbox>
                    <el-checkbox label="4">冠心病</el-checkbox>
                    <el-checkbox label="5">慢性阻塞性肺疾病</el-checkbox>
                    <el-checkbox label="6">恶性肿瘤</el-checkbox>
                    <el-checkbox label="7">脑卒中</el-checkbox>
                    <el-checkbox label="8">重性精神疾病</el-checkbox>
                    <el-checkbox label="9">结核病</el-checkbox>
                    <el-checkbox label="10">肝炎</el-checkbox>
                    <el-checkbox label="11">先天畸形</el-checkbox>
                    <el-checkbox label="12">其他 <el-input class="other-input" v-model="fromData.motherOther" placeholder="其他疾病"></el-input></el-checkbox>
                </el-checkbox-group>
           </el-form-item>
             <el-form-item label="家族史兄弟姐妹:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.brotherHistory" label="1">有</el-radio>
              <el-radio v-model="fromData.brotherHistory" label="0">无</el-radio>
           </el-form-item>
            <el-form-item label="遗传病名称:" :label-width="formLabelWidth" v-show="fromData.brotherHistory === '1'">
               <el-checkbox-group v-model="fromData.familyBrother">
                    <el-checkbox label="2">高血压</el-checkbox>
                    <el-checkbox label="3">糖尿病</el-checkbox>
                    <el-checkbox label="4">冠心病</el-checkbox>
                    <el-checkbox label="5">慢性阻塞性肺疾病</el-checkbox>
                    <el-checkbox label="6">恶性肿瘤</el-checkbox>
                    <el-checkbox label="7">脑卒中</el-checkbox>
                    <el-checkbox label="8">重性精神疾病</el-checkbox>
                    <el-checkbox label="9">结核病</el-checkbox>
                    <el-checkbox label="10">肝炎</el-checkbox>
                    <el-checkbox label="11">先天畸形</el-checkbox>
                    <el-checkbox label="12">其他 <el-input class="other-input" v-model="fromData.brotherOther" placeholder="其他疾病"></el-input></el-checkbox>
                </el-checkbox-group>
           </el-form-item>
              <el-form-item label="家族史子女:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.childrenHistory" label="1">有</el-radio>
              <el-radio v-model="fromData.childrenHistory" label="0">无</el-radio>
           </el-form-item>
            <el-form-item label="遗传病名称:" :label-width="formLabelWidth" v-show="fromData.childrenHistory === '1'">
               <el-checkbox-group v-model="fromData.familyChildren">
                    <el-checkbox label="2">高血压</el-checkbox>
                    <el-checkbox label="3">糖尿病</el-checkbox>
                    <el-checkbox label="4">冠心病</el-checkbox>
                    <el-checkbox label="5">慢性阻塞性肺疾病</el-checkbox>
                    <el-checkbox label="6">恶性肿瘤</el-checkbox>
                    <el-checkbox label="7">脑卒中</el-checkbox>
                    <el-checkbox label="8">重性精神疾病</el-checkbox>
                    <el-checkbox label="9">结核病</el-checkbox>
                    <el-checkbox label="10">肝炎</el-checkbox>
                    <el-checkbox label="11">先天畸形</el-checkbox>
                    <el-checkbox label="12">其他 <el-input class="other-input" v-model="fromData.childrenOther" placeholder="其他疾病"></el-input></el-checkbox>
                </el-checkbox-group>
           </el-form-item>
            <el-form-item label="遗传病史:" :label-width="formLabelWidth">
              <el-radio v-model="fromData.geneticHistory" label="1">有</el-radio>
              <el-radio v-model="fromData.geneticHistory" label="0">无</el-radio>
           </el-form-item>
            <el-form-item label="遗传病名称:" :label-width="formLabelWidth" v-show="fromData.geneticHistory === '1'">
             <el-input v-model="fromData.otherGenetic" placeholder="遗传病名称"></el-input>
           </el-form-item>
           <el-form-item label="残疾情况:" :label-width="formLabelWidth" v-show="fromData.geneticHistory === '1'">
             <el-checkbox-group v-model="fromData.disability">
                    <el-checkbox label="1"> 无残疾</el-checkbox>
                    <el-checkbox label="2">视力残疾</el-checkbox>
                    <el-checkbox label="3">听力残疾</el-checkbox>
                    <el-checkbox label="4">言语残疾</el-checkbox>
                    <el-checkbox label="5">肢体残疾</el-checkbox>
                    <el-checkbox label="6">智力残疾</el-checkbox>
                    <el-checkbox label="7">精神残疾</el-checkbox>
                    <el-checkbox label="8"> 其他残疾 <el-input class="other-input" v-model="fromData.otherDisability" placeholder="其他疾病"></el-input></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- 生活环境 -->
           <el-form-item class="item-title">生活环境</el-form-item>
           <el-form-item label="厨房排风设施:" :label-width="formLabelWidth">
              <el-select v-model="fromData.kitchen" placeholder="厨房排风设施">
                  <el-option
                      v-for="item in kitchenArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="燃料类型:" :label-width="formLabelWidth">
              <el-select v-model="fromData.fuel" placeholder="燃料类型">
                  <el-option
                      v-for="item in fuelArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="饮水:" :label-width="formLabelWidth">
              <el-select v-model="fromData.drinkwater" placeholder="饮水">
                  <el-option
                      v-for="item in drinkwaterArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="厕所:" :label-width="formLabelWidth">
              <el-select v-model="fromData.wc" placeholder="厕所">
                  <el-option
                      v-for="item in wcArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
            <el-form-item label="禽畜栏:" :label-width="formLabelWidth">
              <el-select v-model="fromData.livestock" placeholder="禽畜栏">
                  <el-option
                      v-for="item in livestockArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
           </el-form-item>
        </el-form>
</div>

</template>
<script>
  // 使用方法
  import { formatDate, extend, arrayStringToNumber } from '../../../assets/js/util.js';
  import Constants, { defaultCensus, defaultRhblood, defaultKitchen, defaultNational, defaultBloodType, defaultCulTrueOption, defaultWorkUnits, defaultMarrageState, defaultFuel, defaultDrinkwater, defaultWc, defaultLivestock } from '../../../Constants';

  export default {
    props: ['record'],
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
        formLabelWidth: '130px',
        fromData: {
            healthfileNum: '',
            no_number: '',
            birthDate: '',
            idcard: '',
            workunit: '',
            selfphone: '',
            contactName: '',
            contactPhone: '',
            permanent: '',
            cultrue: '',
            blood: '',
            rhBlood: '',
            ethnic: '',
            occuption: '',
            marrage: '',
            otherpay: '',
            otherDrug: '',
            hasDrug: '',
            drugAllergy: '',
            exposure: '',
            hasExposure: '',
            disease1Has1: '',
            disease1Has2: '',
            disease1Has3: '',
            disease1Has4: '',
            disease1Has5: '',
            disease1Has6: '',
            otherDisease1: '',
            otherDisease2: '',
            otherDisease3: '',
            otherDisease4: '',
            otherDisease5: '',
            otherDisease6: '',
            diseaseTruetime1: '',
            diseaseTruetime2: '',
            diseaseTruetime3: '',
            diseaseTruetime4: '',
            diseaseTruetime5: '',
            diseaseTruetime6: '',
            disease1: '',
            disease2: '',
            disease3: '',
            disease4: '',
            disease5: '',
            disease6: '',
            operation1: '',
            operation2: '',
            operationName1: '',
            operationName2: '',
            operationTime1: '',
            operationTime2: '',
            trauma1: '',
            trauma2: '',
            traumaName1: '',
            traumaName2: '',
            traumaTime1: '',
            traumaTime2: '',
            sblood1: '',
            sblood2: '',
            sbloodName1: '',
            sbloodName2: '',
            sbloodTime1: '',
            sbloodTime2: '',
            // BABA
            fatherHistory: '',
            fatherOther: '',
            familyFather: [],
            motherHistory: '',
            motherOther: '',
            familyMother: [],
            brotherHistory: '',
            brotherOther: '',
            familyBrother: [],
            childrenHistory: '',
            childrenOther: '',
            familyChildren: [],
            geneticHistory: '',
            otherGenetic: '',
            otherDisability: '',
            kitchen: '',
            fuel: '',
            drinkwater: '',
            livestock: '',
            wc: '',
            sexName: '',
            disability: [],
            paymentArray: []
        },
        kitchenArray: defaultKitchen,
        nationalArray: defaultNational,
        bloodTypeArray: defaultBloodType,
        culTrueOptionArray: defaultCulTrueOption,
        workUnitsArray: defaultWorkUnits,
        marrageArray: defaultMarrageState,
        fuelArray: defaultFuel,
        drinkwaterArray: defaultDrinkwater,
        wcArray: defaultWc,
        livestockArray: defaultLivestock,
        censusArray: defaultCensus,
        rhbloodArray: defaultRhblood
      }
    },
    created() {
        let _this = this.fromData;
        extend(_this, this.record.row);
        // 性别解析
        this.getUserInfo();
    },
    watch: {
        // 监听父组件字段更改
        record: function(newData, oldData) {
            if (!newData.row.recordsid) newData.row.recordsid = false;
            this.userInfoView = newData.row;
            extend(this.fromData, newData.row);
            this.getUserInfo();
        }
    },
    methods: {
        curUserInfoPars() {
            // 基本信息解析
            let _this = this.fromData;
            _this.sexName = _this.sex === 2 ? '女' : '男';
            _this.healthfileNum = _this.healthfileNum || _this.healthfile_num;
        },
        getUserInfo() {
            let _this = this.fromData;
            this.curUserInfoPars();

            // 异常处理
            if (!_this.recordsid) {
                let initData = this.$options.data();
                extend(_this, initData.fromData, this.userInfoView);
                this.curUserInfoPars();
                return
            };
            const params = {recordsid: _this.recordsid};
            extend(params, Constants.defaultMachineParam);
            this.axios.post('SihealIMManagement/health_file/get_health_record', params).then(res => {
                res = res || {};
                extend(_this, res.data);
                // 异步执行
                setTimeout(() => {
                    // 医疗费用支付方式解析
                    _this.paymentArray = arrayStringToNumber(_this.payment);
                    _this.drugAllergy = arrayStringToNumber(_this.drugAllergy);
                    _this.exposure = arrayStringToNumber(_this.exposure);
                    _this.hasDrug = ('' + _this.hasDrug || '1')
                    _this.hasExposure = ('' + _this.hasExposure || '1')
                    this.checkChange(1, true);
                    this.checkChange(2, true);
                    this.checkChange(3, true);
                    this.checkChange(4, true);
                    this.checkChange(5, true);
                    this.checkChange(6, true);
                    _this.operation1 = '' + _this.operation1
                    _this.operation2 = '' + _this.operation2
                    _this.trauma1 = '' + _this.trauma1;
                    _this.trauma2 = '' + _this.trauma2;
                    _this.sblood1 = '' + _this.sblood1;
                    _this.sblood2 = '' + _this.sblood2;
                    _this.familyFather = arrayStringToNumber(_this.familyFather);
                    _this.fatherHistory = _this.familyFather ? '1' : '0';
                    _this.familyMother = arrayStringToNumber(_this.familyMother);
                    _this.motherHistory = _this.familyMother ? '1' : '0';
                    _this.familyBrother = arrayStringToNumber(_this.familyBrother);
                    _this.brotherHistory = _this.familyBrother ? '1' : '0';
                    _this.familyChildren = arrayStringToNumber(_this.familyChildren);
                    _this.childrenHistory = _this.familyChildren ? '1' : '0';
                    _this.disability = arrayStringToNumber(_this.disability);
                    _this.geneticHistory = _this.disability ? '1' : '0';
                }, 0);
            })
        },
        checkChange(index, filter) {
            let _this = this.fromData;
             _this['disease1Has' + index] = _this['disease' + index] === 1 ? '1' : '0';
             if (filter) _this['disease' + index] = ('' + _this['disease' + index] || '')
        },
        checkChangeAll(index) {
            let _this = this.fromData;
            if (_this['disease1Has' + index] === '1') _this['disease' + index] = '';
        }
    }
  };
</script>
<style lang="scss" scoped>
.el-input{
    width:80%;
}
.el-date-picker,.el-select{
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
</style>
