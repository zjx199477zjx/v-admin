<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机 组件 地址
--%>
<template>

<div class="index">
      <el-form>
          <el-form-item label="省：" :label-width="formLabelWidth">
            <el-select v-model="provinceValue" @change='provinceChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in provinceAddress"
                    :key="item.areaCode"
                    :label="item.areaName"
                    :value="item.areaCode">
                    </el-option>
            </el-select>
             <span class="red">必填</span>
           </el-form-item>
           <el-form-item label="市：" :label-width="formLabelWidth">
            <el-select v-model="cityValue" @change='cityChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in cityAddress"
                    :key="item.areaCode"
                    :label="item.areaName"
                    :value="item.areaCode">
                    </el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="区县：" :label-width="formLabelWidth">
            <el-select v-model="areaValue" @change='areaChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in areaAddress"
                    :key="item.areaCode"
                    :label="item.areaName"
                    :value="item.areaCode">
                    </el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="乡镇：" :label-width="formLabelWidth">
            <el-select v-model="townsValue" @change='townsChange' class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in townsAddress"
                    :key="item.areaCode"
                    :label="item.areaName"
                    :value="item.areaCode">
                    </el-option>
            </el-select>
           </el-form-item>
           <el-form-item label="居委会：" :label-width="formLabelWidth">
            <el-select v-model="committeesValue" class="selectItem" placeholder="请选择">
                    <el-option
                     v-for="item in committeesAddress"
                    :key="item.areaCode"
                    :label="item.areaName"
                    :value="item.areaCode">
                    </el-option>
            </el-select>
           </el-form-item>
        </el-form>
</div>

</template>
<script>

  import Constants from '../../../Constants';

  export default {
 
    data() {           
      return {
        formLabelWidth: '120px',
        provinceAddress: [],
        cityAddress: [],
        areaAddress: [],
        townsAddress: [],
        committeesAddress: [],
        cityValue: '',
        provinceValue: '',
        areaValue: '',
        townsValue: '',
        committeesValue: ''
      }
    },
    created() {
        this.getCurAddress();
    },
    methods: {
        provinceChange(code) {
            // 省 change
            this.getCurAddress('cityAddress', code);
        },
        cityChange(code) {
            this.getCurAddress('areaAddress', code);
        },
        areaChange(code) {
            this.getCurAddress('townsAddress', code);
        },
        townsChange(code) {
            this.getCurAddress('committeesAddress', code);
        },
        getCurAddress(key, areaCode) {
            key = key || 'provinceAddress';
            // 获取当前地址
            let url = 'get_province';
            let params = Constants.defaultMachineParam;
            if (areaCode) {
                params.area_code = areaCode;
                url = 'get_area_by_parent_code'
            } 
            this.axios.post('SihealIMManagement/statistics/' + url, params).then(res => {
                res = res || {};
                this[key] = res.data_array || [];
            })
        }
    }
  };
</script>
<style lang="scss" scoped>
.selectItem{
    width:80%;
}
.red{
    color:red;
}
</style>
