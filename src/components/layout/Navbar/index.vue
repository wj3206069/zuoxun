<template>
  <el-aside class="content_left" :style="'width:'+btnValue +'px'">

          <el-radio-group v-model="isCollapse" @click.native.prevent = "toogle()" :style="'width:'+btnValue +'px'">
            <el-radio-button :label="!isCollapse">
              <i class="zxicon zx-btn-"></i>
            </el-radio-button>
          </el-radio-group>
    <!--:default-openeds = "openeds"-->
          <el-menu :collapse="isCollapse" background-color="#2c3338" text-color="#d2ecff"
                   active-text-color="#d2ecff"

                   :default-active="this.$store.state.navTitle.title"
                   :router="true"
                   unique-opened>
            <el-submenu index="1">
              <template slot="title">
                <div  @mouseenter = "mouseIn" @mouseleave="mouseOut" @click="homePage">
                  <i class="zxicon zx-shouye"></i>
                  <span slot="title" v-show="!isA">
                    首页
                  </span>
                  <span class="show_name"><span></span>首页</span>
                </div>
              </template>

            </el-submenu>

            <template v-for="(nav,index) in navjson"  >
              <!--<el-submenu :index="(index+2)+''"  >-->
              <el-submenu :index="nav.name"  >
                  <template slot="title">
                      <div  @mouseenter = "mouseIn" @mouseleave="mouseOut">
                          <i :class="'zxicon '+nav.icon"></i>
                          <span slot="title" v-show="!isA">
                            {{nav.name}}
                          </span>
                          <span class="show_name"><span></span>{{nav.name}}</span>
                          <i class="zxicon zx-sanjiao mark_down"></i>
                      </div>
                  </template>
                  <el-menu-item-group v-for="(navchild,indexchild) in nav.children"  >
                    <!--<el-menu-item :index="(index+2)+'-'+(indexchild+1)" -->
                      <el-menu-item :index="navchild.name"
                                    @click="goto(navchild.path, navchild.children,navchild.name)"
                    @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">
                          <i class="zxicon zx-sanjiaoxing"></i>
                          <span v-show="!isA">
                                {{navchild.name}}
                            </span>
                          <span class="show_name"><span></span>{{navchild.name}}</span>
                      </el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
            </template>


            <!-- 行政管理 ------------------start------------------------>
            <!--<el-submenu index="2">-->
              <!--<template slot="title">-->
                <!--<div  @mouseenter = "mouseIn" @mouseleave="mouseOut">-->
                  <!--<i class="zxicon zx-xingzheng"></i>-->
                  <!--<span slot="title" v-show="!isA">-->
                    <!--行政管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>行政管理</span>-->
                  <!--<i class="zxicon zx-sanjiao mark_down"></i>-->
                <!--</div>-->
              <!--</template>-->
              <!--<el-menu-item-group >-->
                <!--<el-menu-item index="2-1"  @click="goto('/ruanshili',navjson.administrative_management.information_resources,'信息资源')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--信息资源-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>信息资源</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="2-2"  @click="goto('/ruanshili',navjson.administrative_management.company_system,'公司制度')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--公司制度-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>公司制度</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="2-3"  @click="goto('/ruanshili',navjson.administrative_management.ruanshili,'软实力')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--软实力-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>软实力</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="2-4"  @click="goto('/ruanshili',navjson.administrative_management.government_funding,'政府资助')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--政府资助-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>政府资助</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="2-5"  @click="goto('/ruanshili',navjson.administrative_management.documents_approved,'文件呈批')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--文件呈批-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>文件呈批</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="2-6"  @click="goto('/ruanshili',navjson.administrative_management.fixed_assets,'固定资产')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--固定资产-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>固定资产</span>-->
                <!--</el-menu-item>-->
              <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!-- 行政管理 ------------------end------------------------>

            <!-- 人事管理 ------------------start------------------------>
            <!--<el-submenu index="3">-->
              <!--<template slot="title">-->
                <!--<div  @mouseenter = "mouseIn" @mouseleave="mouseOut">-->
                  <!--<i class="zxicon zx-renshiguanli"></i>-->
                  <!--<span slot="title" v-show="!isA">-->
                    <!--人事管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>人事管理</span>-->
                  <!--<i class="zxicon zx-sanjiao mark_down"></i>-->
                <!--</div>-->
              <!--</template>-->
              <!--<el-menu-item-group >-->
                <!--<el-menu-item index="3-1"  @click="goto('/ruanshili',navjson.personnel_management.recruitment_management,'招聘管理')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--招聘管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>招聘管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="3-2"  @click="goto('/ruanshili',navjson.personnel_management.entry_management,'入职管理')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--入职管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>入职管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="3-3"  @click="goto('/ruanshili',navjson.personnel_management.correction_management,'转正管理')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--转正管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>转正管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="3-4"  @click="goto('/ruanshili',navjson.personnel_management.quit_management,'离职管理')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--离职管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>离职管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="3-5"  @click="goto('/checkingin/conmponentheader')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--考勤管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>考勤管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="3-6"  @click="goto('/ruanshili',navjson.personnel_management.leave_management,'请假管理')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--请假管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>请假管理</span>-->
                <!--</el-menu-item>-->
              <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!-- 人事管理 ------------------end------------------------>

            <!-- 财务管理 ------------------start------------------------>
            <!--<el-submenu index="13">-->
              <!--<template slot="title">-->
                <!--<div  @mouseenter = "mouseIn" @mouseleave="mouseOut">-->
                  <!--<i class="zxicon zx-cehuadailiicon"></i>-->
                  <!--<span slot="title" v-show="!isA">-->
                    <!--财务管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>财务管理</span>-->
                  <!--<i class="zxicon zx-sanjiao mark_down"></i>-->
                <!--</div>-->
              <!--</template>-->
              <!--<el-menu-item-group >-->
                <!--<el-menu-item index="13-1"  @click="goto('/ruanshili',navjson.financial_management.personnel_information,'人员信息')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--人员信息-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>人员信息</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="13-2"  @click="goto('/ruanshili',navjson.financial_management.meal_supplement,'餐补统计')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--餐补统计-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>餐补统计</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="13-3"  @click="goto('/ruanshili',navjson.financial_management.loan_management,'借款管理')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--借款管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>借款管理</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="13-4"  @click="goto('/ruanshili',navjson.financial_management.expense,'费用开支')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--费用开支-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>费用开支</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="13-5"  @click="goto('/ruanshili',navjson.financial_management.reimburse_management,'报销管理')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--报销管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>报销管理</span>-->
                <!--</el-menu-item>-->
              <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!-- 财务管理 ------------------end------------------------>

            <!-- 合同管理 ------------------start------------------------>
            <!--<el-submenu index="5">-->
              <!--<template slot="title">-->
                <!--<div  @mouseenter = "mouseIn" @mouseleave="mouseOut">-->
                  <!--<i class="zxicon zx-hetong3"></i>-->
                  <!--<span slot="title" v-show="!isA">-->
                    <!--合同管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>合同管理</span>-->
                  <!--<i class="zxicon zx-sanjiao mark_down"></i>-->
                <!--</div>-->
              <!--</template>-->
              <!--<el-menu-item-group >-->
                <!--<el-menu-item index="5-1"  @click="goto('/ruanshili',navjson.contract_management.contract_template,'合同模版')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--合同模版-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>合同模版</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="5-2"  @click="goto('/ruanshili',navjson.contract_management.contract_preparation,'合同编制')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--合同编制-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>合同编制</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="5-3"  @click="goto('/ruanshili',navjson.contract_management.contract_registration,'合同登记')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--合同登记-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>合同登记</span>-->
                <!--</el-menu-item>-->
                <!--<el-menu-item index="5-4"  @click="goto('/ruanshili',navjson.contract_management.contract_execution,'合同执行')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--合同执行-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>合同执行</span>-->
                <!--</el-menu-item>-->
              <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!-- 合同管理 ------------------end------------------------>

            <!-- 市场管理 ------------------start------------------------>
            <!--<el-submenu index="6">-->
              <!--<template slot="title">-->
                <!--<div  @mouseenter = "mouseIn" @mouseleave="mouseOut">-->
                  <!--<i class="zxicon zx-shichang"></i>-->
                  <!--<span slot="title" v-show="!isA">-->
                    <!--市场管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>市场管理</span>-->
                  <!--<i class="zxicon zx-sanjiao mark_down"></i>-->
                <!--</div>-->
              <!--</template>-->
              <!--<el-menu-item-group>-->
                <!--<el-menu-item index="3-8"  @click="goto('/customManager/customrelationship/CustomTable')"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">-->
                  <!--<i class="zxicon zx-sanjiaoxing"></i>-->
                  <!--<span v-show="!isA">-->
                    <!--客户关系管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>客户关系管理</span>-->
                <!--</el-menu-item>-->
              <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!-- 市场管理 ------------------end------------------------>


            <!--<el-submenu index="8">-->
              <!--<template slot="title">-->
                <!--<div  @mouseenter = "mouseIn" @mouseleave="mouseOut">-->
                  <!--<i class="zxicon zx-chanpinguanli"></i>-->
                  <!--<span slot="title" v-show="!isA">-->
                    <!--产品管理-->
                  <!--</span>-->
                  <!--<span class="show_name"><span></span>产品管理</span>-->
                  <!--&lt;!&ndash; <i class="zxicon zx-sanjiao mark_down"></i> &ndash;&gt;-->
                <!--</div>-->
              <!--</template>-->
            <!--</el-submenu>-->
          </el-menu>
        </el-aside>
