<template>
  <div class="zi-zhi-shenqing" style="overflow: hidden">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">个人信息</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)">
        <i class="zxicon zx-jt-left"></i>返回</a>
      <span class="header_name">教育背景</span>
    </div>
    <div style="max-height: calc(100vh - 100px);overflow-x: hidden;" class="body_box">
      <div class="HR-continater">
        <div class="register-info">
          <div class="register-info-content noborder basis-info">
            <el-form class="man-register" :model="row" :rules="rules" ref="eduInfoForm" label-width="110px" style="padding-top:15px;">
              <el-form-item class="item-right" label="类型" prop="type">
                <el-select v-model="row.type">
                  <el-option  v-for="item in typeList" :key="'type_'+item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="item-right" label="时间" required>
                <el-col :span="11">
                  <el-form-item prop="rxsj" class="man-lg">
                    <el-date-picker class="man-data-picker" v-model="row.rxsj" type="date" placeholder="请选择入学日期"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">
                  <span class="filed isFloat man-filed"></span>
                </el-col>
                <el-col :span="11" class="man-yxq">
                  <el-form-item prop="bysj" class="man-lg">
                    <el-date-picker class="man-data-picker" v-model="row.bysj" type="date" placeholder="请选择毕业日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="专业" prop="zy">
                <el-input v-model="row.zy" placeholder="请输入专业"></el-input>
              </el-form-item>
              <el-form-item class="item-right" label="学校名称" prop="xxname">
                <el-input v-model="row.xxname" placeholder="请输入学校名称"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-col :span="12">
                   <span class="man-pointer man-font-blue zxicon zx-shangchuan" @click="isOpenbyz=!isOpenbyz">上传毕业证书</span>
                 </el-col>
                  <el-col :span="12">
                   <span class="man-pointer man-font-blue zxicon zx-shangchuan" @click="isOpenxwz=!isOpenxwz" >上传学位证书</span>
                 </el-col>
              </el-form-item>
              <el-form-item class="item-right" label="证明人" required>
                <el-col :span="11">
                  <el-form-item class="man-lg man-both" >
                    <el-input v-model="row.zmr" prefix-icon="zxicon zx-lianxiren1 man-font-gray" placeholder="请填写证明人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">
                  <div class="man-span-line man-both">
                    <span class="filed isFloat man-filed"></span>
                  </div>
                </el-col>
                <el-col :span="11" >
                  <el-form-item class="man-lg man-both"> 
                    <el-input v-model="row.zmrtel" prefix-icon="zxicon zx-shouji1 man-font-gray" placeholder="请填写联系方式"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item v-if="isOpenbyz" label="上传毕业证书" class="man-stretch man-upload-form">
                <el-upload class="upload-demo man-card-img" :action="fileUrl" :data="data" :headers="headers" :before-upload="beforeUpload" :before-remove="beforeRemove" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture-card">
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
              </el-form-item>
              <el-form-item v-if="isOpenxwz" label="上传学位证书" class="man-stretch man-upload-form">
                <el-upload class="upload-demo man-card-img" :action="fileUrl" :data="data" :headers="headers" :before-upload="beforeUpload" :before-remove="beforeRemove" :on-success="handleXWSuccess" :on-preview="handlePreview" :on-remove="handleXWRemove" :file-list="XWfileList" list-type="picture-card">
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
              </el-form-item>
              <el-form-item class="man-stretch">
                <el-button type="primary" style="background-color:#409EFF;border:0;" @click="saveInfo">保存</el-button>
                <el-button type="primary" style="background-color:#bdbdbd;border:0;" @click="clearInfo">清空</el-button>
                <el-button type="danger" v-if="!isAdd" @click="cofmDel">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>我的教育背景</span>
      </h5>
    </div>
    <div class="man-continater" style=" height: calc( 100% - 463px );min-height:230px">
      <BTable v-bind="tableEdu" @cellClick="cellClick" />
    </div>
  </div>
