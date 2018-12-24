<template>
  <div id="app">

    <el-row>
      <el-col :span="24">
        <div class="title">
          <span class="title_icon">
            <i class="zxicon zx-zx-logo"></i>
          </span>
          <span class="title_name">卓讯集成平台</span>
          <span class="title_triangle">
            <el-dropdown :show-timeout="0" :hide-timeout="250" @command="handleDropdown">
              <span class="el-dropdown-link">
                卓讯柔性微服务产品<i class="zxicon zx-sanjiao1"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="https://www.zxpaas.com/authen"><span class="zxicon zx-renzheng"></span>认证中心</el-dropdown-item>
                <el-dropdown-item command="https://www.zxpaas.com/userreg"><span class="zxicon zx-renzheng"></span>用户资源</el-dropdown-item>
                <el-dropdown-item command="https://www.zxpaas.com/faas"><span class="zxicon zx-renzheng"></span>文件平台</el-dropdown-item>
                <el-dropdown-item command="https://www.zxpaas.com/dev"><span class="zxicon zx-renzheng"></span>在线开发</el-dropdown-item>
                <el-dropdown-item command="https://www.zxpaas.com/waas"><span class="zxicon zx-renzheng"></span>工作流</el-dropdown-item>
                <el-dropdown-item command="https://www.zxpaas.com/daas"><span class="zxicon zx-renzheng"></span>数据服务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <div class="title_right">
            <el-input  placeholder="关键词">
              <i slot="prefix" class="zxicon zx-sousuo"></i>
            </el-input>
            <ul>
              <li>管理</li>
              <li>常见问题</li>
              <li><img src="../static/head.jpg"/>szzx</li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="content">
      <el-container>
        <el-aside class="content_left" :style="'width:'+btnValue +'px'">

          <el-radio-group v-model="isCollapse" @click.native.prevent = "toogle()" :style="'width:'+btnValue +'px'">
            <el-radio-button :label="!isCollapse">
              <i class="zxicon zx-btn-"></i>
            </el-radio-button>
          </el-radio-group>
          <el-menu
                    :collapse="isCollapse"
                    background-color="#2c3338"
                    text-color="#d2ecff"
                    active-text-color="#d2ecff"
                    :default-openeds = "openeds"
                    >
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
            <el-submenu index="2">
              <template slot="title">
                <div  @mouseenter = "mouseIn" @mouseleave="mouseOut">
                  <i class="zxicon zx-shujucaiji"></i>
                  <span slot="title" v-show="!isA">
                    配置中心
                  </span>
                  <span class="show_name"><span></span>配置中心</span>
                  <i class="zxicon zx-sanjiao"></i>
                </div>
              </template>
              <el-menu-item-group >
                <el-menu-item index="1-1"  @click = "selected"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">
                  <i class="zxicon zx-shujuguanli"></i>
                  <span v-show="!isA">
                    多数据源
                  </span>
                  <span class="show_name"><span></span>多数据源</span>
                </el-menu-item>
                <el-menu-item index="1-2"  @click = "selected"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">
                  <i class="zxicon zx-huihe"></i>
                  <span v-show="!isA">
                    分布式事务
                  </span>
                  <span class="show_name"><span></span>分布式事务</span>
                </el-menu-item>
                <el-menu-item index="1-3"  @click = "selected"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">
                  <i class="zxicon zx-jituanyonghutongji"></i>
                  <span v-show="!isA">
                    静态资源缓存
                  </span>
                  <span class="show_name"><span></span>静态资源缓存</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <div  @mouseenter = "mouseIn" @mouseleave="mouseOut">
                  <i class="zxicon zx-zhuceshenhe"></i>
                  <span slot="title" v-show="!isA">认证中心</span>
                  <i class="zxicon zx-sanjiao"></i>
                  <span class="show_name"><span></span>认证中心</span>
                </div>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1"  @click = "selected"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">
                  <i class="zxicon zx-yunhangzhuangtai"></i>
                  <span v-show="!isA">应用认证</span>
                  <span class="show_name"><span></span>应用认证</span>
                </el-menu-item>
                <el-menu-item index="2-2"  @click = "selected"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">
                  <i class="zxicon zx-xiaoshoutongji"></i>
                  <span v-show="!isA">应用资源配置</span>
                  <span class="show_name"><span></span>应用资源配置</span>
                </el-menu-item>
                <el-menu-item index="2-3"  @click = "selected"  @mouseenter.native = "mouseIn" @mouseleave.native="mouseOut">
                  <i class="zxicon zx-guakeshuaitongji"></i>
                  <span v-show="!isA">日志管理</span>
                  <span class="show_name"><span></span>日志管理</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main class="content_middle">
          <el-header>
            <p class="content_middle_title">
              <i class="zxicon zx-gongju1"></i>
              <span>快捷入口</span>
              <span class="icons">
                <i class="zxicon zx-gengduo1"></i>
                <i class="zxicon zx-ai61" @click="quickEdit"></i>
              </span>
            </p>
            <ul @click="quickDelete">
              <li>
                <i class="zxicon zx-yunhangzhuangtai"></i>
                <i class="zxicon zx-shanchu" v-show = "isEdit"></i>
                <p>
                  应用认证
                </p>
              </li>
              <li>
                <i class="zxicon zx-shujuguanli"></i>
                <i class="zxicon zx-shanchu" v-show = "isEdit"></i>
                <p>
                  多数据源
                </p>
              </li>
              <li>
                <i class="zxicon zx-huihe"></i>
                <i class="zxicon zx-shanchu" v-show = "isEdit"></i>
                <p>
                  多布式事务
                </p>
              </li>
            </ul>
          </el-header>
          <el-main>
            <p class="content_middle_title">
              <i class="zxicon zx-daiban"></i>
              <span>待办业务</span>
              <span class="icons">
                <!-- <i class="zxicon zx-ai61"></i>
                <i class="zxicon zx-shezhi"></i> -->
                <i class="zxicon zx-gengduo"></i>
              </span>
            </p>
            <el-table
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"
              height="80%"
              >
              <el-table-column type="index" width="26"></el-table-column>
              <el-table-column
                type="selection"
                width="20">
              </el-table-column>
              <el-table-column
                label="系统名称"
                width="70">
                <template slot-scope="scope">{{ scope.row.systemName }}</template>
              </el-table-column>
              <el-table-column
                prop="bisinessName"
                label="业务名称">
              </el-table-column>
              <el-table-column
                prop="bisinessContent"
                label="业务内容"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="handle"
                label="办理环节"
                width="60"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="lastHandle"
                label="上一办理环节"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="transactor"
                label="上一办理人"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="operation"
                label="操作"
                width="70"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer>
            <p class="content_middle_title">
              <i class="zxicon zx-gongju"></i>
              <span>业务办理</span>
              <!-- <span class="icons">
                <i class="zxicon zx-ai61"></i>
                <i class="zxicon zx-shezhi"></i>
              </span> -->
            </p>
            <div class="business_handle">
              <div>
                <i class="zxicon zx-daiban icon_red"></i>
                <p class="business_handle_top">
                  <span>25</span>
                  <span>个</span>
                </p>
                <p class="business_handle_bottom">
                  待办件
                </p>
              </div>
              <div>
                <i class="zxicon zx-yiban icon_blue"></i>
                <p class="business_handle_top">
                  <span>8</span>
                  <span>个</span>
                </p>
                <p class="business_handle_bottom">
                  已办件
                </p>
              </div>
              <div>
                <i class="zxicon zx-daibanshiyi icon_red"></i>
                <p class="business_handle_top">
                  <span>18</span>
                  <span>个</span>
                </p>
                <p class="business_handle_bottom">
                  待阅件
                </p>
              </div>
              <div>
                <i class="zxicon zx-yiban1 icon_blue"></i>
                <p class="business_handle_top">
                  <span>2</span>
                  <span>个</span>
                </p>
                <p class="business_handle_bottom">
                  已阅件
                </p>
              </div>
            </div>
          </el-footer>
        </el-main>

        <el-aside class="content_right">
          <div class="content_right_top">
            <template>
              <i class="zxicon zx-ai61"></i>
              <i class="zxicon zx-gengduo"></i>
              <div class="num_notice">
                1
              </div>
              <div class="num_tongzhi">
              	44
              </div>
              <div class="num_gonggao">
              	99
              	<i class="zxicon zx-gengduo1"></i>
              </div>
              <el-tabs v-model="activeName">
                <el-tab-pane label="消息" name="first" class="tabs_msg">
                  <!-- <ul>
                    <li>
                      <p>
                        <i class="cir divide"></i>
                        <i class="zxicon zx-new"></i>
                        <span class="indent msg_content">
                          关于清明节放假通知关于清明节放假通知
                        </span>
                      </p>
                      <p>
                        <span class="msg_person">解妮<i class="cir"></i>运营管理部</span>
                        <span class="msg_time">刚刚</span>
                      </p>
                    </li>
                    <li>
                      <i class="cir divide"></i>
                      <i class="zxicon zx-msnui-attachment"></i>
                      <span class="indent msg_content">关于公司组织架构调整及人事任命的通知</span>
                      <p>
                        <span class="msg_person">卓讯信息</span>
                        <span class="msg_time">2个小时前</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i class="divide"></i>
                        <span class="msg_content">关于开通公司运营管理平台财务管理的决定关于开通公司运营管理平台财务管理的决定</span>
                      </p>
                      <p>
                        <span class="msg_person">邹纪根</span>
                        <span class="msg_time">3天前</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i class="divide"></i>
                        <span class="msg_content">关于执行企业微信线上考勤及请假的通知</span>
                      </p>
                      <p>
                        <span class="msg_person">解妮<i class="cir"></i>运营管理部</span>
                        <span class="msg_time">2017/3/28</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i class="divide"></i>
                        <span class="msg_content">关于召开项目交流会的通知</span>
                      </p>
                      <p>
                        <span class="msg_person">易典<i class="cir"></i>项目执行部</span>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                  </ul> -->
                  <ul>
                    <li>
                      <i class="divide"></i>
                      <span class="msg_content" title="关于召开项目交流会的通知关于召开项目交流会的通知关于召开项目交流会的通知">
                        关于召开项目交流会的通知关于召开项目交流会的通知关于召开项目交流会的通知
                        开项目交流会的通知关于召开项目交流会的通知开项目交流会的通知关于召开项目交流会的通知
                        开项目交流会的通知关于召开项目交流会的通知开项目交流会的通知关于召开项目交流会的通知
                      </span>
                      <p>
                        <!-- <span class="msg_person">易典<i class="cir"></i>项目执行部</span> -->
                        <span class="msg_time">2017/3/21</span>
                      </p>

                    </li>
                    <li>
                      <i class="divide"></i>
                      <span class="msg_content">关于召开项目交流会的通知</span>
                      <p>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                    <li>
                      <i class="divide"></i>
                      <span class="msg_content">关于召开项目交流会的通知</span>
                      <p>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                  </ul>
                  <!-- <span class="more">更多</span> -->
                </el-tab-pane>
                <el-tab-pane label="通知" name="second" class="tabs_notice">

                  <ul>
                    <li>
                      <i class="cir divide"></i>
                      <i class="zxicon zx-new"></i>
                      <span class="indent msg_content">
                        关于清明节放假通知关于清明节放假通知
                      </span>
                      <p>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                    <li>
                      <i class="cir divide"></i>
                      <i class="zxicon zx-msnui-attachment"></i>
                      <span class="indent msg_content">关于公司组织架构调整及人事任命的通知</span>
                      <p>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                    <li>
                      <i class="divide"></i>
                      <span class="msg_content">关于开通公司运营管理平台财务管理的决定</span>
                      <p>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                    <li>
                      <i class="divide"></i>
                      <span class="msg_content">关于执行企业微信线上考勤及请假的通知</span>
                      <p>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                    <li>
                      <i class="divide"></i>
                      <span class="msg_content">关于召开项目交流会的通知</span>
                      <p>
                        <span class="msg_time">2017/3/21</span>
                      </p>
                    </li>
                  </ul>
                  <!-- <span class="more">更多</span> -->
                </el-tab-pane>
                <el-tab-pane label="公告" name="thrid" class="tabs_pubnotice">
                    <ul>
                      <li>
                        <i class="divide"></i>
                        <span class="msg_content" title="关于召开项目交流会的通知关于召开项目交流会的通知关于召开项目交流会的通知">
                          关于召开项目交流会的通知关于召开项目交流会的通知关于召开项目交流会的通知
                        </span>
                        <p>
                          <span class="msg_time">2017/3/21</span>
                        </p>
                      </li>
                      <li>
                        <i class="divide"></i>
                        <span class="msg_content">关于召开项目交流会的通知</span>
                        <p>
                          <span class="msg_time">2017/3/21</span>
                        </p>
                      </li>
                      <li>
                        <i class="divide"></i>
                        <span class="msg_content">关于召开项目交流会的通知</span>
                        <p>
                          <span class="msg_time">2017/3/21</span>
                        </p>
                      </li>
                    </ul>
                    <!-- <span class="more">更多</span> -->
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
          <div class="content_right_bottom">
            <i class="zxicon zx-ai61"></i>
            <i class="zxicon zx-gengduo"></i>
            <p class="content_right_bottom_title">
              <i class="zxicon zx-cloud-share-file"></i>
              文件共享
            </p>
            <ul>
              <li>
                <p>
                  <i class="cir divide"></i>
                  <i class="zxicon zx-new"></i>
                  <span class="indent msg_content">坪山界面.rar</span>
                  <span class="content_size">27.9M</span>
                </p>
                <p>
                  <!-- <span class="file_time">4个小时前</span> -->
                  <span class="msg_person">张丽敏</span>
                  <i class="zxicon zx-xiazai"></i>
                </p>
              </li>
              <li>
                <p>
                  <i class="cir divide"></i>
                  <span class="msg_content">节日清风预警防控系统.pptx</span>
                  <span class="content_size">1.2M</span>
                </p>
                <p>
                  <!-- <span class="file_time">一个月前</span> -->
                  <span class="msg_person">蒙剑</span>
                  <i class="zxicon zx-xiazai"></i>
                </p>
              </li>
              <li>
                <p>
                  <i class="cir divide"></i>
                  <span class="msg_content">城市更新防控预警系统思想方案V2.0.pptx</span>
                  <span class="content_size">2.3M</span>
                </p>
                <p>
                  <!-- <span class="file_time">2017/10/20</span> -->
                  <span class="msg_person">易典</span>
                  <i class="zxicon zx-xiazai"></i>
                </p>
              </li>
              <li>
                <p>
                  <i class="cir divide"></i>
                  <span class="msg_content">纪委书记汇报会议记录.docx</span>
                  <span class="content_size">1.8M</span>
                </p>
                <p>
                  <!-- <span class="file_time">2017/10/12</span> -->
                  <span class="msg_person">蒋涂</span>
                  <i class="zxicon zx-xiazai"></i>
                </p>
              </li>
              <li>
                <p>
                  <i class="cir divide"></i>
                  <span class="msg_content">城市更新DEMO.zip</span>
                  <span class="content_size">769K</span>
                </p>
                <p>
                  <!-- <span class="file_time">2017/10/12</span></span> -->
                  <span class="msg_person">李建民</span>
                  <i class="zxicon zx-xiazai"></i>
                </p>
              </li>
            </ul>
            <!-- <span class="more">更多</span> -->
          </div>
        </el-aside>


        <!-- 三级菜单  -->
        <el-main class="list_three_title">

          <el-tabs :tab-position="tabPosition" style="height: 200px;" type="border-card">
            <div class="list_choose_title">
              <span>{{ listChooseTitle }}</span>
            </div>
            <el-tab-pane label="内容1">内容一</el-tab-pane>
            <el-tab-pane label="内容2">内容二</el-tab-pane>
          </el-tabs>
          <div class="trapezoid" @click="pack">
            <i class="zxicon zx-xiala"></i>
          </div>
        </el-main>
      </el-container>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeName: 'first',
      isA: false,
      isShow: true,
      isEdit: false,
      btnValue: "",
      openeds: ['1','2'],
      tabPosition: "left",
      listChooseTitle: "",
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
      multipleSelection: []
    };
  },
  methods: {
    handleDropdown(command) {
        if (!!command) {
            window.open(command, "_black");
        }
    },
    homePage() {
      $(".content_middle").css("display","flex");
      $(".content_right").css("display","flex");
      $(".list_three_title").css("display","none");
      $(".list_three_content").css("display","none");
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
    }
  }
}
</script>

<style>
  /*@import "css/main.css";
  @import "scss/iconfont/iconfont.css";*/
</style>
