<template>
  <div class="zi-zhi-shenqing">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">个人信息</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)">
        <i class="zxicon zx-jt-left"></i>返回</a>
      <span class="header_name">工作经历</span>
    </div>
    <div style="max-height: calc(100vh - 100px);" class="body_box">
      <div class="HR-continater">
        <div class="register-info">
          <div class="register-info-content noborder basis-info">
            <el-form class="man-register" :model="row" :rules="rules" ref="workInfoForm" label-width="110px" style="padding-top:15px;">
              <el-form-item class="item-right" label="工作单位" prop="gzdw">
                <el-input v-model="row.gzdw" placeholder="请输入工作单位"></el-input>
              </el-form-item>
              <el-form-item class="item-right" label="工作时间" required>
                <el-col :span="11">
                  <el-form-item prop="rzsj" class="man-lg">
                    <el-date-picker class="man-data-picker" v-model="row.rzsj" type="date" placeholder="请选择入职时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">
                  <span class="filed isFloat man-filed"></span>
                </el-col>
                <el-col :span="11">
                  <!-- <span class="man-yxq zxicon zx-guanbi1" @click="yxqTigger"></span> -->
                  <el-form-item prop="lzsj" class="man-lg">
                    <el-date-picker class="man-data-picker" v-model="row.lzsj" type="date" placeholder="请选择离职时间"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="部门" prop="gzbm">
                <el-input v-model="row.gzbm" placeholder="请输入部门"></el-input>
              </el-form-item>
              <el-form-item class="item-right man-upload-form" label="岗位" prop="post">
                <div class="man-tag-continater">
                   <el-tag class="man-vertical-top" :key="tag.id" v-for="tag in showReportList" closable :disable-transitions="false" @close="handleClose(tag)"> {{tag.name}}</el-tag>
                   <el-button class="man-vertical-top" size="mini" icon="zxicon zx-lianxiren1" @click="isaddPost=true">添加岗位</el-button>
                </div>
              </el-form-item>
              <el-form-item  label="级别" prop="levelid">
                <el-select v-model="row.levelid" placeholder="请选择级别">
                  <el-option v-for=" item in levelList " :key="item.code" :value="item.code" :label="item.name" ></el-option>
                </el-select>
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
                    <el-input v-model="row.zmrdh" prefix-icon="zxicon zx-shouji1 man-font-gray" placeholder="请填写联系方式"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="工资" prop="gz">
                <el-input v-model="row.gz" placeholder="请输入工资"></el-input>
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
        <span>我的工作经历</span>
      </h5>
    </div>
    <div class="man-continater" style=" height: calc( 100% - 490px );min-height:230px">
      <BTable v-bind="tableEdu" @cellClick="cellClick" />
    </div>
    <!-- 汇报对象 -->
    <el-dialog title="岗位" :visible.sync="isaddPost">
      <div class="add-approver" v-if="isaddPost">
        <cus-add-member 
            :datas="postTree" 
            nameSpace='ddPostlist' 
            :render-after-expand="false" 
            :defaultProps="defaultProps" 
            :defaultimg='defaultimg' 
            :nodekey="defaultCode"
            :default-member="showReportList"
            @handle="handle">
        </cus-add-member>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isaddPost = false">取 消</el-button>
        <el-button type="primary" @click="saveOrDeletePost">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BTable from '~/components/common/Table'
