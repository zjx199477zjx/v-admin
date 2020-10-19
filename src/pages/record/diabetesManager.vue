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
           <template v-if="authPath(item, 'diabetesList')">
             <diabetesList></diabetesList>
           </template>
            <template v-if="authPath(item, 'diabetesRecord')">
              <diabetesRecord></diabetesRecord>
           </template>
            <template v-if="authPath(item, 'diabetesExaminationList')">
              <diabetesExaminationList></diabetesExaminationList>
           </template>
        </el-tab-pane>
  </el-tabs>
</template>
<script>

  import { menuList, childMenuFiler } from './../../data/menu.js';
  // 引入子菜单模块
  import diabetesList from './subMenuModule/diabetesList';
  import diabetesRecord from './subMenuModule/diabetesRecord';
  import diabetesExaminationList from './subMenuModule/diabetesExaminationList'

  let menuLists = menuList();

  export default {
    components: {
      diabetesList,
      diabetesRecord,
      diabetesExaminationList
    },
    data() {
      return {
        childMenuList: [],
        activeName: 'diabetesList'
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