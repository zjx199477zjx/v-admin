<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机档案列表  中医体质辨识
--%>
<template>
  <el-tabs  v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane v-for="item in childMenuList" :key="item.id" :label="item.title" :name="item.name">
           <template v-if="authPath(item, 'addDifferent')">
             <addDifferent></addDifferent>
           </template>
            <template v-if="authPath(item, 'viewDifferent')">
              <viewDifferent></viewDifferent>
           </template>
        </el-tab-pane>
  </el-tabs>
</template>
<script>

  import { menuList, childMenuFiler } from './../../data/menu.js';
  import { defaultMachineParam, defaultConfig } from '../../Constants';

  import addDifferent from './subMenuModule/addDifferent';
  import viewDifferent from './subMenuModule/viewDifferent';

  let menuLists = menuList();

  export default {
    components: {
      addDifferent,
      viewDifferent
    },
    data() {
      return {
        childMenuList: [],
        activeName: 'addDifferent'
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