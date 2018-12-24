<template>
  <div class="statistics">
    <div class="zi-zhi__title">
        <h5>
            <span class="zxicon zx-yiban"></span>
            <span>商机列表</span>
        </h5>
        <div class="search__toolbar_css">
            <el-input class="custom-search" size="mini" v-model="searchName" placeholder="请输入商机标题" >       
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button class="add-custom-btn" type="primary" @click="addCustom">添加商机</el-button>
            <el-button class="del-custom-btn" type="danger" :class="{DelNoSelect:DelNoSelect}" @click="showTableDialog">删除</el-button>
        </div>
        
    </div>
    <div class="zi-zhi-records">
      <div class="zi-zhi__table-box">
        <el-table :data="vacation_data" border class="table_css1" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed></el-table-column>
          <el-table-column label="商机标题" prop="chance_title"  align="center"></el-table-column>
          <el-table-column label="商机内容" prop="chance_content" align="center"></el-table-column>
          <el-table-column label="所属客户" prop="chance_custom" align="center"></el-table-column>
          <el-table-column label="客户联系人" prop="chance_contact" align="center"></el-table-column>
          <el-table-column label="商机来源" prop="chance_from" align="center"></el-table-column>
          <el-table-column label="商机类型" prop="chance_type"  align="center"></el-table-column>
          <el-table-column label="商机阶段" prop="chance_stage" align="center"></el-table-column>
          <el-table-column label="预算规模" prop="chance_budget" align="center"></el-table-column>
          <el-table-column label="接单时间" prop="chance_time" align="center"></el-table-column>
          <el-table-column label="操作"  width="150" align="center" fixed="right">
            <template scope="props">
              <router-link :to="{name: 'BCDetailRevise', params: {list:props,status:1}}">
                <button class="btn-tool">
                  <span class="zxicon zx-yiban"></span>
                  <span class=" particulars">详情</span>
                </button>
              </router-link>
              <router-link :to="{name: 'BCDetailRevise', params: {list:props,status:2}}">
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
  let data = [
    {
      chance_title:"张三",
      chance_content:"深圳市政府",
      chance_custom:"官员",
      chance_contact:"15245256322",
      chance_from:"1995-09-26",
      chance_type:"gdsgdfg@163.com",
      chance_stage:"152451256",
      chance_budget:"15461562533",
      chance_time:"15425415478"
    }
  ];

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
        this.$router.push({name:'AddBusinessChance'})
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
          if (this.vacation_data[i].chance_title.search(val) !== -1) {
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
