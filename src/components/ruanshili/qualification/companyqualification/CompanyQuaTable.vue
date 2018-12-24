<template>
  <div class="statistics">
    <div class="zi-zhi__title">
        <h5>
            <span class="zxicon zx-yiban"></span>
            <span>公司资质列表</span>
        </h5>
        <div class="search__toolbar_css">
            <el-input class="custom-search" size="mini" v-model="searchName" placeholder="请输入关键字" >       
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-select v-model="searchName"  slot="prepend" placeholder="资质名称" style="width:96px">
                <el-option label="资质名称" value="1"></el-option>
                <el-option label="资质类型" value="2"></el-option>
            </el-select>
            <el-button class="add-custom-btn" type="primary" @click="addCustom">新建资质</el-button>
        </div>
        
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box"> 
        <el-table :data="vacation_data" border class="table_css1" style="width:100%"  @selection-change="handleSelectionChange">
          <el-table-column label="序号" prop="id"  width="50" align="center"></el-table-column>
          <el-table-column label="所属公司" prop="company"   align="center"></el-table-column>
          <el-table-column label="证书名称" prop="certificate_name"  align="center"></el-table-column>
          <el-table-column label="证书编号" prop="certificate_id"  align="center"></el-table-column>
          <!-- <el-table-column label="颁发机构" prop="certificate_company"  align="center"></el-table-column> -->
          <el-table-column label="颁发日期" prop="certificate_starttime" width="110" align="center"></el-table-column>
          <el-table-column label="有效期" prop="certificate_endtime" align="center"></el-table-column>
          <el-table-column label="状态" prop="certificate_status"  align="center"></el-table-column>
          <el-table-column label="下次待办" prop="certificate_daiban"  align="center"></el-table-column>
          <!-- <el-table-column label="办理费用" prop="certificate_spend" align="center"></el-table-column> -->
          <!-- <el-table-column label="第三方机构" prop="certificate_thired" align="center"></el-table-column> -->
          <!-- <el-table-column label="是否年审" prop="certificate_isCheck" align="center"></el-table-column> -->
          <!-- <el-table-column label="年审频率" prop="certificate_CheckOnce" align="center"></el-table-column> -->
          <el-table-column label="操作" prop="custom_operation"  align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'CompanyQuaDetail', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
                </button>             
              </router-link>
              <router-link :to="{name: 'CompanyQuaCheckOnce', params: {list:props,status:2}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">年审</span>
                </button>
              
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="pagination.currentPage"
            :page-count="pagination.pageCount"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :page-sizes="pagination.pageSizes">
        </el-pagination>
      </div>
    </div>

    <deletetatle :show='deletetatleshow' @close="showTableDialog(false)" @confirmDel="confirmDel"></deletetatle>
  </div>
</template>
<script>
  import deletetatle from '~/components/dialog/table_delete'

  var data = [
          {
            id:0,
            company:"深圳卓讯",
            certificate_name:"卓讯云logo",
            certificate_id:"SZZX45451",
            certificate_company:"深圳政府",
            certificate_starttime:"2018-05-26",
            certificate_endtime:"2018-12-23",
            certificate_status:"有效",
            certificate_daiban:"广东省深圳市南山区科兴科学园A座305区",
            certificate_spend:"50",
            certificate_thired:"广东省深圳市南山区科兴科学园A座305",
            certificate_isCheck:"是",
            certificate_CheckOnce:"每年年审",
          },{
            id:1,
            company:"代码兄弟",
            certificate_name:"卓讯云服务平台V7",
            certificate_id:"SZZX15451",
            certificate_company:"深圳政府",
            certificate_starttime:"2018-05-26",
            certificate_endtime:"2018-12-23",
            certificate_status:"有效",
            certificate_daiban:"广东省深圳市南山区科兴科学园A座305区",
            certificate_spend:"50",
            certificate_thired:"广东省深圳市南山区科兴科学园A座305",
            certificate_isCheck:"是",
            certificate_CheckOnce:"每年年审",
          }
        ];
  export default {
    components:{deletetatle},
    data() {
      return {
        DelNoSelect:true,
        multipleSelection:[],
        deletetatleshow:false,
        searchName:'',
        value6: "",
        value7: "",
        select_time:"",
        vacation_data:[],
        formInline: {
          user: "",
          region: ""
        },
        pagination: {
          total: 10,
          currentPage: 1,
          pageCount: 5,
          pageSize: 10,
          pageSizes: [10, 20, 50, 100]
        },
      };
    },
    methods: {
      addCustom() {
        this.$router.push({name:'AddCustom'})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
        if(this.multipleSelection.length==0){
          this.DelNoSelect = true;
        }else{
          this.DelNoSelect = false;
        }
      },
      showTableDialog(val){
        if(this.DelNoSelect){return}
        if(!!val){
          this.deletetatleshow = true;
        }else{
          this.deletetatleshow = false;
        }
      },
      confirmDel(){
        this.deletetatleshow = false;
        console.log(this.multipleSelection);
        for(var i=0;i<this.multipleSelection.length;i++){
          let item = this.multipleSelection[i];
          this.vacation_data.splice(this.vacation_data.indexOf(item),1);
        }
        console.log(this.vacation_data)
      }
    },
    watch:{
      searchName(val) {
        if (!val) {
          this.vacation_data= data;
          return false;
        }
        let name_Data = [];
        for (let i = 0; i < this.vacation_data.length; i++) {
          console.log(this.vacation_data[i].name)
          if (this.vacation_data[i].custom_name.search(val) !== -1) {
            name_Data.push(this.vacation_data[i]);
          }
        }
        this.vacation_data = name_Data;
      },
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
    .table-operation{
      padding: 5px 10px !important ;
    }
    .DelNoSelect{
      background-color: #eaedf1 !important;
      border-color: #eaedf1 !important;
    }
    .DelNoSelect:hover{
      background-color: #eaedf1 !important;
    }
    th,td{
      padding: 7px 0 !important;
    }
    // td div{
    //   width: max-content ;
    // }
</style>
