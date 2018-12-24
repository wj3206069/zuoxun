<template>
  <div class="zi-zhi-shenqing">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">个人信息</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)">
        <i class="zxicon zx-jt-left"></i>返回</a>
      <span class="header_name">相关技能</span>
    </div>
    <div style="max-height: calc(100vh - 100px);" class="body_box">
      <div class="HR-continater">
        <div class="register-info">
          <div class="register-info-content noborder basis-info">
            <el-form ref="skillform" class="man-register" :model="row" :rules="rules" label-width="110px">
              <el-form-item label="类型" prop="type">
                <el-select placeholder="请选择类型" v-model="row.type">
                  <el-option v-for=" item in typeList" :key="item.fieldcode" :label="item.fieldname" :value="item.fieldcode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="技能等级" prop="dj">
                <el-select placeholder="请选择技能等级" v-model="row.dj">
                  <el-option v-for=" item in djListL" :key="item.fieldcode" :label="item.fieldname" :value="item.fieldcode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="man-stretch" label="技能说明" prop="remark">
                 <el-input type="textarea" :rows="5" v-model="row.remark" placeholder="技能说明"></el-input>
              </el-form-item>
              <el-form-item class="man-stretch">
                <el-button type="primary" style="background-color:#409EFF;border:0;" @click="saveInfo">保存</el-button>
                <el-button type="primary" style="background-color:#bdbdbd;border:0;" @click="clearRow">清空</el-button>
                <el-button v-if="!isAdd" type="danger" @click="cofmDel">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>我的技能</span>
      </h5>
    </div>
    <div class="man-continater"  style=" height: calc( 100% - 385px );min-height:230px">
      <BTable v-bind="tableSkill" @cellClick="cellClick" />
    </div>
  </div>
</template>
<script>
import BTable from '~/components/common/Table'
import addressjson from '~/assets/utils/address.js'
import { mapGetters } from 'vuex'
import {
  getSkills,
  skillsEdit,
  skillsAdd,
  skillsDel
} from '@/assets/utils/api'
export default {
  components: { BTable },
  data() {
    return {
      isAdd: true,
      typeList:[],
      djListL:[],
      row: {
        id: '',
        type: '',
        remark: '',
        dj: ''
      },
      rules: {
        type: [{ required: true, message: '不能为空', trigger: 'blur' }],
        remark: [{ required: true, message: '不能为空', trigger: 'blur' }],
        dj: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      tableSkill: {
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
            label: '类型',
            name: 'type',
            width: 80,
            formatter:row=>{
              let ary =this.baseData.skillsType.filter(item=>{
                 return item.fieldcode==row.type
              })
              if (ary.length>0){
                 return ary[0].fieldname
              }
              return ''
            }
          },
          {
            label: '技能等级',
            name: 'jd',
            width: 65,
            formatter:row=>{
              let ary =this.baseData.skillsType.filter(item=>{
                 return item.fieldcode==row.dj
              })
              if (ary.length>0){
                 return ary[0].fieldname
              }
              return ''
            }
          },
          {
            label: '技能说明',
            name: 'remark',
            width: 200
          },
         
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
      this.typeList =this.baseData.skillsType.filter(item=>{
         return item.pfieldcode==='0'
      })
      let query = {
        userid: this.$route.query.userid
      }
      getSkills(query)
        .then(res => {
          this.tableSkill.list = res
          for (let i = 0; i < this.tableSkill.list.length; i++) {
            this.tableSkill.list[i].rowno = i + 1
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    cellClick(row) {
      this.temp_shi = row.shi
      this.isAdd = false
      for (let key in this.row) {
        this.row[key] = row[key]
      }
    },
    clearRow() {
      this.isAdd = true
      for (let key in this.row) {
        this.row[key] = ''
      }
    },
    saveInfo() {
      this.row.userid = this.$route.query.userid
      this.$refs['skillform'].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            skillsAdd(this.row)
              .then(res => {
                this.init()
                this.clearRow()
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            skillsEdit(this.row)
              .then(res => {
                this.init()
                this.clearRow()
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
      this.$confirm('此操作将永久删除该技能, 是否继续?', '提示', {
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
      skillsDel(query)
        .then(res => {
          if (res === 1) {
            this.$message.success('删除成功')
            this.init()
            this.clearRow()
          } else {
            this.$message.error('删除失败')
          }
        })
        .catch(err => {
          consol.log(err)
        })
    }
  },
  created() {
    this.init()
  },
  watch:{
    'row.type': {
    　　handler(newName, oldName) {
      　　this.djListL =this.baseData.skillsType.filter(item=>{
            return item.pfieldcode==newName
          })
          this.row.dj=''
    　　}
    }
  }
}
</script>

