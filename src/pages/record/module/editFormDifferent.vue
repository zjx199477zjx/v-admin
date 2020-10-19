<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 组件 中医体质辨识
--%>
<template>

<div class="index">
      <el-form>
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="fromData.name" placeholder="请填写您的真实姓名" maxlength="10" disabled></el-input>
           </el-form-item>
           <el-form-item class="item-title">请根据近一年的体验和感觉，回答以下问题</el-form-item>
           <el-form-item class="item-title">阳虚质</el-form-item>
           <el-form-item label="(1)您手脚发凉吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yangxu_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您胃脘部、背部或腰膝部怕冷吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yangxu_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您感到怕冷、衣服比别人穿得多吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yangxu_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您比一般人受不了寒冷(冬天的寒冷、夏天的冷空调、电扇等)。" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yangxu_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您比别人容易患感冒吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yangxu_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉东西吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yangxu_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您受凉或吃(喝)凉的东西，容易腹泻(拉肚子)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yangxu_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.yangxu_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

           <el-form-item class="item-title">阴虚质</el-form-item>
           <el-form-item label="(1)您手心发热吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您感觉身体、脸上发热吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您皮肤或口唇干吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您口唇的颜色比一般人红吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您容易便秘或大便干燥吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您面部俩潮红或偏红吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您感到眼睛干涩吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(8)您活动量稍大就容易出汗吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.yingxu_item8" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.yingxu_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

           <el-form-item class="item-title">气虚质</el-form-item>
           <el-form-item label="(1)您容易疲乏吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您容易气短(呼吸急促，接不上气)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您容易心慌吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您容易头晕或站起时晕眩吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您比别人容易患感冒吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您喜欢安静、懒得说话吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您说话声音无力吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(8)您活动量就容易出虚汗吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qixu_item8" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.qixu_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

           <el-form-item class="item-title">痰湿质</el-form-item>
           <el-form-item label="(1)您感到胸闷或腹部胀满吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您感到身体不轻松或不爽快吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您腹部肥满松软吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您有额部油脂分泌过多的现象吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您的上眼脸比别人肿(仍轻微隆起的现象)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您嘴里有黏黏的感觉吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您平时痰多，特别是咽喉部总感到有痰堵着吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(8)您舌苔厚腻或有舌苔厚厚的感觉吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tanshi_item8" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.tanshi_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

           <el-form-item class="item-title">湿热质</el-form-item>
           <el-form-item label="(1)您面部或鼻部有油腻或者油光发亮吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.shire_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您容易生痤疮或疮疖吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.shire_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您感到口苦或嘴里有异味吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.shire_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您大便黏滞不爽、有解不尽的感觉吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.shire_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您小便时尿道有发热感、尿色浓(深)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.shire_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您带下色黄(白带发黄)吗?(限女性回答)" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.shire_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您的阴巢部位潮湿吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.shire_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.shire_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

            <el-form-item class="item-title">血瘀质</el-form-item>
           <el-form-item label="(1)您的皮肤在不知不觉中会出现青紫瘀斑(皮下出血)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.xueyu_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您两颧部有细微红丝吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.xueyu_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您身体上有哪里疼痛吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.xueyu_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您面色晦黯或容易出现褐斑吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.xueyu_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您容易有黑眼圈吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.xueyu_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您容易忘事(健忘)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.xueyu_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您口唇颜色偏黯吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.xueyu_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.xueyu_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

           <el-form-item class="item-title">特禀质</el-form-item>
           <el-form-item label="(1)您没有感冒也会打喷嚏吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tebing_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您没有感冒也会鼻塞、流鼻涕?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tebing_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您有因季节变化、温度变化或异味等原因而咳喘的现象吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tebing_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tebing_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您的皮肤容易起荨麻疹(风团、风疹块、风疙瘩)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tebing_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您因过敏出现紫癜(紫红色瘀点、瘀斑)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tebing_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您的皮肤一抓就红，并出现抓痕吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.tebing_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.tebing_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

           <el-form-item class="item-title">气郁质</el-form-item>
           <el-form-item label="(1)您感到闷闷不乐吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qiyu_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您容易精神紧张、焦虑不安吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qiyu_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您多愁善感、感情脆弱吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qiyu_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您容易感到害怕或受到惊吓吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qiyu_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您斜肋骨或乳房腹痛吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qiyu_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您无缘无故叹气吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qiyu_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您咽喉部有异物感，且吐之不出、咽之不下吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.qiyu_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.qiyu_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>

           <el-form-item class="item-title">平和质</el-form-item>
           <el-form-item label="(1)您精力充沛吗吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item1" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(2)您容易疲乏吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item2" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(3)您说话声音无力吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item3" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(4)您感到闷闷不乐吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item4" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(5)您比别人容易患感冒吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item5" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(6)您能适应外界自然和社会环境的变化吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item6" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(7)您容易失眠吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item7" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="(8)您容易忘事(健忘)吗?" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultRadioState" :key="item.value" v-model="fromData.pinghe_item8" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
            <el-form-item label="判断结果：" :label-width="formLabelWidth">
                <el-radio v-for="item in defaultResult" :key="item.value" v-model="fromData.pinghe_result" :value="item.value" :label="item.value">{{item.name}}</el-radio>
           </el-form-item>
      </el-form>
     
