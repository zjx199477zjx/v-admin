<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2020-10-09 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机档案列表  老年人健康管理列表
--%>
<template>
    <div>
        <div class="header-btn">
            <el-row>
            <el-input
                placeholder="请输入内容"
                class="searchInput"
                size="medium" 
                v-model="searchValue">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="searchValueName"></el-button>
            <vxe-button class="item-right" @click="exportDataEvent">默认导出</vxe-button>
            <vxe-button class="item-right btn-refresh" icon="el-icon-refresh" @click="refresh"></vxe-button>
            </el-row>
        </div>
            <div class="page-addDifferent">
                <vxe-table
                    highlight-hover-row
                    auto-resize
                    border="inner"
                    ref="xTable1"
                    :export-config="{}"
                    :data="tableData">
                    <vxe-table-column field="name" title="姓名" cell-type="string"></vxe-table-column>
                    <vxe-table-column field="sex" title="性别" :formatter="sexFormAtter" cell-type="string"></vxe-table-column>
                    <vxe-table-column field="idcard" title="年龄" :formatter="ageFormAtter" cell-type="string"></vxe-table-column>
                    <vxe-table-column field="idcard" title="身份证号" cell-type="string"></vxe-table-column>
                    <vxe-table-column field="createtime" title="创建时间" :formatter="dateFormat"></vxe-table-column>
                    <vxe-table-column title="老年人生活评估"  cell-type="string">
                        <template slot-scope="items">
                        <el-button  type="primary" size="small"  @click="addPeopleAsses(items)">查看</el-button>
                        </template>
                    </vxe-table-column>
                    <!-- <vxe-table-column title="老年人健康体检"  cell-type="string">
                        <template slot-scope="items">
                        <el-button  type="primary" size="small"  @click="addPeopleExamination(items)">添加</el-button>
                        </template>
                    </vxe-table-column>  -->
                </vxe-table>
            </div>

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

        <!-- dialog -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="60%">
            <!-- <editFormDifferent ref="createFrom" :record="scope"></editFormDifferent> -->
           <fromPenpleAssess ref="createFrom1" :record="scope"></fromPenpleAssess>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFromInfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
  import { formatDate, extend, updateKeyHump } from './../../../assets/js/util.js';
  import { defaultMachineParam, defaultConfig } from '../../../Constants';

 // 老年人评估模块
 import fromPenpleAssess from '../module/fromPenpleAssess';

  export default {
    components: {
        fromPenpleAssess
    },
    data() {
      return {
        scope: '', 
        dialogFormVisible: false,
        pageArray: defaultConfig.dataNumberPage,
        numPage: defaultConfig.numPage,
        layout: defaultConfig.layoutPage,
        total_num: 50,
        dialogState: 1,
        dialogTitle: '',
        pageNo: 0,
        searchValue: '',
        tableData: []
      };
    },
    created() {
        this.getDifferentList();
    },
    methods: {
      getDifferentList(value) {
        let params = {};
        params.num_page = this.numPage;
        params.page_no = this.pageNo;
         if (value) params.name = value;
        extend(params, defaultMachineParam);
        this.axios.post('SihealIMManagement/health_file/elderly_life_capability_list', params).then(res => {
          res = res || {};
          this.total_num = (res.page || {}).total_num;
          this.tableData = res.data_array;
        })
      },
      ageFormAtter(item) {
         let age = (item.cellValue || '').substring(10, 6);
         let curYear = new Date().getFullYear();
         if (!age) return '不详'
         return (curYear - +age) || '不详';
      },
      refresh() {
           location.reload();
       },
       sizeChange(size) {
            // update page code 
            this.numPage = size;
            this.getDifferentList();
       },
       dateFormat(item) {
            return formatDate(item.cellValue, 'Y-M-D')
       },
       curChange (size) {
            //  update page
            size = size - 1;
            this.pageNo = size;
            this.getDifferentList();
       },
       searchValueName () {
            this.getDifferentList(this.searchValue);
       },
       sexFormAtter(item) {
           switch (item.cellValue) {
               case 2: return '女';
               case 1: return '男';
               default: return '不详';
           }
       },
       addPeopleAsses(scope) {
        //    添加老年人生活评估
            this.scope = scope;
            this.dialogState = 1;
            this.dialogTitle = '老年人生活能力评估';
            this.dialogFormVisible = true;
       },
       saveFromInfo() {
           let form, params;
            form = this.$refs.createFrom1;
            params = {};
            extend(params, form.fromData, defaultMachineParam);
            params.card_id = params.idcard
            params.id = ''
            this.axios.post('SihealIMManagement/health_file/add_elderly_cap', params).then(res => {
                if (res.code !== 1) return this.$message({type: 'error', message: res.message});
                this.$message({type: 'success', message: '保存成功'});
                this.dialogFormVisible = false;
            })
       },
       exportDataEvent () {
            this.$refs.xTable1.exportData({ type: 'csv' })
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