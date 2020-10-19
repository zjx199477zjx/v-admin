<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: luichooy@163.com
@Idea: WebStorm
@Desc: 一体机档案列表
--%>
<template>

<div class="index">

  <div class="header-btn">
      <el-row>
        <!-- <el-button>默认按钮</el-button> -->
        <el-button type="primary" size="medium"  @click="addRecord">新建档案</el-button>
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
    <!-- 由于 element ui  没有导出组件 所以适用于vxe-table -->
     <vxe-table
        highlight-hover-row
        border="inner"
        ref="xTable1"
        :export-config="{}"
        :data="tableData">
        <vxe-table-column field="name" title="姓名"></vxe-table-column>
        <vxe-table-column field="phone" title="电话" cell-type="string"></vxe-table-column>
        <vxe-table-column title="个人基本信息"  cell-type="string">
            <template slot-scope="items">
                <!-- <div>{{items.row.recordsid}}</div> -->
               <el-button v-if="items.row.recordsid" type="primary" size="small"  @click="viewUserInfo(items)">查看</el-button>
               <el-button v-else type="danger" size="small"  @click="viewUserInfo(items)">新建</el-button>
            </template>
        </vxe-table-column>
        <vxe-table-column title="健康体检" cell-type="string">
            <template slot-scope="items">
                <el-button v-if="items.row.has_exam" type="primary" size="small"  @click="healthyCheckUp(items)">查看</el-button>
                <el-button v-else type="danger" size="small"  @click="healthyCheckUp(items)">新建</el-button>
            </template>
        </vxe-table-column>
        <vxe-table-column title="健康信息卡" cell-type="string">
            <!-- <el-button type="primary" size="small"  @click="addRecord">查看</el-button> -->
            <template slot-scope="items">
                <!-- <div>{{items.row.recordsid}}</div> -->
               <el-button v-if="items.row.recordsid" type="primary" size="small"  @click="viewUserInfoCard(items)">查看</el-button>
               <template v-else>
                   <span class="info-error">请完善您的个人信息</span>
               </template>
            </template>
        </vxe-table-column>
        <vxe-table-column field="create_units" title="建档单位" cell-type="string"></vxe-table-column>
        <vxe-table-column field="create_time" :formatter="dateFormat"  title="建档时间" cell-type="string" sortable></vxe-table-column>
        <vxe-table-column title="操作" cell-type="string">
             <template slot-scope="items">
                <el-button type="primary" size="small"  @click="removal(items)">迁移</el-button>
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
  <div class="dialog">
      <el-dialog :title="curDiaType" :visible.sync="dialogFormVisible" :modal-append-to-body="false"  width="60%">
        <template v-if="curState === 1">
            <fromAddress ref="createFrom1"></fromAddress>
            <fromEditData ref="createFrom2"></fromEditData>
        </template>
        <template v-if="curState === 2">
            <fromViewUserInfo ref="createFrom3" :record="curRecordId"></fromViewUserInfo>
        </template>
        <template v-if="curState === 3">
            <fromViewHealthInfo ref="createFrom4" :record="curRecordId" componentName='get_health_exam'></fromViewHealthInfo>
        </template>
         <template v-if="curState === 4">
            <fromViewInfoCard ref="createFrom5" :record="curRecordId"></fromViewInfoCard>
        </template>
        <template v-if="curState === 5">
            <fromRemoval ref="createFrom5" :record="curRecordId"></fromRemoval>
            <fromAddress ref="createFrom1"></fromAddress>
        </template>
      <!-- <el-form v-else >
          <el-tree
            :data="menuListArray"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            :props="defaultProps">
          </el-tree>
      </el-form> -->
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
  import { formatDate, extend, updateKeyHump } from './../../assets/js/util.js';
  import Constants, { defaultMachineParam, defaultConfig } from '../../Constants';
  //   创建档案
  import fromAddress from './module/address';
  import fromEditData from './module/addRecordEdit';
  import fromViewUserInfo from './module/viewUserInfo';
  import fromViewHealthInfo from './module/fromViewHealthInfo';
  import fromViewInfoCard from './module/fromViewInfoCard';
  import fromRemoval from './module/fromRemoval';
  export default {
    components: {
      fromAddress,
      fromEditData,
      fromViewUserInfo,
      fromViewHealthInfo,
      fromViewInfoCard,
      fromRemoval
    },
    data() {           
      return {
        searchValue: '',
        tableData: [],
        pageArray: defaultConfig.dataNumberPage,
        numPage: defaultConfig.numPage,
        layout: defaultConfig.layoutPage,
        total_num: 50,
        pageNo: 0,
        dialogFormVisible: false,
        curState: 1,
        curRecordId: '',
        accountArray: {
          username: '',
          password: '',
          password2: ''
        },
        dateFormat: (item) => {
            return formatDate(item.cellValue, 'Y-M-D')
        },
        curDiaType: '新建档案',
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
    created() {
        this.getApiData();
    },
    methods: {
        exportDataEvent () {
            this.$refs.xTable1.exportData({ type: 'csv' })
        },
        sizeChange (size) {
            // update page code 
            this.numPage = size;
            this.getApiData();
        },
        curChange (size) {
            //  update page
            size = size - 1;
            this.pageNo = size;
            this.getApiData();
        },
        searchValueName () {
            this.getApiData(this.searchValue);
        },
        getApiData(value) {
            let _this = this;
            let params = {};
            params.num_page = _this.numPage;
            params.page_no = _this.pageNo
            if (value) params.name = value;
            extend(params, defaultMachineParam);
            _this.axios.post('SihealIMManagement/health_file/file_list', params).then(res => {
                res = res || {};
                const pages = res.page || {}
                _this.total_num = pages.total_num || 0;
                _this.tableData = res.data_array || [];
            })
        },
        addRecord() {
            // 新建档案
            this.curDiaType = '档案封面';
            this.curState = 1;
            this.dialogFormVisible = true;
        },
        viewUserInfo(scope) {
            // 查看个人信息
            this.curRecordId = scope;
            this.curState = 2;
            this.curDiaType = '个人基本信息';
            this.dialogFormVisible = true;
        },
        healthyCheckUp(scope) {
            // 健康体检
            this.curRecordId = scope;
            this.curState = 3;
            this.curDiaType = '健康体检';
            this.dialogFormVisible = true;
        },
        viewUserInfoCard(scope) {
            this.curRecordId = scope;
            this.curState = 4;
            this.curDiaType = '健康信息卡';
            this.dialogFormVisible = true;
        },
        removal(scope) {
            this.curRecordId = scope;
            this.curState = 5;
            this.curDiaType = '档案迁徙';
            this.dialogFormVisible = true;
        },
        accessDist() {
            this.curDiaType = false;
            this.dialogFormVisible = true;
        },
        refresh() {
           location.reload();
        },
        saveFromInfo(data) {
            let params = {};
            let createTime = Math.floor(new Date().getTime() / 1000);
            switch (this.curState) {
                case 1:
                    // 新建档案
                    const from1 = this.$refs.createFrom1;
                    const from2 = this.$refs.createFrom2;
                    const areaCode = from1.committeesValue || from1.townsValue || from1.areaValue || from1.cityValue || from1.provinceValue;
                    
                
                    if (!areaCode) return this.$message({type: 'error', message: '请选择地址！'});
                    if (!from2.card) return this.$message({type: 'error', message: '身份证号码为必填项！'});
                    if (!from2.orgValue) return this.$message({type: 'error', message: '建档单位为必填项！'});
                    if (!from2.doctorValue) return this.$message({type: 'error', message: '责任医生为必填项！'});
                   
                    params = {
                        doctor_id: from2.doctorValue,
                        idcard: from2.card,
                        area_code: areaCode,
                        healthfile_num: '',
                        name: from2.username,
                        current_address: from2.curAddress,
                        address: from2.censusAddress,
                        org_id: from2.orgValue,
                        org_name: from2.curOrgName,
                        create_units: from2.curOrgName,
                        phone: from2.phoneValue,
                        create_name: from2.createRecordRen,
                        doctor_name: from2.doctorName,
                        resp_doctor: from2.doctorValue,
                        create_date: from2.createDate ? formatDate(from2.createDate, 'Y-M-D') : formatDate(createTime * 1000, 'Y-M-D'),
                        create_time: createTime
                        
                    };
                    extend(params, defaultMachineParam);
                    this.axios.post('SihealIMManagement/health_file/add_new_memberfile', params).then(res => {
                        if (res.code !== 1) return this.$message({type: 'error', message: res.message || '操作异常'});
                        this.$message({type: 'success', message: '保存成功'});
                        this.dialogFormVisible = false;
                    })
                    break;
                case 2:
                    const from3 = this.$refs.createFrom3;
                    params = from3.fromData || {};
                    params.create_time = createTime;
                    params = updateKeyHump(params, ['birthDate', '_XID']);
                    extend(params, defaultMachineParam);
                    this.axios.post('SihealIMManagement/health_file/update_health_record', params).then(res => {
                        if (res.code !== 1) return this.$message({type: 'error', message: res.message || '操作异常'});
                        this.$message({type: 'success', message: '保存成功'});
                        this.dialogFormVisible = false;
                    })
                    break;
                case 3:
                    // this.$refs['form'].clearValidate()
                     const from4 = this.$refs.createFrom4;
                     params = from4.fromData || {};
                     params.create_time = createTime;
                     if (!params.tjDate) this.$message({type: 'error', message: '体检日期不能为空'});
                     params = updateKeyHump(params, ['birthDate', '_XID', 'has_exam']);
                     extend(params, defaultMachineParam);
                     this.axios.post('SihealIMManagement/health_file/update_health_exam', params).then(res => {
                        if (res.code !== 1) return this.$message({type: 'error', message: res.message || '操作异常'});
                        this.$message({type: 'success', message: '保存成功'});
                        this.dialogFormVisible = false;
                     })
                    break
                case 4:
                    this.dialogFormVisible = false;
                    break;
                case 5: 
                    const from6 = this.$refs.createFrom1;
                    const from5 = this.$refs.createFrom5;
                    const areaCode6 = from6.committeesValue || from6.townsValue || from6.areaValue || from6.cityValue || from6.provinceValue;
                    if (!areaCode6) this.$message({type: 'error', message: '请先选择需要迁移的区域'});
                    params = {new_code: areaCode6, did: from5.fromData.did};
                    extend(params, defaultMachineParam);
                    this.axios.post('SihealIMManagement/health_file/file_transfer', params).then(res => {
                        if (res.code !== 1) return this.$message({type: 'error', message: res.message || '操作异常'});
                        this.$message({type: 'success', message: '保存成功'});
                        this.dialogFormVisible = false;
                        this.getApiData();
                    })
                    break;
            }
            // console.log(data)
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
