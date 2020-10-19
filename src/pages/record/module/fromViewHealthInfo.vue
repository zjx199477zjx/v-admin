<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 组件 查看个人健康档案
--%>
<template>

<div class="index">
      <el-form>
          <el-form-item class="item-title">添加个人健康体检</el-form-item>
          <el-form-item label="居民名字:" :label-width="formLabelWidth">
                <el-input v-model="fromData.name" placeholder="居民名字" disabled></el-input>
          </el-form-item>
           <el-form-item label="体检编号:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjNumber" placeholder="体检编号" disabled></el-input>
           </el-form-item>
            <el-form-item label="体检日期:" :label-width="formLabelWidth">
             <!-- <el-input v-model="fromData.tjDate" placeholder="体检日期" disabled></el-input> -->
              <el-date-picker
                    v-model="fromData.tjDate"
                    align="right"
                    type="date"
                    placeholder="体检日期"
                    class="el-date-picker"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                </el-date-picker>
           </el-form-item>
         <el-form-item label="责任医生：" :label-width="formLabelWidth">
              <el-select ref="doctor" v-model="fromData.doctorValue" @change='doctorNamefn' placeholder="请选择">
                    <el-option
                    v-for="item in doctorListArray"
                    :key="item.adminid"
                    :label="item.cname"
                    :value="item.adminid">
                    <span style="float: left">{{ item.cname }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px"> {{ (item.areaName || '') + ' ' + (item.orgName || '') }}</span>
                    </el-option>
                </el-select>
         </el-form-item>
         <el-form-item class="item-title">检查项目</el-form-item>
         <el-form-item label="症状:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjSymptom">
                    <el-checkbox v-for="item in symptomArray" :key="item.value" :label="item.value" @change="symptomChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.tjSymptomOther" :placeholder="item.name"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
          </el-form-item>
          <el-form-item class="item-title">一般状况</el-form-item>
           <el-form-item label="体温:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjTw" placeholder="体温"></el-input><span class="item-unit">℃</span><br/>
             <span class="item-time">最近一次检测时间:{{fromData.tjTwlasttime}}</span>
           </el-form-item>
            <el-form-item label="脉率:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjPulse" placeholder="脉率"></el-input><span class="item-unit">次/分钟</span><br/>
             <span class="item-time">最近一次检测时间:{{fromData.tjPulselasttime}}</span>
           </el-form-item>
           <el-form-item label="呼吸频率:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjRespiratory" placeholder="呼吸频率"></el-input><span class="item-unit">次/分钟</span><br/>
             <!-- <span class="item-time">最近一次检测时间:{{fromData.tjPulselasttime}}</span> -->
           </el-form-item>
           <el-form-item label="血压(左侧):" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjBpressure" placeholder="血压(左侧)"></el-input><span class="item-unit">mmHg</span><br/>
             <span class="item-time">最近一次检测时间:{{fromData.tjBpressurelasttime}}</span>
           </el-form-item>
           <el-form-item label="血压(右侧):" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjBpressureDown" placeholder="血压(右侧)"></el-input><span class="item-unit">mmHg</span><br/>
             <span class="item-time">最近一次检测时间:{{fromData.tjBpressurelasttime}}</span>
           </el-form-item>
           <el-form-item label="身高:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjSg" placeholder="身高"></el-input><span class="item-unit">cm</span><br/>
           </el-form-item>
           <el-form-item label="体重:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjTz" placeholder="体重"></el-input><span class="item-unit">kg</span><br/>
           </el-form-item>
           <el-form-item label="腰围:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjYw" placeholder="腰围"></el-input><span class="item-unit">cm</span><br/>
           </el-form-item>
            <el-form-item label="体质指数(BMI):" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjConstitution" placeholder="体质指数(BMI)"></el-input><span class="item-unit">Kg/m²</span><br/>
           </el-form-item>
           <el-form-item class="item-title">老年人体检</el-form-item>
           <el-form-item label="老年人健康状态自我评估" :label-width="formLabelWidth">
            <el-select v-model="fromData.tjEha" placeholder="老年人健康状态自我评估">
                  <el-option
                      v-for="item in ehaArray"
                      :key="item.label"
                      :label="item.name"
                      :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="老年人生活自理能力自我评估" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjEsca" placeholder="老年人生活自理能力自我评估">
                    <el-option
                        v-for="item in escaArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="老年人认知功能:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjEcf" placeholder="老年人认知功能">
                    <el-option
                        v-for="item in ecfArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="简易智力状态检查总分:" :label-width="formLabelWidth">
                <el-input v-model="fromData.tjEcfScore" ></el-input>
            </el-form-item>
            <el-form-item label="老年人情感状态:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjEsp" placeholder="老年人认知功能">
                    <el-option
                        v-for="item in ecfArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="老年人抑郁评分检查总分:" :label-width="formLabelWidth">
                <el-input v-model="fromData.tjEspScore" ></el-input>
           </el-form-item>
           <el-form-item class="item-title">生活方式</el-form-item>
           <el-form-item>体育锻炼</el-form-item>
            <el-form-item label="体育锻炼频率:" :label-width="formLabelWidth">
             <!-- <el-input v-model="fromData.tjEspScore" ></el-input> -->
                <el-select v-model="fromData.tjExercise" placeholder="体育锻炼频率">
                    <el-option
                        v-for="item in exerciseArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="每次锻炼时间:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjEtime" ></el-input><span class="item-unit">分钟</span>
           </el-form-item>
           <el-form-item label="坚持锻炼时间:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjEyear" ></el-input><span class="item-unit">年</span>
           </el-form-item>
           <el-form-item label="锻炼方式:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjEway" ></el-input>
           </el-form-item>
            <el-form-item label="饮食习惯:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjEating">
                    <el-checkbox v-for="item in eatingArray" :key="item.value" :label="item.value">
                        {{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
          </el-form-item>
          <el-form-item>吸烟情况</el-form-item>
          <el-form-item label="吸烟状况:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjHabit" placeholder="吸烟状况">
                    <el-option
                        v-for="item in habitArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="日吸烟量:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjHday" :disabled="fromData.tjHabit === 1"></el-input><span class="item-unit">支</span>
          </el-form-item>
          <el-form-item label="开始吸烟年龄:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjHyear" :disabled="fromData.tjHabit === 1"></el-input><span class="item-unit">岁</span>
          </el-form-item>
          <el-form-item label="戒烟年龄:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjJhyear" :disabled="fromData.tjHabit === 1"></el-input><span class="item-unit">岁</span>
          </el-form-item>
          <el-form-item>饮酒情况</el-form-item>
          <el-form-item label="饮酒频率:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjDrinkw" placeholder="饮酒频率">
                    <el-option
                        v-for="item in drinkwArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="日饮酒量:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjDaydrinkw" :disabled="fromData.tjDrinkw === 1"></el-input><span class="item-unit">两</span>
          </el-form-item>
          <el-form-item label="是否戒酒:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjJdrinkw" :disabled="fromData.tjDrinkw === 1">
                    <el-option
                        v-for="item in jdrinkwArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="戒酒年龄:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjYearjdrinkw" :disabled="fromData.tjDrinkw === 1"></el-input><span class="item-unit">岁</span>
          </el-form-item>
          <el-form-item label="开始饮酒年龄:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjStartdrinkw" :disabled="fromData.tjDrinkw === 1"></el-input><span class="item-unit">岁</span>
          </el-form-item>
           <el-form-item label="近一年内是否曾醉酒:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjZuidrinkw" :disabled="fromData.tjDrinkw === 1">
                    <el-option
                        v-for="item in zuidrinkwArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
          </el-form-item>
           <el-form-item label="饮酒种类:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjZldrinkw">
                    <el-checkbox v-for="item in zldrinkwArray" :key="item.value" :label="item.value">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" v-model="fromData.tjZldrinkwother" :disabled="fromData.tjZldrinkw.indexOf(item.value) === -1" :placeholder="item.name"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
          </el-form-item>
          <el-form-item>职业病危害接触史</el-form-item>
          <el-form-item label="职业病危害接触史:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjOdech">
                    <el-option
                        v-for="item in odechArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
          </el-form-item>
           <el-form-item label="工种:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjWorktype"></el-input>
          </el-form-item>
           <el-form-item label="从业时间:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjWorkyear" ></el-input><span class="item-unit">年</span>
          </el-form-item>
          <el-form-item>毒物种类</el-form-item>
          <el-form-item label="粉尘:" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjContactDustpm"></el-input>
          </el-form-item>
           <el-form-item label="防护措施(粉尘):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjDustpm" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjDustpm" :label="2">有</el-radio>
               <el-input class="other-input" v-model="fromData.tjDustpmValue" :disabled="fromData.tjDustpm === 1"></el-input>
           </el-form-item>
            <el-form-item label="放射物质:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjContactRadiosubpm"></el-input>
            </el-form-item>
             <el-form-item label="防护措施(放射物质):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjRadiosubpm" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjRadiosubpm" :label="2">有</el-radio>
               <el-input class="other-input" v-model="fromData.tjRadiosubpmValue" :disabled="fromData.tjRadiosubpm === 1"></el-input>
           </el-form-item>
              <el-form-item label="物理因素:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjContactPhfactroypm"></el-input>
            </el-form-item>
             <el-form-item label="防护措施(物理因素):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjPhfactorypm" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjPhfactorypm" :label="2">有</el-radio>
               <el-input class="other-input" v-model="fromData.tjPhfactorypmValue" :disabled="fromData.tjPhfactorypm === 1"></el-input>
           </el-form-item>
            <el-form-item label="化学物质:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjContactChesupm"></el-input>
            </el-form-item>
             <el-form-item label="防护措施(化学物质):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjChesubpm" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjChesubpm" :label="2">有</el-radio>
               <el-input class="other-input" v-model="fromData.tjChesubpmValue" :disabled="fromData.tjChesubpm === 1"></el-input>
           </el-form-item>
            <el-form-item label="其他:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjContactOther"></el-input>
            </el-form-item>
              <el-form-item label="防护措施(其他):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjOtherpm" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjOtherpm" :label="2">有</el-radio>
               <el-input class="other-input" v-model="fromData.tjOtherpmValue" :disabled="fromData.tjOtherpm === 1"></el-input>
           </el-form-item>
            <!-- 脏器功能 -->
           <el-form-item class="item-title">脏器功能</el-form-item>
           <el-form-item>口腔</el-form-item>
           <el-form-item label="口唇:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjLips">
                    <el-option
                        v-for="item in lipsArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="齿列:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjDentition">
                    <el-option
                        v-for="item in dentitionArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="咽部:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjPharynx">
                    <el-option
                        v-for="item in pharynxArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
           <el-form-item>视力</el-form-item>
           <el-form-item label="左眼视力:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjLeftvision"></el-input>
           </el-form-item>
           <el-form-item label="右眼视力:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjRightvision"></el-input>
           </el-form-item>
           <el-form-item label="左眼矫正视力:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJleftvision"></el-input>
           </el-form-item>
            <el-form-item label="右眼矫正视力:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJrightvision"></el-input>
           </el-form-item>
            <el-form-item label="听力:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjListening">
                    <el-option
                        v-for="item in listeningArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
             <el-form-item label="运动功能:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjMotor">
                    <el-option
                        v-for="item in motorArray"
                        :key="item.label"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
           </el-form-item>
           <el-form-item class="item-title">查体</el-form-item>
           <el-form-item label="眼底:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjFundus" :label="1">正常</el-radio>
               <el-radio v-model="fromData.tjFundus" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjFundusy" :disabled="fromData.tjFundus === 1"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="皮肤:" :label-width="formLabelWidth">
                <el-radio v-for="item in skinArray" :key="item.value" v-model="fromData.tjSkin" :label="item.value">
                    {{item.name}}
                    <el-input class="other-input" v-if="item.other" v-model="fromData.tjOtherskin" :disabled="fromData.tjSkin !== item.value"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="巩膜:" :label-width="formLabelWidth">
                <el-radio v-for="item in sclearArray" :key="item.value" v-model="fromData.tjSclear" :label="item.value">
                    {{item.name}}
                    <el-input class="other-input" v-if="item.other" v-model="fromData.tjOthersclear" :disabled="fromData.tjSclear !== item.value"></el-input>
                </el-radio>
           </el-form-item>
           <el-form-item label="淋巴结:" :label-width="formLabelWidth">
                <el-radio v-for="item in nodesArray" :key="item.value" v-model="fromData.tjNodes" :label="item.value">
                    {{item.name}}
                    <el-input class="other-input" v-if="item.other" v-model="fromData.tjOthernodes" :disabled="fromData.tjNodes !== item.value"></el-input>
                </el-radio>
           </el-form-item>
           <el-form-item>肺</el-form-item>
            <el-form-item label="桶状胸(肺)" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjChest">
                    <el-option label="否" :value="1">否</el-option>
                    <el-option label="是" :value="2">是</el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="呼吸音(肺):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjSound" :label="1">正常</el-radio>
               <el-radio v-model="fromData.tjSound" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOthersound" :disabled="fromData.tjSound === 1"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="罗音(肺):" :label-width="formLabelWidth">
                <el-radio v-for="item in raleArray" :key="item.value" v-model="fromData.tjRale" :label="item.value">
                    {{item.name}}
                    <el-input class="other-input" v-if="item.other" v-model="fromData.tjOtherrale" :disabled="fromData.tjRale !== item.value"></el-input>
                </el-radio>
           </el-form-item>
           <el-form-item>心脏</el-form-item>
            <el-form-item label="心率(心脏):" :label-width="formLabelWidth">
             <el-input v-model="fromData.tjRate" ></el-input><span class="item-unit">次/分钟</span>
          </el-form-item>
           <el-form-item label="心律(心脏):" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjRhythm">
                    <el-option v-for="item in rhythmArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="杂音(心脏):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjNoise" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjNoise" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjNoiseValue" :disabled="fromData.tjNoise === 1"></el-input>
                </el-radio>
           </el-form-item>
           <el-form-item>腹部</el-form-item>
            <el-form-item label="压痛(腹部):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjTenderness" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjTenderness" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjOthertenderness" :disabled="fromData.tjTenderness === 1"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="包块(腹部):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjPiece" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjPiece" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjOtherpiece" :disabled="fromData.tjPiece === 1"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="肝大(腹部):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjLiver" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjLiver" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjOtherliver" :disabled="fromData.tjLiver === 1"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="脾大(腹部):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjSplg" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjSplg" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjOthersplg" :disabled="fromData.tjSplg === 1"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="移动性浊音(腹部):" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjDullness" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjDullness" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjOtherdullness" :disabled="fromData.tjDullness === 1"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="下肢水肿:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjEfet">
                    <el-option v-for="item in efetArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="足背动脉搏动:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjDartp">
                    <el-option v-for="item in dartpArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
                <br/><span class="item-time">糖尿病患者必须进行此项检查!</span>
           </el-form-item>
             <el-form-item label="肛门指诊(腹部):" :label-width="formLabelWidth">
                <el-radio v-for="item in refferralArray" :key="item.value" v-model="fromData.tjRefferral" :label="item.value">
                    {{item.name}}
                    <el-input class="other-input" v-if="item.other" v-model="fromData.tjOtherrefferral" :disabled="fromData.tjRefferral !== item.value"></el-input>
                </el-radio>
           </el-form-item>
            <el-form-item label="乳腺:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjBreast">
                    <el-checkbox v-for="item in breastArray" :key="item.value" :label="item.value" @change="breastChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.tjOtherbreast" :placeholder="item.name" :disabled="fromData.tjBreast.indexOf(item.value) === -1"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
          </el-form-item>
          <el-form-item>妇科</el-form-item>
          <el-form-item label="外阴:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjVulva" :label="1">未见异常</el-radio>
               <el-radio v-model="fromData.tjVulva" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOthervulva" :disabled="fromData.tjVulva === 1"></el-input>
               </el-radio>
          </el-form-item>
          <el-form-item label="阴道:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjVagina" :label="1">未见异常</el-radio>
               <el-radio v-model="fromData.tjVagina" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOthervagina" :disabled="fromData.tjVagina === 1"></el-input>
               </el-radio>
          </el-form-item>
          <el-form-item label="宫颈:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjCervical" :label="1">未见异常</el-radio>
               <el-radio v-model="fromData.tjCervical" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOthercervical" :disabled="fromData.tjCervical === 1"></el-input>
               </el-radio>
          </el-form-item>
           <el-form-item label="宫体:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjPalace" :label="1">未见异常</el-radio>
               <el-radio v-model="fromData.tjPalace" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOtherpalace" :disabled="fromData.tjPalace === 1"></el-input>
               </el-radio>
          </el-form-item>
          <el-form-item label="附件:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjAnnex" :label="1">未见异常</el-radio>
               <el-radio v-model="fromData.tjAnnex" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOtherannex" :disabled="fromData.tjAnnex === 1"></el-input>
               </el-radio>
          </el-form-item>
           <el-form-item label="其他:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjCother"></el-input>
           </el-form-item>
            <!-- 辅助检查 -->
           <el-form-item class="item-title">辅助检查</el-form-item>
           <el-form-item>血常规</el-form-item>
           <el-form-item label="血红蛋白(血常规):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjHelobin"></el-input><span class="item-unit">g/L</span>
           </el-form-item>
           <el-form-item label="白细胞(血常规):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjLekcyte"></el-input><span class="item-unit">10^9/L</span>
           </el-form-item>
           <el-form-item label="血小板(血常规)::" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjPlatelet"></el-input><span class="item-unit">10^9/L</span>
           </el-form-item>
           <el-form-item label="其他(血常规):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjXother"></el-input>
           </el-form-item>
           <el-form-item>尿常规</el-form-item>
           <el-form-item label="尿蛋白:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjProtein"></el-input>
           </el-form-item>
           <el-form-item label="尿糖:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjNiaotang"></el-input>
           </el-form-item>
           <el-form-item label="尿酮体:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjKetone"></el-input>
           </el-form-item>
           <el-form-item label="尿潜血:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjOccult"></el-input>
           </el-form-item>
            <el-form-item label="其他(尿常规):" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="3" v-model="fromData.tjNother"></el-input>
               <span class="item-time">最近一次检测时间:{{fromData.tjNlasttime}}</span>
           </el-form-item>
            <el-form-item label="空腹血糖:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFbg"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
           <el-form-item label="心电图:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjEtdio" :label="1">正常</el-radio>
               <el-radio v-model="fromData.tjEtdio" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjEtdioValue" :disabled="fromData.tjEtdio === 1"></el-input>
               </el-radio>
          </el-form-item>
            <el-form-item label="尿微量白蛋白:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjAlbumin"></el-input><span class="item-unit">mg/dL</span>
           </el-form-item>
            <el-form-item label="大便潜血:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjFecal">
                    <el-option v-for="item in fecalArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="糖化血红蛋白:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjGblobin"></el-input><span class="item-unit">%</span>
           </el-form-item>
             <el-form-item label="乙型肝炎表面抗原:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjAntigen">
                    <el-option v-for="item in fecalArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
           <el-form-item>肝功能</el-form-item>
            <el-form-item label="血清谷丙转氨酶(肝):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjAlanine"></el-input><span class="item-unit">U/L</span>
           </el-form-item>
            <el-form-item label="血清谷草转氨酶(肝):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjAspartate"></el-input><span class="item-unit">U/L</span>
           </el-form-item>
            <el-form-item label="白蛋白(肝):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjAlbum"></el-input><span class="item-unit">g/L</span>
           </el-form-item>
            <el-form-item label="总胆红素(肝):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjTotal"></el-input><span class="item-unit">μmol/L</span>
           </el-form-item>
            <el-form-item label="结合胆红素(肝):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjConted"></el-input><span class="item-unit">μmol/L</span>
           </el-form-item>
           <el-form-item>肾功能</el-form-item>
            <el-form-item label="血清肌酐(肾):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjCreatin"></el-input><span class="item-unit">μmol/L</span>
           </el-form-item>
            <el-form-item label="血尿素氮(肾):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjNitgen"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
            <el-form-item label="血钾浓度(肾):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjPotium"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
            <el-form-item label="血钠浓度(肾):" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjSodium"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
           <el-form-item>血脂</el-form-item>
            <el-form-item label="总胆固醇:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjChol"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
            <el-form-item label="甘油三酯:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjTride"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
            <el-form-item label="血清低密度脂蛋白胆固醇:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjDserum"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
            <el-form-item label="血清高密度脂蛋白胆固醇:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjGserum"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
            <el-form-item label="胸部X线片:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjChestfilm" :label="1">正常</el-radio>
               <el-radio v-model="fromData.tjChestfilm" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOtherchest" :disabled="fromData.tjChestfilm === 1"></el-input>
               </el-radio>
          </el-form-item>
           <el-form-item label="B超:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjBmode" :label="1">正常</el-radio>
               <el-radio v-model="fromData.tjBmode" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOterbmode" :disabled="fromData.tjBmode === 1"></el-input>
               </el-radio>
          </el-form-item>
           <el-form-item label="宫颈涂片:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjSmear" :label="1">正常</el-radio>
               <el-radio v-model="fromData.tjSmear" :label="2">异常
                   <el-input class="other-input" v-model="fromData.tjOthersmear" :disabled="fromData.tjSmear === 1"></el-input>
               </el-radio>
          </el-form-item>
           <el-form-item label="其他:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFuother"></el-input><span class="item-unit">mmol/L</span>
           </el-form-item>
            <el-form-item class="item-title">中医体质辨识</el-form-item>
            <el-form-item label="平和质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjQuality">
                    <el-option v-for="item in qualityArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="气虚质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjSubtance">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
               <el-form-item label="阳虚质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjYangxz">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
               <el-form-item label="阴虚质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjYinxz">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
               <el-form-item label="痰湿质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjPhlegm">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
               <el-form-item label="湿热质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjDamp">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
               <el-form-item label="血瘀质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjStasis">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
               <el-form-item label="气郁质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjStagtion">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="特秉质" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjGrasp">
                    <el-option v-for="item in subtanceArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
            <el-form-item class="item-title">现存主要健康问题</el-form-item>
            <!-- diseaseArray -->
            <el-form-item label="脑血管疾病:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjDisease">
                    <el-checkbox v-for="item in diseaseArray" :key="item.value" :label="item.value" @change="diseaseChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.tjOtherdisease" :placeholder="item.name" :disabled="fromData.tjDisease.indexOf(item.value) === -1"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
           </el-form-item>
            <el-form-item label="肾脏疾病:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjKidney">
                    <el-checkbox v-for="item in kidneyArray" :key="item.value" :label="item.value" @change="kidneyChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.tjOtherkidney" :placeholder="item.name" :disabled="fromData.tjKidney.indexOf(item.value) === -1"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
           </el-form-item>
           <el-form-item label="心脏疾病:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjHeart">
                    <el-checkbox v-for="item in heartArray" :key="item.value" :label="item.value" @change="heartChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.tjOtherheart" :placeholder="item.name" :disabled="fromData.tjHeart.indexOf(item.value) === -1"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
           </el-form-item>
            <el-form-item label="血管疾病:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjVascular">
                    <el-checkbox v-for="item in vascularArray" :key="item.value" :label="item.value" @change="vascularChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.tjOthervascular" :placeholder="item.name" :disabled="fromData.tjVascular.indexOf(item.value) === -1"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
           </el-form-item>
            <el-form-item label="眼部疾病:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjOcular">
                    <el-checkbox v-for="item in ocularArray" :key="item.value" :label="item.value" @change="ocularChange">
                        {{item.name}}
                        <el-input class="other-input" v-if="item.other" name="symptom" v-model="fromData.tjOtherocular" :placeholder="item.name" :disabled="fromData.tjOcular.indexOf(item.value) === -1"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
           </el-form-item>
            <el-form-item label="神经疾病系统:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjNervous" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjNervous" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjOthernervous" :disabled="fromData.tjNervous === 1"></el-input>
               </el-radio>
          </el-form-item>
          <el-form-item label="其他系统疾病:" :label-width="formLabelWidth">
               <el-radio v-model="fromData.tjOtherdis" :label="1">无</el-radio>
               <el-radio v-model="fromData.tjOtherdis" :label="2">有
                   <el-input class="other-input" v-model="fromData.tjOotherdis" :disabled="fromData.tjOtherdis === 1"></el-input>
               </el-radio>
          </el-form-item>
           <el-form-item class="item-title">住院治疗情况</el-form-item>
           <el-form-item>住院史</el-form-item>
          <el-form-item label="入/出院日期:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZzhutime1"
                    align="right"
                    type="date"
                    placeholder="入/出院日期"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
           <el-form-item label="原因:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZreasion1"></el-input>
           </el-form-item>
            <el-form-item label="医疗机构名称:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZmedname1"></el-input>
           </el-form-item>
            <el-form-item label="病案号:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZrecordnum1"></el-input>
           </el-form-item>
            <el-form-item label="入/出院日期:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZzhutime2"
                    align="right"
                    type="date"
                    placeholder="入/出院日期"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
           <el-form-item label="原因:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZreasion2"></el-input>
           </el-form-item>
            <el-form-item label="医疗机构名称:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZmedname2"></el-input>
           </el-form-item>
            <el-form-item label="病案号:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZrecordnum2"></el-input>
           </el-form-item>
           <el-form-item>家庭病床史</el-form-item>
            <el-form-item label="建/撤床日期:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjJzhutime1"
                    align="right"
                    type="date"
                    placeholder="建/撤床日期"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
           <el-form-item label="原因:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJreasion1"></el-input>
           </el-form-item>
            <el-form-item label="医疗机构名称:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJmedname1"></el-input>
           </el-form-item>
            <el-form-item label="病案号:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJrecordnum1"></el-input>
           </el-form-item>
            <el-form-item label="建/撤床日期:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjJzhutime2"
                    align="right"
                    type="date"
                    placeholder="建/撤床日期"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
           <el-form-item label="原因:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJreasion2"></el-input>
           </el-form-item>
            <el-form-item label="医疗机构名称:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJmedname2"></el-input>
           </el-form-item>
            <el-form-item label="病案号:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjJrecordnum2"></el-input>
           </el-form-item>
           <el-form-item class="item-title">主要用药情况</el-form-item>
            <el-form-item label="药物名称1:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZdrugname1"></el-input>
           </el-form-item>
           <el-form-item label="用法:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZuseage1"></el-input>
           </el-form-item>
           <el-form-item label="用量:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZcption1"></el-input>
           </el-form-item>
            <el-form-item label="用药时间:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZmedtime1"
                    align="right"
                    type="date"
                    placeholder="用药时间"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="服药依从性:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjZmedcompli1">
                    <el-option v-for="item in ZmedcompliArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="药物名称2:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZdrugname2"></el-input>
           </el-form-item>
           <el-form-item label="用法:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZuseage2"></el-input>
           </el-form-item>
           <el-form-item label="用量:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZcption2"></el-input>
           </el-form-item>
            <el-form-item label="用药时间:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZmedtime2"
                    align="right"
                    type="date"
                    placeholder="用药时间"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="服药依从性:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjZmedcompli2">
                    <el-option v-for="item in ZmedcompliArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="药物名称3:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZdrugname3"></el-input>
           </el-form-item>
           <el-form-item label="用法:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZuseage3"></el-input>
           </el-form-item>
           <el-form-item label="用量:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZcption3"></el-input>
           </el-form-item>
            <el-form-item label="用药时间:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZmedtime3"
                    align="right"
                    type="date"
                    placeholder="用药时间"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="服药依从性:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjZmedcompli3">
                    <el-option v-for="item in ZmedcompliArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="药物名称4:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZdrugname4"></el-input>
           </el-form-item>
           <el-form-item label="用法:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZuseage4"></el-input>
           </el-form-item>
           <el-form-item label="用量:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZcption4"></el-input>
           </el-form-item>
            <el-form-item label="用药时间:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZmedtime4"
                    align="right"
                    type="date"
                    placeholder="用药时间"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="服药依从性:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjZmedcompli4">
                    <el-option v-for="item in ZmedcompliArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="药物名称5:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZdrugname5"></el-input>
           </el-form-item>
           <el-form-item label="用法:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZuseage5"></el-input>
           </el-form-item>
           <el-form-item label="用量:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZcption5"></el-input>
           </el-form-item>
            <el-form-item label="用药时间:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZmedtime5"
                    align="right"
                    type="date"
                    placeholder="用药时间"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="服药依从性:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjZmedcompli5">
                    <el-option v-for="item in ZmedcompliArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="药物名称6:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZdrugname6"></el-input>
           </el-form-item>
           <el-form-item label="用法:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZuseage6"></el-input>
           </el-form-item>
           <el-form-item label="用量:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjZcption6"></el-input>
           </el-form-item>
            <el-form-item label="用药时间:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjZmedtime6"
                    align="right"
                    type="date"
                    placeholder="用药时间"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="服药依从性:" :label-width="formLabelWidth">
                <el-select v-model="fromData.tjZmedcompli6">
                    <el-option v-for="item in ZmedcompliArray" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                </el-select>
           </el-form-item>
           <el-form-item class="item-title">非免疫规划预防接种史</el-form-item>
            <el-form-item label="名称1:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFname1"></el-input>
           </el-form-item>
             <el-form-item label="接种日期:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjFtime1"
                    align="right"
                    type="date"
                    placeholder="接种日期"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
           <el-form-item label="接种机构:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFmecha1"></el-input>
           </el-form-item>
            <el-form-item label="名称2:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFname2"></el-input>
           </el-form-item>
             <el-form-item label="接种日期:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjFtime2"
                    align="right"
                    type="date"
                    placeholder="接种日期"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
           <el-form-item label="接种机构:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFmecha2"></el-input>
           </el-form-item>
            <el-form-item label="名称3:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFname3"></el-input>
           </el-form-item>
             <el-form-item label="接种日期:" :label-width="formLabelWidth">
             <el-date-picker
                    v-model="fromData.tjFtime3"
                    align="right"
                    type="date"
                    placeholder="接种日期"
                    class="el-date-picker"
                    :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
           <el-form-item label="接种机构:" :label-width="formLabelWidth">
              <el-input v-model="fromData.tjFmecha3"></el-input>
           </el-form-item>
            <el-form-item class="item-title">健康评价</el-form-item>
            <el-form-item label="体检有无异常:" :label-width="formLabelWidth">
                <el-radio v-model="fromData.tjAssment" :label="2">有</el-radio>
               <el-radio v-model="fromData.tjAssment" :label="1">无</el-radio>
          </el-form-item>
           <el-form-item label="异常1:" :label-width="formLabelWidth" v-if="fromData.tjAssment === 2">
                <el-input v-model="fromData.tjAbno1"></el-input>
          </el-form-item>
           <el-form-item label="异常2:" :label-width="formLabelWidth" v-if="fromData.tjAssment === 2">
                <el-input v-model="fromData.tjAbno2"></el-input>
          </el-form-item>
           <el-form-item label="异常3:" :label-width="formLabelWidth" v-if="fromData.tjAssment === 2">
                <el-input v-model="fromData.tjAbno3"></el-input>
          </el-form-item>
           <el-form-item label="异常4:" :label-width="formLabelWidth" v-if="fromData.tjAssment === 2">
                <el-input v-model="fromData.tjAbno4"></el-input>
          </el-form-item>
          <el-form-item class="item-title">健康指导</el-form-item>
             <el-form-item label="指导结论:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjLategui">
                    <el-checkbox v-for="item in lateguiArray" :key="item.value" :label="item.value">
                        {{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
          </el-form-item>
             <el-form-item label="危险因素控制:" :label-width="formLabelWidth">
                <el-checkbox-group v-model="fromData.tjRisk">
                    <el-checkbox v-for="item in riskArray" :key="item.value" :label="item.value">
                        {{item.name}}
                        <el-input class="other-input-desc" v-if="item.other" name="symptom" v-model="fromData[item.formData]" :placeholder="item.name" :disabled="fromData.tjRisk.indexOf(item.value) === -1"></el-input>
                    </el-checkbox>
                </el-checkbox-group>
          </el-form-item>
        </el-form>
</div>
</template>
<script>
  // 使用方法
  import { formatDate, extend, arrayStringToNumber, deleteArrayAttr } from '../../../assets/js/util.js';
  import Constants, { 
    defaultSymptom,
    defaultEha,
    defaultEsca, 
    defaultEcf, 
    defaultExercise, 
    defaultEating, 
    defaultHabit, 
    defaultDrinkw, 
    defaultJdrinkw, 
    defaultZuidrink, 
    defaultZldrinkw, 
    defaultLips,
    defaultDentition,
    defaultPharynx,
    defaultListening,
    defaultMotor,
    defaultSkin,
    defaultSclear,
    defaultNodes,
    defaultRale,
    defaultRhythm,
    defaultEfet,
    defaultDartp,
    defaultRefferral,
    defaultBreast,
    defaultFecal,
    defaultQuality,
    defaultSubtance,
    defaultDisease,
    defaultKidney,
    defaultHeart,
    defaultVascular,
    defaultOcular,
    defaultZmedcompli,
    defaultLategui,
    defaultRisk,
    defaultOdrch } from '../../../Constants';

  export default {
    props: ['record', 'stop', 'postUrl'],
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
            name: '',
            tjProtein: '',
            tjOtherdis: 1,
            tjZzhutime1: '',
            tjZzhutime2: '',
            tjNervous: 1,
            tjOotherdis: '',
            tjOthernervous: '',
            tjOthervascular: '',
            tjNlasttime: '',
            tjAbno1: '',
            tjAbno2: '',
            tjAbno3: '',
            tjAbno4: '',
            tjFname1: '',
            tjFtime1: '',
            tjFmecha1: '',
            tjFname2: '',
            tjFtime2: '',
            tjFmecha2: '',
            tjFname3: '',
            tjFtime3: '',
            tjFmecha3: '',
            tjJzhutime1: '',
            tjJreasion1: '',
            tjJmedname1: '',
            tjJrecordnum1: '',
            tjAssment: 1,
            tjJzhutime2: '',
            tjJreasion2: '',
            tjJmedname2: '',
            tjJrecordnum2: '',
            tjFuother: '',
            tjZdrugname1: '',
            tjZuseage1: '',
            tjZcption1: '',
            tjZmedtime1: '',
            tjZmedcompli1: '',
            tjZdrugname2: '',
            tjZuseage2: '',
            tjZcption2: '',
            tjZmedtime2: '',
            tjZmedcompli2: '',
            tjZdrugname3: '',
            tjZuseage3: '',
            tjZcption3: '',
            tjZmedtime3: '',
            tjZmedcompli3: '',
            tjZdrugname4: '',
            tjZuseage4: '',
            tjZcption4: '',
            tjZmedtime4: '',
            tjZmedcompli4: '',
            tjZdrugname5: '',
            tjZuseage5: '',
            tjZcption5: '',
            tjZmedtime5: '',
            tjZmedcompli5: '',
            tjZdrugname6: '',
            tjZuseage6: '',
            tjZcption6: '',
            tjZmedtime6: '',
            tjZmedcompli6: '',
            tjZreasion1: '',
            tjZmedname1: '',
            tjZrecordnum1: '',
            tjZreasion2: '',
            tjZmedname2: '',
            tjZrecordnum2: '',
            tjNiaotang: '',
            tjCreatin: '',
            tjNitgen: '',
            tjPotium: '',
            tjSodium: '',
            tjNother: '',
            tjChol: '',
            tjTride: '',
            tjOtherkidney: '',
            tjDserum: '',
            tjOtherocular: '',
            tjGserum: '',
            tjSubtance: 1,
            tjYangxz: 1,
            tjYinxz: 1,
            tjPhlegm: 1,
            tjDamp: 1,
            tjStasis: 1,
            tjStagtion: 1,
            tjGrasp: 1,
            tjEtdio: 1,
            tjChestfilm: 1,
            tjOtherchest: '',
            tjBmode: 1,
            tjOterbmode: '',
            tjSmear: 1,
            tjOthersmear: '',
            tjAlanine: '',
            tjAspartate: '',
            tjAlbum: '',
            tjTotal: '',
            tjConted: '',
            tjAntigen: 1,
            tjFecal: 1,
            tjAlbumin: '',
            tjGblobin: '',
            tjEtdioValue: '',
            tjFbg: '',
            tjKetone: '',
            tjOccult: '',
            tjXother: '',
            tjPlatelet: '',
            tjLekcyte: '',
            tjNumber: '',
            tjDate: '',
            tjHelobin: '',
            tjOtherpalace: '',
            doctorName: '',
            doctorValue: '',
            tjSymptomOther: '',
            tjTw: '',
            tjTwlasttime: '',
            tjPulselasttime: '',
            tjPulse: '',
            tjRespiratory: '',
            tjBpressure: '',
            tjBpressurelasttime: '',
            tjOtherdisease: '',
            tjBpressureDown: '',
            tjConstitution: '',
            tjEcfScore: '',
            tjEspScore: '',
            tjExercise: 1,
            tjEtime: '',
            tjEyear: '',
            tjEway: '',
            tjSg: '',
            tjTz: '',
            tjEsp: 1,
            tjYw: '',
            tjEha: 1,
            tjEcf: 1,
            tjEsca: 1,
            tjHabit: 1,
            tjHday: '',
            tjJhyear: '',
            tjDrinkw: 1,
            tjJdrinkw: 1,
            tjDaydrinkw: '',
            tjYearjdrinkw: '',
            tjStartdrinkw: '',
            tjZuidrinkw: '',
            tjZldrinkwother: '',
            tjContactDustpm: '',
            tjContactRadiosubpm: '',
            tjRadiosubpmValue: '',
            tjContactChesupm: '',
            tjContactPhfactroypm: '',
            tjDustpm: '',
            tjDustpmValue: '',
            tjRadiosubpm: '',
            tjPhfactorypm: '',
            tjPhfactorypmValue: '',
            tjChesubpmValue: '',
            tjOtherpmValue: '',
            tjChesubpm: '',
            tjJleftvision: '',
            tjJrightvision: '',
            tjRightvision: '',
            tjListening: 1,
            tjLeftvision: '',
            tjOtherpm: '',
            tjPharynx: 1,
            tjContactOther: '',
            tjOdech: 1,
            tjWorkyear: '',
            tjWorktype: '',
            tjLips: 1,
            tjMotor: 1,
            tjDentition: 1,
            tjFundus: '',
            tjFundusy: '',
            tjOtherskin: '',
            tjOthersclear: '',
            tjSkin: 1,
            tjSclear: 1,
            tjNodes: 1,
            tjChest: 1,
            tjSound: 1,
            tjRale: 1,
            tjNoise: 1,
            tjRhythm: 1,
            tjOthernodes: '',
            tjOthersound: '',
            tjOtherrale: '',
            tjNoiseValue: '',
            tjOthertenderness: '',
            tjTenderness: 1,
            tjOtherdullness: '',
            tjDartp: 1,
            tjRate: '',
            tjPiece: 1,
            tjSplg: 1,
            tjEfet: 1,
            tjOtherpiece: '',
            tjOtherliver: '',
            tjLiver: 1,
            tjOthersplg: '',
            tjDullness: 1,
            tjRefferral: 1,
            tjOtherrefferral: '',
            tjOtherbreast: '',
            tjBreast: [1],
            tjVulva: 1,
            tjOthervulva: '',
            tjVagina: 1,
            tjOthervagina: '',
            tjCervical: 1,
            tjOthercervical: '',
            tjPalace: 1,
            tjAnnex: 1,
            tjCother: '',
            tjOtherannex: '',
            tjQuality: 1,
            tjOtherheart: '',
            tjJweight: '',
            tjSeedlingsName: '',
            tjOtherrisk: '',
            tjRisk: [],
            tjLategui: [],
            tjOcular: [1],
            tjVascular: [1],
            tjHeart: [1],
            tjDisease: [1],
            tjZldrinkw: [],
            tjKidney: [1],
            tjEating: [],
            tjSymptom: [1]
        },
        doctorListArray: [],
        ehaArray: defaultEha,
        escaArray: defaultEsca,
        ecfArray: defaultEcf,
        exerciseArray: defaultExercise,
        eatingArray: defaultEating,
        habitArray: defaultHabit,
        drinkwArray: defaultDrinkw,
        jdrinkwArray: defaultJdrinkw,
        zuidrinkwArray: defaultZuidrink,
        zldrinkwArray: defaultZldrinkw,
        odechArray: defaultOdrch,
        lipsArray: defaultLips,
        dentitionArray: defaultDentition,
        pharynxArray: defaultPharynx,
        listeningArray: defaultListening,
        motorArray: defaultMotor,
        skinArray: defaultSkin,
        sclearArray: defaultSclear,
        nodesArray: defaultNodes,
        raleArray: defaultRale,
        rhythmArray: defaultRhythm,
        efetArray: defaultEfet,
        dartpArray: defaultDartp,
        refferralArray: defaultRefferral,
        breastArray: defaultBreast,
        fecalArray: defaultFecal,
        qualityArray: defaultQuality,
        subtanceArray: defaultSubtance,
        diseaseArray: defaultDisease,
        kidneyArray: defaultKidney,
        heartArray: defaultHeart,
        vascularArray: defaultVascular,
        ocularArray: defaultOcular,
        ZmedcompliArray: defaultZmedcompli,
        lateguiArray: defaultLategui,
        riskArray: defaultRisk,
        symptomArray: defaultSymptom
      }
    },
    created() {
        let _this = this.fromData;
        extend(_this, this.record.row);
        // 性别解析
        this.getUserInfo();
        this.getDoctorList();
    },
    watch: {
        // 监听父组件字段更改
        record: function(newData, oldData) {
            this.userInfoView = newData.row;
            extend(this.fromData, newData.row);
            let initData = this.$options.data();
            extend(this.fromData, initData.fromData, this.userInfoView);
            this.getUserInfo();
        }
    },
    methods: {
        curUserInfoPars() {
            // 基本信息解析  异常信息处理
            let _this = this.fromData;
            console.log(_this)
            _this.sexName = _this.sex === 2 ? '女' : '男';
            _this.tjNumber = _this.healthfileNum = _this.healthfileNum || _this.healthfile_num;
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
        symptomChange(val, item) {
            // 症状切换
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.tjSymptom = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.tjSymptom, 1);
        },
        breastChange(val, item) {
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.tjBreast = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.tjBreast, 1);
        },
        heartChange(val, item) {
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.tjHeart = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.tjHeart, 1);
        },
        diseaseChange(val, item) {
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.tjDisease = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.tjDisease, 1);
        },
        ocularChange(val, item) {
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.tjOcular = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.tjOcular, 1);
        },
        vascularChange(val, item) {
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.tjVascular = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.tjVascular, 1);
        },
        kidneyChange(val, item) {
            let value = +item.target.value;
            if (value === 1) {
                 this.fromData.tjKidney = [value];
                 return;
            }
            deleteArrayAttr(this.fromData.tjKidney, 1);
        },
        getParams() {
            // 更改参数
            switch (this.componentName) {
                case 'get_health_exam':return {idcard: this.fromData.idcard};
                default: return {idcard: this.fromData.tjid};
            }
        },
        getUserInfo() {
            let _this = this.fromData;
            this.curUserInfoPars();
            if (this.stop) return;
            // const params = {idcard: _this.idcard};
            let params = this.getParams();
            let url = this.postUrl || 'SihealIMManagement/health_file/get_health_exam';

            extend(params, Constants.defaultMachineParam);
            this.axios.post(url, params).then(res => {
                res = res || {};
                extend(_this, res.data);
                // 异步执行
                setTimeout(() => {
                    _this.tjSymptom = arrayStringToNumber(_this.tjSymptom);
                    _this.tjEating = arrayStringToNumber(_this.tjEating);
                    _this.tjZldrinkw = arrayStringToNumber(_this.tjZldrinkw);
                    _this.tjBreast = arrayStringToNumber(_this.tjBreast);
                    _this.tjDisease = arrayStringToNumber(_this.tjDisease);
                    _this.tjKidney = arrayStringToNumber(_this.tjKidney);
                    _this.tjHeart = arrayStringToNumber(_this.tjHeart);
                    _this.tjVascular = arrayStringToNumber(_this.tjVascular);
                    _this.tjOcular = arrayStringToNumber(_this.tjOcular);
                    _this.tjLategui = arrayStringToNumber(_this.tjLategui);
                    _this.tjRisk = arrayStringToNumber(_this.tjRisk);
                    _this.tjDrinkw = +_this.tjDrinkw;
                    _this.tjEsca = +_this.tjEsca;
                    _this.tjEha = +_this.tjEha;
                    _this.tjEcf = +_this.tjEcf;
                    _this.tjEsp = +_this.tjEsp;
                    _this.tjExercise = +_this.tjExercise;
                    _this.tjHabit = +_this.tjHabit;
                    _this.tjJdrinkw = +_this.tjJdrinkw;
                    _this.tjOdech = +_this.tjOdech === 2 ? 2 : 1;
                    _this.tjRadiosubpm = +_this.tjRadiosubpm === 2 ? 2 : 1;
                    _this.tjPhfactorypm = +_this.tjPhfactorypm === 2 ? 2 : 1;
                    _this.tjChesubpm = +_this.tjChesubpm === 2 ? 2 : 1;
                    _this.tjOtherpm = +_this.tjOtherpm === 2 ? 2 : 1;
                    _this.tjFundus = +_this.tjFundus === 2 ? 2 : 1;
                    _this.tjDustpm = +_this.tjDustpm === 2 ? 2 : 1;
                    _this.tjLips = +_this.tjLips;
                    _this.tjDentition = +_this.tjDentition;
                    _this.tjPharynx = +_this.tjPharynx;
                    _this.tjListening = +_this.tjListening;
                    _this.tjMotor = +_this.tjMotor;
                    _this.tjSkin = +_this.tjSkin;
                    _this.tjSclear = +_this.tjSclear;
                    _this.tjNodes = +_this.tjNodes;
                    _this.tjChest = +_this.tjChest;
                    _this.tjSound = +_this.tjSound;
                    _this.tjRale = +_this.tjRale;
                    _this.tjRhythm = +_this.tjRhythm;
                    _this.tjNoise = +_this.tjNoise;
                    _this.tjTenderness = +_this.tjTenderness;
                    _this.tjPiece = +_this.tjPiece;
                    _this.tjLiver = +_this.tjLiver;
                    _this.tjSplg = +_this.tjSplg;
                    _this.tjDullness = +_this.tjDullness;
                    _this.tjEfet = +_this.tjEfet;
                    _this.tjDartp = +_this.tjDartp;
                    _this.tjRefferral = +_this.tjRefferral;
                    _this.tjVulva = +_this.tjVulva;
                    _this.tjVagina = +_this.tjVagina;
                    _this.tjCervical = +_this.tjCervical;
                    _this.tjPalace = +_this.tjPalace;
                    _this.tjAnnex = +_this.tjAnnex;
                    _this.tjEtdio = +_this.tjEtdio;
                    _this.tjFecal = +_this.tjFecal;
                    _this.tjAntigen = +_this.tjAntigen;
                    _this.tjChestfilm = +_this.tjChestfilm;
                    _this.tjBmode = +_this.tjBmode;
                    _this.tjSmear = +_this.tjSmear;
                    _this.tjQuality = +_this.tjQuality;
                     _this.tjYangxz = +_this.tjYangxz;
                    _this.tjYinxz = +_this.tjYinxz;
                    _this.tjPhlegm = +_this.tjPhlegm;
                    _this.tjDamp = +_this.tjDamp;
                    _this.tjStasis = +_this.tjStasis;
                    _this.tjStagtion = +_this.tjStagtion;
                    _this.tjGrasp = +_this.tjGrasp;
                    _this.tjNervous = +_this.tjNervous;
                    _this.tjOtherdis = +_this.tjOtherdis;
                    _this.tjAssment = +_this.tjAssment;
                }, 0);
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
