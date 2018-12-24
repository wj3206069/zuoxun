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
          <el-button type="primary" @click="openbackFlow('ruleForm')">退回上一步</el-button>
          <el-button type="primary" @click="cancelFlow('ruleForm')">撤办业务</el-button>
          <el-button @click="close()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-dialog width="500" :visible.sync="dialogVisible">
      <span slot="title">
        <i class="icon zx-add"></i>
        提交信息
      </span>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-container>
          <el-main>
            <el-select v-model="flowData.subnodeid" placeholder="请选择下一环节">
              <el-option v-for="(item) in nextnodes" :label="item.nodename" :value="item.nodeid" :key="item.nodeid"></el-option>
            </el-select>
            <el-select v-model="flowData.subuserid" placeholder="请选择处理人">
              <el-option v-for="(item) in nexthandler" :label="item.name" :value="item.id" :key="item.id"></el-option>
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

    <el-dialog width="500" :visible.sync="dialogVisible_back">
      <span slot="title">
        <i class="icon zx-add"></i>
        退回到上一环节
      </span>
      <el-container>

        <el-main>
          <el-form :model="taskinfo">
            <el-form-item label="上一步办理人：">
              <el-input type="text" readonly="true" v-model="taskinfo.lastperson"></el-input>
            </el-form-item>
            <el-form-item label="上一步办理环节：">
              <el-input type="text" readonly="true" v-model="taskinfo.lastnodename"></el-input>
            </el-form-item>
            <el-form-item label="上一步办理时间：">
              <el-input type="text" readonly="true" v-model="taskinfo.lasttime"></el-input>
            </el-form-item>
            <el-form-item label="意见">
              <el-input type="textarea" v-model="formData.opinion"></el-input>
            </el-form-item>
          </el-form>
        </el-main>

      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveBackFlow">提交</el-button>
        <el-button @click="dialogVisible_back = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {

  name: 'tim',
  data () {
    return {
      content: '',
      dialogVisible: false,
      dialogVisible_back: false,
      nextnodes: [],
      nexthandler: [],
      formData: {
        type: "",
        name: "",
      },
      flowData: {
        subnodeid: "",
        subuserid: "",
        subnodename: "",
        subusername: "",
        busiid: "",
        nodeid: '',
        deployid: '',
        userid: '9f8fc414d708455c9d2a5aee0c13b3fc',
        username: '深圳卓讯',
        deptid: '001',
        deptname: '卓讯',
        opinion: ''
      },
      flowBackData: {
        subnodeid: "",
        subuserid: "",
        subnodename: "",
        subusername: "",
        busiid: "",
        nodeid: '',
        deployid: '',
        userid: '9f8fc414d708455c9d2a5aee0c13b3fc', // 20180508102022855430
        username: '深圳卓讯',
        deptid: '001',
        deptname: '卓讯',
        opinion: ''
      },
      taskinfo: {},

      todotaskid: ''

    }
  },

  methods: {
    initialize () {
      let authToken = sessionStorage.getItem('access_token');
      if (authToken == null) {
        this.$axios.post('https://www.zxpaas.com/authen/oauth/token?client_id=1535ddd36da04f7bb2a9e76678a176f7&client_secret=taskmgr&grant_type=client_credentials').then(res => {
          sessionStorage.setItem("access_token", res.data.access_token);
          this.initflow();
        });
      }
      else {
        this.initflow();
      }
    },
    initflow () {
      this.$axios.get('/proxyapi' + '/api/check').then(res => {
        // alert(res.data);
      });
      if (this.todotaskid != '') {
        this.$axios.get('/proxyapiwaas' + '/flow/initFlowInfo/' + this.todotaskid).then(res => {
          this.flowData.nodeid = res.nodeid;
          this.flowData.nodename = res.nodename;
          this.flowData.deployid = res.deployid;
          this.flowData.busiid = res.busiid;
          this.flowData.taskid = this.todotaskid;
          this.flowBackData.nodeid = res.nodeid;
          this.flowBackData.nodename = res.nodename;
          this.flowBackData.deployid = res.deployid;
          this.flowBackData.busiid = res.busiid;
          this.flowBackData.taskid = this.todotaskid;
          this.taskinfo = res;
        });
      } else {
        this.$axios.get('/proxyapiwaas' + '/flow/initFlowInfo?serviceid=b06ef8391c4d420d82188b70ea1c408c&deployid=&taskid=&busiid=').then(res => {
          this.flowData.nodeid = res.nodeid;
          this.flowData.nodename = res.nodename;
          this.flowData.deployid = res.deployid;
          this.flowData.busiid = res.busiid;
        });
      }


    },

    saveBackFlow () {

      this.$confirm(', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.flowBackData.subnodetype = 'task';
        this.flowBackData.subusertype = 'user';
        this.flowBackData.subnodeid = this.taskinfo.lastnodeid;
        this.flowBackData.subuserid = this.taskinfo.lastpersonid;
        this.flowBackData.subnodename = this.taskinfo.lastnodename;
        this.flowBackData.subusername = this.taskinfo.lastperson;
        this.$axios.post('/proxyapiwaas' + '/flow/saveFlowBackData', this.flowBackData).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });


    },
    cancelFlow () {
        var obj={};
       obj.taskid=this.todotaskid;
       obj.busiid=this.flowData.busiid;
       obj.userid=this.flowData.userid;
       obj.username=this.flowData.username;
       obj.deptid=this.flowData.deptid;
       obj.deptname=this.flowData.deptname;
       
      console.log(this.flowData);
      this.$axios.post('/proxyapiwaas' + '/flow/abandonBusiness', this.flowData).then(res => {
        // alert("业务已经成功撤消办理");
        this.$message({
          type: 'success',
          message: '业务已经成功撤消办理!'
        });
      });
    },
    saveForm (ruleForm) {

    },
    openbackFlow () {
      this.dialogVisible_back = true;
    },
    opensaveFlow (ruleForm) {
      var obj = {};
      obj.nodeid = this.flowData.nodeid;
      obj.busiid = this.flowData.busiid;
      obj.state = '1';
      
      obj.subnodetype = 'task';
      this.$axios.post('/proxyapiwaas' + '/flow/nextNodes', obj).then(res => {
        this.nextnodes = res;
        if (this.nextnodes.length > 0) {
          this.flowData.subnodeid = this.nextnodes[0].nodeid;
          this.getPowerList(this.flowData.subnodeid);
        }
      });

      this.dialogVisible = true;
    },
    getPowerList (nodeid) {
      this.$axios.get('/proxyapiwaas' + '/flow/queryPowerList?nodeid=' + nodeid).then(res => {
        this.nexthandler = res;
      });
    },
    saveFlow (ruleForm) {
      //var obj={};
      for (var index in this.nextnodes) {
        if (this.nextnodes[index].nodeid == this.flowData.subnodeid) {
          this.flowData.subnodename = this.nextnodes[index].nodename;
        }
      }
      for (var index in this.nexthandler) {
        if (this.nexthandler[index].id == this.flowData.subuserid) {
          this.flowData.subusername = this.nexthandler[index].name;
          if (this.nexthandler[index].powerType == '1') {
            this.flowData.subusertype = 'user';
          }
          else {
            this.flowData.subusertype = 'group';
          }
        }
      }
      this.flowData.businame="企业资质管理（"+this.formData.name+"）";    
      this.flowData.subnodetype = 'task';

      this.flowData.formdata = JSON.stringify(this.formData);
      this.$axios.post('/proxyapiwaas' + '/flow/saveFlowData', this.flowData).then(res => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
      });
    },
    close () {

    }
  },
  mounted () {

    this.todotaskid = '09b69d4b40184b0b9428f0e317c6e449';
    this.initialize();

  },

}
</script>

 
  