<template>
  <div class="zi-zhi-shenqing">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">个人信息</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)">
        <i class="zxicon zx-jt-left"></i>返回</a>
      <span class="header_name">证书信息</span>
    </div>
    <div style="max-height: calc(100vh - 100px);" class="body_box">
      <div class="HR-continater">
        <div class="register-info">
          <div class="register-info-content noborder basis-info">
            <el-form class="man-register" :model="row" :rules="rules" ref="certificateInfoForm" label-width="110px" style="padding-top:15px;">
              <el-form-item class="man-stretch" label="名称" prop="zsmc">
                <el-input class="man-md" v-model="row.zsmc" placeholder="请输入证书名称"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-select class="man-md" v-model="row.type">
                  <el-option v-for=" (item,index ) in baseData.zjlx" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="item-right" label="颁发单位" prop="bfdw">
                <el-input v-model="row.bfdw" placeholder="请输入颁发单位名称"></el-input>
              </el-form-item>
              <el-form-item class="man-clearfix" label="编号" prop="zsbh">
                <el-input class="man-md" v-model="row.zsbh" placeholder="请输入编号"></el-input>
              </el-form-item>
              <el-form-item class="item-right" label="有效期">
                <el-col :span="11">
                  <el-form-item prop="yxq" class="man-lg">
                    <el-date-picker class="man-data-picker" v-model="row.yxq" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col v-if="isTigger" :offset="1" :span="12">
                  <span class="man-font-green zxicon zx-gengduo1" @click="yxqTigger">增加截止日期</span>
                </el-col>
                <el-col v-if="!isTigger" class="line" :span="2">
                  <span class="filed isFloat man-filed"></span>
                </el-col>
                <el-col v-if="!isTigger" :span="11" class="man-yxq">
                  <span class="man-yxq zxicon zx-guanbi1" @click="yxqTigger"></span>
                  <el-form-item  class="man-lg">
                    <el-date-picker class="man-data-picker" v-model="row.enddate" type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="上传附件" prop="zgxl" class="man-stretch man-upload-form">
                <el-upload class="upload-demo man-card-img" :action="fileUrl" :data="data" :headers="headers" :before-upload="beforeUpload" :before-remove="beforeRemove" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture-card">
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
        <span>我的证书信息</span>
      </h5>
    </div>
    <div class="man-continater" style=" height: calc( 100% - 615px );min-height:230px">
      <BTable v-bind="tableCertificate" @cellClick="cellClick" />
    </div>
    <el-dialog class="man-img-dialog" title="提示" :visible.sync="isopenImg" width="80%" center>
      <img :src="imgUrl">
    </el-dialog>
  </div>
</template>
<script>
import BTable from '~/components/common/Table'
import addressjson from '~/assets/utils/address.js'
import { mapGetters } from 'vuex'
import {
  getCertificateInformationBook,
  certificateInformationBookEdit,
  certificateInformationBookAdd,
  certificateInformationBookDel,
  certificateInformationBookFileDel,
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
      fileList:[],
      isTigger: true,
      isAdd: true,
      fileList:[],
      row: {
        id: '',
        userid: '',
        type: '',
        zsmc: '',
        bfdw: '',
        zsbh: '',
        yxq: '',
        enddate:'',
        fileid:''
      },
      rules: {
        zsmc: [{ required: true, message: '不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '不能为空', trigger: 'blur' }],
        bfdw: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zsbh: [{ required: true, message: '不能为空', trigger: 'blur' }],
        yxq:[{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      tableCertificate: {
        // 附件列表
        list: [],
        isMultiple: false,
        tableHeader: [
          {
            label: '序号',
            name: 'rowno',
            width: 30
          },
          {
            label: '名称',
            name: 'zsmc',
            width: 80
          },
          {
            label: '类型',
            name: 'type',
            width: 100,
            formatter: row => {
              return this.manKit.getDataByCodeandID(
                this.baseData.zjlx,
                row.type
              )
            }
          },
          {
            label: '编号',
            name: 'zsbh',
            width: 80
          },
          {
            label: '颁发单位',
            name: 'bfdw',
            width: 80
          },
          {
            label: '有限期',
            name: 'yxq',
            width: 50,
            formatter: row => {
              return this.manKit.fmtDate(
                row.yxq
              )
            }
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
      getCertificateInformationBook(query)
        .then(res => {
          this.tableCertificate.list = res
          for (let i = 0; i < this.tableCertificate.list.length; i++) {
            this.tableCertificate.list[i].rowno = i + 1
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
      if(this.row.enddate){
        this.isTigger=false
      }
      else{
        this.isTigger=true
      }
      this.fileList=[]
      if(this.row.fileid){
        let fileList=this.row.fileid.split(',')
        
        for(let i=0;i<fileList.length;i++){
            this.getFileInfo(fileList[i])
        }
      }
    },
    getFileInfo(id){
      searchFile(id).then(res=>{
          let row={
            name:res.data.filename,
            fileid:res.data.id,
            url:downloadURL+'/'+res.data.id
          }
          this.fileList.push(row)
      }).catch(err=>{
         console.log(err)
      })
    },
    clearInfo() {
      this.isAdd = true
      for (let key in this.row) {
        this.row[key] = ''
      }
      this.fileList=[]
    },
    saveInfo() {
      this.row.userid = this.$route.query.userid
      if(this.row.yxq){
        this.row.yxq=this.manKit.fmtDate(this.row.yxq,'yyyy-MM-dd')
      }
      if(this.row.enddate){
        this.row.enddate=this.manKit.fmtDate(this.row.enddate,'yyyy-MM-dd')
      }
      if(this.fileList.length<1){
          this.$message.error('请上传证件图片')
          return
      }
      this.row.fileid=''
      for(let i=0;i<this.fileList.length;i++){
          this.row.fileid+=this.fileList[i].fileid+','
      }
      if(this.row.fileid){
        this.row.fileid=this.row.fileid.substring(0,this.row.fileid.length-1)
      }
      this.$refs['certificateInfoForm'].validate(valid => {
        if (valid) {
            if (this.isAdd) {
              certificateInformationBookAdd(this.row)
                .then(res => {
                  this.init()
                  this.clearInfo()
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              certificateInformationBookEdit(this.row)
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
      this.$confirm('此操作将永久删除该证书, 是否继续?', '提示', {
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
      certificateInformationBookDel(query)
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
    beforeRemove(){
    },
    handleRemove(file, fileList) {
      let query=file.fileid
      this.fileList=fileList.filter(item=>{
         return item.fileid!=file.fileid
      })
      this.row.fileid=''
      for(let i=0;i<this.fileList.length;i++){
          this.row.fileid+=this.fileList[i].fileid+','
      }
      if(this.row.fileid){
        this.row.fileid=this.row.fileid.substring(0,this.row.fileid.length-1)
      }
      delFile(query).then(res=>{
        let query={
          id:this.row.id,
          fileid:this.row.fileid
        }
        if(this.row.id){
          certificateInformationBookFileDel(query).then(res=>{
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
<style lang="less">

</style>


