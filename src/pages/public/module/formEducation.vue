<%--
@Project Name: v-admin
@Author: by 周继雄
@Date: 2017-11-16 12:28
@Email: 1246888200@qq.com
@Idea: WebStorm
@Desc: 公共卫生服务 组件 => 健康教育弹框表单提交
--%>
<template>

<div class="index">
      <el-form>
          <el-form-item label="活动时间：" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="formData.activity_date"
                     type="datetime"
                     value-format="yyyy-MM-dd HH:mm"
                    :picker-options="pickerOptions"
                    placeholder="活动时间">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="活动地点:" :label-width="formLabelWidth">
               <el-input v-model="formData.activity_address"></el-input>
           </el-form-item>
             <el-form-item label="活动形式:" :label-width="formLabelWidth">
               <el-input v-model="formData.activity_form"></el-input>
           </el-form-item>
             <el-form-item label="活动主题:" :label-width="formLabelWidth">
               <el-input v-model="formData.activity_theme"></el-input>
           </el-form-item>
           <el-form-item label="组织者:" :label-width="formLabelWidth">
               <el-input v-model="formData.organizers"></el-input>
           </el-form-item>
            <el-form-item label="接受健康教育人员类别:" :label-width="formLabelWidth">
               <el-input v-model="formData.personnel_type"></el-input>
           </el-form-item>
           <el-form-item label="接受健康教育人数:" :label-width="formLabelWidth">
               <el-input v-model="formData.personnel_count"></el-input>
           </el-form-item>
           <el-form-item label="健康教育资料发放种类及数量:" :label-width="formLabelWidth">
               <el-input v-model="formData.data_type_number"></el-input>
           </el-form-item>
           <el-form-item label="活动内容:" :label-width="formLabelWidth">
               <el-input v-model="formData.active_content" :rows="3" type="textarea"></el-input>
           </el-form-item>
            <el-form-item label="活动总结评价:" :label-width="formLabelWidth">
               <el-input v-model="formData.activity_summarized" :rows="3" type="textarea"></el-input>
           </el-form-item>
           <el-form-item label="存档材料请附后" :label-width="formLabelWidth">
               <el-checkbox-group v-model="formData.archive_material">
                   <el-checkbox  v-for="item in defaultArchive" :key="item.value" :label="item.value">{{item.name}}</el-checkbox>
               </el-checkbox-group>
           </el-form-item>
           <el-form-item label="" v-if="fileList.length > 0" :label-width="formLabelWidth">
               <el-button type="primary" size="small" @click="viewUpdateList">查看已上传文件</el-button>
                
               
           </el-form-item>
           <el-form-item label="文件上传"  v-if="fileList.length > 0" :label-width="formLabelWidth" >
               <el-upload
                    :action="updatePath"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
           </el-form-item>
            <el-form-item label="填表人(签字):" :label-width="formLabelWidth">
               <el-input v-model="formData.preparer"></el-input>
           </el-form-item>
            <el-form-item label="负责人(签字):" :label-width="formLabelWidth">
               <el-input v-model="formData.those_responsible"></el-input>
           </el-form-item>
            <el-form-item label="填表日期：" :label-width="formLabelWidth">
                <el-date-picker
                    v-model="formData.preparer_date"
                    :picker-options="pickerOptions"
                     value-format="yyyy-MM-dd"
                    placeholder="填表日期">
                </el-date-picker>
           </el-form-item>
        </el-form>
        <!-- 弹框 -->
        <div>
                <el-dialog title="文件浏览" :visible.sync="viewUpdateSwitch" :modal="false"  width="60%">
                    <div class="item-title">文件浏览</div>
                    <el-table :data="fileList" style="width: 100%">
                        <el-table-column prop="name" label="文件名"></el-table-column>
                        <el-table-column prop="type" label="文件类型"></el-table-column>
                        <el-table-column prop="link" label="操作">
                            <template slot-scope='scope'>
                                <el-button type="primary" size="mini" @click="viewCurLink(scope)">查看</el-button>
                                <el-button type="danger" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="viewUpdateSwitch = false">关闭</el-button>
                    </div>
            </el-dialog>
        </div>

         <el-dialog title="文件浏览" :visible.sync="videoSwitch" :modal="false"  width="60%">
                <div class="item-title">文件浏览</div>
                <div>
                    <template v-if="music.type === 'video'">
                        <video :src="music.link" controls autoplay class="video" width="100%"></video>
                    </template>
                    <template v-if="music.type === 'image'">
                        <el-image style="width: 100%; height: auto;" :src="music.link"></el-image>
                    </template>
                     <template v-if="music.type === 'text'">
                        <!-- <el-image style="width: 100px; height: 100px" :src="music.link"></el-image> -->
                        <!-- <img :src="music.link" alt=""> -->
                        <div>
                            {{music.link}}
                        </div>
                    </template>
                
                </div>
        </el-dialog>
          