</div>

</template>
<script>
  import { formatDate, extend, deleteArrayAttr, updateKeyHump } from '../../../assets/js/util.js';
  import { defaultMachineParam, defaultRadioState, defaultResult } from '../../../Constants.js';
 
  export default {
        props: ['record', 'isGet'],
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
                formLabelWidth: '200px',
                fromData: {
                    name: '',
                    yangxu_item1: 1,
                    yangxu_item2: 1,
                    yangxu_item3: 1,
                    yangxu_item4: 1,
                    yangxu_item5: 1,
                    yangxu_item6: 1,
                    yangxu_item7: 1,
                    yangxu_result: '',

                    yingxu_item1: 1,
                    yingxu_item2: 1,
                    yingxu_item3: 1,
                    yingxu_item4: 1,
                    yingxu_item5: 1,
                    yingxu_item6: 1,
                    yingxu_item7: 1,
                    yingxu_item8: 1,
                    yingxu_result: '',

                    qixu_item1: 1,
                    qixu_item2: 1,
                    qixu_item3: 1,
                    qixu_item4: 1,
                    qixu_item5: 1,
                    qixu_item6: 1,
                    qixu_item7: 1,
                    qixu_item8: 1,
                    qixu_result: '',

                    tanshi_item1: 1,
                    tanshi_item2: 1,
                    tanshi_item3: 1,
                    tanshi_item4: 1,
                    tanshi_item5: 1,
                    tanshi_item6: 1,
                    tanshi_item7: 1,
                    tanshi_item8: 1,
                    tanshi_result: '',

                    shire_item1: 1,
                    shire_item2: 1,
                    shire_item3: 1,
                    shire_item4: 1,
                    shire_item5: 1,
                    shire_item6: 1,
                    shire_item7: 1,
                    shire_result: '',

                    xueyu_item1: 1,
                    xueyu_item2: 1,
                    xueyu_item3: 1,
                    xueyu_item4: 1,
                    xueyu_item5: 1,
                    xueyu_item6: 1,
                    xueyu_item7: 1,
                    xueyu_result: '',

                    tebing_item1: 1,
                    tebing_item2: 1,
                    tebing_item3: 1,
                    tebing_item4: 1,
                    tebing_item5: 1,
                    tebing_item6: 1,
                    tebing_item7: 1,
                    tebing_result: '',

                    qiyu_item1: 1,
                    qiyu_item2: 1,
                    qiyu_item3: 1,
                    qiyu_item4: 1,
                    qiyu_item5: 1,
                    qiyu_item6: 1,
                    qiyu_item7: 1,
                    qiyu_result: '',

                    pinghe_item1: 1,
                    pinghe_item2: 1,
                    pinghe_item3: 1,
                    pinghe_item4: 1,
                    pinghe_item5: 1,
                    pinghe_item6: 1,
                    pinghe_item7: 1,
                    pinghe_item8: 1,
                    pinghe_result: ''
                },
                defaultRadioState: defaultRadioState,
                defaultResult: defaultResult
            
      }
    },
    created() {
        // 将携带参数赋值
        extend(this.fromData, this.record.row);
        if (this.isGet) this.getUserInfoApi();
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
        isGet: function(n, o) {
            // 监听当前是否需要请求API 
            if (n.row.isGet) this.getUserInfoApi();
        }
    },
    methods: {
        getUserInfoApi() {
            if (!this.fromData.id) return;
            const params = {};
            params.id = this.fromData.id
            extend(params, defaultMachineParam);
            this.axios.post('SihealIMManagement/health_file/get_medical_somatoplasm', params).then(res => {
                res = res || {};
                let curData = updateKeyHump(res.data || {});
                extend(this.fromData, curData);
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