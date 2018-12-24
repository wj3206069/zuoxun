<template>
  <div class="statistics">
    <div class="zi-zhi__title">
        <h5>
            <span class="zxicon zx-yiban"></span>
            <span>联系人列表</span>
        </h5>
        <div class="search__toolbar_css">
            <el-input class="custom-search" size="mini"  placeholder="请输入单位或联系人" >       
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="add-custom-btn" type="primary" @click="addCustom">添加联系人</el-button>
        </div>
        
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box" >
        <!-- <el-table :data="vacation_data" border class="table_css1" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="姓名" prop="contact_name"  align="center"></el-table-column>
          <el-table-column label="单位名称" prop="contact_company" align="center"></el-table-column>
          <el-table-column label="职务" prop="contact_job" align="center"></el-table-column>
          <el-table-column label="电话" prop="contact_phone" align="center"></el-table-column>
          <el-table-column label="QQ" prop="contact_qq" align="center"></el-table-column>
          <el-table-column label="微信号" prop="contact_wechat" align="center"></el-table-column>
          <el-table-column label="手机" prop="contact_tel" align="center"></el-table-column>
          <el-table-column label="角色" prop="contact_role" align="center"></el-table-column>
          <el-table-column label="操作" prop="custom_operation" width="200" align="center">
            <template scope="props">
              <router-link :to="{name: 'CDetailRevise', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
                </button>            
              </router-link>
              <router-link :to="{name: 'CDetailRevise', params: {list:props,status:2}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">修改</span>
                </button>
              </router-link>
            </template>
          </el-table-column>
        </el-table> -->
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <div class="left-title">
                <span v-show="!show_search_goverment">单位名称</span> 
                <el-input class="custom-search" v-show="show_search_goverment" size="mini" placeholder="请输入单位名称"></el-input>
                <span class="add-search" >
                  <i class="zxicon zx-gengduo1" v-show="!show_search_goverment" @click="addGoverment"></i>
                  <i class="zxicon zx-sousuo" @click="search_goverment"></i>
                </span>
              </div>
              <div class="left-body">
                <div class="contact-goverment-item">
                  <i class="zxicon zx-yunhangzhuangtai"></i>
                  <span >深圳市政府ss</span>
                  <span >32</span>
                </div>
                <div class="contact-goverment-item" >
                  <i class="zxicon zx-yunhangzhuangtai"></i>
                  <span style="color:#999999;">广州科技局</span>
                  <span style="color:#999999;">8</span>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple" >
              <div class="right-title" >
                <span>深圳市政府 ></span>
                <span class="search-del">
                  <el-input class="custom-search" v-show="show_search_input"  size="mini" style="" placeholder="请输入联系人姓名"></el-input>
                  <i class="zxicon zx-sousuo" style="color:#aabece;font-size:20px;" @click="search"></i>
                  <i class="zxicon zx-shanchu1" @click="deleteContact"></i>
                </span>            
              </div>
              <div class="right-body">
                <div class="contact-item-wapper">
                  <div class="role">
                    书记
                  </div>
                  <div class="contact-item" @click="contactDetail('1')">
                    <span>张三</span>
                    <span class="tel">15245215245</span>
                    <i class="zxicon zx-guanbi" v-show="show_delete_btn" @click.stop="showTableDialog"></i>
                  </div>    
                  <div class="contact-item" @click="contactDetail('1')">
                    <span>张三</span>
                    <span class="tel">15245215245</span>
                    <i class="zxicon zx-guanbi" v-show="show_delete_btn" @click.stop="showTableDialog"></i>
                  </div>         
                </div>
                <div class="contact-item-wapper">
                  <div class="role">
                    主任
                  </div>
                  <div class="contact-item" @click="contactDetail('2')">
                    <span>李四</span>
                    <span class="tel">13452154789</span>
                    <i class="zxicon zx-guanbi" v-show="show_delete_btn" @click.stop="showTableDialog"></i>
                  </div>
                  <div class="contact-item" @click="contactDetail('1')">
                    <span>张三</span>
                    <span class="tel">15245215245</span>
                    <i class="zxicon zx-guanbi" v-show="show_delete_btn" @click.stop="showTableDialog"></i>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <deletetatle :show='deletetatleshow' @close="showTableDialog(false)" @confirmDel="confirmDel"></deletetatle>
  </div>
