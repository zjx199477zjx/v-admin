<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 老年人的生活评估
--%>
<template>

<div class="index">
      <el-form>
          <el-form-item label="进餐：使用餐具将饭菜送入口、咀嚼、吞咽等活动：" :label-width="formLabelWidth">
            <el-select v-model="fromData.eating" @change='provinceChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in defaultPeopleEating"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    {{item.name}}
                    </el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="梳洗：梳头、洗脸、刷牙、剃须洗澡等活动" :label-width="formLabelWidth">
            <el-select v-model="fromData.wash_dress" @change='provinceChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in defaultPeopleEating"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    {{item.name}}
                    </el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="穿衣：穿衣裤、袜子、鞋子等活动：" :label-width="formLabelWidth">
            <el-select v-model="fromData.dress" @change='provinceChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in defaultPeopleEating"
                    :key="item.value"
                   :label="item.name"
                    :value="item.value">
                    {{item.name}}
                    </el-option>
            </el-select>
           </el-form-item>
            <el-form-item label="如厕：小便、大便等活动及自控：" :label-width="formLabelWidth">
            <el-select v-model="fromData.toilet" @change='provinceChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in defaultPeopleToilet"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    {{item.name}}
                    </el-option>
            </el-select>
           </el-form-item>
            <el-form-item label="活动：站立、室内行走、上下楼梯、户外活动：" :label-width="formLabelWidth">
            <el-select v-model="fromData.activity" @change='provinceChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in defaultPeopleActivity"
                    :key="item.value"
                     :label="item.name"
                    :value="item.value">
                    {{item.name}}
                    </el-option>
            </el-select>
           </el-form-item>
            <el-form-item label="总评分：" :label-width="formLabelWidth">
              <el-input v-model="fromData.total_core" disabled></el-input>
           </el-form-item>
            <el-form-item label="结论：" :label-width="formLabelWidth">
              <el-input v-model="fromData.conclusion" :rows="3" type="textarea" ></el-input>
           </el-form-item>
        </el-form>
</div>

</template>
<script>

  import { formatDate, extend, deleteArrayAttr } from '../../../assets/js/util.js';
  import { defaultPeopleEating, defaultPeopleToilet, defaultPeopleActivity } from '../../../Constants';

  export default {
      props: ['record'],
 
    data() {           
      return {
        formLabelWidth: '200px',
        fromData: {
            eating: 0,
            wash_dress: 0,
            dress: 0,
            toilet: 0,
            activity: 0,
            total_core: '',
            conclusion: ''
        },
        defaultPeopleEating: defaultPeopleEating,
        defaultPeopleToilet: defaultPeopleToilet,
        defaultPeopleActivity: defaultPeopleActivity
      }
    },
    created() {
        extend(this.fromData, this.record.row);
    },
    watch: {
        record: function(n, o) {
            extend(this.fromData, n.row);
        }
    },
    update() {
        console.log('update')
    },
    methods: {
        provinceChange() {
            let fromData = this.fromData;
            let total = fromData.eating + fromData.wash_dress + fromData.dress + fromData.toilet + fromData.activity;
            this.fromData.total_core = total <= 0 ? '' : total;
        }
    }
  };
</script>
<style lang="scss" scoped>
.selectItem, .el-input, .el-textarea{
    width:80%;
}
.red{
    color:red;
}
</style>
