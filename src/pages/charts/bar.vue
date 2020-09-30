<template>
  <div class="bar">
    <div class="bar-list">
      <el-row style="margin-bottom: 8px;">
        <el-col :span="24" style="padding-bottom: 8px;">
          <el-card>
            <charts2></charts2>
          </el-card>
        </el-col>
      </el-row>
       <charts3 style="margin-bottom:15px;"></charts3>
       <charts4 style="margin-bottom:15px;"></charts4>
       <charts5 style="margin-bottom:15px;"></charts5>
       <charts6 style="margin-bottom:15px;"></charts6>
    </div>
  </div>
</template>
<script>
  // 各项检测人数分布（单位 : 人）
  import charts2 from './charts2';
  // 监控指标平均走势
  import charts3 from './charts3';
  // 仪器使用走势统计（单位 : 次）
  import charts4 from './charts4';
  // 用户登录方式统计（单位 : 次）
  import charts5 from './charts5';
  // 总体检查结果统计
  import charts6 from './charts6';
  export default {
    components: {
       charts2,
       charts3,
       charts4,
       charts5,
       charts6
    }
  };
</script>
<style lang="scss" scoped>

</style>
