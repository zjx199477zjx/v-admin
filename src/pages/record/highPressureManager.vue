<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机档案列表  高血压患者列表管理
--%>
<template>
  <el-tabs  v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane v-for="item in childMenuList" :key="item.id" :label="item.title" :name="item.name">
           <template v-if="authPath(item, 'highPressureList')">
             <highPressureList></highPressureList>
           </template>
            <template v-if="authPath(item, 'highPressureRecord')">
              <highPressureRecord></highPressureRecord>
           </template>
            <template v-if="authPath(item, 'highExaminationList')">
              <highExaminationList></highExaminationList>
           </template>
        </el-tab-pane>
  </el-tabs>
</template>
<script>

  import { menuList, childMenuFiler } from './../../data/menu.js';
  // 引入子菜单模块
  import highPressureList from './subMenuModule/highPressureList';
  import highPressureRecord from './subMenuModule/highPressureRecord';
  import highExaminationList from './subMenuModule/highExaminationList'

  let menuLists = menuList();

  export default {
    components: {
      highPressureList,
      highPressureRecord,
      highExaminationList
    },
    data() {
      return {
        childMenuList: [],
        activeName: 'second'
      };
    },
    created() {
        this.childMenuList = childMenuFiler(menuLists, this.$route.path) || [];
        this.activeName = (this.childMenuList[0] || {}).name
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      authPath(item, path) {
        if (this.activeName !== path) return;
        return item.name === path;
      }
    }
  };
</script>