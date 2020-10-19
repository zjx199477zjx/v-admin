<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: 1246888200@qq.com
@Idea: WebStorm
@Desc: 公共卫生服务管理 区域服务管理
--%>
<template>
  <el-tabs  v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane v-for="item in childMenuList" :key="item.id" :label="item.title" :name="item.name">
           <template v-if="authPath(item, 'regCreateRecord')">
             <addDifferent></addDifferent>
           </template>
            <template v-if="authPath(item, 'regExamine')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'regHighNorm')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'regHighFollow')">
              <viewDifferent></viewDifferent>
           </template>
           <template v-if="authPath(item, 'regDiabetesNorm')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'regDiabetesFollow')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'regDoctorWork')">
              <viewDifferent></viewDifferent>
           </template>
           {{item.name}}
        </el-tab-pane>
  </el-tabs>
</template>
<script>

  import { menuList, childMenuFiler } from './../../data/menu.js';
  import { defaultMachineParam, defaultConfig } from '../../Constants';

  import regCreateRecord from './subMenuModule/regCreateRecord';
  import regExamine from './subMenuModule/regExamine';
  import regHighNorm from './subMenuModule/regHighNorm';
  import regHighFollow from './subMenuModule/regHighFollow';
  import regDiabetesNorm from './subMenuModule/regDiabetesNorm';
  import regDiabetesFollow from './subMenuModule/regDiabetesFollow';
  import regDoctorWork from './subMenuModule/regDoctorWork';


  let menuLists = menuList();

  export default {
    components: {
      regCreateRecord,
      regExamine,
      regHighNorm,
      regHighFollow,
      regDiabetesNorm,
      regDiabetesFollow,
      regDoctorWork
    },
    data() {
      return {
        childMenuList: [],
        activeName: 'regCreateRecord'
      };
    },
    created() {
        this.childMenuList = childMenuFiler(menuLists, this.$route.path) || [];
        this.activeName = (this.childMenuList[0] || {}).name;
    },
    methods: {
      handleClick(tab, event) {
      },
      authPath(item, path) {
        if (this.activeName !== path) return;
        return item.name === path;
      }
      
    }
  };
</script>
<style lang="scss" scoped>
</style>