<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机档案列表  高血压管理 健康体检列表
--%>

<template>
  <div class="filter">
      <div class="header-btn">
          <el-row>
            <!-- <el-button>默认按钮</el-button> -->
            <!-- <el-button type="primary" size="medium"  @click="addRecord">新建档案</el-button> -->
            <el-input
                placeholder="请输入内容"
                class="searchInput"
                size="medium" 
                v-model="searchValue">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="searchValueName"></el-button>
            <!-- <vxe-button class="item-right" @click="openExportEvent">高级导出</vxe-button> -->
            <vxe-button class="item-right" @click="exportDataEvent">默认导出</vxe-button>
            <vxe-button class="item-right btn-refresh" icon="el-icon-refresh" @click="refresh"></vxe-button>
          </el-row>
        
      </div>
           <vxe-table
        highlight-hover-row
        auto-resize
        border="inner"
        ref="xTable1"
        :export-config="{}"
        :data="tableData">
        <vxe-table-column field="healthfile_num" title="档案编号"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" cell-type="string"></vxe-table-column>
        <vxe-table-column field="sex" title="性别"  :formatter="sexFormAtter" cell-type="string"></vxe-table-column>
        <vxe-table-column field="idcard" title="年龄" :formatter="ageFormAtter" cell-type="string"></vxe-table-column>
        <vxe-table-column field="phone" title="联系电话" cell-type="string"></vxe-table-column>
        <vxe-table-column field="current_address" title="现住址" cell-type="string"></vxe-table-column>
        <vxe-table-column title="健康体检"  cell-type="string">
            <template slot-scope="items">
               <el-button type="primary" size="small"  @click="healthyCheckUp(items)">查看</el-button>
            </template>
        </vxe-table-column>
        <vxe-table-column field="tj_date" title="体检时间" :formatter="dateFormat" cell-type="string"></vxe-table-column>
         
    </vxe-table>

    <!-- 分页 -->
    <el-pagination
      background
      :layout="layout"
      :page-size='numPage'
      :page-sizes='pageArray'
      @size-change="sizeChange"
      @current-change="curChange"
      :total="total_num">
    </el-pagination>

      <!-- 弹框 -->
    <div class="dialog">
        <el-dialog title="健康体检" :visible.sync="dialogFormVisible" :modal-append-to-body="false"  width="60%">
          
            <fromViewHealthInfo ref="createFrom4" :record="curRecordId" postUrl='SihealIMManagement/health_file/get_hbp_exam' componentName='get_hbp_exam'></fromViewHealthInfo>
        
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFromInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>
<script>
  // 使用方法
  import { formatDate, extend, updateKeyHump } from '../../../assets/js/util.js';
  import Constants, { defaultMachineParam, defaultConfig } from '../../../Constants';

  import fromViewHealthInfo from '../module/fromViewHealthInfo'

  export default {
    components: {
      fromViewHealthInfo
    },
    data() {
         return {
            dialogFormVisible: false,
            curRecordId: '',
            searchValue: '',
            tableData: [],
            pageArray: defaultConfig.dataNumberPage,
            numPage: defaultConfig.numPage,
            layout: defaultConfig.layoutPage,
            total_num: 50,
            pageNo: 0
         }
    },
    created() {
      this.getExaminationList();
    },
    methods: {
       exportDataEvent () {
            this.$refs.xTable1.exportData({ type: 'csv' })
       },
       healthyCheckUp(scope) {
            // 健康体检
            this.curRecordId = scope;
            this.curDiaType = '健康体检';
            this.dialogFormVisible = true;
       },
       refresh() {
           location.reload();
       },
       sizeChange(size) {
            // update page code 
            this.numPage = size;
            this.getExaminationList();
       },
       dateFormat(item) {
            return formatDate(item.cellValue, 'Y-M-D')
       },
       curChange (size) {
            //  update page
            size = size - 1;
            this.pageNo = size;
            this.getExaminationList();
       },
       searchValueName () {
            this.getExaminationList(this.searchValue);
       },
       sexFormAtter(item) {
         switch (item.cellValue) {
           case 2: return '女';
            case 1: return '男';
            default: return '不详';
         }
       },
       ageFormAtter(item) {
         let age = (item.cellValue || '').substring(10, 6);
         let curYear = new Date().getFullYear();
         if (!age) return '不详'
         return (curYear - +age) || '不详';
       },
       getExaminationList(value) {
          const params = {};
          params.num_page = this.numPage;
          params.page_no = this.pageNo;
          if (value) params.name = value;
          extend(params, defaultMachineParam);
          this.axios.post('SihealIMManagement/health_file/hbp_examination_list', params).then(res => {
            this.tableData = res.data_array;
            this.total_num = (res.page || {}).total_num || 0;
          })
       },
       saveFromInfo() {
            // this.$refs['form'].clearValidate()
            let from4 = this.$refs.createFrom4;
            let params = from4.fromData || {};
            let createTime = Math.floor(new Date().getTime() / 1000);
            params.create_time = createTime;
            if (!params.tjDate) return this.$message({type: 'error', message: '体检日期不能为空'});
            params = updateKeyHump(params, ['birthDate', '_XID', 'has_exam']);
            extend(params, defaultMachineParam);
            this.axios.post('SihealIMManagement/health_file/update_health_exam', params).then(res => {
              if (res.code !== 1) return this.$message({type: 'error', message: '操作异常'});
              this.$message({type: 'success', message: '保存成功'});
              this.dialogFormVisible = false;
            })
       }
    }
  };
</script>
<style lang="scss" scoped>
.el-pagination {
    text-align: right; 
    margin-top:20px;
    margin-bottom:20px;
}
.header-btn {
  margin-bottom:10px;
}
.searchInput{
    width:200px;
    margin-left:10px;
}
.item-right{
    float:right;
    margin-right:10px;
}
.info-error{
    color:red;
}
.btn-refresh{
    color: #000;
    cursor: pointer;
    font-size: 22px;
}
</style>