</template>
<script>
  import deletetatle from '~/components/dialog/table_delete'
  let data = [
          {
            contact_name:"张三",
            contact_company:"深圳市政府",
            contact_job:"官员",
            contact_phone:"15245256322",
            contact_birthday:"1995-09-26",
            contact_email:"gdsgdfg@163.com",
            contact_qq:"152451256",
            contact_wechat:"15461562533",
            contact_tel:"15425415478",
            contact_role:"普通人",
            contact_intimacy:'初相识',
            contact_hobby:'羽毛球',
            contact_remark:"这是张三的备注这是张三的备注这是张三的备注",
          },
          {
            contact_name:"李四",
            contact_company:"广州市政府",
            contact_job:"主任",
            contact_phone:"13452154789",
            contact_birthday:"1995-09-26",
            contact_email:"gdsgdfg@163.com",
            contact_qq:"152451256",
            contact_wechat:"15461562533",
            contact_tel:"15425415478",
            contact_role:"普通人",
            contact_intimacy:'初相识',
            contact_hobby:'羽毛球',
            contact_remark:"这是李四的备注这是李四的备注这是李四的备注",
          },
        ];
  export default {
    components:{deletetatle},
    data() {
      return {
        value6: "",
        value7: "",
        select_time:"",
        show_delete_btn:false,
        multipleSelection:[],
        deletetatleshow:false,
        show_search_input:false,
        show_search_goverment:false,
        vacation_data:[],
        formInline: {
          user: "",
          region: ""
        }
      };
    },
    methods: {
      addCustom() {
        this.$router.push({name:'AddContact'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
        if(this.multipleSelection.length==0){
          this.DelNoSelect = true;
        }else{
          this.DelNoSelect = false;
        }
        console.log(1)
      },
      showTableDialog(val){
        event.stopPropagation;
        if(!!val){
          this.deletetatleshow = true;
        }else{
          this.deletetatleshow = false;
        }
      },
      confirmDel(){
        this.deletetatleshow = false;
      },
      //联系人信息
      contactDetail(val){
        this.$router.push({name:'CDetailRevise',params:{id:val}});
      },
      deleteContact(){
        this.show_delete_btn = !this.show_delete_btn;
      },
      search(){
        this.show_search_input =!this.show_search_input;
      },
      search_goverment(){
        this.show_search_goverment =! this.show_search_goverment;
      },
      addGoverment(){
        this.$router.push({name:'AddCustom'})
      }
    },
    created(){
      this.vacation_data = data;
    }
  };
</script>
<style lang="less">
    .custom-search{
        width: auto;
    }
    .add-custom-btn,.del-custom-btn{
        padding: 8px 16px ;
    }
    .DelNoSelect{
      background-color: #eaedf1 !important;
      border-color: #eaedf1 !important;
    }
    .DelNoSelect:hover{
      background-color: #eaedf1 !important;
    }
    .contact-goverment-item:hover{
      background-color: #dcdfe6;
      cursor: pointer;
    }
    .contact-item:hover {
      background-color: #f2f2f2;
    }
    .zx-guanbi:hover{
      color: red !important;
    }
    .zxicon{
      cursor:pointer;
    }
    .grid-content{
      height:calc(100vh - 200px);
      background-color:#f3f5f8;
      padding: 10px;
    }
    .left-title{
      position:relative;
      border-bottom:1px solid #d9d9d9;
      padding: 10px 5px;
      color: #666666;
    }
    .left-title .add-search{
      position: absolute;
      top: 13px;
      right: 13px;
    }
    .left-title .add-search i:first-child{
      color:#48c069;
    }
    .left-title .add-search i:last-child{
      color:#40a4f2;
    }
    .left-body{
      padding-top:15px;
      font-size:15px;
    }
    .left-body .contact-goverment-item{
      position:relative;
      padding: 5px;
    }
    .left-body .contact-goverment-item .zx-yunhangzhuangtai{
      color: #40a4f2;
      font-size: 10px;
    }
    .left-body .contact-goverment-item span:last-child{
      position: absolute;
      top: 9px;
      right: 20px;
    }
    .right-title{
      position: relative;
      padding:10px;
      border-bottom: 1px solid #d9d9d9;
    }
    .search-del{
      position:absolute;
      top:8px;
      right:13px;
    }
    .search-del .custom-search{
      position: absolute;
      top: -3px;
      right: 50px;
      width: 160px;
    }
    .search-del i:first-child{
      color:#aabece;font-size:20px;
    }
    .search-del i:last-child{
      font-size:20px;
      color:#f75454;
    }
    .right-body{
      padding: 15px;
      font-size: 15px;
    }
    .right-body .contact-item-wapper{
      border-bottom:1px dashed #d9d9d9;
      padding:10px 0;
    }
    .contact-item-wapper .role{
      color: #f65d12;
      padding-bottom: 5px;
    }
    .contact-item-wapper .contact-item{
      position:relative;
      padding: 5px 0;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
    }
    .contact-item-wapper .contact-item .zx-guanbi{
      position: absolute;
      top: 0;
      right: -13px;
      color: #999999;
    }
    .contact-item-wapper .contact-item .tel{
      color: #666666;
    }
</style>
