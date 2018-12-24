<template>
  <div>
    <el-row>
      <el-form :model="formData" label-width="220px" style="width: 680px;padding-top:15px">

        <el-form-item label="资质名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveForm('ruleForm')">暂存</el-button>
          <el-button type="primary" @click="opensaveFlow('ruleForm')">提交</el-button>
          <el-button @click="close()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-row>
<el-dialog
    width="500"
    :visible.sync="dialogVisible">
    <span slot="title" >
      <i class="icon zx-add"></i>
     提交信息
    </span>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-main>
             <el-select v-model="flowData.subnodeid" placeholder="请选择下一环节">
               <el-option v-for="item in nextnodes" :label="item.nodename"   :value="item.nodeid" :key="item.nodeid"></el-option>              
            </el-select> 
            <el-select v-model="flowData.subuserid" placeholder="请选择处理人">
               <el-option v-for="item in nexthandler" :label="item.name" :value="item.id" :key="item.id"  ></el-option>                      
            </el-select> 
            <el-form-item label="意见">
	                <el-input type="textarea" v-model="formData.opinion"></el-input>
	          </el-form-item> 
        </el-main>
      </el-container>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="saveFlow">提交</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {

  name: 'tim',
  data() {
    return {
      content: '',
      dialogVisible:false,
      nextnodes:[],
      nexthandler:[],
      formData: {
        type: "",
        name: "",
         
      },
      flowData:{
        subnodeid: "",
        subuserid: "",
        subnodename: "",
        subusername: "",
        busiid:"",
        taskid:"",
        nodeid:'',
        deployid:'',
        userid:'20180508102022855430',
        username:'深圳卓讯',
        deptid:'001',
        deptname:'卓讯',
        opinion:''
      },
    

    }
  },

  methods: {
    initialize() {
        let authToken =  sessionStorage.getItem('access_token');
        if(authToken==null)
        {
           this.$axios.post('https://www.zxpaas.com/authen/oauth/token?client_id=1535ddd36da04f7bb2a9e76678a176f7&client_secret=taskmgr&grant_type=client_credentials').then(res => {
              sessionStorage.setItem("access_token",res.data.access_token);
              this.initflow();
            });
        }
        else
        {
           this.initflow();
        }
    },
    initflow() {
      this.$axios.get('/proxyapi'+'/api/check').then(res => {
         // alert(res.data);
      });
      this.$axios.get('/proxyapiwaas'+'/flow/initFlowInfo?serviceid=e09003094e85413f87c43f12046d8f04&deployid=&taskid=&busiid=').then(res => {
       // alert(res.nodeid)
        this.flowData.nodeid=res.nodeid;
        this.flowData.nodename=res.nodename;
        this.flowData.deployid=res.deployid; 
        this.flowData.busiid=res.busiid;
      });
     
    },
    saveForm(ruleForm)
    {
        
    }, 
     xintest()
    {
      var obj={};
    // obj.nodeid=this.flowData.nodeid;
      obj.nodeid='fcb7a6bl3757420aae0478011245cl31';

       obj.busiid='0';
      this.$axios.get('/proxyapiwaas'+'/flow/nodeInfo/fcb7a6bl3757420aae0478011245cl31').then(res => {
        alert(res)
      });
     
    //  this.dialogVisible=true;
    },
    opensaveFlow(ruleForm)
    {
      var obj={};
     obj.nodeid=this.flowData.nodeid;
     // obj.nodeid='fcb7a6bl3757420aae0478011245cl31';
//obj.busiid='f869734c00db45769bb313620c04eff9';
   obj.busiid='0';
      obj.state='1';
      this.$axios.post('/proxyapiwaas'+'/flow/nextNodes',obj).then(res => {
          this.nextnodes=res;
         if(this.nextnodes.length>0)
         {    
           this.flowData.subnodeid=this.nextnodes[0].nodeid;
           this.getPowerList(this.flowData.subnodeid);
         }
      });
     
      this.dialogVisible=true;
    },
    getPowerList(nodeid)
    {
      this.$axios.get('/proxyapiwaas'+'/flow/queryPowerList?nodeid='+nodeid).then(res => {
         this.nexthandler=res;
      });
    },
    saveFlow(ruleForm)
    {
     //var obj={};
      for(var index in this.nextnodes)
      {
          if(this.nextnodes[index].nodeid==this.flowData.subnodeid)
          {
              this.flowData.subnodename=this.nextnodes[index].nodename;
          }
      }
      for(var index in this.nexthandler)
      {
          if(this.nexthandler[index].id==this.flowData.subuserid)
          {
              this.flowData.subusername=this.nexthandler[index].name;
               if(this.nexthandler[index].powerType=='1')
              {
                   this.flowData.subusertype='user';
              }
              else
              {
                  this.flowData.subusertype='group';
              }
          }
      }
      this.flowData.businame="企业资质管理（"+this.formData.name+"）";              
      this.flowData.subnodetype='task';
      //this.flowData.subusertype='user';
      this.flowData.formdata=JSON.stringify(this.formData);
       alert(JSON.stringify(this.flowData));
       this.$axios.post('/proxyapiwaas'+'/flow/saveFlowData',this.flowData).then(res => {
          alert(res);
      });
    },
    close()
    {

    }
  },
  mounted() {
    this.initialize();
    //this.initflow();
   // this.xintest();
  },

}
</script>

 
  