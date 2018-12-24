<template>
  <div class="zi-zhi-shenqing">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">个人信息</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)">
        <i class="zxicon zx-jt-left"></i>返回</a>
      <span class="header_name">紧急联系人</span>
    </div>
    <div style="max-height: calc(100vh - 100px);" class="body_box">
      <div class="HR-continater">
        <div class="register-info">
          <div class="register-info-content noborder basis-info">
            <el-form ref="linkmanform" class="man-register" :model="row" :rules="rules" label-width="110px">
              <el-form-item class="item-right" label="关系" prop="type">
                <el-select style="width:162px !important" placeholder="请选择关系" v-model="row.type">
                  <el-option v-for=" item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="item-right" label="姓名/手机" required>
                <el-col :span="11">
                  <el-form-item class="man-lg man-both" >
                    <el-input v-model="row.lxr" prefix-icon="zxicon zx-lianxiren1 man-font-gray" placeholder="请填写联系人姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">
                  <div class="man-span-line man-both">
                    <span class="filed isFloat man-filed"></span>
                  </div>
                </el-col>
                <el-col :span="11" >
                  <el-form-item class="man-lg man-both"> 
                    <el-input v-model="row.lxrdh" prefix-icon="zxicon zx-shouji1 man-font-gray" placeholder="请填写联系方式"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item class="item-right" label="证件号码" prop="zjhm">
                <el-input v-model="row.zjhm" placeholder="请填写证件号码"></el-input>
              </el-form-item>
               <el-form-item class="item-right" label="工作单位" prop="gzdw">
                 <el-input v-model="row.gzdw" placeholder="请填写工作单位"></el-input>
              </el-form-item>
              <el-form-item class="item-right" label="地址" prop="lxrdz">
                <el-input class="address-detail" v-model="row.lxrdz" placeholder="请输入详细地址"></el-input>
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
        <span>我的紧急联系人</span>
      </h5>
    </div>
    <div class="man-continater" style=" height: calc( 100% - 510px );min-height:230px">
      <BTable v-bind="tableLinkman" @cellClick="cellClick" />
    </div>
  </div>
</template>
<script>
import BTable from '~/components/common/Table'
import addressjson from '~/assets/utils/address.js'
import { mapGetters } from 'vuex'
import {
  getContacts,
  contactsEdit,
  contactsAdd,
  contactsDel
} from '@/assets/utils/api'
export default {
  components: { BTable },
  data() {
    return {
      isAdd: true,
      typeList:[
        {label:'父亲',value:'1'},
        {label:'母亲',value:'2'}
      ],
      row: {
        id: '',
        type: '',
        lxr: '',
        lxrdz: '',
        lxrdh: '',
        zjhm: '',
        userid: '',
        gzdw: ''
      },
      rules: {
        type: [{ required: true, message: '不能为空', trigger: 'blur' }],
        lxr: [{ required: true, message: '不能为空', trigger: 'blur' }],
        lxrdz: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        lxrdh: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zjhm: [{ required: true, message: '不能为空', trigger: 'blur' }],
        gzdw: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      tableLinkman: {
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
            label: '关系',
            name: 'type',
            width: 50,
            formatter:row=>{
              let ary =this.typeList.filter(item=>{
                 return item.value==row.type
              })
              return ary[0].label
            }
          },
          {
            label: '姓名',
            name: 'lxr',
            width: 65
          },
          {
            label: '手机',
            name: 'lxrdh',
            width: 60
          },
          {
            label: '证件号码',
            name: 'zjhm',
            width: 100
          },
          {
            label: '联系人地址',
            name: 'lxrdz',
            width: 120
          },
          {
            label: '工作单位',
            name: 'gzdw',
            width: 120
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
      getContacts(query)
        .then(res => {
          this.tableLinkman.list = res
          for (let i = 0; i < this.tableLinkman.list.length; i++) {
            this.tableLinkman.list[i].rowno = i + 1
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
      this.$refs['linkmanform'].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            contactsAdd(this.row)
              .then(res => {
                this.init()
                this.clearRow()
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            contactsEdit(this.row)
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
      this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
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
      contactsDel(query)
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
  }
}
</script>

