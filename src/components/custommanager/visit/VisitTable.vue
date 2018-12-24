<template>
  <div class="statistics">
    <div class="zi-zhi__title">
        <h5>
            <span class="zxicon zx-yiban"></span>
            <span>拜访列表</span>
        </h5>
        <div class="search__toolbar_css">
            <el-input class="custom-search" size="mini" v-model="searchName" placeholder="请输入拜访标题" >       
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="add-custom-btn" type="primary" @click="addCustom">添加拜访</el-button>
            <el-button class="del-custom-btn" type="danger" :class="{DelNoSelect:DelNoSelect}" @click="showTableDialog">删除</el-button>
        </div>
        
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="vacation_data" border class="table_css1" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
          <el-table-column label="拜访标题" prop="visit_title"  align="center"></el-table-column>
          <el-table-column label="拜访内容" prop="visit_content" align="center"></el-table-column>
          <el-table-column label="拜访客户" prop="visit_custom" align="center"></el-table-column>
          <el-table-column label="拜访联系人" prop="visit_contact" align="center"></el-table-column>
          <el-table-column label="拜访时间" prop="visit_time" align="center"></el-table-column>
          <el-table-column label="操作" prop="custom_operation" width="150" align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'VDetailRevise', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
                </button>
              
              </router-link>
              <router-link :to="{name: 'VDetailRevise', params: {list:props,status:2}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">修改</span>
                </button>
              
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <deletetatle :show='deletetatleshow' @close="showTableDialog(false)" @confirmDel="confirmDel"></deletetatle>
  </div>
</template>
<script>
  import deletetatle from '~/components/dialog/table_delete'
  var data = [
    {
      visit_title:"拜访",
      visit_content:"技术交流",
      visit_custom:"深圳市政府",
      visit_contact:"张三",
      visit_time:"2018-09-26"
    }
  ]

  export default {
    components:{deletetatle},
    data() {
      return {
        value6: "",
        value7: "",
        select_time:"",
        DelNoSelect:true,
        multipleSelection:[],
        deletetatleshow:false,
        searchName:'',
        vacation_data:[],
        formInline: {
          user: "",
          region: ""
        }
      };
    },
    methods: {
      addCustom() {
        this.$router.push({name:'AddVisit'})
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
          if (this.vacation_data[i].visit_title.search(val) !== -1) {
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
</style>
