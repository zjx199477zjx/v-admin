<template>

<div class="index">

  <div class="header-btn">
      <el-row>
        <!-- <el-button>默认按钮</el-button> -->
        <el-button type="primary" size="small"  @click="addAccount">新增账号</el-button>
      </el-row>
  </div>
   <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="ID"
      >
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="accessDist">权限分配</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
    background
   layout="total, sizes, prev, pager, next, jumper"
    :page-size='10'
    :page-sizes=[10,20]
    :total="pageTotal">
  </el-pagination>
  <div class="dialog">
      <el-dialog :title="curDiaType? '添加账号':'权限分配'" :visible.sync="dialogFormVisible" :modal-append-to-body="false"  width="60%">
      <el-form :model="form" v-if="curDiaType">
        <el-form-item label="登录账号" :label-width="formLabelWidth">
          <el-input v-model="accountArray.username" autocomplete="off" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input v-model="accountArray.password" autocomplete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="accountArray.password2" autocomplete="off" maxlength="8"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else >
          <!-- <el-form-item v-for='item in menuListArray' :key='item.id'>
              <el-checkbox>{{item.name}}</el-checkbox>
          </el-form-item> -->
          <!-- :default-checked-keys="[5]" :default-expanded-keys="[2, 3]" -->
          <el-tree
            :data="menuListArray"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps">
          </el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveFromInfo">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</div>

</template>
<script>
 
  import { menuList, menuTitleFilter } from '../../../data/menu.js';
  import { reduceString } from '../../../assets/js/util.js'
  // import dialog from '../dialog';

  // let menuListArray = menuTitleFilter(menuList());
   let menuListArray = menuList();

  export default {
    // components: {
    //   dialog
    // },
    data() {           
      return {
        tableData: [{
          date: '1',
          role: '超级管理员',
          name: 'su',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2',
          role: '普通用户',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '3',
          role: '游客',
          name: '张小飞',
          address: '上海市普陀区金沙江路 1519 弄'
        }],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        menuListArray: menuListArray,
        pageTotal: 50,
        accountArray: {
          username: '',
          password: '',
          password2: ''
        },
        curDiaType: false,
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row);
      },
      handleDelete(index, row) {
        // 删除账户
         this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      addAccount() {
        this.curDiaType = true;
        this.dialogFormVisible = true;
      },
      accessDist() {
        this.curDiaType = false;
        this.dialogFormVisible = true;
      },
      saveFromInfo(index) {
        // 权限提交
        if (!this.curDiaType) {
          let curArr = this.$refs.tree.getCheckedNodes();
          let ids = reduceString(curArr);
          // console.log(ids)
          return;
        }
        // 添加用户账号
        let accountArray = this.accountArray;
        if (!accountArray.username) this.$message({type: 'error', message: '账号不能为空'});
        if (!accountArray.password || !accountArray.password2) this.$message({type: 'error', message: '密码不能为空'});
        if (accountArray.password !== accountArray.password2) this.$message({type: 'error', message: '两次输入的密码不同'});
        // 提交接口
      }
    }
  };
</script>
<style lang="scss" scoped>
.el-pagination {
    text-align: right; 
    margin-top:20px;
}
.header-btn {
  margin-bottom:10px;
}
.dialog{
  z-index:2010
}
</style>