</div>

</template>
<script>
  import { formatDate, extend, arrayStringToNumber, updateKeyHump, pathUpdateJoin } from '../../../assets/js/util.js';
  import { defaultConfig, defaultMachineParam, defaultArchive } from '../../../Constants';

  export default {
     props: ['scope'],
    data() {           
      return {
        updatePath: defaultConfig.updatePath,
        viewUpdateSwitch: false,
        videoSwitch: false,
        formLabelWidth: '120px',
        formData: {
            activity_date: '',
            activity_address: '',
            activity_form: '',
            activity_theme: '',
            organizers: '',
            personnel_type: '',
            personnel_count: '',
            data_type_number: '',
            active_content: '',
            activity_summarized: '',
            archive_material: [],
            preparer: '',
            those_responsible: '',
            preparer_date: ''
        },
        music: {
            volume: ''
        },
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        defaultArchive: defaultArchive,
        pickerOptions: {
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                    picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }]
        }
     
      }
    },
    created() {
        let propData = (this.scope || {}).row || {};
        extend(this.formData, propData);
        this.getCurDetails();
    },
    watch: {
        scope: function(n, o) {
            let propData = (n || {}).row || (this.$options.data()).formData;
            // 只能用覆盖的方式 
            this.formData = propData;
            this.getCurDetails();
        }
    },
    methods: {
        getCurDetails() {
            let formData = this.formData;
            if (!formData.id) return;
            let params = {}
            params.id = formData.id;
            extend(params, defaultMachineParam)
            this.axios.post('SihealIMManagement/health_file/get_education', params).then(res => {
                let json = (res || {}).data || {};
                let curData = updateKeyHump(json, ['file_list'])
                this.fileList = json.file_list || [];
                extend(formData, curData);
                formData.activity_date = formatDate(formData.activity_date, 'Y-M-D h:m:s');
                formData.archive_material = arrayStringToNumber(formData.archive_material)
                formData.preparer_date = formatDate(formData.preparer_date, 'Y-M-D');
                this.updatePath = pathUpdateJoin({
                    vue: this,
                    path: this.updatePath,
                    params: {id: formData.id}
                });
            })
        },
        viewCurLink(items) {
            this.music = items.row;
            this.music.isPlay = true;
            this.videoSwitch = true;
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        viewUpdateList() {
            this.viewUpdateSwitch = true;
        }
    }
  };
</script>
<style lang="scss" scoped>
.el-input{
    width:80%;
}
.el-date-picker,.el-select,.el-textarea{
    width:80%;
}
.red{
    color:red;
}
.item-title{
    text-align: center;
    font-weight: 600;
}
.other-input{
    width:180px;
    margin-left:10px;
}
.other-input-desc{
    width:300px;
    margin-left:10px;
}
.item-unit{
    margin-left:10px;
}
.item-time{
    font-size:12px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
