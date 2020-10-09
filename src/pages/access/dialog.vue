<template>

  <div class="dialog">
      <el-dialog title="权限分配" :visible.sync="formVisible">
      <el-form>
          <el-form-item v-for='item in list' :key='item.id'>
              <el-checkbox>{{item.name}}</el-checkbox>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="formVisible = false">取 消</el-button>
          <el-button type="primary" @click="formVisible = false">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>
<script>


  export default {
      props: {
          list: {
              type: Array,
              default: false
          },
          dialogFormVisible: {
              type: Boolean,
              default: false
          }
      },
    data() {           
      return {
        formVisible: true,
        formLabelWidth: '120px'
      }
    },
    mounted() {
        this.formVisible = this.formVisible
        console.log(this.list)
        console.log(this.formVisible)
    }
  };
</script>
<style lang="scss" scoped>
</style>
