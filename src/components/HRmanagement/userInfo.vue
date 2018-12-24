<template>
  <div class="statistics">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">个人信息</h4>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>注册信息</span>
      </h5>
    </div>
    <div class="HR-continater">
      <div class="register-info">
        <div class="register-info-basis">
          <div class="photo">
            <img :src="userbase.imgurl"/>
          </div>
          <div>
            <span class="name">{{row.name}}</span>
            <span class="year">{{manKit.fmtDate(row.csrq,'yyyy-MM-dd')}}</span>|
            <span :class=" manKit.getDataByCodeandID(baseData.xb,userbase.sex)==='男'?'man' :'mone' ">{{ manKit.getDataByCodeandID(baseData.xb,userbase.sex) }}</span><br/>
            <span class="idCard">{{row.zjhm}}</span>
          </div>
        </div>
        <div class="register-info-content">
          <div class="register-info-cell">
            <em class="zxicon zx-shouji">{{userbase.phone}}</em>
          </div>
          <div class="register-info-cell">
            <em class="zxicon zx-weixin">微信</em>
          </div>
          <div class="register-info-cell">
            <em class="zxicon zx-qq">{{userbase.qq}}</em>
          </div>
          <div class="register-info-cell">
            <em class="zxicon zx-youxiang">{{userbase.email}}</em>
          </div>
        </div>
        <div class="register-info-operate">
          <div>
            <span class="zxicon zx-xiugai"></span><br/>
            <span>修改</span>
          </div>
        </div>
      </div>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>基本信息</span>
      </h5>
    </div>
    <div class="HR-continater">
      <div class="register-info">
        <div class="register-info-content noborder basis-info">
          <el-form class="man-register" ref="userInfoForm" :model="row" :rules="rules" label-width="110px" style="padding-top:15px;">
            <el-form-item label="曾用名" prop="cname">
              <el-input class="man-md" v-model="row.cname" placeholder="请输入曾用名" @blur="valInput($event,'cname')"></el-input>
            </el-form-item>
            <el-form-item class="item-right" label="生日" prop="srtype">
              <el-select class="address-select man-select" v-model="row.srtype" @change="valInput($event,'srtype')">
                <el-option v-for=" item in baseData.srlx" :value="item.fieldcode" :key="item.fieldcode" :label="item.fieldname"></el-option>
              </el-select>
              <el-select class="address-select man-select" v-model="month" @change="changeMonth($event,'month')">
                <el-option v-for=" (item,index) in months " :value="item" :label="item" :key="index"></el-option>
              </el-select>
              月
              <el-select class="address-select man-select" v-model="day" @change="valInput($event,'day')">
                <el-option v-for=" (item,index) in days " :value="item" :label="item" :key="index"></el-option>
              </el-select>
              日
            </el-form-item>
            <el-form-item label="身高/体重" class="man-form-lg" required>
              <el-col :span="9">
                <el-form-item prop="sg" class="man-lg">
                  <el-input v-model.number="row.sg" @blur="valInput($event,'sg')"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="3">
                <span class="filed isFloat">cm</span>
              </el-col>
              <el-col :span="9">
                <el-form-item prop="tz" class="man-lg">
                  <el-input v-model.number="row.tz" @blur="valInput($event,'tz')"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="3">
                <span class="filed isFloat">kg</span>
              </el-col>
            </el-form-item>
            <el-form-item class="item-right" label="血型" prop="xx">
              <el-select class="address-select man-select" v-model="row.xx" @change="valInput($event,'xx')">
                <el-option v-for=" (item,index ) in baseData.xuexing" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
              </el-select>
              <!-- <el-input v-model="formData.projectId" placeholder="请输入客户地址"></el-input> -->
              <el-switch v-model="hyzk" active-text="已婚" inactive-text="未婚" @change="valInput($event,'hyzk')">
              </el-switch>
            </el-form-item>
            <el-form-item class="man-clearfix man-stretch" label="其他联系方式" prop="qtlxfs">
              <el-input v-model="row.qtlxfs" placeholder="请输入其他联系方式" @blur="valInput($event,'qtlxfs')"></el-input>
            </el-form-item>
            <hr style="width:100%;margin-bottom:20px;" />
            <el-form-item label="民族" prop="mz">
              <el-select class="man-md" v-model="row.mz" @change="valInput($event,'mz')">
                <el-option v-for=" (item,index ) in baseData.mz" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌" prop="zzmm" @change="valInput($event,'zzmm')">
              <el-select class="man-md" v-model="row.zzmm">
                <el-option v-for=" (item,index ) in baseData.zzmm" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="籍贯" prop="jg" @blur="valInput($event,'jg')">
              <el-input class="man-md" v-model="row.jg" placeholder="请输入你的籍贯"></el-input>
            </el-form-item>
            <el-form-item label="最高学历" prop="zgxl" @change="valInput($event,'zgxl')">
              <el-select class="man-md" v-model="row.zgxl">
                <el-option v-for=" (item,index ) in baseData.whcddm" :key="index" :label="item.fieldname" :value="item.fieldcode"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div :class=" isDanger===true ? 'register-info-operate danger':'register-info-operate'" @click="saveInfo">
          <div class="register-info-operate-item">
            <span class="zxicon zx-novigo_Preservation"></span><br/>
            <span>保存</span>
          </div>
        </div>
      </div>
      <div class="man-split-line">
        <em class=""></em>其他信息
        <em></em>
      </div>
      <div class="main-inface">
        <a class="main-inface-item" @click="goto('AddressManage')">
          <i class="zxicon zx-dizhi a-blue"></i>
          <span>地址信息</span>
          <em v-if="tool.address!==0">{{tool.address}}</em>
        </a>
        <a class="main-inface-item" @click="goto('DocumentManage')">
          <i class="zxicon zx-zhengjian a-blue"></i>
          <span>证件信息</span>
          <em v-if="tool.zj!==0">{{tool.zj}}</em>
        </a>
        <a class="main-inface-item" @click="goto('CertificateManage')">
          <i class="zxicon zx-zhengshu a-green"></i>
          <span>证书信息</span>
          <em v-if="tool.zs!==0">{{tool.zs}}</em>
        </a>
        <a class="main-inface-item" @click="goto('BankManage')">
          <i class="zxicon zx-yinxingqia a-yellow"></i>
          <span>银行卡</span>
          <em v-if="tool.bank!==0">{{tool.bank}}</em>
        </a>
        <a class="main-inface-item" @click="goto('EduManage')"> 
          <i class="zxicon zx-jiaoyu1 a-blue"></i>
          <span>教育背景</span>
          <em v-if="tool.edu!==0">{{tool.edu}}</em>
        </a>
        <a class="main-inface-item" @click="goto('WorkManage')">
          <i class="zxicon zx-gongzuojingli a-yellow"></i>
          <span>工作经历</span>
          <em v-if="tool.works!==0">{{tool.works}}</em>
        </a>
        <a class="main-inface-item"  @click="goto('LinkmanManage')">
          <i class="zxicon zx-yonghuxinxi a-red"></i>
          <span>紧急联系人</span>
          <em v-if="tool.linkuser!==0">{{tool.linkuser}}</em>
        </a>
        <a class="main-inface-item" @click="goto('SkillManage')">
          <i class="zxicon zx-jineng-xiaoicon a-green"></i>
          <span>相关技能</span>
          <em v-if="tool.skill!==0">{{tool.skill}}</em>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getPersonnelInformation,
  personnelEdit,
  personnelInformationCount,
  getuserinfo 
} from '@/assets/utils/api'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      hyzk: false,
      isDanger: false,
      days: [],
      day: '',
      months: [],
      month: '',
      tool: {
        address: 0,
        bank: 0,
        edu: 0,
        linkuser: 0,
        skill: 0,
        works: 0,
        zj: 0,
        zs: 0
      },
      userbase:{
        nickname:'',
        phone:'',
        sex:'',
        email:'',
        qq:'',
        wx:'',
        imgurl:''
      },
      row: {
        id: '',
        zgxl: '',
        hjszd: '',
        jzdz: '',
        qtlxfs: '',
        srtype: '',
        xx: '',
        name: '',
        cname: '',
        zjhm: '',
        xm: '',
        sr: '',
        mz: '',
        hyzk: '',
        zjlx: '',
        zzmm: '',
        sg: '',
        tz: '',
        csrq: '',
        jg: ''
      },
      rules: {
        cname: [{ required: true, message: '不能为空', trigger: 'blur' }],
        srtype: [{ required: true, message: '不能为空', trigger: 'blur' }],
        mz: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zzmm: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sg: [{ required: true, message: '不能为空', trigger: 'blur' }],
        zgxl: [{ required: true, message: '不能为空', trigger: 'blur' }],
        xx: [{ required: true, message: '不能为空', trigger: 'blur' }],
        qtlxfs: [{ required: true, message: '不能为空', trigger: 'blur' }],
        jg: [{ required: true, message: '不能为空', trigger: 'blur' }],
        tz: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      rowRule: {},
      temprow: null,
      userInfo: null
    }
  },
  computed: {
    ...mapGetters(['baseData'])
  },
  methods: {
    init() {
      this.days = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31'
      ]
      this.months = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
      ]
      this.userInfo = JSON.parse(sessionStorage.getItem('user'))
      let query = {
        userid: this.userInfo.userid
      }
      getuserinfo().then(res=>{
        for(let key in this.userbase){
           this.userbase[key]=res[key]
        }
      }).catch(err=>{
         console.log(err)
      })
      personnelInformationCount(query)
        .then(res => {
          if (res.length > 0) {
             for(let key in res[0]){
               this.tool[key]=res[0][key]
             }
          }
        })
        .catch(err => {
          console.log(err)
        })
      getPersonnelInformation(query)
        .then(res => {
          if (res.length) {
            for (let key in this.row) {
              this.row[key] = res[0][key]
            }
            this.temprow = JSON.parse(JSON.stringify(res[0]))
            if (res[0].sr) {
              this.month = res[0].sr.split('-')[1]
              this.day = res[0].sr.split('-')[2]
            }
            if (res[0].hyzk) {
              this.hyzk = true
            } else {
              this.hyzk = false
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeMonth(val) {
      switch (val) {
        case '1':
        case '3':
        case '5':
        case '7':
        case '8':
        case '10':
        case '12':
          this.days = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31'
          ]
          break
        case '4':
        case '6':
        case '9':
        case '11':
          this.days = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30'
          ]
          break
        case '2':
          this.days = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29'
          ]
          break
      }
    },
    valInput(e, name) {
      this.rowRule[name] = false
      if (e.target) {
        if (e.target.value !== this.temprow[name]) {
          this.rowRule[name] = true
        }
      } else {
        if (name !== 'month' && name !== 'day' && name !== 'hyzk') {
          if (e !== this.temprow[name]) {
            this.rowRule[name] = true
          }
        } else if (name === 'month') {
          if (this.temprow.sr) {
            if (e !== this.temprow.sr.split('-')[1]) {
              this.rowRule[name] = true
            }
          } else if (e !== '') {
            this.rowRule[name] = true
          }
        } else if (name === 'day') {
          if (this.temprow.sr) {
            if (e !== this.temprow.sr.split('-')[2]) {
              this.rowRule[name] = true
            }
          } else if (e !== '') {
            this.rowRule[name] = true
          }
        } else if (name === 'hyzk') {
          if (
            (this.temprow.hyzk === '0' && e === true) ||
            (this.temprow.hyzk === '1' && e === false)
          ) {
            this.rowRule[name] = true
          }
        }
      }
      let flag = 0
      for (let key in this.rowRule) {
        if (this.rowRule[key]) {
          flag = 1
          break
        }
      }
      if (flag === 1) {
        this.isDanger = true
      } else {
        this.isDanger = false
      }
    },
    saveInfo() {
      this.$refs['userInfoForm'].validate(valid => {
        if (valid) {
          if (this.hyzk) {
            this.row.hyzk = '1'
          } else {
            this.row.hyzk = '0'
          }
          personnelEdit(this.row)
            .then(res => {
              if (res !== 0) {
                this.$message.success('成功了')
                this.isDanger = false
              } else {
                this.$message.error('出错了')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    goto(path){
        this.$router.push({path:path,query:{userid:this.userInfo.userid}})
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.init()
    })
  },
  mounted() {
    // this.init()
  }
}
</script>

