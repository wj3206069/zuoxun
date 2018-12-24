<template>
  <div class="zi-zhi-shenqing">
    <div class="company-zi-zhi__head">
      <h4 class="company-zi-zhi__head--text">个人信息</h4>
    </div>
    <div class="header_title">
      <a class="return_btn" @click="$router.back(-1)">
        <i class="zxicon zx-jt-left"></i>返回</a>
      <span class="header_name">地址信息</span>
    </div>
    <div class="body_box">
      <el-form ref="dizhiform" :model="row" :rules="rules" label-width="220px" style="width: 680px;padding-top:15px;">
        <el-form-item label="类型" prop="type">
          <el-select class="address-select" placeholder="请选择地址类型" v-model="row.type">
            <el-option v-for=" item in baseData.addresstype" :key="item.fieldcode" :label="item.fieldname" :value="item.fieldcode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" class="man-item"  required >
           <el-col :span="8">
                <el-form-item prop="sheng" class="man-lg">
                  <el-select class="address-select" v-model="row.sheng" placeholder="省级区域">
                    <el-option v-for="item in init_arr" :label="item.name" :value="item.name" :key="item.index"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="shi" class="man-lg">
                  <el-select class="address-select" v-model="row.shi" placeholder="市级区域">
                    <el-option v-for="item in init_cityArr" :label="item.name" :value="item.name" :key="item.index">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="quxian" class="man-lg">
                  <el-select class="address-select" v-model="row.quxian" placeholder="区级区域">
                    <el-option v-for="item in init_region" :label="item.name" :value="item.name" :key="item.index">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
         </el-form-item>
         <el-form-item label="" prop="address" >
          <el-input class="address-detail" v-model="row.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item class="man-stretch">
          <el-button type="primary" style="background-color:#409EFF;border:0;" @click="saveInfo">保存</el-button>
          <el-button type="primary" style="background-color:#bdbdbd;border:0;" @click="clearRow">清空</el-button>
          <el-button v-if="!isAdd" type="danger"  @click="cofmDel">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="zi-zhi__title">
      <h5>
        <span class="zxicon zx-yiban"></span>
        <span>我的地址管理</span>
      </h5>
    </div>
    <div class="man-continater">
       <BTable v-bind="tableAddress" @cellClick="cellClick"  />
    </div>
  </div>
</template>
<script>
import BTable from '~/components/common/Table'
import addressjson from '~/assets/utils/address.js'
import { mapGetters } from 'vuex'
import {
  getAddressInformation,
  addressInformationAdd,
  addressInformationEdit,
  addressInformationDel
} from '@/assets/utils/api'
export default {
  components: { BTable },
  data() {
    return {
      isAdd:true,
      temp_shi:null,
      row: {
        id:'',
        type: '',
        sheng: '',
        shi: '',
        quxian: '',
        address: '',
        userid: '',
        yzbm:''
      },
      rules: {
        type: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sheng: [{ required: true, message: '不能为空', trigger: 'blur' }],
        custom_address:[ { required: true, message: '不能为空', trigger: 'blur' }],
        shi: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        quxian: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      init_arr: addressjson,
      init_cityArr: [],
      init_region: [],
      tableAddress: {
        // 附件列表
        list: [],
        height:'500px',
        isMultiple: false,
        tableHeader: [
          {
            label: '序号',
            name: 'rowno',
            width: 30
          },
          {
            label: '省',
            name: 'sheng',
            width: 50
          },
          {
            label: '市',
            name: 'shi',
            width: 70
          },
          {
            label: '区',
            name: 'quxian',
            width: 60
          },
          {
            label: '详细地址',
            name: 'address',
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
    init(){
      let query={
        userid:this.$route.query.userid
      }
      getAddressInformation(query).then(res=>{
        this.tableAddress.list=res
        for(let i=0;i<this.tableAddress.list.length;i++){
          this.tableAddress.list[i].rowno=i+1
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    cellClick(row){
      this.temp_shi=row.shi
      this.isAdd=false
      for(let key in this.row){
          this.row[key]=row[key]
      }
    },
    clearRow(){
        this.temp_shi=null
        this.init_cityArr= []
        this.init_region= []
        this.isAdd=true
        for(let key in this.row){
          this.row[key]=''
        }
    },
    saveInfo(){
      this.row.userid=this.$route.query.userid
      this.$refs['dizhiform'].validate(valid => {
        if (valid) {
          if(this.isAdd){
              addressInformationAdd(this.row).then(res=>{
                this.init()
                this.clearRow()
              }).catch(err=>{
                console.log(err)
              })
          }
          else{
              addressInformationEdit(this.row).then(res=>{
                this.init()
                this.clearRow()
              }).catch(err=>{
                console.log(err)
              })
          }
        } else {
          return false
        }
      })
    },
    cofmDel(){ 
        this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delInfo()
          })
          .catch((err) => {
              console.log(err)
          })
    }, 
    delInfo(){
       let query={
        id: this.row.id
       }
        addressInformationDel(query).then(res=>{
          if(res===1){
             this.$message.success('删除成功')
             this.init()
             this.clearRow()
          }
          else{
             this.$message.error('删除失败')
          }
        }).catch(err=>{
           consol.log(err)
        })
    },
    //初始化城市
    updateCity() {
      for (var i in this.init_arr) {
        let obj = this.init_arr[i]
        if (obj.name == this.row.sheng) {
          this.init_cityArr = obj.sub
          break
        }
      }
      if(this.init_cityArr.length>1){
        if(this.temp_shi===null){
          this.row.shi = this.init_cityArr[1].name
        }
      }
    },
    //初始化地区
    updateRegion() {
      for (var i in this.init_cityArr) {
        let obj = this.init_cityArr[i]
        if (obj.name == this.row.shi) {
          this.init_region = obj.sub
        }
      }
      if (
        this.init_region &&
        this.init_region.length > 0 &&
        this.init_region[1].name
      ) {
        if(this.temp_shi===null){
           this.row.quxian = this.init_region[1].name
        }
      } else {
        this.row.quxian = ''
      }
    }
  },
  beforeMount() {
    this.updateCity()
  },
  watch: {
    'row.sheng': function() {
      this.updateCity()
    },
    'row.shi':function() {
      this.updateRegion()
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="less">


</style>


