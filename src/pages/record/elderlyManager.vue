<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机档案列表  重点人群管理记录
--%>
<template>
  <el-tabs  v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane v-for="item in childMenuList" :key="item.id" :label="item.title" :name="item.name">
           <template v-if="authPath(item, 'peopleList')">
             <peopleList></peopleList>
           </template>
            <template v-if="authPath(item, 'peopleLife')">
              <peopleLife></peopleLife>
           </template>
            <template v-if="authPath(item, 'peopleExamination')">
              <peopleExamination></peopleExamination>
           </template>
        </el-tab-pane>
  </el-tabs>
</template>
<script>

  import { menuList, childMenuFiler } from './../../data/menu.js';

  import peopleList from './subMenuModule/peopleList';
  import peopleLife from './subMenuModule/peopleLife';
  import peopleExamination from './subMenuModule/peopleExamination';

  let menuLists = menuList();

  export default {
    components: {
      peopleList,
      peopleLife,
      peopleExamination
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