</template>
<script>
import BTable from '~/components/common/Table'
import addressjson from '~/assets/utils/address.js'
import { mapGetters } from 'vuex'
import {
  getEducationBackground,
  educationBackgroundEdit,
  educationBackgroundAdd,
  educationBackgroundDel,
  educationBackgroundDiplomaDel,
  educationBackgroundDegreeDel,
  fileUrl,
  delFile,
  downloadURL,
  download,
  searchFile
} from '@/assets/utils/api'
export default {
  components: { BTable },
  data() {
    return {
      fileUrl:fileUrl,
      headers:{},
      data:{
        username:'',
        userid:''
      },
      isopenImg:false,
      imgUrl:'',
      isTigger: true,
      isAdd: true,
      isOpenbyz:false,
      isOpenxwz:false,
      fileList: [],
      XWfileList:[],
      typeList:[
        {label:'幼儿园',value:'01'},
        {label:'小学',value:'02'},
        {label:'初中',value:'03'},
        {label:'高中',value:'04'},
        {label:'专科',value:'05'},
        {label:'本科',value:'06'},
        {label:'研究生',value:'07'},
        {label:'博士',value:'08'},
        {label:'博士后',value:'09'},
        {label:'专升本',value:'10'},
        {label:'在职研究生',value:'11'},
        {label:'在职博士',value:'12'}
      ],
      row: {
        id: '',
        userid: '',
        type: '',
        rxsj:'',
        bysj:'',
        xxname:'',
        zy:'',
        byz:'',
        xwz:'',
        zmr:'',
        zmrtel:''
      },
      rules: {
        rxsj: [{ required: true, message: '不能为空', trigger: 'blur' }],
        bysj: [{ required: true, message: '不能为空', trigger: 'blur' }],
        xxname: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zy: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zmr: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zmrtel: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      tableEdu: {
        // 附件列表
        list: [],
        isMultiple: false,
        tableHeader: [
          {
            label: '序号',
            name: 'rowno',
            width: 60
          },
          {
            label: '类型',
            name: 'type',
            width: 80,
            formatter:row=>{
               let ary=this.typeList.filter(item=>{
                   return item.value===row.type
               })
               return ary[0].label
            }
          },
          {
            label: '入学时间',
            name: 'rxsj',
            width: 80,
            formatter: row => {
              return this.manKit.fmtDate(row.rxsj)
            }
          },
          {
            label: '毕业时间',
            name: 'khzh',
            width: 80,
            formatter: row => {
              return this.manKit.fmtDate(row.bysj)
            }
          },
          {
            label: '专业',
            name: 'zy',
            width: 80
          },
          {
            label: '学校名称',
            name: 'xxname',
            width: 100
          }
        ],
        listQuery: {
          pageIndex: 1,
          pageSize: 10
        },
        total: 0,
        operates: {
          show: true,
          width: 300,
          list: []
        },
        title: {
          show: false,
          align: 'left',
          label: `附件列表`,
          list: []
        },
        multipleselection: [] // 多行选中
      }
    }
  },
  computed: {
    ...mapGetters(['baseData'])
  },
  methods: {
    init() {
      let userInfo=JSON.parse(sessionStorage.getItem('user'));
      this.data.username=userInfo.username
      this.data.userid=userInfo.userid
      let authToken =  sessionStorage.getItem('access_token');
      this.headers={
        Authorization : `Bearer ` + authToken
      }
      this.search()
    },
    search(){
      let query = {
        userid: this.$route.query.userid
      }
      getEducationBackground(query)
        .then(res => {
          this.tableEdu.list = res
          for (let i = 0; i < this.tableEdu.list.length; i++) {
            this.tableEdu.list[i].rowno = i + 1
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cellClick(row) {
      this.isAdd = false
      for (let key in this.row) {
        this.row[key] = row[key]
      }
      if (this.row.enddate) {
        this.isTigger = false
      } else {
        this.isTigger = true
      }
      this.fileList=[]
      if(this.row.byz){
        this.isOpenbyz=true
        let fileList=this.row.byz.split(',')
        for(let i=0;i<fileList.length;i++){
            this.getFileInfo(fileList[i])
        }
      }
      else{
        this.isOpenbyz=false
      }
      this.XWfileList=[]
      if(this.row.xwz){
        this.isOpenxwz=true
        let fileList=this.row.xwz.split(',')
        for(let i=0;i<fileList.length;i++){
            this.getFileInfo(fileList[i],'xwz')
        }
      }
      else{
        this.isOpenxwz=false
      }

      
    },
    getFileInfo(id,code){
      searchFile(id).then(res=>{
          let row={
            name:res.data.filename,
            fileid:res.data.id,
            url:downloadURL+'/'+res.data.id
          }
          if(code==='xwz'){
            this.XWfileList.push(row)
          }
          else{
            this.fileList.push(row)
          }
          
      }).catch(err=>{
         console.log(err)
      })
    },
    clearInfo() {
      this.isAdd = true
      for (let key in this.row) {
        this.row[key] = ''
      }
      this.row.type = '01'
      this.fileList=[]
      this.XWfileList=[]
      this.isOpenbyz=false
      this.isOpenxwz=false
    },
    saveInfo() {
      this.row.userid = this.$route.query.userid
      if (this.row.bysj) {
        this.row.bysj = this.manKit.fmtDate(this.row.bysj, 'yyyy-MM-dd')
      }
      if (this.row.rxsj) {
        this.row.rxsj = this.manKit.fmtDate(this.row.rxsj, 'yyyy-MM-dd')
      }
      this.row.byz=''
      for(let i=0;i<this.fileList.length;i++){
          this.row.byz+=this.fileList[i].fileid+','
      }
      if(this.row.byz){
        this.row.byz=this.row.byz.substring(0,this.row.byz.length-1)
      }

      this.row.xwz=''
      for(let i=0;i<this.XWfileList.length;i++){
          this.row.xwz+=this.XWfileList[i].fileid+','
      }
      if(this.row.xwz){
        this.row.xwz=this.row.xwz.substring(0,this.row.xwz.length-1)
      }
        this.$refs['eduInfoForm'].validate(valid => {
          if (valid) {
            if (this.isAdd) {
              educationBackgroundAdd(this.row)
                .then(res => {
                  this.init()
                  this.clearInfo()
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              educationBackgroundEdit(this.row)
                .then(res => {
                  this.init()
                  this.clearInfo()
                })
                .catch(err => {
                  console.log(err)
                })
            }
          } else {
            return false
          }
        })
    },
    cofmDel() {
      this.$confirm('此操作将永久删除该教育背景, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delInfo()
        })
        .catch(err => {
          console.log(err)
        })
    },
    delInfo() {
      let query = {
        id: this.row.id
      }
      educationBackgroundDel(query)
        .then(res => {
          if (res === 1) {
            this.$message.success('删除成功')
            this.init()
            this.clearInfo()
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(err => {
          consol.log(err)
        })
    },
    yxqTigger() {
      this.isTigger = !this.isTigger
    },
    beforeRemove(){},
    handleRemove(file, fileList) {
      let query=file.fileid
      this.fileList=fileList.filter(item=>{
         return item.fileid!=file.fileid
      })
      this.row.byz=''
      for(let i=0;i<this.fileList.length;i++){
          this.row.byz+=this.fileList[i].fileid+','
      }
      if(this.row.byz){
        this.row.byz=this.row.byz.substring(0,this.row.byz.length-1)
      }
      delFile(query).then(res=>{
        let query={
          id:this.row.id,
          fileid:this.row.byz
        }
        if(this.row.id){
          educationBackgroundDiplomaDel(query).then(res=>{
            this.search()
          }).catch(err=>{
             console.log(err)
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    handlePreview(file) {
      this.isopenImg=true
      this.imgUrl=file.url
    },
    handleSuccess(fileList){
        let row={
          name:fileList.data.filename,
          fileid:fileList.data.id,
          url:downloadURL+'/'+fileList.data.id
        }
        this.fileList.push(row)
    },
    handleXWSuccess(fileList){
        let row={
          name:fileList.data.filename,
          fileid:fileList.data.id,
          url:downloadURL+'/'+fileList.data.id
        }
        this.XWfileList.push(row)
    },
    handleXWRemove(file, fileList){
      let query=file.fileid
      this.XWfileList=fileList.filter(item=>{
         return item.fileid!=file.fileid
      })
      this.row.xwz=''
      for(let i=0;i<this.XWfileList.length;i++){
          this.row.xwz+=this.XWfileList[i].fileid+','
      }
      if(this.row.xwz){
        this.row.xwz=this.row.xwz.substring(0,this.row.xwz.length-1)
      }
      delFile(query).then(res=>{
        let query={
          id:this.row.id,
          fileid:this.row.xwz
        }
        if(this.row.id){
          educationBackgroundDegreeDel(query).then(res=>{
            this.search()
          }).catch(err=>{
             console.log(err)
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    beforeUpload(file){
      if(file.size>2465792){
          this.$message.error('文件大小不能超过2M')
          return false
      }
      else{
          let exp=file.name.substring(file.name.lastIndexOf('.'),file.name.length)
          if(exp!='.jpg' && exp!='.png'){
            this.$message.error('只能上传.jpg 和.png格式的文件')
            return false
          }
      }
        return true
    }
  },
  created() {
    this.init()
  }
}
</script>