</template>

<script>
import navjson from '~/assets/utils/nav.js';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      isCollapse: false,
      activeName: 'first',
      isA: false,
      isShow: true,
      isEdit: false,
      btnValue: "",
      // openeds: [], //定义需要展开的一级菜单
      tabPosition: "left",
      listChooseTitle: "",
        treeDataTongzhi:[
            {
                id: "1",
                name: "通知管理",
                path: {
                    name: "noticelist",
                }
            },
            {
                id: "2",
                name: "我的通知",
                path: {
                    name: "mynotice",
                }
            }
        ],
        treeDataGonggao:[
            {
                id: "3",
                name: "公告管理",
                path: {
                    name: "afficheList",
                }
            },
            {
                id: "2",
                name: "我的公告",
                path: {
                    name: "myaffiche",
                }
            }
        ],
      tableData3: [{
          systemName: '运营平台',
          bisinessName: '市场营销主流程...',
          bisinessContent: '海珠区重大项目廉...',
          handle: '商务方案',
          lastHandle: '商务方案工作安排',
          transactor: '2017/04/10 12:47:22',
          operation: <i class="zxicon zx-banli"></i>
        }, {
          systemName: '运营平台',
          bisinessName: '需求申报流程',
          bisinessContent: '无',
          handle: '需求申报',
          lastHandle: '实施方部门经理',
          transactor: '2017/04/10 12:47:22',
          operation: <i class="zxicon zx-banli"></i>
        }, {
          systemName: '运营平台',
          bisinessName: '设备归还流程',
          bisinessContent: '申请人解妮',
          handle: '设备归还',
          lastHandle: '商务方案工作安排',
          transactor: '2017/04/10 12:47:22',
          operation: <i class="zxicon zx-banli"></i>
        }, {
          systemName: '运营平台',
          bisinessName: '需求申报流程',
          bisinessContent: '无',
          handle: '需求申报',
          lastHandle: '实施方部门经理',
          transactor: '2017/04/10 12:47:22',
          operation: <i class="zxicon zx-banli"></i>
        }, {
          systemName: '运营平台',
          bisinessName: '需求申报流程',
          bisinessContent: '无',
          handle: '需求申报',
          lastHandle: '实施方部门经理',
          transactor: '2017/04/10 12:47:22',
          operation: <i class="zxicon zx-banli"></i>
        }],
      multipleSelection: [],
      navjson:[]
    };
  },
  methods: {
    goto: function (path, val, title) {
        console.log(path,val,title);
        if(!path){
            path = '/ruanshili';
        }
        if(!!val){
            this.$store.dispatch('modifyAName', {val});
        }
        this.$store.dispatch('modifyNavTitle', {title});
        this.$router.push(path);

    },
    // get activedMenu(){
    //      // console.log(this.$route.path);
    //      return '';
    // } ,
    // ...mapActions( // 语法糖
    //       ['modifyAName'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
    //   ),
    homePage() {
      this.$router.push("/");
      // $(".content_middle").css("display","flex");
      // $(".content_right").css("display","flex");
      // $(".list_three_title").css("display","none");
      // $(".list_three_content").css("display","none");
    },
    toogle(){
      this.isA = !this.isA;
      this.btnValue= this.isA?50:184;
      if(this.isA){
        $(".el-radio-group").find(".zx-btn-").css("transform","rotate(90deg)");
      }else{
        $(".el-radio-group").find(".zx-btn-").css("transform","rotate(0deg)");
      }
    },
    selected(){
      console.log($(event.currentTarget).find(".show_name").text());
      this.listChooseTitle = $(event.currentTarget).find(".show_name").text()
      $(".content_middle").css("display","none");
      $(".content_right").css("display","none");
      $(".list_three_title").css("display","block");
      $(".list_three_content").css("display","block");
    },
    mouseIn(event){
      if(this.isA){
        console.log(event)
        //event.currentTarget
        $(event.currentTarget).find(".show_name").addClass("hover_name");
      }
    },
    mouseOut(event){
         $(event.currentTarget).find(".show_name").removeClass("hover_name");
    },
    pack(){
      this.isShow = !this.isShow;
      if(this.isShow){
        $(".list_three_title").find(".el-tabs__header").css("display","block");
        $(".list_three_title").find(".list_choose_title").css("display","block");
        $(".list_three_title").find(".trapezoid").css(
          {
            "border-right-color":"white",
            "transform":"rotate(0deg)",
            "left":"161px"
          }
        );
      }else{
        $(".list_three_title").find(".el-tabs__header").css("display","none");
        $(".list_three_title").find(".list_choose_title").css("display","none");
        $(".list_three_title").find(".trapezoid").css(
          {
            "border-right-color":"rgb(234,237,241)",
            "transform":"rotate(180deg)",
            "left":"0"
          }
        );
      }
      console.log($("list_three_title").find(".el-tabs__nav-wrap"));
    },
    quickEdit(){
      this.isEdit = !this.isEdit;
    },
    quickDelete(event){
      console.log(event.target.nodeName);
      if(event.target.nodeName.toLocaleLowerCase() == "i" && $(event.target).hasClass("zx-shanchu")){
        event.target.parentNode.remove();
      }
    },
      loadNavMenu(){
          // this.navjson = navjson;
          this.$axios.get('/proxyapiAuthen/authencenter/appmenutree/f293f3b273ef41b9b7a65739c6a68dad?enabled=1').then(res=>{
              if(!!res){
                  this.navjson = res;
                  sessionStorage.setItem("navMenu",JSON.stringify(res));
              }
              console.log(res);
          });
      }
  },
  created(){
    this.loadNavMenu();
  },computed:{
        ...mapGetters(['resturantName']), // 动态计算属性，相当于this.$store.getters.resturantName
        ...mapGetters(['navTitle'])
    }
}
</script>

<style lang="less">
	.el-menu-item.is-active,.el-menu-item.is-active:hover{
		background-color:#0769b3 !important;
		color: white !important;
		.zxicon{
			color: white !important;
		}
	}
</style>
