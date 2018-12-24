<template>
  <div class="statistics">
    <div class="zi-zhi__title">
        <h5>
            <span class="zxicon zx-yiban"></span>
            <span>系统填报列表</span>
        </h5>
        <div class="search__toolbar_css">
            <el-select v-model="searchName" placeholder="请选择年份">
                <el-option  label="2015" value="2015"></el-option>
                <el-option  label="2016" value="2016"></el-option>
                <el-option  label="2017" value="2017"></el-option>
            </el-select>
            <el-input class="custom-search" size="mini"  placeholder="请输入填报事项名称" >       
                <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
            </el-input>
            <el-button class="add-custom-btn" type="primary" >查询</el-button>
            <el-button class="add-custom-btn" type="primary" @click="addCustom">增加</el-button>
        </div>
        
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box"> 
        <el-table :data="vacation_data" border class="table_css1" style="width:100%"  @selection-change="handleSelectionChange">
          <el-table-column label="序号" prop="id"  width="50" align="center"></el-table-column>
          <el-table-column label="填报公司" prop="submit_company"  align="center"></el-table-column>
          <el-table-column label="填报事项名称" prop="submit_things"  align="center"></el-table-column>
          <el-table-column label="填报系统" prop="submit_system"  align="center"></el-table-column>
          <el-table-column label="状态" prop="status" width="110" align="center"></el-table-column>
          <el-table-column label="要求填报月份" prop="submit_month" align="center"></el-table-column>
          <el-table-column label="截止日期" prop="endtime"  align="center"></el-table-column>
          <el-table-column label="实际填报日期" prop="submit_time" align="center"></el-table-column>
          <el-table-column label="操作" prop="custom_operation"  align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'SysSubDetail', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
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
            submit_company:"深圳卓讯",
            submit_things:"事项",
            submit_system:'计划',
            status:'填报中',
            submit_month:'2018-11',
            endtime:"2018-08-16",
            submit_time:"2017-11-26",
            login_info:"已登录",
            remark:"这是备注这是备注这是备注",
          },{
            id:1,
            submit_company:"深圳华为",
            submit_things:"事项ff",
            submit_system:'计划ff',
            status:'填报中',
            submit_month:'2015-09',
            endtime:"2018-07-23",
            submit_time:"2018-09-13",
            login_info:"已登录",
            remark:"这是备注这是备注",
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
        this.$router.push({name:'AddSysSub'})
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
