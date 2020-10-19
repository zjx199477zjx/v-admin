<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: 1246888200@qq.com
@Idea: WebStorm
@Desc: 公共卫生服务管理  健康教育
--%>
<template>
  <div class="filter">
      <div class="header-btn">
          <el-row>
            <!-- <el-button>默认按钮</el-button> -->
            <el-button type="primary" size="medium"  @click="healthyCheckUp()">新建健康教育</el-button>
            <el-input
                placeholder="身份证和主题搜索"
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
        border="inner"
        ref="xTable1"
        :export-config="{}"
        :data="tableData">
        <vxe-table-column field="organizers" title="组织者"></vxe-table-column>
        <vxe-table-column field="activityTheme" title="活动主题" cell-type="string"></vxe-table-column>
        <vxe-table-column field="activityForm" title="活动形式"  cell-type="string"></vxe-table-column>
        <vxe-table-column field="activityAddress" title="活动地点" cell-type="string"></vxe-table-column>
        <vxe-table-column field="activityDate" title="活动时间" :formatter="dateFormat2" cell-type="string"></vxe-table-column>
        <vxe-table-column field="preparerDate" title="填表时间" :formatter="dateFormat" cell-type="string"></vxe-table-column>
        <!-- <vxe-table-column title="健康体检" cell-type="string">查看</vxe-table-column> -->
        <vxe-table-column title="查看"  cell-type="string">
            <template slot-scope="items">
               <el-button type="primary" size="small"  @click="healthyCheckUp(items)">查看</el-button>
            </template>
        </vxe-table-column>
         
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
  
        <el-dialog title="健康教育" :visible.sync="dialogFormVisible" :modal-append-to-body="false"  width="60%">
          
            <formEducation ref="createForm" :scope="scope"></formEducation>
        
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFromInfo">确 定</el-button>
            </div>
        </el-dialog>

  </div>
</template>
<script>
  // 使用方法
  import { formatDate, extend, updateKeyHump, SFID } from './../../assets/js/util.js';
  import Constants, { defaultMachineParam, defaultConfig } from '../../Constants';

  import formEducation from './module/formEducation'

  export default {
    components: {
      formEducation
    },
    data() {
         return {
            dialogFormVisible: false,
            scope: '',
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
            this.scope = scope;
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
       dateFormat2(item) {
            return formatDate(item.cellValue, 'Y-M-D h:m:s')
       },
       curChange (size) {
            //  update page
            size = size - 1;
            this.pageNo = size;
            this.getExaminationList();
       },
       searchValueName () {
            if (SFID(this.searchValue)) return this.getExaminationList('idcard', this.searchValue);
            this.getExaminationList('theme', this.searchValue)
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
       getExaminationList(key, value) {
          const params = {};
          params.num_page = this.numPage;
          params.page_no = this.pageNo;
          if (key) params[key] = value;
          extend(params, defaultMachineParam);
          this.axios.post('SihealIMManagement/health_file/education_list', params).then(res => {
              console.log(res)
            this.tableData = res.data_array;
            this.total_num = (res.page || {}).total_num || 0;
          })
       },
       saveFromInfo() {
            // this.$refs['form'].clearValidate()
            let from = this.$refs.createForm;
            let params = from.formData || {};
            params = updateKeyHump(params, [], true);
            extend(params, defaultMachineParam);
            this.axios.post('SihealIMManagement/health_file/update_education', params).then(res => {
              if (res.code !== 1) return this.$message({type: 'error', message: res.message || '操作异常'});
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
