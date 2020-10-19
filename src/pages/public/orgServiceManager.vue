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
           <template v-if="authPath(item, 'orgCreateRecord')">
             <addDifferent></addDifferent>
           </template>
            <template v-if="authPath(item, 'orgExamine')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'orgHighNorm')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'orgHighFollow')">
              <viewDifferent></viewDifferent>
           </template>
           <template v-if="authPath(item, 'orgDiabetesNorm')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'orgDiabetesFollow')">
              <viewDifferent></viewDifferent>
           </template>
            <template v-if="authPath(item, 'orgDoctorWork')">
              <viewDifferent></viewDifferent>
           </template>
           {{item.name}}
        </el-tab-pane>
  </el-tabs>
</template>
<script>

  import { menuList, childMenuFiler } from './../../data/menu.js';
  import { defaultMachineParam, defaultConfig } from '../../Constants';

  import orgCreateRecord from './subMenuModule/orgCreateRecord';
  import orgExamine from './subMenuModule/orgExamine';
  import orgHighNorm from './subMenuModule/orgHighNorm';
  import orgHighFollow from './subMenuModule/orgHighFollow';
  import orgDiabetesNorm from './subMenuModule/orgDiabetesNorm';
  import orgDiabetesFollow from './subMenuModule/orgDiabetesFollow';
  import orgDoctorWork from './subMenuModule/orgDoctorWork';


  let menuLists = menuList();

  export default {
    components: {
      orgCreateRecord,
      orgExamine,
      orgHighNorm,
      orgHighFollow,
      orgDiabetesNorm,
      orgDiabetesFollow,
      orgDoctorWork
    },
    data() {
      return {
        childMenuList: [],
        activeName: 'orgCreateRecord'
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