import addressjson from '~/assets/utils/address.js'
import CusAddMember from "../common/cusAddMember";
import avator from "../../../static/head.jpg"
import { mapGetters } from 'vuex'
import {
  getWorkExperience,
  workExperienceEdit,
  workExperienceAdd,
  workExperienceDel,
  postQuery,
  levelQuery
} from '@/assets/utils/api'
export default {
  components: { BTable ,"cus-add-member": CusAddMember,},
  data() {
    return {
      isTigger: true,
      isAdd: true,
      fileList: [],
      isaddPost:false,
      postTree: [],
      linkmanLsit:[{zmr:'',zmrtel:''}],
      defaultProps: {
        label: "name",
        children: "children"
      },
      levelList:[],
      defaultCode:'code',
      defaultimg:avator,
      showReportList:[],
      temppost:[],
      row: {
        id: '',
        userid: '',
        gzdw: '',
        rzsj:'',
        lzsj:'',
        gzbm:'',
        post:'',
        levelid:'',
        gz:'',
        zmr:'',
        zmrdh:''
      },
      rules: {
        gzdw: [{ required: true, message: '不能为空', trigger: 'blur' }],
        rzsj: [{ required: true, message: '不能为空', trigger: 'blur' }],
        lzsj: [{ required: true, message: '不能为空', trigger: 'blur' }],
        gzbm: [{ required: true, message: '不能为空', trigger: 'blur' }],
        post:[{ required: true, message: '不能为空', trigger: 'blur' }],
        levelid: [{ required: true, message: '不能为空', trigger: 'blur' }],
        gz: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zmr: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zmrdh: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      tableEdu: {
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
            label: '工作单位',
            name: 'gzdw',
            width: 80
          },
          {
            label: '入学时间',
            name: 'rzsj',
            width: 80,
            formatter: row => {
              return this.manKit.fmtDate(row.rzsj)
            }
          },
          {
            label: '离职时间',
            name: 'lzsj',
            width: 80,
            formatter: row => {
              return this.manKit.fmtDate(row.lzsj)
            }
          },
          {
            label: '部门',
            name: 'gzbm',
            width: 80
          },
          {
            label: '岗位',
            name: 'post',
            width: 100,
            formatter: row => {
              let post=row.post.split(',')
              let postsrt=''
              for(let k=0;k<post.length;k++){
                for(let i=0;i< this.postTree.length;i++){
                  if(this.postTree[i].code===post[k]){
                      postsrt+= this.postTree[i].name+','
                  }
                }
              }
              if(postsrt){
               postsrt= postsrt.substring(0,postsrt.length-1)
              }
              return postsrt
            }
          },
          {
            label: '级别',
            name: 'levelid',
            width: 100,
            formatter: row => {
              for(let i=0;i< this.levelList.length;i++){
                 if(this.levelList[i].code===row.levelid){
                    return this.levelList[i].name
                 }
              }
              return ''
            }
          },
          {
            label: '工资',
            name: 'gz',
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
      let query = {
        userid: this.$route.query.userid
      }
      getWorkExperience(query)
        .then(res => {
          this.tableEdu.list = res
          for (let i = 0; i < this.tableEdu.list.length; i++) {
            this.tableEdu.list[i].rowno = i + 1
          }
        })
        .catch(err => {
          console.log(err)
        })
      postQuery().then(res=>{
        for(let i=0;i<res.length;i++){
          res[i].type="user"
        }
        this.postTree=res
      }).catch(err=>{
        console.log(err)
      })
      levelQuery().then(res=>{
        this.levelList=res
      }).catch(err=>{
        console.log(err)
      })
      
    },
    cellClick(row) {
      this.isAdd = false
      for (let key in this.row) {
        this.row[key] = row[key]
      }
      this.showReportList=[]
      this.temppost=this.row.post.split(',')
      for(let k=0;k<this.temppost.length;k++){
          for(let i=0;i<this.postTree.length;i++){
             if(this.temppost[k]===this.postTree[i].code){
                this.temppost[k]=this.postTree[i].id
                this.showReportList.push(this.postTree[i])
             }
          }
      }
    },
    handle(addArr, delArr, addId, delId) {
      if(addId.length>0){
          this.temppost=this.temppost.concat(addId)
          this.temppost=new Set(this.temppost)
          this.temppost=Array.from(this.temppost)
      }
      if(delId.length>0){
        this.temppost.splice(this.temppost.indexOf(delId[0]),1)
      }
    },
    saveOrDeletePost(){
      this.showReportList=[] 
      this.row.post='';
      for(let k=0;k<this.temppost.length;k++){
          for(let i=0;i<this.postTree.length;i++){
            if(this.temppost[k]===this.postTree[i].id){
                this.showReportList.push(this.postTree[i])
                this.row.post+=this.postTree[i].code+','
            }
          }
      }
      if(this.row.post){
        this.row.post=this.row.post.substring(0,this.row.post.length-1)
      }
      this.isaddPost = false;
    },
    clearInfo() {
      this.isAdd = true
      for (let key in this.row) {
        this.row[key] = ''
      }
      this.showReportList=[]
      this.temppost=[]
    },
    saveInfo() {
      this.row.userid = this.$route.query.userid
      if (this.row.lzsj) {
        this.row.lzsj = this.manKit.fmtDate(this.row.lzsj, 'yyyy-MM-dd')
      }
      if (this.row.rzsj) {
        this.row.rzsj = this.manKit.fmtDate(this.row.rzsj, 'yyyy-MM-dd')
      }
      this.$refs['workInfoForm'].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            workExperienceAdd(this.row)
              .then(res => {
                this.init()
                this.clearInfo()
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            workExperienceEdit(this.row)
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
      this.$confirm('此操作将永久删除该工作经历, 是否继续?', '提示', {
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
      workExperienceDel(query)
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
    handleClose(tag){
      this.showReportList.splice(this.showReportList.indexOf(tag.code),1)
      this.row.post=''
      for(let i=0;i<this.showReportList.length;i++){
        this.row.post+=this.showReportList[i].code+','
      }
      if(this.row.post){
        this.row.post=this.row.post.substring(0,this.row.post.length-1)
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="less">
</style>


